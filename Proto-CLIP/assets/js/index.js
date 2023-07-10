$(document).ready(function() {

    const demo_videos_link = {
      'scene-1': 'CisrACRE7qE',
      'scene-2': 'hRJBUbLn1Sw',
      'scene-3': 'f-rX-itnQQU',
      'scene-4': 'OlF9yAlCVwo',
    }
    
    function get_vid_html(vid_id){
      return `<div class="iframe-container"><iframe src="https://www.youtube.com/embed/${demo_videos_link[vid_id]}" encrypted-media"  frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe></div>`
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

})