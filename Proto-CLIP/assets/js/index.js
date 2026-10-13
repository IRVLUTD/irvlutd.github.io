$(document).ready(function() {

    const demo_videos_link = {
      'scene-1': 'CisrACRE7qE',
      'scene-2': 'hRJBUbLn1Sw',
      'scene-3': 'f-rX-itnQQU',
      'scene-4': 'OlF9yAlCVwo',
    }

    // Build an iframe immediately (scene-tab click is a user gesture → autoplay OK).
    // Using autoplay=1 avoids YouTube's persistent play-button overlay on the thumb.
    function get_vid_html(vid_id){
      const yt = demo_videos_link[vid_id];
      return `<div class="yt-facade is-playing" aria-label="Proto-CLIP ${vid_id} demo">
        <iframe src="https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                title="Proto-CLIP ${vid_id} demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin"
                style="position:absolute;inset:0;width:100%;height:100%;border:0;"></iframe>
      </div>`;
    }

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    $('.demo-video-iframe').on('click', function(){
      $('.demo-video-iframe').removeClass('is-active');
      $(this).toggleClass('is-active');
      let vid_html = get_vid_html($(this).attr('id'));
      $('#demo-vid-iframe').html(vid_html);
    });

    // Last updated
    var apiUrl = "https://api.github.com/repos/irvlutd/irvlutd.github.io/commits?sha=fewsol&per_page=1";
    $.getJSON(apiUrl, function(data) {
    var commitDate = new Date(data[0].commit.committer.date);
    var formattedDate = commitDate.toDateString();
    $('#last-updated').html(formattedDate);
    });
})