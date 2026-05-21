const methodHeaders = [
    'Task #',
    'Task Type',
    'Task (5 runs each)',
    'ACT <a href="#ref-1" class="leaderboard-ref-link"><span class="leaderboard-ref-box">1</span></a>',
    'DiT-D <a href="#ref-2" class="leaderboard-ref-link"><span class="leaderboard-ref-box">2</span></a>',
    'DiT-F <a href="#ref-2" class="leaderboard-ref-link"><span class="leaderboard-ref-box">2</span></a>',
    'SmolVLA <a href="#ref-3" class="leaderboard-ref-link"><span class="leaderboard-ref-box">3</span></a>',
    'X-VLA <a href="#ref-4" class="leaderboard-ref-link"><span class="leaderboard-ref-box">4</span></a>',
    '&pi;<sub>0</sub> <a href="#ref-5" class="leaderboard-ref-link"><span class="leaderboard-ref-box">5</span></a>',
    '&pi;<sub>0.5</sub> <a href="#ref-6" class="leaderboard-ref-link"><span class="leaderboard-ref-box">6</span></a>'
];

const leaderboardMethods = [
    { label: 'ACT', ref: 1, slug: 'act' },
    { label: 'DiT-D', ref: 2, slug: 'dit-d' },
    { label: 'DiT-F', ref: 2, slug: 'dit-f' },
    { label: 'SmolVLA', ref: 3, slug: 'smolvla' },
    { label: 'X-VLA', ref: 4, slug: 'x-vla' },
    { label: '&pi;<sub>0</sub>', ref: 5, slug: 'pi-0' },
    { label: '&pi;<sub>0.5</sub>', ref: 6, slug: 'pi-0-5' }
];

const leaderboardData = {
    id: {
        average: ['0.18', '0.16', '0.12', '0.26', '0.14', '0.34', '0.54'],
        headers: methodHeaders,
        groups: [
            {
                type: 'Pick-and-Place',
                rows: [
                    { taskNumber: '1', task: 'Put bread on plate', values: ['0.4', '0.4', '0.4', '0.6', '0.4', '0.8', '0.8'] },
                    { taskNumber: '2', task: 'Put bowl on coaster', values: ['0', '0', '0', '0.2', '0.2', '0.6', '0.8'] },
                    { taskNumber: '3', task: 'Stack block on block', values: ['0', '0', '0', '0.2', '0', '0', '0.4'] },
                    { taskNumber: '4', task: 'Put all blocks into box', values: ['0', '0.2', '0', '0', '0', '0', '0.4'] }
                ]
            },
            {
                type: 'Object Interaction',
                rows: [
                    { taskNumber: '5', task: 'Fold towel', values: ['0.4', '0.2', '0.2', '0.6', '0.6', '0.8', '1.0'] },
                    { taskNumber: '6', task: 'Open oven', values: ['0.4', '0.6', '0.4', '0.4', '0', '0.2', '0.6'] },
                    { taskNumber: '7', task: 'Erase whiteboard', values: ['0.2', '0.2', '0.2', '0.2', '0', '0.4', '0.4'] }
                ]
            },
            {
                type: 'Counting / Memory',
                rows: [
                    { taskNumber: '8', task: 'Shake pepper n times', values: ['0.2', '0', '0', '0', '0.2', '0.2', '0.4'] },
                    { taskNumber: '9', task: 'Lift bowl n times', values: ['0.2', '0', '0', '0.2', '0', '0.2', '0.4'] },
                    { taskNumber: '10', task: 'Press button n times', values: ['0', '0', '0', '0.2', '0', '0.2', '0.2'] }
                ]
            }
        ]
    },
    ood: {
        average: ['0.075', '0.05', '0.025', '0.3', '0.075', '0.3', '0.35'],
        headers: methodHeaders,
        groups: [
            {
                type: 'Pick-and-Place',
                rows: [
                    { taskNumber: '1', task: 'Put bread on plate', values: ['0.4', '0', '0.2', '0.8', '0.6', '0.8', '1.0'] },
                    { taskNumber: '2', task: 'Put bowl on coaster', values: ['0.2', '0.2', '0', '0.4', '0', '0.6', '0.4'] },
                    { taskNumber: '3', task: 'Stack block on block', values: ['0', '0', '0', '0.2', '0', '0.2', '0'] },
                    { taskNumber: '4', task: 'Put all blocks into box', values: ['0', '0', '0', '0.2', '0', '0', '0.2'] }
                ]
            },
            {
                type: 'Object Interaction',
                rows: [
                    { taskNumber: '5', task: 'Fold towel', values: ['0', '0.2', '0', '0.6', '0', '0.6', '0.8'] }
                ]
            },
            {
                type: 'Counting / Memory',
                rows: [
                    { taskNumber: '6', task: 'Shake pepper n times', values: ['0', '0', '0', '0', '0', '0.2', '0.4'] },
                    { taskNumber: '7', task: 'Lift bowl n times', values: ['0', '0', '0', '0.2', '0', '0', '0'] },
                    { taskNumber: '8', task: 'Press button n times', values: ['0', '0', '0', '0', '0', '0', '0'] }
                ]
            }
        ]
    }
};

