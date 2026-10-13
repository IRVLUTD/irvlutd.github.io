/* HRT1 — page header + title injection.
   Writes the document title and the <h1 id="project-name"> hero title.
   Hero title uses the CLAP pattern: small-caps project name + muted colon
   separator. The footer is rendered from static HTML (see index.html), so
   this script no longer appends one. */
function log(e) { console.log(e); }

const plain_title  = 'HRT1: One-Shot Human-to-Robot Trajectory Transfer for Mobile Manipulation';
const styled_title = '<span class="small-caps">HRT1</span><span class="title-sep">:</span> One-Shot Human-to-Robot Trajectory Transfer for Mobile Manipulation';

$(document).ready(function () {
  $('#meta-desc').attr('content', plain_title);
  $('#title').html(plain_title);
  $('#project-name').html(styled_title);

  // Populate last-updated from the HRT1 branch's latest commit.
  $.getJSON(
    'https://api.github.com/repos/irvlutd/irvlutd.github.io/commits?sha=hrt1&per_page=1',
    function (data) {
      if (!data || !data[0]) return;
      const d = new Date(data[0].commit.committer.date).toDateString();
      $('#last-updated').html(d);
    }
  );
});
