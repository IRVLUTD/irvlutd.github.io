#!/usr/bin/env python3
"""Result charts for the LIBERO-10 report.

Form: success rate is a magnitude with an interval, compared across an ordered
factor (effort) nested in an unordered one (model) -> dot-and-interval, not
bars; bars with error bars imply the interval is part of the magnitude.
Colour: effort is ORDERED, so it gets a sequential ramp (one hue, three
lightness steps), never categorical hues. Lightness does the work, so the
figure survives greyscale print. Every value is direct-labelled, so identity
is never colour-alone and the light step's low contrast is relieved.
"""
import os
from pathlib import Path

OUT = str(Path(__file__).resolve().parent)
os.makedirs(OUT, exist_ok=True)
FONT = "Liberation Sans, Helvetica, Arial, sans-serif"

# sequential ramp, lightness-ordered: validator PASSes CVD + normal-vision
# separation (worst adjacent dE 19.1 protan / 20.2 normal)
RAMP = {"low": "#AFC8E3", "medium": "#5A8CC0", "high": "#1F4A78"}
STROKE = "#2F5載"  # placeholder, replaced below
STROKE = "#1F4A78"
INK, MUTED, GRID, RULE = "#23272B", "#5F686F", "#E3E7EB", "#C9CED4"
T_TITLE, T_BODY, T_SMALL = 20, 15, 13

DATA = [  # model, effort, successes, rate, lo, hi
    ("GPT-6 Astra", [("low", 28, .28, .20, .37), ("medium", 38, .38, .29, .48),
                     ("high", 44, .44, .35, .54)]),
    ("GPT-6.1 Sol", [("low", 24, .24, .17, .33), ("medium", 30, .30, .22, .40),
                     ("high", 33, .33, .25, .43)]),
    ("Claude Opus 5.5", [("low", 9, .09, .05, .16), ("medium", 18, .18, .12, .27),
                         ("high", 33, .33, .25, .43)]),
    ("Claude Opus 5", [("low", 10, .10, .06, .17), ("medium", 12, .12, .07, .20),
                       ("high", 6, .06, .03, .12)]),
    ("GPT-6 Luna", [("low", 0, .00, .00, .04), ("medium", 0, .00, .00, .04),
                    ("high", 0, .00, .00, .04)]),
]

TASKS = [  # id, short label, successes (of 150)
    (1, "both cream cheese + butter in basket", 78),
    (0, "both alphabet soup + tomato sauce in basket", 69),
    (7, "both alphabet soup + cream cheese in basket", 61),
    (2, "turn on stove, put moka pot on it", 43),
    (8, "both moka pots on the stove", 18),
    (5, "book into back compartment of caddy", 9),
    (3, "black bowl in bottom drawer, close it", 7),
    (4, "two mugs onto left and right plates", 0),
    (6, "white mug on plate, pudding to its right", 0),
    (9, "mug in microwave, close it", 0),
]


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


class Svg:
    def __init__(self, w, h):
        self.w, self.h, self.p = w, h, []

    def t(self, x, y, s, size=T_BODY, anchor="start", weight="normal", fill=None):
        a = f' text-anchor="{anchor}"' if anchor != "start" else ""
        wt = f' font-weight="{weight}"' if weight != "normal" else ""
        self.p.append(f'<text x="{x}" y="{y}" font-family="{FONT}" '
                      f'font-size="{size}" fill="{fill or INK}"{a}{wt}>{esc(s)}</text>')

    def line(self, x1, y1, x2, y2, c=GRID, w=1.2, cap="butt"):
        self.p.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" '
                      f'stroke="{c}" stroke-width="{w}" stroke-linecap="{cap}"/>')

    def rect(self, x, y, w, h, fill, r=0, stroke=None, sw=1):
        st = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
        self.p.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" '
                      f'fill="{fill}"{st}/>')

    def circle(self, cx, cy, r, fill, stroke="#FFFFFF", sw=2):
        self.p.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" '
                      f'stroke="{stroke}" stroke-width="{sw}"/>')

    def save(self, name):
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" '
               f'height="{self.h}" viewBox="0 0 {self.w} {self.h}">'
               f'<rect width="{self.w}" height="{self.h}" fill="#FFFFFF"/>'
               + "".join(self.p) + "</svg>")
        open(f"{OUT}/{name}.svg", "w").write(svg)
        return f"{OUT}/{name}.svg"