const references = {
    '1': 'Zhao, Tony Z., Vikash Kumar, Sergey Levine, and Chelsea Finn. <a target="_blank" href="https://arxiv.org/abs/2304.13705">"Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware."</a> <i>arXiv preprint arXiv:2304.13705</i>, 2023.',
    '2': 'Jones, Bryson. <a target="_blank" href="https://brysonkjones.substack.com/p/dissecting-and-open-sourcing-multitask-diffusion-transformer-policy">"Dissecting and Open-Sourcing Multitask Diffusion Transformer Policy."</a> Blog post, 2026.',
    '3': 'Shukor, Mustafa, Dana Aubakirova, Francesco Capuano, Pepijn Kooijmans, Steven Palma, Adil Zouitine, Michel Aractingi, et al. <a target="_blank" href="https://arxiv.org/abs/2506.01844">"SmolVLA: A Vision-Language-Action Model for Affordable and Efficient Robotics."</a> <i>arXiv preprint arXiv:2506.01844</i>, 2025.',
    '4': 'Zheng, Jinliang, Jianxiong Li, Zhihao Wang, Dongxiu Liu, Xirui Kang, Yuchun Feng, Yinan Zheng, et al. <a target="_blank" href="https://arxiv.org/abs/2510.10274">"X-VLA: Soft-Prompted Transformer as Scalable Cross-Embodiment Vision-Language-Action Model."</a> <i>arXiv preprint arXiv:2510.10274</i>, 2025.',
    '5': 'Black, Kevin, Noah Brown, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, et al. <a target="_blank" href="https://arxiv.org/abs/2410.24164">"&pi;<sub>0</sub>: A Vision-Language-Action Flow Model for General Robot Control."</a> <i>arXiv preprint arXiv:2410.24164</i>, 2024.',
    '6': 'Physical Intelligence, Kevin Black, Noah Brown, James Darpinian, Karan Dhabalia, Danny Driess, Adnan Esmail, et al. <a target="_blank" href="https://arxiv.org/abs/2504.16054">"&pi;<sub>0.5</sub>: A Vision-Language-Action Model with Open-World Generalization."</a> <i>arXiv preprint arXiv:2504.16054</i>, 2025.'
};

