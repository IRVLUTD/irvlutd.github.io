$(document).ready(function () {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const fileName = pathParts[pathParts.length - 1] || 'index.html';
    const leaderboardPageKey = fileName !== 'index.html' ? fileName.replace(/\.html$/, '') : null;

    if (leaderboardPageKey && video_links[leaderboardPageKey]) {
        const methodVideo = video_links[leaderboardPageKey];
        const title = methodVideo.title;
        const videos = methodVideo.videos || [];

        $('#page-title').html(title);

        if (!videos.length) {
            $('#vid-items').html(`<div class="notification is-warning is-light center"><i class="fa fa-info-circle"></i> Video coming soon.</div>`);
            return;
        }

        const normalizeEmbedUrl = (url) => {
            if (!url || url === '#') {
                return null;
            }

            if (url.includes('drive.google.com')) {
                const fileMatch = url.match(/\/file\/d\/([^/]+)/);
                if (fileMatch) {
                    return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
                }

                const idMatch = url.match(/[?&]id=([^&]+)/);
                if (idMatch) {
                    return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
                }
            }

            const boxMatch = url.match(/^https:\/\/([^.]+)\.box\.com\/s\/([^/?#]+)/i);
            if (boxMatch) {
                return `https://${boxMatch[1]}.app.box.com/embed/s/${boxMatch[2]}`;
            }

            const boxEmbedMatch = url.match(/^https:\/\/([^.]+\.)?app\.box\.com\/embed\/s\/([^/?#]+)/i);
            if (boxEmbedMatch) {
                return url;
            }

            return url;
        };

        const renderVideoCard = (video) => {
            const embedUrl = normalizeEmbedUrl(video.url);

            return `
                <div class="video-grid-card">
                    <div class="video-grid-frame">
                        ${embedUrl ? `<iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` : `<div class="video-grid-placeholder"><span>Google Drive video link coming soon.</span></div>`}
                    </div>
                    <p class="video-grid-caption">${video.annotation}</p>
                </div>
            `;
        };

        const rowHtml = [];
        for (let index = 0; index < videos.length; index += 5) {
            rowHtml.push(`
                <div class="video-grid-row">
                    ${videos.slice(index, index + 5).map(renderVideoCard).join('')}
                </div>
            `);
        }

        $('#vid-items').html(`<div class="video-grid-wrapper">${rowHtml.join('')}</div>`);
        return;
    }

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