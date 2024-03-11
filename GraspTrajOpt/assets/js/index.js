let annotations = {
    'rgb-d': ['./assets/images/annotations/data_capture.webp', '(a) Our data capture system with a Franka Emika Panda arm with a RealSense stereo camera to collect <b class="has-text-danger">R</b><b class="has-text-success">G</b><b class="has-text-info">B</b>-<b class="has-text-primary">D</b> data.<br>(b) 9 images of a mustard bottle from different views captured in our dataset. 336 Objects undergo the same procedure.'],
    'pose-mask': ['./assets/images/annotations/camera_pose.webp', '(a) <b class="has-text-success">Object poses</b> from AR tags.<br>(b <i class="fas fa-arrow-up"></i>) Pixel correspondences using computed <b class="has-text-success">object poses</b>. <br>(b <i class="fas fa-arrow-down"></i>) <b class="has-text-success">Segmentation masks</b> of the objects.'],
    'attr': ['./assets/images/annotations/data_annotation.webp', '<b class="has-text-primary">Object attributes</b> collected using <a href="https://www.mturk.com" target="_blank" rel="noopener noreferrer">Amazon Mechanical Turk</a>.</p>'],
    'syn-data': ['./assets/images/annotations/synthetic_data.webp', '<b style="color: #b9a03e">Synthetic objects</b> (a) with clean background and (b) in cluttered scenes.<br>This synthetic data augments the real data.</p>'],
}

function _html(ann){
    return `<img src="${ann[0]}" alt=""><br><br><p class="has-text-centered is-active">${ann[1]}</p>`;
}

function process_vid_link(id, category, vli) {
    window.localStorage.setItem("cat", category);
    window.localStorage.setItem("id", id);
    window.localStorage.setItem('vli', vli);
    window.location.href = './scene-videos';
}


let ann_id = '#annotations-span';
let default_id = `rgb-d`
let init_css = {'font-weight': 'normal','border': 'none'}
let in_effect_css = {'font-weight': '900','border': 'solid'}

$(`#${default_id}`).css(in_effect_css);
$(ann_id).html(_html(annotations['rgb-d']));

let current_ann_ele = default_id

$('.annotations').click(function(){
    let timer = 1250;
    let curr_id = $(this).attr('id');
    if(curr_id != current_ann_ele){
        $('.annotations').css(init_css);
        $(`#${curr_id}`).css(in_effect_css);
        $(ann_id).fadeOut(timer, function() {
            $(this).html(_html(annotations[curr_id])).fadeIn(timer);
            current_ann_ele = curr_id;
        });
    }    
});