# ===========================================================================
# Figure A -- model x effort, dot and 95% Wilson interval
# ===========================================================================
def fig_models():
    W, ROW, GAP = 1000, 27, 16
    x0, x1 = 330, 840            # plot area
    XMAX = 0.56
    top = 86
    n_rows = sum(len(v) for _, v in DATA)
    H = top + n_rows * ROW + len(DATA) * GAP + 56
    s = Svg(W, H)

    def X(v):
        return x0 + v / XMAX * (x1 - x0)

    s.t(40, 34, "Success rate by model and reasoning effort", T_TITLE,
        weight="bold")
    s.t(40, 56, "100 episodes per configuration · point estimate with 95% Wilson interval",
        T_SMALL, fill=MUTED)

    # gridlines + axis
    for g in [0, .1, .2, .3, .4, .5]:
        s.line(X(g), top - 10, X(g), H - 44, GRID if g else RULE,
               1.2 if g else 1.4)
        s.t(X(g), H - 24, f"{g:.0%}", T_SMALL, anchor="middle", fill=MUTED)
    s.t((x0 + x1) / 2, H - 6, "episodes satisfying the LIBERO success predicate",
        T_SMALL, anchor="middle", fill=MUTED)

    y = top
    for model, rows in DATA:
        s.t(40, y + 15, model, T_BODY, weight="bold")
        for eff, succ, rate, lo, hi in rows:
            cy = y + 13
            s.t(200, cy + 5, eff, T_SMALL, fill=MUTED)
            if rate is None:
                s.line(X(0) + 2, cy, X(.12), cy, RULE, 1.6)
                s.t(X(.13), cy + 5, "not yet run", T_SMALL, fill=MUTED)
            else:
                s.line(X(lo), cy, X(hi), cy, RAMP[eff], 3.2, cap="round")
                for b in (lo, hi):
                    s.line(X(b), cy - 5, X(b), cy + 5, RAMP[eff], 1.8)
                s.circle(X(rate), cy, 5.5, RAMP[eff])
                s.t(870, cy + 5, f"{rate:.0%}", T_BODY, weight="bold")
                s.t(916, cy + 5, f"({succ}/100)", T_SMALL, fill=MUTED)
            y += ROW
        y += GAP

    s.t(40, H - 24, "darker = more requested effort", T_SMALL, fill=MUTED)
    return s.save("fig4_models")


# ===========================================================================
# Figure B -- success by task, pooled
# ===========================================================================
def fig_tasks():
    W, ROW = 1000, 34
    x0, x1 = 530, 880
    XMAX = 0.60
    top = 104
    H = top + len(TASKS) * ROW + 54
    s = Svg(W, H)

    def X(v):
        return x0 + v / XMAX * (x1 - x0)

    s.t(40, 34, "Success rate by task", T_TITLE, weight="bold")
    s.t(40, 56, "pooled over the 15 complete configurations · 150 episodes per task",
        T_SMALL, fill=MUTED)

    s.t(40, top - 20, "task", T_SMALL, fill=MUTED)
    s.t(66, top - 20, "instruction", T_SMALL, fill=MUTED)
    for g in [0, .1, .2, .3, .4, .5]:
        s.line(X(g), top - 12, X(g), H - 42, GRID if g else RULE,
               1.2 if g else 1.4)
        s.t(X(g), H - 22, f"{g:.0%}", T_SMALL, anchor="middle", fill=MUTED)

    y = top
    for tid, label, succ in TASKS:
        rate = succ / 150
        cy = y + 11
        s.t(40, cy + 5, f"{tid}", T_SMALL, fill=MUTED)
        s.t(66, cy + 5, label, T_BODY)
        if succ:
            s.rect(X(0), cy - 9, X(rate) - X(0), 18, RAMP["medium"], r=4)
        else:
            s.rect(X(0), cy - 9, 3, 18, "#C2CBD3", r=1.5)
        s.t(X(rate) + 12 if succ else X(0) + 14, cy + 5,
            f"{rate:.0%}", T_BODY, weight="bold",
            fill=INK if succ else MUTED)
        s.t(X(rate) + 56 if succ else X(0) + 54, cy + 5,
            f"({succ}/150)", T_SMALL, fill=MUTED)
        y += ROW

    s.t(40, H - 6, "Three tasks are solved by no model at any effort setting.",
        T_SMALL, fill=MUTED)
    return s.save("fig5_tasks")


paths = [fig_models(), fig_tasks()]
import cairosvg
for p in paths:
    b = p[:-4]
    cairosvg.svg2pdf(url=p, write_to=b + ".pdf")
    cairosvg.svg2png(url=p, write_to=b + ".png", scale=1.5)
    print("wrote", b)
print("on-page pt at \\textwidth:",
      ", ".join("%.1f" % (t * 468 / 1000) for t in (T_SMALL, T_BODY, T_TITLE)))
