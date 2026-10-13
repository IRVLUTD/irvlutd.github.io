#!/usr/bin/env python3
"""Download an experiment-results JSON file from Google Drive.

The token file may contain either an OAuth access token (``token`` or
``access_token``) or Google authorized-user credentials with a refresh token.
No third-party Python packages are required.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import tempfile
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


DRIVE_API = "https://www.googleapis.com/drive/v3/files/{file_id}?alt=media"
PUBLIC_DOWNLOAD = "https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm=t"
TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token"
FILE_ID_PATTERN = re.compile(r"^[A-Za-z0-9_-]+$")


def read_token_file(path: Path) -> dict:
    try:
        value = json.loads(path.expanduser().read_text())
    except FileNotFoundError as error:
        raise SystemExit(f"Token file does not exist: {path}") from error
    except json.JSONDecodeError as error:
        raise SystemExit(f"Token file is not valid JSON: {path}") from error
    if not isinstance(value, dict):
        raise SystemExit("Token file must contain a JSON object.")
    return value


def refresh_authorized_user(credentials: dict) -> str:
    required = ("client_id", "client_secret", "refresh_token")
    missing = [key for key in required if not credentials.get(key)]
    if missing:
        raise SystemExit(f"Token file is missing: {', '.join(missing)}")
    body = urllib.parse.urlencode({
        "client_id": credentials["client_id"],
        "client_secret": credentials["client_secret"],
        "refresh_token": credentials["refresh_token"],
        "grant_type": "refresh_token",
    }).encode()
    request = urllib.request.Request(
        TOKEN_ENDPOINT,
        data=body,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            result = json.load(response)
    except (urllib.error.URLError, json.JSONDecodeError) as error:
        raise SystemExit(f"Could not refresh the Google OAuth token: {error}") from error
    token = result.get("access_token")
    if not token:
        raise SystemExit("Google OAuth refresh response did not contain an access token.")
    return token


def access_token(credentials: dict) -> str:
    if credentials.get("refresh_token"):
        return refresh_authorized_user(credentials)
    token = credentials.get("access_token") or credentials.get("token")
    if not isinstance(token, str) or not token.strip():
        raise SystemExit(
            "Token file must contain token/access_token or authorized-user refresh credentials."
        )
    return token.strip()


def download(file_id: str, token: str | None = None) -> bytes:
    if not FILE_ID_PATTERN.fullmatch(file_id):
        raise SystemExit("Google Drive file ID contains invalid characters.")
    url = DRIVE_API.format(file_id=file_id) if token else PUBLIC_DOWNLOAD.format(file_id=file_id)
    headers = {"Accept": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            return response.read()
    except urllib.error.HTTPError as error:
        detail = error.read(500).decode("utf-8", "replace")
        raise SystemExit(f"Google Drive download failed (HTTP {error.code}): {detail}") from error
    except urllib.error.URLError as error:
        raise SystemExit(f"Google Drive download failed: {error.reason}") from error


def validate_results(payload: bytes) -> dict:
    try:
        result = json.loads(payload)
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise SystemExit("Downloaded file is not valid UTF-8 JSON.") from error
    if not isinstance(result, dict) or not isinstance(result.get("episodes"), list):
        raise SystemExit("Downloaded JSON is not an experiment-results export (missing episodes list).")
    if not isinstance(result.get("totals"), dict):
        raise SystemExit("Downloaded JSON is not an experiment-results export (missing totals object).")
    return result


def write_atomic(output: Path, payload: bytes) -> None:
    output = output.expanduser()
    output.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(prefix=f".{output.name}.", dir=output.parent)
    temporary = Path(temporary_name)
    try:
        with os.fdopen(descriptor, "wb") as stream:
            stream.write(payload)
            stream.flush()
            os.fsync(stream.fileno())
        temporary.replace(output)
    finally:
        temporary.unlink(missing_ok=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--file-id", required=True, help="Google Drive file ID")
    parser.add_argument("--token", type=Path, required=True, help="Path to OAuth token JSON")
    parser.add_argument("--output", type=Path, required=True, help="Destination JSON path")
    args = parser.parse_args()

    credentials = read_token_file(args.token)
    token = None if isinstance(credentials.get("installed"), dict) else access_token(credentials)
    payload = download(args.file_id, token)
    results = validate_results(payload)
    compact = json.dumps(results, separators=(",", ":"), ensure_ascii=False).encode()
    write_atomic(args.output, compact)
    print(f"Wrote {len(results['episodes'])} episodes to {args.output}")


if __name__ == "__main__":
    main()
