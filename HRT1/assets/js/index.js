$(document).ready(function () {

    // -----------------------------
    // 2) RENDERER (unchanged usage)
    // -----------------------------

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
  // Accept true/false booleans, "true"/"false" strings, 1/0, "1"/"0"
  if (typeof v === 'boolean') return v;
  if (typeof v === 'number') return v !== 0;
  if (typeof v === 'string') {
    const s = v.trim().toLowerCase();
    return s === 'true' || s === '1' || s === 'yes';
  }
  return false;
}

// 🧩 Render function (patched)
function get_vid_html(trialId) {
  const clips = TRIALS[trialId] || [];
  const columnClass = getColumnClass(VIDEOS_PER_ROW);
  const isHumanDemo = trialId === "trial-0";

  let html = '<div class="columns is-multiline is-centered">';
  for (let i = 0; i < clips.length; i++) {
    const { src, successful_trial } = clips[i] || {};
    const task = TASKS[i] || "";

<video data-src="videos/teleop/IMG_4152-4x.mp4"  src="videos/teleop/IMG_4152-4x.mp4">
          Your browser does not support the video tag.
        </video>

    if (isHumanDemo) {
      html += `
        <div class="column ${columnClass}">
          <div class="video-container wheat-theme" style="text-align:center;">
            <video controls="" autoplay="" loop="" muted="" playsinline=""
              style="width:100%; border-radius:10px; border:2px solid wheat;" data-src="${src}" src="${src}">
              Your browser does not support the video tag.
            </video>
            <p class="has-text-wheat" style="margin-top:0.5rem; font-size:0.9rem; color:wheat;">
              ${task}
            </p>
          </div>
        </div>
      `;
    } else {
      const ok = coerceBool(successful_trial);
      // Debug once to verify values reaching the renderer:
      if (i === 0) console.log(`[${trialId}] first clip success?`, successful_trial, '→', ok);

      const borderColor = ok ? "#21ba45" : "#db2828"; // green / red
      const statusText  = ok ? "Success" : "Failure";
      const statusClass = ok ? "has-text-success" : "has-text-danger";

      html += `
        <div class="column ${columnClass}">
          <div class="video-container" style="text-align:center;">
            <video autoplay loop muted controls preload="metadata"
              style="width:100%; border-radius:10px; border:3px solid ${borderColor}; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
              <source src="${src}" type="video/mp4">
            </video>
            <p class="has-text-grey-light" style="margin-top:0.5rem; font-size:0.9rem;">
              ${task}
              <span class="${statusClass}" style="font-weight:600; font-size:0.85rem;"> ( ${statusText} ) </span>
            </p>
          </div>
        </div>
      `;
    }
  }
  html += "</div>";
  return html;
}

// Default: load human demonstration first
$(document).ready(function () {
  const defaultId = "trial-0";
  $("#" + defaultId).addClass("is-active");
  $("#demo-vid-iframe").html(get_vid_html(defaultId));
});

// Handle tab click
$(".demo-video-iframe").on("click", function () {
  $(".demo-video-iframe").removeClass("is-active");
  $(this).addClass("is-active");
  $("#demo-vid-iframe").html(get_vid_html($(this).attr("id")));
});


    // Last updated
    var apiUrl = "https://api.github.com/repos/irvlutd/irvlutd.github.io/commits?sha=hrt1&per_page=1";
    $.getJSON(apiUrl, function (data) {
        var commitDate = new Date(data[0].commit.committer.date);
        var formattedDate = commitDate.toDateString();
        $('#last-updated').html(formattedDate);
    });
})