const datasetAnnotationFiles = {
    id: [
        'put_the_bread_on_the_red_plate_ep_1.mp4',
        'put_the_bread_on_the_blue_plate_ep_2.mp4',
        'put_the_bread_on_the_blue_plate_ep_3.mp4',
        'put_the_bread_on_the_red_plate_ep_4.mp4',
        'put_the_bread_on_the_red_plate_ep_5.mp4',
        'put_the_red_bowl_on_the_green_coaster_ep_1.mp4',
        'put_the_blue_bowl_on_the_orange_coaster_ep_2.mp4',
        'put_the_blue_bowl_on_the_green_coaster_ep_3.mp4',
        'put_the_red_bowl_on_the_purple_coaster_ep_4.mp4',
        'put_the_yellow_bowl_on_the_purple_coaster_ep_5.mp4',
        'stack_the_red_block_on_the_blue_block_ep_1.mp4',
        'stack_the_yellow_block_on_the_blue_block_ep_2.mp4',
        'stack_the_blue_block_on_the_yellow_block_ep_3.mp4',
        'stack_the_blue_block_on_the_red_block_ep_4.mp4',
        'stack_the_red_block_on_the_yellow_block_ep_5.mp4',
        'collect_2_blocks_into_the_blue_box_ep_1.mp4',
        'collect_2_blocks_into_the_yellow_box_ep_2.mp4',
        'collect_3_blocks_into_the_blue_box_ep_3.mp4',
        'collect_3_blocks_into_the_yellow_box_ep_4.mp4',
        'collect_4_blocks_into_the_blue_box_ep_5.mp4',
        'fold_the_pink_towel_in_half_ep_1.mp4',
        'fold_the_yellow_towel_in_half_ep_2.mp4',
        'fold_the_pink_towel_in_half_ep_3.mp4',
        'fold_the_yellow_towel_in_half_ep_4.mp4',
        'fold_the_pink_towel_in_half_ep_5.mp4',
        'open_the_oven_ep_1.mp4',
        'open_the_oven_ep_2.mp4',
        'open_the_oven_ep_3.mp4',
        'open_the_oven_ep_4.mp4',
        'open_the_oven_ep_5.mp4',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_1.mp4',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_2.mp4',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_3.mp4',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_4.mp4',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_5.mp4',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_1.mp4',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_2.mp4',
        'pour_2_shakes_of_pepper_into_the_red_plate_ep_3.mp4',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_4.mp4',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_5.mp4',
        'lift_the_green_bowl_one_time_ep_1.mp4',
        'lift_the_blue_bowl_one_time_ep_2.mp4',
        'lift_the_red_bowl_three_times_ep_3.mp4',
        'lift_the_green_bowl_three_times_ep_4.mp4',
        'lift_the_blue_bowl_three_times_ep_5.mp4',
        'press_the_button_one_time_ep_1.mp4',
        'press_the_button_three_times_ep_2.mp4',
        'press_the_button_one_time_ep_3.mp4',
        'press_the_button_three_times_ep_4.mp4',
        'press_the_button_three_times_ep_5.mp4'
    ],
    ood: [
        'put_the_bread_on_the_red_plate_ep_1.mp4',
        'put_the_bread_on_the_blue_plate_ep_2.mp4',
        'put_the_bread_on_the_yellow_plate_ep_3.mp4',
        'put_the_bread_on_the_yellow_plate_ep_4.mp4',
        'put_the_bread_on_the_yellow_plate_ep_5.mp4',
        'put_the_blue_bowl_on_the_purple_coaster_ep_1.mp4',
        'put_the_red_bowl_on_the_orange_coaster_ep_2.mp4',
        'put_the_yellow_bowl_on_the_green_coaster_ep_3.mp4',
        'put_the_yellow_bowl_on_the_orange_coaster_ep_4.mp4',
        'put_the_green_bowl_on_the_yellow_coaster_ep_5.mp4',
        'stack_the_yellow_block_on_the_red_block_ep_1.mp4',
        'stack_the_blue_block_on_the_blue_block_ep_2.mp4',
        'stack_the_red_block_on_the_green_block_ep_3.mp4',
        'stack_the_green_block_on_the_yellow_block_ep_4.mp4',
        'stack_the_green_block_on_the_green_block_ep_5.mp4',
        'collect_2_blocks_into_the_pink_box_ep_1.mp4',
        'collect_3_blocks_into_the_pink_box_ep_2.mp4',
        'collect_5_blocks_into_the_blue_box_ep_3.mp4',
        'collect_5_blocks_into_the_yellow_box_ep_4.mp4',
        'collect_5_blocks_into_the_pink_box_ep_5.mp4',
        'fold_the_blue_towel_in_half_ep_1.mp4',
        'fold_the_blue_towel_in_half_ep_2.mp4',
        'fold_the_blue_towel_in_half_ep_3.mp4',
        'fold_the_blue_towel_in_half_ep_4.mp4',
        'fold_the_blue_towel_in_half_ep_5.mp4',
        'pour_4_shakes_of_pepper_into_the_red_plate_ep_1.mp4',
        'pour_5_shakes_of_pepper_into_the_red_plate_ep_2.mp4',
        'pour_1_shake_of_pepper_into_the_blue_plate_ep_3.mp4',
        'pour_3_shakes_of_pepper_into_the_blue_plate_ep_4.mp4',
        'pour_5_shakes_of_pepper_into_the_blue_plate_ep_5.mp4',
        'lift_the_green_bowl_two_times_ep_1.mp4',
        'lift_the_blue_bowl_two_times_ep_2.mp4',
        'lift_the_red_bowl_two_times_ep_3.mp4',
        'lift_the_yellow_bowl_two_times_ep_4.mp4',
        'lift_the_yellow_bowl_four_times_ep_5.mp4',
        'press_the_button_two_times_ep_1.mp4',
        'press_the_button_four_times_ep_2.mp4',
        'press_the_button_two_times_ep_3.mp4',
        'press_the_button_four_times_ep_4.mp4',
        'press_the_button_five_times_ep_5.mp4'
    ]
};

