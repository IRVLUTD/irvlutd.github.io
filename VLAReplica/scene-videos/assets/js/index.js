$(document).ready(function () {
    if (window.localStorage.getItem('cat') === null ||  window.localStorage.getItem('id') === null || window.localStorage.getItem('vli') === null){
        window.localStorage.setItem('cat', 'Near-to-Far')
        window.localStorage.setItem('id', 1)
        window.localStorage.setItem('vli', 1)
    }
    query = {
        'cat': window.localStorage.getItem('cat'),
        'id': window.localStorage.getItem('id'),
        'vli': window.localStorage.getItem('vli'),
    }

    $('#page-title').html(`Order: ${query['cat']}`)

    let vid_html = ``
    let vid_in_making_html = `<div class="notification is-warning is-light center"><i class="fa fa-info-circle"></i> Video making in progress. Will be added soon. Thanks for your patience.</div>`
    
    try {
        let v_links = video_links[query['id']]
        let content = ``
        for (var i = 0; i < v_links.length; i++) {
            if (v_links[i][query['vli']] != '#'){
                content = `<div class="publication-video">
                <iframe width="560px" height="315px" src="${v_links[i][query['vli']]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>`
            }else{
                content = vid_in_making_html
            }
            vid_html += `
                <div class="columns is-centered">
                    <div class="column">
                        <div class="content has-text-centered">
                            ${content}
                            <p class="subtitle has-text-centered"><strong>Scene: ${v_links[i][0]}</strong></p>
                        </div>
                    </div>
                </div>
            `
        }
        $('#vid-items').html(vid_html)
      } catch (error) {
        $('#vid-items').html(vid_in_making_html)
      }
});