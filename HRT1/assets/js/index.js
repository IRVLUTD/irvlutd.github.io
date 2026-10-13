/* HRT1 — video grid renderer for the Real-World Execution section.
   Switches the grid when a trial tab is clicked. All visual styling lives in
   clap-theme.css (.hrt1-vid-grid / .hrt1-vid-card). Inline styles intentionally
   avoided so the CLAP theme tokens drive the look. */

$(document).ready(function () {

  const COLUMN_WIDTH_MAP = {
    1: "is-full",
    2: "is-half",
    3: "is-one-third",
    4: "is-one-quarter",
    5: "is-one-fifth",
    6: "is-one-sixth"
  };
  const getColumnClass = (n) => COLUMN_WIDTH_MAP[n] || "is-one-quarter";

  function coerceBool(v) {
    if (typeof v === "boolean") return v;
    if (typeof v === "number")  return v !== 0;
    if (typeof v === "string") {
      const s = v.trim().toLowerCase();
      return s === "true" || s === "1" || s === "yes";
    }
    return false;
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function get_vid_html(trialId) {
    const clips       = TRIALS[trialId] || [];
    const columnClass = getColumnClass(VIDEOS_PER_ROW);
    const isHumanDemo = trialId === "trial-0";

    const cards = clips.map((clip, i) => {
      const src  = (clip && clip.src) || "";
      const ok   = coerceBool(clip && clip.successful_trial);
      const task = TASKS[i] || "";

      const stateClass = isHumanDemo ? "is-human" : (ok ? "is-success" : "is-failure");
      const stateLabel = isHumanDemo
        ? `<span class="hrt1-tag hrt1-tag-demo">Demo</span>`
        : ok
          ? `<span class="hrt1-tag hrt1-tag-success"><i class="fas fa-check" aria-hidden="true"></i> Success</span>`
          : `<span class="hrt1-tag hrt1-tag-failure"><i class="fas fa-times" aria-hidden="true"></i> Failure</span>`;

      return `
        <div class="column ${columnClass}">
          <figure class="hrt1-vid-card ${stateClass}">
            <div class="hrt1-vid-frame">
              <video autoplay loop muted playsinline preload="metadata">
                <source src="${escapeHTML(src)}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <figcaption>
              <span class="hrt1-vid-task">${escapeHTML(task)}</span>
              ${stateLabel}
            </figcaption>
          </figure>
        </div>
      `;
    }).join("");

    return `<div class="columns is-multiline is-centered hrt1-vid-grid">${cards}</div>`;
  }

  // Default: load human demo
  const defaultId = "trial-0";
  $("#" + defaultId).addClass("is-active");
  $("#demo-vid-iframe").html(get_vid_html(defaultId));

  // Tab switcher
  $(".demo-video-iframe").on("click", function () {
    $(".demo-video-iframe").removeClass("is-active");
    $(this).addClass("is-active");
    $("#demo-vid-iframe").html(get_vid_html($(this).attr("id")));
  });

  // Last-updated date
  $.getJSON(
    "https://api.github.com/repos/irvlutd/irvlutd.github.io/commits?sha=hrt1&per_page=1",
    function (data) {
      if (!data || !data[0]) return;
      const d = new Date(data[0].commit.committer.date).toDateString();
      $("#last-updated").html(d);
    }
  );
});