const videoLinkOverrides = {};

const annotationColorNames = ['blue', 'red', 'yellow', 'green', 'pink', 'purple', 'orange', 'white'];
const annotationNumberWords = ['one', 'two', 'three', 'four', 'five'];

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function capitalizeFirstLetter(value) {
    return value.replace(/^[a-z]/, (letter) => letter.toUpperCase());
}

function highlightAnnotationWords(value) {
    const emphasisPattern = new RegExp(`\\b(${[...annotationColorNames, ...annotationNumberWords, '\\d+'].join('|')})\\b`, 'gi');

    return value.replace(emphasisPattern, (match) => {
        const normalized = match.toLowerCase();
        const classes = ['annotation-token'];

        if (annotationColorNames.includes(normalized)) {
            classes.push('annotation-color', `annotation-color-${normalized}`);
        }

        if (annotationNumberWords.includes(normalized) || /^\d+$/.test(normalized)) {
            classes.push('annotation-number');
        }

        return `<strong class="${classes.join(' ')}">${match}</strong>`;
    });
}

function formatVideoAnnotation(fileName) {
    const plainAnnotation = fileName
        .replace(/\.mp4$/i, '')
        .replace(/_ep_\d+$/i, '')
        .replace(/_/g, ' ');

    return highlightAnnotationWords(capitalizeFirstLetter(escapeHtml(plainAnnotation)));
}

function buildVideoEntries(datasetKey, taskRows, methodSlug) {
    const annotationFiles = datasetAnnotationFiles[datasetKey] || [];
    const methodKey = `${datasetKey}-${methodSlug}`;

    return taskRows
        .flatMap((row) => {
            return Array.from({ length: 5 }, (_, index) => ({
                row,
                runNumber: index + 1
            }));
        })
        .map(({ row, runNumber }, index) => {
            const overrideKey = `${row.taskNumber}-${runNumber}`;
            const override = videoLinkOverrides?.[methodKey]?.[overrideKey];

            return {
                annotation: annotationFiles[index] ? formatVideoAnnotation(annotationFiles[index]) : `${row.task} | Run ${runNumber}`,
                url: override ? override.url : '#'
            };
        });
}

const video_links = Object.fromEntries(
    ['id', 'ood'].flatMap((datasetKey) => {
        const datasetTitle = datasetKey === 'id' ? 'VLA-Replica-ID' : 'VLA-Replica-OOD';
        const taskRows = leaderboardData[datasetKey].groups.flatMap((group) => group.rows);

        return leaderboardMethods.map((method) => {
            const pageKey = `${datasetKey}-${method.slug}`;

            return [pageKey, {
                title: `${datasetTitle} | ${method.label.replace(/<[^>]+>/g, '')}`,
                videos: buildVideoEntries(datasetKey, taskRows, method.slug)
            }];
        });
    })
);