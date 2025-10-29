$(document).ready(function () {

    // Generate 4-per-row grid with shared descriptions
    function get_vid_html(vid_id) {
        const vids = demo_videos_link[vid_id] || [];

        let html = '<div class="columns is-multiline is-centered">';
        for (let i = 0; i < vids.length; i++) {
            html += `
        <div class="column is-one-quarter">
            <div class="video-container" style="text-align:center;">
            <video controls preload="metadata" style="width:100%; border-radius:6px;">
                <source src="${vids[i]}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <p class="has-text-grey-dark" style="margin-top:0.5rem; font-size:0.9rem;">
                ${shared_task_sentences[i] || ""}
            </p>
            </div>
        </div>
        `;
        }
        html += '</div>';
        return html;
    }

    // ---- Navbar burger toggle (unchanged) ----
    $(".navbar-burger").click(function () {
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    // ---- Handle video tab clicks ----
    $('.demo-video-iframe').on('click', function () {
        $('.demo-video-iframe').removeClass('is-active');
        $(this).addClass('is-active');
        const vid_html = get_vid_html($(this).attr('id'));
        $('#demo-vid-iframe').html(vid_html);
    });

    // ---- Default: load trial-1 on page load ----
    $(document).ready(function () {
        // mark trial-1 button active
        $('#trial-1').addClass('is-active');

        // populate its videos
        const default_html = get_vid_html('trial-1');
        $('#demo-vid-iframe').html(default_html);
    });


    // Last updated
    var apiUrl = "https://api.github.com/repos/irvlutd/irvlutd.github.io/commits?sha=hrt1&per_page=1";
    $.getJSON(apiUrl, function (data) {
        var commitDate = new Date(data[0].commit.committer.date);
        var formattedDate = commitDate.toDateString();
        $('#last-updated').html(formattedDate);
    });
})