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

const pageDriveIds = {
    'id-act': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '1oZLcMbJk8Fih5eICC_96HxnuReOAWQpa',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '1Z9z7VEFvLJP4BXeyrlZVUUtfgtW8o3mW',
        'put_the_bread_on_the_blue_plate_ep_3.mp4': '1kWsTbKfJZ9zy4qR7wyATBMG9N_RzHv4j',
        'put_the_bread_on_the_red_plate_ep_4.mp4': '1hvaQXiK5nxmqMHfRoPa8qciNHIKl8G19',
        'put_the_bread_on_the_red_plate_ep_5.mp4': '1DlU30z1WUIXXJAky7Mvkf3rqAPt1Zd0u',
        'put_the_red_bowl_on_the_green_coaster_ep_1.mp4': '1HavQj_CPRj1bZnM8D0v8sBtzxlqo2Npz',
        'put_the_blue_bowl_on_the_orange_coaster_ep_2.mp4': '1ty86B7_rJfzwfFhdkoVP32katA_24cvm',
        'put_the_blue_bowl_on_the_green_coaster_ep_3.mp4': '1dPJq7de_Sg1XdcZOlYPhxWE55AH18vqN',
        'put_the_red_bowl_on_the_purple_coaster_ep_4.mp4': '1zMoib0Jjazv0ly10-9dH_24M-D2MMEiV',
        'put_the_yellow_bowl_on_the_purple_coaster_ep_5.mp4': '1FdX73HAAWKNr1Ljdm0Sc4gwJSzrxCUA9',
        'stack_the_red_block_on_the_blue_block_ep_1.mp4': '19NXzcR_vwenLvvN9ZGqUm8yPB8YLqoCP',
        'stack_the_yellow_block_on_the_blue_block_ep_2.mp4': '1b66NGQWuMTNJDAPYOAKRUeFBB3QFnckb',
        'stack_the_blue_block_on_the_yellow_block_ep_3.mp4': '1l4P2ffEJ1pbyudlh01zqYPD467LyAD3_',
        'stack_the_blue_block_on_the_red_block_ep_4.mp4': '1YnFCj6H3LTPwMIGajUFsyH7mazND3wSC',
        'stack_the_red_block_on_the_yellow_block_ep_5.mp4': '1EacUCJBuUeevm2xIqbouN1yR2L01L1-z',
        'collect_2_blocks_into_the_blue_box_ep_1.mp4': '1Xr0j9phZ7rdQ_DnOxD9O_KO8nobZQhT6',
        'collect_2_blocks_into_the_yellow_box_ep_2.mp4': '1zaq-2twT0tQzBOf6qVI20i29Uy6A2D2r',
        'collect_3_blocks_into_the_blue_box_ep_3.mp4': '1V973oRc2gMYbvf0__OQlpF5_iOgszqWK',
        'collect_3_blocks_into_the_yellow_box_ep_4.mp4': '1_mjMwCiougrbMOsldE0khA6mqIuCWSFu',
        'collect_4_blocks_into_the_blue_box_ep_5.mp4': '15Lk_0cnbDyLC8Kkoy8rtGygnfz6VjV6C',
        'fold_the_pink_towel_in_half_ep_1.mp4': '14H8aML-LAMH3Udv96GthIUCQ11GVQhbT',
        'fold_the_yellow_towel_in_half_ep_2.mp4': '1DIF2SUdkFMUEueHDfsLuN01Q8xvHpRMl',
        'fold_the_pink_towel_in_half_ep_3.mp4': '1p4hZs0aIu9Sa2L1mXGutjM6H17u_nqqb',
        'fold_the_yellow_towel_in_half_ep_4.mp4': '1Jgmh0HOoR0RCry-54tT7sbeah5ewfxLP',
        'fold_the_pink_towel_in_half_ep_5.mp4': '1aXDiFvyG_0gChPtSqpH_bTUU9Qp19tXe',
        'open_the_oven_ep_1.mp4': '10YKyrsUaUiRUZjZrHcGcqQOjxr5Jvrqu',
        'open_the_oven_ep_2.mp4': '1nbw3WZI7sn9eqvHWkrK9WDqWPb6hChsu',
        'open_the_oven_ep_3.mp4': '1OD3S3XWUw78yM0ec6f8OLnGQTze5Hyc_',
        'open_the_oven_ep_4.mp4': '1H7S9KKQuPZtrXPDJBWBUjBOA69W42ihA',
        'open_the_oven_ep_5.mp4': '1fCsWSp1ZKly_pSnl8vouTQhmJXlUp0IG',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_1.mp4': '1xkzoES3NKg0O8OUGl00nEsSHw2AWUZO4',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_2.mp4': '126O_KqRhhNSM6M1srj5UyrM18FtMrBq_',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_3.mp4': '1AindBCCH8LtXvx1aKeVuxIORhcqhQXOG',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_4.mp4': '1GwCLTiArRS31TbjfcrQByUj95L-RqUjW',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_5.mp4': '1EnSLFm5H3c-fFsGJ7LdLqVaPSi-L_YN1',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_1.mp4': '1zc-tdoW0wNo0IlvY2JJ8TOHz-H-CWD7H',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '16yTvR7eTF63CLItDafI3r9qRB_OB_jaL',
        'pour_2_shakes_of_pepper_into_the_red_plate_ep_3.mp4': '1ve8RD-mY3AR2iwBG2MN5VTIVejYtGiIu',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_4.mp4': '1oLyoK_9afgg81zeT769Vg37hatth1HTA',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_5.mp4': '1CWh7IJiJWCzj-2DUANIB-wBSgRgnb9aE',
        'lift_the_green_bowl_one_time_ep_1.mp4': '1ydtiIXMeMr4IHeGg26Vm8yHiKQF6k7Td',
        'lift_the_blue_bowl_one_time_ep_2.mp4': '19XtxAXGj6pyV3sQra92Yi21utIT9vtRc',
        'lift_the_red_bowl_three_times_ep_3.mp4': '1sn1AwHxEQtLiw7a_L3vChpMGVjex_SBc',
        'lift_the_green_bowl_three_times_ep_4.mp4': '1TdaglsRy-uVQh60RL6zrKzjwbWZFb788',
        'lift_the_blue_bowl_three_times_ep_5.mp4': '1sO1Bre7INNR3CT65U87CKZ5ot6qMFpOX',
        'press_the_button_one_time_ep_1.mp4': '1ikhwbphmdk4gCu6FnJG78mnriZh4JpXl',
        'press_the_button_three_times_ep_2.mp4': '1xgHuj0iaUJZAx3akdhJFISS3CaC84XA3',
        'press_the_button_one_time_ep_3.mp4': '17FtbAKrQ2k-2V3TrHy6hyu5II0t5Qg-x',
        'press_the_button_three_times_ep_4.mp4': '1HXDp0seFrtI55Tp_pk-zdsVCZTG6r_1I',
        'press_the_button_three_times_ep_5.mp4': '11RxyUm6rMF-GJdlLwND4TmsUaDy1uyGU'
    },
    'ood-act': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '1Y8dSVEuW0ybpTcBtFTTE5VQDwpkGHOTN',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '1IuelAcukmxsxMbVRfhRCbSE2fZMbTKFr',
        'put_the_bread_on_the_yellow_plate_ep_3.mp4': '1Mt_icXh2eoQdZ3m8WOXyuAY7iX78qQCs',
        'put_the_bread_on_the_yellow_plate_ep_4.mp4': '144EZdGLusVm1G6wkS1YpJr4PnaeqDKAI',
        'put_the_bread_on_the_yellow_plate_ep_5.mp4': '1sVPOyQvGgyGtN70k3u0iVoxfwaNOfI1W',
        'put_the_blue_bowl_on_the_purple_coaster_ep_1.mp4': '1sXoIySkhoq0LThnJNhmfJiZxIskMUAuE',
        'put_the_red_bowl_on_the_orange_coaster_ep_2.mp4': '1gdT5TyfOELKO3fHpeG-u69t_2XGfnZAW',
        'put_the_yellow_bowl_on_the_green_coaster_ep_3.mp4': '1shXgp4KmeewJCBAO5orkZoGLtzBcijA5',
        'put_the_yellow_bowl_on_the_orange_coaster_ep_4.mp4': '1F-Yaf1b_J2zbhHpx6ZOCEB_SPyLYftFb',
        'put_the_green_bowl_on_the_yellow_coaster_ep_5.mp4': '1-s2XfgyC7lZ0oiLdebLN5XR6BQkvpPSj',
        'stack_the_yellow_block_on_the_red_block_ep_1.mp4': '1zrexuEkesJlZi4f-u-5RzmBh9MzGJGDD',
        'stack_the_blue_block_on_the_blue_block_ep_2.mp4': '1nNUjUwplQmQTo8WFwNzilcBtDE2XlLYQ',
        'stack_the_red_block_on_the_green_block_ep_3.mp4': '1NzRgmIfRRMN0LkUU-lO0flZciSxeYUZQ',
        'stack_the_green_block_on_the_yellow_block_ep_4.mp4': '1osA2l6QJNcygcbw-RndnBpeblLCuqTmL',
        'stack_the_green_block_on_the_green_block_ep_5.mp4': '1SFcqHumWkI6TD0y4Ow29uXXkYXkgTSTj',
        'collect_2_blocks_into_the_pink_box_ep_1.mp4': '1xsciIxTsm83B9S-jsRUGdrp76bPZjy7b',
        'collect_3_blocks_into_the_pink_box_ep_2.mp4': '1aSzSOrRyQs1d-HKIGRJGY6uJ4ztkoSGe',
        'collect_5_blocks_into_the_blue_box_ep_3.mp4': '1-I7XxNrLcPuyrYoeViZK1n7QwjmLr4b_',
        'collect_5_blocks_into_the_yellow_box_ep_4.mp4': '1M6dOBL3St35n3bqy8bPdUdROM6QXY4xr',
        'collect_5_blocks_into_the_pink_box_ep_5.mp4': '1gUqBfC34vPFUY0xqOFtnRZMO5TSefOuF',
        'fold_the_blue_towel_in_half_ep_1.mp4': '1LMca5GWhSPrD9HvbKi67Tgh9KZ2XLG_9',
        'fold_the_blue_towel_in_half_ep_2.mp4': '1ky895JeVyQrCThGPWwBDr58eZqbkdR6O',
        'fold_the_blue_towel_in_half_ep_3.mp4': '1BSyKAE7ATBOGn-ouxfyie7FGT61MrauG',
        'fold_the_blue_towel_in_half_ep_4.mp4': '1IVHFSnzwYs72ZL96NWyFhnNU510yKjwn',
        'fold_the_blue_towel_in_half_ep_5.mp4': '1viSjVJ7pStxz9qr-yEOAUAteNC1-m_WG',
        'pour_4_shakes_of_pepper_into_the_red_plate_ep_1.mp4': '19108mw4HzZowVcpLB_66CoVYoDemlm0V',
        'pour_5_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '1ttofS-nOk19lj2QJMAEEnhjceWEfgQFl',
        'pour_1_shake_of_pepper_into_the_blue_plate_ep_3.mp4': '1eiHrNvpjT03er8uAVXyPgVigWTMNrtZx',
        'pour_3_shakes_of_pepper_into_the_blue_plate_ep_4.mp4': '13YRSbVDngNyotIs_CXIVIoxrYHSPivAm',
        'pour_5_shakes_of_pepper_into_the_blue_plate_ep_5.mp4': '1qx5oyfxlzdz9vSzvuXKLCTebXN3GCJvO',
        'lift_the_green_bowl_two_times_ep_1.mp4': '1gdE_JccWkmuEumdvQ-uUKvyb_OPArQQG',
        'lift_the_blue_bowl_two_times_ep_2.mp4': '1QFXbDksKgLwVOhngiENd-37ERIUjcsp8',
        'lift_the_red_bowl_two_times_ep_3.mp4': '1abqrixUXDGXrXoLe4YosV8sfzoyTCbym',
        'lift_the_yellow_bowl_two_times_ep_4.mp4': '1avjHBSYw_0oJ9R8oL17F1wg5jLKRwb-C',
        'lift_the_yellow_bowl_four_times_ep_5.mp4': '1aMzxPQpcnWGnK-jmy79Js8BnFPOjrp1Y',
        'press_the_button_two_times_ep_1.mp4': '1Xl9uazBwUeocZEikBnGZKxRGKJyEBNwh',
        'press_the_button_four_times_ep_2.mp4': '15tUsxzXVfFLSuYEUxNmlmCY11uUmWVt7',
        'press_the_button_two_times_ep_3.mp4': '1eg8leKdjcBkeHUZqaBVBQkLi3PNXuJyQ',
        'press_the_button_four_times_ep_4.mp4': '1YIe2fEjaqB8zWO13AEeU1V4UNyZZckUa',
        'press_the_button_five_times_ep_5.mp4': '16CHV_Kyywa1_WDFrR8hf_aq6RGMrCxeY'
    },
    'id-dit-f': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '11OdWQvwnscaLCJkiYRCVk654cRxAKt5_',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '186gcfq65YRP5Hs1lCy_g0-eT2PjBH_zL',
        'put_the_bread_on_the_blue_plate_ep_3.mp4': '1xV_Hp6v9Ldjg_PyngE7VKovQbc9jqDkI',
        'put_the_bread_on_the_red_plate_ep_4.mp4': '1z3I0BY06jNxmoYlAa-SHoCjl5iDQJT6o',
        'put_the_bread_on_the_red_plate_ep_5.mp4': '1KwkdGmWzz4KHbs4xvDYetm9psLgdP3X2',
        'put_the_red_bowl_on_the_green_coaster_ep_1.mp4': '1d-itswOTmFUwpBnzOwwO__t8dlSxYWon',
        'put_the_blue_bowl_on_the_orange_coaster_ep_2.mp4': '1VAcZaTvrJFb8yJXgclnatWb0P16flPVJ',
        'put_the_blue_bowl_on_the_green_coaster_ep_3.mp4': '1DA1uFSihbWPoqC7F3073hVnkIxXKiyzo',
        'put_the_red_bowl_on_the_purple_coaster_ep_4.mp4': '1ZVvdtm67-hbxuZ8yB_PfC9mIpKag_bqk',
        'put_the_yellow_bowl_on_the_purple_coaster_ep_5.mp4': '1ub3EFtsaGY4WlwNJ_h0ifu-E2nXTlE48',
        'stack_the_red_block_on_the_blue_block_ep_1.mp4': '1TuYw4ZPYlqUhylajTC7ijLAXw_BoHYGb',
        'stack_the_yellow_block_on_the_blue_block_ep_2.mp4': '1py9GOlJ0O2yGyW11eAD4xcf7btaTtwyi',
        'stack_the_blue_block_on_the_yellow_block_ep_3.mp4': '1kkWtNgB9K_7P-tv9zt38hWnO4u2I1hzk',
        'stack_the_blue_block_on_the_red_block_ep_4.mp4': '1Rfizf2HPALQ0NSfjE2rzNClLAr-_I1o8',
        'stack_the_red_block_on_the_yellow_block_ep_5.mp4': '1BOIRPvA4EvMXXq-xl0VCxzpDHE_S2MRv',
        'collect_2_blocks_into_the_blue_box_ep_1.mp4': '1pDhRUZHm-rIcgYw99CszRhooFxwBfN5o',
        'collect_2_blocks_into_the_yellow_box_ep_2.mp4': '1hP_njdGGRkWA5d2T4m8hf8WLdKhpuXkF',
        'collect_3_blocks_into_the_blue_box_ep_3.mp4': '1wncgdOyWhgc259JpaPliNAPlRAQJz2HU',
        'collect_3_blocks_into_the_yellow_box_ep_4.mp4': '1ONEKNMN2pcqzItA-dGr2R74n1rN-gwLS',
        'collect_4_blocks_into_the_blue_box_ep_5.mp4': '1rzfOWdqPnAjbLksyYeEaZDURW0w-wqFl',
        'fold_the_pink_towel_in_half_ep_1.mp4': '1M_NueJKEttHG63MWUC_cp-ssKI746ub6',
        'fold_the_yellow_towel_in_half_ep_2.mp4': '1xVg6HV6VC91ZCQimx9G560a0Dy3z4uHM',
        'fold_the_pink_towel_in_half_ep_3.mp4': '1lhrwBgfyTYLAdV2Vqoc4fg4McBn8FTQU',
        'fold_the_yellow_towel_in_half_ep_4.mp4': '1TF-u1ephbZ-AQMjQ-ZNhBxFHTEMxCaAV',
        'fold_the_pink_towel_in_half_ep_5.mp4': '13Esw422JrGDML00dCMqMPPDFS7Kz39dR',
        'open_the_oven_ep_1.mp4': '1DJkKwtSIUhZ2PvbOH8HTjKwSxQygi9Ll',
        'open_the_oven_ep_2.mp4': '1FAcjM75i56ProNpMiCLR07hd0LBEUEY9',
        'open_the_oven_ep_3.mp4': '1rzSsfkNsnU3-nAkYM0Jy1F3LCgqW3irW',
        'open_the_oven_ep_4.mp4': '1q8kL8KGs_J6ikyP4gCyXrOEWOgFzSPl_',
        'open_the_oven_ep_5.mp4': '1KqpDq2dqhF6YSM-nOh-7nyOBDn8X6u7d',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_1.mp4': '1B-ZToG3FW3M2rJIYAAj66J1tFZfD5CLT',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_2.mp4': '1OVs5_-lkwmCNf0XtsS8uj9SmP80S7C1o',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_3.mp4': '1zr_Zf6UqfNXLD9P1b6GwEpVQ9buS-Xu5',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_4.mp4': '1kznyms3QI-bBye3vmVo-qINaLZkC-qmg',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_5.mp4': '1EaC2PgUaa7FAPM9PEUFzZqR9W5_u9lTr',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_1.mp4': '1akoJ9f4XaJT9QT2rjr3KZ9MEaZ-Ok6yF',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '1Jv-yRJYeIfVwuk3N8kdMNMH8ump1QcYQ',
        'pour_2_shakes_of_pepper_into_the_red_plate_ep_3.mp4': '1i-fI5MMWX81wn1VorXLA8ua-tKX4Iqxl',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_4.mp4': '1vxq_ES4wpTBc5m1S-XwmELUeXKV9AIp7',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_5.mp4': '1ywfM6sLBWZqerwDd9m_sRx49_FxIbK3Q',
        'lift_the_green_bowl_one_time_ep_1.mp4': '1BNdcLWxacadghiL6D0640dXWC6QH6TFx',
        'lift_the_blue_bowl_one_time_ep_2.mp4': '1Vws7cQFEl9V_2WQf9UXpkNMVvedQomtV',
        'lift_the_red_bowl_three_times_ep_3.mp4': '1BshdMKuu28VzFejZ7e1pGnukIoEAyQo4',
        'lift_the_green_bowl_three_times_ep_4.mp4': '1Tv0pg3WirhyXcZUgW7HdloFBqq3PBxmk',
        'lift_the_blue_bowl_three_times_ep_5.mp4': '1qwMRznMNQEtcrKEgX7yWQx9lKGexpp2H',
        'press_the_button_one_time_ep_1.mp4': '1zAvQg7guVvSPDyGvPamvNybkOntPfmW5',
        'press_the_button_three_times_ep_2.mp4': '1zYnhNk_cqAc3dUG3eNRHjF_vQ9FI7zoP',
        'press_the_button_one_time_ep_3.mp4': '1QdihUZSO33b3iuTpUBK03YapaDSGn54-',
        'press_the_button_three_times_ep_4.mp4': '1_ie4FSV2bHPH_sC-oENZRUnXHoYpFuPm',
        'press_the_button_three_times_ep_5.mp4': '1275g59ha98wYBI4L_vqyESZ51zcMZBB9'
    },
    'ood-dit-f': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '1fostNMMzOixLjUjJfuN-HCjo_DBOOnT2',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '1jnyFG0EmDli2hV4QOlkFV4XEij-GfowH',
        'put_the_bread_on_the_yellow_plate_ep_3.mp4': '19Zcm9eGm4HDkDHZIrQkZAThZvGIK_jHH',
        'put_the_bread_on_the_yellow_plate_ep_4.mp4': '1KkVsFT_AtWsEhag_xWA8X3L3q1oFzL8F',
        'put_the_bread_on_the_yellow_plate_ep_5.mp4': '1eLD0_djc4MoG9XaRhsJdkfJPQlHaIVtW',
        'put_the_blue_bowl_on_the_purple_coaster_ep_1.mp4': '11tck-SxORj6MLCd7HMELjS9sAh1ImdwX',
        'put_the_red_bowl_on_the_orange_coaster_ep_2.mp4': '1jxwgRQf6XtIXbxndxUgE3HlCngggNbLG',
        'put_the_yellow_bowl_on_the_green_coaster_ep_3.mp4': '1SbZN6vr0pEzQL02-dyRfbfZyUuZa33Wi',
        'put_the_yellow_bowl_on_the_orange_coaster_ep_4.mp4': '1T_ebyORtxRdsIlqqpInzsxPag1T8bIx2',
        'put_the_green_bowl_on_the_yellow_coaster_ep_5.mp4': '15AIrmkE93lAEz9iPGFy7zrJ83qbBXg3E',
        'stack_the_yellow_block_on_the_red_block_ep_1.mp4': '1CvRvyvDUltqjuVITfpmqSNxXhr8Mybaj',
        'stack_the_blue_block_on_the_blue_block_ep_2.mp4': '1izVtAN730LfMKKm7p8HTRf0ajNZ_C3xk',
        'stack_the_red_block_on_the_green_block_ep_3.mp4': '13QS8HUGp6VKPYyh4RJLEI1Xu6GzBlpnX',
        'stack_the_green_block_on_the_yellow_block_ep_4.mp4': '1cWe0usz_NtYkhWsduG-rcj68A_mTGOwF',
        'stack_the_green_block_on_the_green_block_ep_5.mp4': '1we8CKAcTJRfoJ38du6xxP1JMQWKENRdP',
        'collect_2_blocks_into_the_pink_box_ep_1.mp4': '1Fp8gNTHUKEr-n9U4tcvUbyLJldy10ogD',
        'collect_3_blocks_into_the_pink_box_ep_2.mp4': '1J4Og6PZkJN8WnJltnfQyLsVzU5-_SJ66',
        'collect_5_blocks_into_the_blue_box_ep_3.mp4': '1DGBpfDcWfrXrnm82Hbx5Ao3nPDq27vIf',
        'collect_5_blocks_into_the_yellow_box_ep_4.mp4': '1M7FNGZaSINRdb18m2Ezg5DGzbp_Y23wL',
        'collect_5_blocks_into_the_pink_box_ep_5.mp4': '1p2EjVWwri9ZnB_yoB7M0mDi-CoeHIbXE',
        'fold_the_blue_towel_in_half_ep_1.mp4': '1CUO8x4gxKmVXw0kRiDh2IDAuL_kKib0x',
        'fold_the_blue_towel_in_half_ep_2.mp4': '1CnGxjDXvMkowikbhxUdMiqh1_dKjCf72',
        'fold_the_blue_towel_in_half_ep_3.mp4': '18OfaC1OP_vc8v4V6LXWP2rgcEdfO6idd',
        'fold_the_blue_towel_in_half_ep_4.mp4': '1Matu7Q7cNKum3eEwuOOyRUtdItuEWkFY',
        'fold_the_blue_towel_in_half_ep_5.mp4': '1kA1iwDPFCFguNrjNn1tIqJfhtFrESx9S',
        'pour_4_shakes_of_pepper_into_the_red_plate_ep_1.mp4': '1FKk6dChCDnW8wA7szPmEe3dALwiipmX_',
        'pour_5_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '1JVg-ESKOXj5wx_CpS-8HSE0NQEUDq4Fe',
        'pour_1_shake_of_pepper_into_the_blue_plate_ep_3.mp4': '1gvf7mtKGHdDQn_22YqSMArg70LIf4-GA',
        'pour_3_shakes_of_pepper_into_the_blue_plate_ep_4.mp4': '18przs7mmd5yY42wwYV2_xg1qFfH_WCS7',
        'pour_5_shakes_of_pepper_into_the_blue_plate_ep_5.mp4': '1VJlMdIliy0LDoPwNpogoEQJIE_LkRlfC',
        'lift_the_green_bowl_two_times_ep_1.mp4': '1gzEQQrwfZQLiLsnSDnVYqHIc6G27TFSt',
        'lift_the_blue_bowl_two_times_ep_2.mp4': '1gqAcJVLlsonFoW8MxNRSS3MRRvT9z2UY',
        'lift_the_red_bowl_two_times_ep_3.mp4': '129JZCeSWhVeQEWbbt5hVTGg0EpZLvwAq',
        'lift_the_yellow_bowl_two_times_ep_4.mp4': '1JCX5AuF5ubkW0f9sSOwrifNsFG7f4-6U',
        'lift_the_yellow_bowl_four_times_ep_5.mp4': '1QA-etKb6I80-wgd4UFsODFcyKENtTxUw',
        'press_the_button_two_times_ep_1.mp4': '1tObo5pore-3MhpapoVRfP3MelE4fW-OZ',
        'press_the_button_four_times_ep_2.mp4': '1GCUnZNgkYsjSScOgSAxRKOtmhRN3U8pZ',
        'press_the_button_two_times_ep_3.mp4': '1JxF8QZYZirBKoozG_xzwflb8V8nW3WWw',
        'press_the_button_four_times_ep_4.mp4': '17K24IJ2r5vFSI0IXwyD8h5bvlMUngG2X',
        'press_the_button_five_times_ep_5.mp4': '1r7wDzMkEMDx9J39CagvNi_DB7DaBYgRx'
    },
    'id-dit-d': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '1ilYKW55nogkw4EL4xLv3Hj4G7hY-A5ND',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '174sjUCJauDHDzz_h8lkIFOkiv_r69wLv',
        'put_the_bread_on_the_blue_plate_ep_3.mp4': '16aF0MmvHWUUx9fp5FVD0uPnUr60-hN1U',
        'put_the_bread_on_the_red_plate_ep_4.mp4': '1KbE1BeDpBs85KvoCOtgouwKXFhUnMt2W',
        'put_the_bread_on_the_red_plate_ep_5.mp4': '1MdD-8kSkFwP37SGsnAZWCl4LtF1BLAiv',
        'put_the_red_bowl_on_the_green_coaster_ep_1.mp4': '1Zosnk0ebatY-QLp4iGRy7IY5lnVSl4C7',
        'put_the_blue_bowl_on_the_orange_coaster_ep_2.mp4': '1_4FR1t6S0bQ5PRRWjZ_fRxd2L93YvCvo',
        'put_the_blue_bowl_on_the_green_coaster_ep_3.mp4': '1VQk3RvFkDWaxBzkjMMQ2fjU6Qs85A4Nj',
        'put_the_red_bowl_on_the_purple_coaster_ep_4.mp4': '1I20hwrD392u4J9gUSdJce1zmvDRdSX5_',
        'put_the_yellow_bowl_on_the_purple_coaster_ep_5.mp4': '1jZO-sCX-RdJTSsYT-cnG_rDxA_9AmvXT',
        'stack_the_red_block_on_the_blue_block_ep_1.mp4': '1hoeSFsfrz1aCWJ9O1UUKi5Nm7vibC7qW',
        'stack_the_yellow_block_on_the_blue_block_ep_2.mp4': '1OicdW-ejXBSesfE2zUlyidUnALc2e6Cl',
        'stack_the_blue_block_on_the_yellow_block_ep_3.mp4': '1C8XOwqY3YVZcosKq0g8uFYOvYzHXIsyV',
        'stack_the_blue_block_on_the_red_block_ep_4.mp4': '1EfOYgPHS9L5j0SsARTYyk3FC1ZT-fQQ1',
        'stack_the_red_block_on_the_yellow_block_ep_5.mp4': '14tQrBm2xqsC0WvexTdyJ9ApGLNoaNej-',
        'collect_2_blocks_into_the_blue_box_ep_1.mp4': '19M4M8Pfp-varCRgQqnk2389NkWpe0zbe',
        'collect_2_blocks_into_the_yellow_box_ep_2.mp4': '1M1llAp-rDczzThFAjWABAR-Y1kvQDLfQ',
        'collect_3_blocks_into_the_blue_box_ep_3.mp4': '1NjHRudt7P9MszyYtJoQFEzHLl0qZzhFp',
        'collect_3_blocks_into_the_yellow_box_ep_4.mp4': '1ItFWeeFy0s6h2vHhupwBulxPCm_ylZEV',
        'collect_4_blocks_into_the_blue_box_ep_5.mp4': '16OdXHKiz0Et_NoNWRKFArZcZcP422_36',
        'fold_the_pink_towel_in_half_ep_1.mp4': '1mq5HsLVYQxPKS13mYWxAW1xcBrP-buWD',
        'fold_the_yellow_towel_in_half_ep_2.mp4': '1knhr2uBs1d5vofmCmuN7NdrfViZ9qD1M',
        'fold_the_pink_towel_in_half_ep_3.mp4': '1MeEr0fqrEO5_pjFGYwRjKcZxNkU973Uy',
        'fold_the_yellow_towel_in_half_ep_4.mp4': '1Fb-Yez4MlwLuRSkqMlcMvt-g0HUlflD1',
        'fold_the_pink_towel_in_half_ep_5.mp4': '1hqLSKQRrXmtAxG0Iw0BsYwww2lQlwniy',
        'open_the_oven_ep_1.mp4': '17CDPYkweBixf5HtYybBjkC-BTBhx7qJg',
        'open_the_oven_ep_2.mp4': '1uKVCqAZcUFfW_cVqoNB43jREFO4gVjxr',
        'open_the_oven_ep_3.mp4': '12ABCXkqPc28ockM_6lrNthS5bkIXFdlQ',
        'open_the_oven_ep_4.mp4': '1leKow8D6uUGVwSnRMP7KA2dvCRAJlcLQ',
        'open_the_oven_ep_5.mp4': '1vEexG2oUt82j_9xxE3l8yWd8G0H6GAdb',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_1.mp4': '1jkpfLun2QPE86NMadsR_zXrubETEar9U',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_2.mp4': '11stCoqwaLlZhiER3Sp52EQRXPRUbkGEs',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_3.mp4': '1t7YrF9e-TPgv3fgMdfEejwCQAnoLozjg',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_4.mp4': '1m01_zqmehYGTj_0h7_KbDxBeRbrWY10a',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_5.mp4': '1Lx3TNeqxYTGP1JlQWDNIskbEf_GlYVY_',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_1.mp4': '1suN-HcOtA_4csB-pOxIMPM_2ucGkdUXK',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '19LEs-xelp_0o55HfUe1LXG4V6UcbJ6N_',
        'pour_2_shakes_of_pepper_into_the_red_plate_ep_3.mp4': '1EJKsxPGVznP3dXPONkzYkttXQymfYpia',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_4.mp4': '11Yq61___SWW2vHLxOxTJvScA3SLWuyfR',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_5.mp4': '19A3F5mvnJ4nRC98dsAPgYpK7Rkexrtmd',
        'lift_the_green_bowl_one_time_ep_1.mp4': '1cLak0OpvL-umzjjdOYuuUVkNfOFaifwv',
        'lift_the_blue_bowl_one_time_ep_2.mp4': '1nn8zzhHJbtxTDeYeor5onXwm8TTrm3Jn',
        'lift_the_red_bowl_three_times_ep_3.mp4': '1f3mqnO3PYS8BDClrpNhbF9orgkv5gA4f',
        'lift_the_green_bowl_three_times_ep_4.mp4': '1-xUl4mdSlVqVY9zg8sm9yd19ln0svHrX',
        'lift_the_blue_bowl_three_times_ep_5.mp4': '1rnaOM6wGfoB0Xl6MnJ7WQjgiBOxfq1Vn',
        'press_the_button_one_time_ep_1.mp4': '169rrdhHOM8uDf6pPoe2YRAjVe7Fw-x31',
        'press_the_button_three_times_ep_2.mp4': '1QH3TWHlLkfKeNtx2-ftcSx9ofXNt0GHH',
        'press_the_button_one_time_ep_3.mp4': '1iW4BCoZJZRLPZyrsG1pELzmc7KJBOiMC',
        'press_the_button_three_times_ep_4.mp4': '1kVfJIO0239pIh97CEKV9MESU07lFnJmm',
        'press_the_button_three_times_ep_5.mp4': '1Ynw1J732_tPWJTQ992n3R3bS7f7vtMKl'
    },
    'ood-dit-d': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '1_VSCON6n3IlALhPdYx-8zsyfeSw6xqU2',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '1AokkAo3cW9rMCPOAb2o5oEOzV4oY4Rv7',
        'put_the_bread_on_the_yellow_plate_ep_3.mp4': '1W6xdt5eD6cce2vTXwut22XHvp4vHocR1',
        'put_the_bread_on_the_yellow_plate_ep_4.mp4': '1H8MA8JOX7z-mGcYCJJwD_H08a8TrOhfi',
        'put_the_bread_on_the_yellow_plate_ep_5.mp4': '1XB5zu8bd6USBiYtO0gGhyQt-0vXT8XzJ',
        'put_the_blue_bowl_on_the_purple_coaster_ep_1.mp4': '1S4u7OelOdbpbmbziP-1u_XRSaNlBu0Nq',
        'put_the_red_bowl_on_the_orange_coaster_ep_2.mp4': '1NYVAvyBewk9VsE0ZwPk8LEMhlTQsvKxk',
        'put_the_yellow_bowl_on_the_green_coaster_ep_3.mp4': '1_M26Qt5bFENNPcnkraRRX7xKEXNUPAey',
        'put_the_yellow_bowl_on_the_orange_coaster_ep_4.mp4': '1o-j8IS8UweuJfvK5g_scsqRklpZEA4EE',
        'put_the_green_bowl_on_the_yellow_coaster_ep_5.mp4': '107gp9Wy4uzXRrtjcwYfq0-NVdTsnuLgM',
        'stack_the_yellow_block_on_the_red_block_ep_1.mp4': '10LgrqTaEFo5jUXiWLTMkv3UFEtjA_Hew',
        'stack_the_blue_block_on_the_blue_block_ep_2.mp4': '1hoKLnuMMLy3DwTQ2YD2jiyeTv-blf-jk',
        'stack_the_red_block_on_the_green_block_ep_3.mp4': '1hzKxwyq9VkjqrQ-KIgM8hOMN3boyZlgX',
        'stack_the_green_block_on_the_yellow_block_ep_4.mp4': '16m6F6XbyYLNPV1jOJUAmAp9mAjO_fttp',
        'stack_the_green_block_on_the_green_block_ep_5.mp4': '1tU3N81HHNRK1dUOvxxdcSEBW-9FuH2RA',
        'collect_2_blocks_into_the_pink_box_ep_1.mp4': '1Q_LijMtPDdwBHmEFwobcSR5vfN4LTzqb',
        'collect_3_blocks_into_the_pink_box_ep_2.mp4': '1ixiJ5ZWoTb84tgB9bnfP8aPJ-2L7exrY',
        'collect_5_blocks_into_the_blue_box_ep_3.mp4': '1n-7VYcXHeZjlZApX4iYi2MMCE6zKF-__',
        'collect_5_blocks_into_the_yellow_box_ep_4.mp4': '1znMZ1bEtduO7qy2p0aSe8ZST9dcFYdwU',
        'collect_5_blocks_into_the_pink_box_ep_5.mp4': '1HtwTYOXMGoi3agawQ5SnSFQQgf2lJO-q',
        'fold_the_blue_towel_in_half_ep_1.mp4': '1yjXHaIcRlwCtRq5u3zO31Y_CBZbNw0oV',
        'fold_the_blue_towel_in_half_ep_2.mp4': '1upqMrT1KHys3O8zWNg-4AHfgH2w4Nvb9',
        'fold_the_blue_towel_in_half_ep_3.mp4': '1i7kXlzqmh3aMIa7kPlQgk9r5v-0lBaVg',
        'fold_the_blue_towel_in_half_ep_4.mp4': '1iLwjsxDfrrXkACPYAEdVAUTHodFm1g02',
        'fold_the_blue_towel_in_half_ep_5.mp4': '1LXwaq0dnfGQ6h7Yq8GaW1y3y3E8BymM5',
        'pour_4_shakes_of_pepper_into_the_red_plate_ep_1.mp4': '17vMscTUxM6gJXitjMKxz9aqfKRfcy5Ij',
        'pour_5_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '12gjbIs9ofXGC_qMvf6ovXFzx7LqFOG18',
        'pour_1_shake_of_pepper_into_the_blue_plate_ep_3.mp4': '1H-HQrnCDUv8IUfnYJ2iuf19wkCtrheyW',
        'pour_3_shakes_of_pepper_into_the_blue_plate_ep_4.mp4': '1S74pZZEawqqzPVfBJnN32Dew2KhTcPry',
        'pour_5_shakes_of_pepper_into_the_blue_plate_ep_5.mp4': '1UTe9jnfhF7gwrlUyw5-Mst4zbTL-j4cA',
        'lift_the_green_bowl_two_times_ep_1.mp4': '1wulhNx6TbOu-oV4D-pZ5T0dDTDOXIBp2',
        'lift_the_blue_bowl_two_times_ep_2.mp4': '1_rLw3Takmf0o9P6nl4-1AyD3Pkx6MogD',
        'lift_the_red_bowl_two_times_ep_3.mp4': '14KQBTlKyFQnakLBpjQ8JGZSzm4n1YYpb',
        'lift_the_yellow_bowl_two_times_ep_4.mp4': '16d--ANIYBie3GWvVmgshY3LftMzGSyQ0',
        'lift_the_yellow_bowl_four_times_ep_5.mp4': '13_u-ffH3zM3b0SqBDDx8lkZ_PII6cMBD',
        'press_the_button_two_times_ep_1.mp4': '1cF3NCeIcIwkygtL80Gngdn-uFl2HvFUx',
        'press_the_button_four_times_ep_2.mp4': '1R31ljf2xozv_r-dSB7zfhGrI5lQQyPfs',
        'press_the_button_two_times_ep_3.mp4': '11gG_2V7jA4a9QE1vLrO0lZKdUkYQr-ya',
        'press_the_button_four_times_ep_4.mp4': '1QKoRGUg9j8gr2pxc8d_0BoXBwq_fSa9x',
        'press_the_button_five_times_ep_5.mp4': '15LxEgIb3qxObcrzb_11I3dLsGzOlr1hC'
    },
    'id-pi-0': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '1fkgr97jsfzUssd261-rW1Ti7XgMa2kPZ',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '1gyc-zA4kaQ4wpeH2Scte7LUEh_cCb375',
        'put_the_bread_on_the_blue_plate_ep_3.mp4': '1Q3aHKcq6xBp40iTfCscx7dsGY1-H7oYJ',
        'put_the_bread_on_the_red_plate_ep_4.mp4': '17twwlNqht2EWlNG2_RYvhEqxC-wPul5R',
        'put_the_bread_on_the_red_plate_ep_5.mp4': '15DNrdJqe6PfqEmzgqKgjWcuYSqV84AeH',
        'put_the_red_bowl_on_the_green_coaster_ep_1.mp4': '1kmmXXWqr5FJwETh3swqSvUxEZzo0RYHJ',
        'put_the_blue_bowl_on_the_orange_coaster_ep_2.mp4': '12xkxCOLS_P6tz0BwRVkSE6aDidj-nwFz',
        'put_the_blue_bowl_on_the_green_coaster_ep_3.mp4': '191kn6mPrSxlC9JhV-sheuwchkEw3g_Tr',
        'put_the_red_bowl_on_the_purple_coaster_ep_4.mp4': '1nDoW8RjNy8n2lT5Umxr6YgbYInPccxah',
        'put_the_yellow_bowl_on_the_purple_coaster_ep_5.mp4': '1nzZmD9sniBX9w-EtQxC2S0D4G3HSlRFe',
        'stack_the_red_block_on_the_blue_block_ep_1.mp4': '1HiYYyjUouBgjxlvbObY5KlyY-2Q2HtXR',
        'stack_the_yellow_block_on_the_blue_block_ep_2.mp4': '1LvWhS0kOmZUoRxIr8gZjAAXK6TnZcQVT',
        'stack_the_blue_block_on_the_yellow_block_ep_3.mp4': '1zjSn-w4ZYbqV5jv1tJNzGTvf3oDdyQvq',
        'stack_the_blue_block_on_the_red_block_ep_4.mp4': '1LNMfuRg2XCF03K_khRGEJd4It6ev_xNe',
        'stack_the_red_block_on_the_yellow_block_ep_5.mp4': '1H9e66wm8As3qe8wmd05Y8jyPmT4_y_2m',
        'collect_2_blocks_into_the_blue_box_ep_1.mp4': '1Jc9E37t7dr4piHYxoKIhGRII0dK8fGak',
        'collect_2_blocks_into_the_yellow_box_ep_2.mp4': '1ainnfpzNjgfnYYo0YtcBMl-Qm1XvtY-p',
        'collect_3_blocks_into_the_blue_box_ep_3.mp4': '1MbtNwLfdumCqZerVNq2E7D_tcPne0JzD',
        'collect_3_blocks_into_the_yellow_box_ep_4.mp4': '1VPAVV4GaxZ44m7rwvdJoTX1aPW5cLKx5',
        'collect_4_blocks_into_the_blue_box_ep_5.mp4': '1uyoZsT3R0TEsmGlp4EZEbgzv-qRctRvB',
        'fold_the_pink_towel_in_half_ep_1.mp4': '1bD-uIoQwQMpDuVKWmoTh02M5V14Yr2oq',
        'fold_the_yellow_towel_in_half_ep_2.mp4': '1_pan3JdRaMZTDZ7CXpQYn8_Fa2MQ3Pqe',
        'fold_the_pink_towel_in_half_ep_3.mp4': '1DusAGg_8SVqbLI0M7JG-ljYQDEAIaVhI',
        'fold_the_yellow_towel_in_half_ep_4.mp4': '1MR7Fz4UvYzESHUkM4WGQhaxr8h8j4ibg',
        'fold_the_pink_towel_in_half_ep_5.mp4': '1PN3PQIYdqrcnwR9j2u932WJGUun51Wt0',
        'open_the_oven_ep_1.mp4': '1Pij87PXMyp661zv1HtqZ6L7g72uPZ8Yt',
        'open_the_oven_ep_2.mp4': '1afD4Rr9bde8Fb6J-fWXZit3gOhCYC3rA',
        'open_the_oven_ep_3.mp4': '1qfK3Q8D3hRou2EfsCquy5FeuQp8rI9Gq',
        'open_the_oven_ep_4.mp4': '1GkHjemxEISPwAjSBWVDxX0YkhILd3bTp',
        'open_the_oven_ep_5.mp4': '1xsTxQyrnKkNBY4jgdJOt_Is5aqwPl7Pz',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_1.mp4': '1bw8BfPFudDZyj3FBZfTZLp0IJGYoggA0',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_2.mp4': '1xDqfJv7D58aqBNX_oNrRmJwtyKEcpmr2',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_3.mp4': '1OaGcqWybpjz7Zy1lxah8ZkJv38Bbg7Y5',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_4.mp4': '1KLE06qpKfB8fBBF76SS2a69dj4VuBjMG',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_5.mp4': '1g4jz2GMaxXTWCkrXLTBs6TlzzcQk7nQ6',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_1.mp4': '1ZV-3VUcdUwhWkRrCTi5uEPCUbVzIhCmO',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '11X8BWolcJzbPkxn_uFbDdc7Pm2qrAP6C',
        'pour_2_shakes_of_pepper_into_the_red_plate_ep_3.mp4': '17EHynL-tR6fGEYzMjsnG5Z6pJlCUNT34',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_4.mp4': '1SJU7jG1VVtDjgBZ6g5PQpUNQ5eoPhWBN',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_5.mp4': '1g4gbCZPP61PzTqfNMKfISO7CPVdw429Z',
        'lift_the_green_bowl_one_time_ep_1.mp4': '1hXlmnqt-2jUo2iraAk95_QhKAZy6b8H1',
        'lift_the_blue_bowl_one_time_ep_2.mp4': '1alH8R1NuqbEsz-iA9q2XFtQXS1S05WEU',
        'lift_the_red_bowl_three_times_ep_3.mp4': '15Zu8mTmnpXztvBqROyd7UQNw0mQuwM_t',
        'lift_the_green_bowl_three_times_ep_4.mp4': '1Z-y1M2sa7KjAGWtxJkEO5KqWyhEDSr8l',
        'lift_the_blue_bowl_three_times_ep_5.mp4': '1aIWSkU2MAmrHjQB8vQVEYZxCNBOZcFQD',
        'press_the_button_one_time_ep_1.mp4': '1hM6xVU3daQWW_D5KOyjdBpQ-uZJan1n1',
        'press_the_button_three_times_ep_2.mp4': '10ShTgVLl4Q7rBV4O9O_Lh3_hbSXhdY5A',
        'press_the_button_one_time_ep_3.mp4': '1RBVC8ELoSTJbSmfw0GuDpgGocSRNtTT8',
        'press_the_button_three_times_ep_4.mp4': '1OCgnpJSAWF6jKumNMBwe4MB-1ELGeTxb',
        'press_the_button_three_times_ep_5.mp4': '1azlSH5lYirbBFkEPEMIBtQPbFi6F5prk'
    },
    'ood-pi-0': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '1eZQdQaPkm5FNV-cGk0dz2omL8MS_xZ9o',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '1LABdEO6CurjNHbf5QmzRDBpa3AzeQsaV',
        'put_the_bread_on_the_yellow_plate_ep_3.mp4': '19ik7bpy07tSZ67s_1U2JT9pQ8N-Yw2nW',
        'put_the_bread_on_the_yellow_plate_ep_4.mp4': '1Up5KOA3if8b7R91kppuKZlUjoZTdQXPO',
        'put_the_bread_on_the_yellow_plate_ep_5.mp4': '1WvGrrKvxh5rDDiNqgW6TvQfErzxpzDeO',
        'put_the_blue_bowl_on_the_purple_coaster_ep_1.mp4': '1cgAukGoaquCkkbFp8CwGOr6NS0S2vlSn',
        'put_the_red_bowl_on_the_orange_coaster_ep_2.mp4': '1_ucOryR6f9NQqQVIDb1Nziupj09g-fxw',
        'put_the_yellow_bowl_on_the_green_coaster_ep_3.mp4': '1bfzDtpGLePe8P6ckE7ThPxFo0gegokLO',
        'put_the_yellow_bowl_on_the_orange_coaster_ep_4.mp4': '1k9-HJJ3xQQgXl5_AqCLFhgxidRauRjiv',
        'put_the_green_bowl_on_the_yellow_coaster_ep_5.mp4': '1ipwNNd6weDZiYqX6Jy9B9BDD3SEfQ6OD',
        'stack_the_yellow_block_on_the_red_block_ep_1.mp4': '15sxGohSGBxp-RqOjZj0maaQBPC57V5BR',
        'stack_the_blue_block_on_the_blue_block_ep_2.mp4': '16m5QVJIz33jJsMspP3_uaYZf2ldxmxq_',
        'stack_the_red_block_on_the_green_block_ep_3.mp4': '1AqS6a33_f39CEZmahEg9mbEVRjOTaTCS',
        'stack_the_green_block_on_the_yellow_block_ep_4.mp4': '14VsbDqiDt-XE2IiauDG9DSYuY13pktAI',
        'stack_the_green_block_on_the_green_block_ep_5.mp4': '1q9yRdgF5zihOPlFmrGrXv61VrSxF5puT',
        'collect_3_blocks_into_the_pink_box_ep_2.mp4': '1wIp6LpCr15qUhFNdZv33Th1c_g3LWJL4',
        'collect_5_blocks_into_the_blue_box_ep_3.mp4': '1A7k4FIVt32KsFLfuamurK5qlyvfiaRUM',
        'collect_5_blocks_into_the_yellow_box_ep_4.mp4': '1pHDiQ8N4gfcrB-gNr2py4niExKRO2slp',
        'collect_5_blocks_into_the_pink_box_ep_5.mp4': '1j9reNTJe4_f9vFYaWt9Bt57VjOJE06zI',
        'fold_the_blue_towel_in_half_ep_1.mp4': '1KYGnf48d8PLcTkxzvqEl3rw-_hK_niFu',
        'fold_the_blue_towel_in_half_ep_2.mp4': '14MTHgOqUF8ecPJkjNay_HJunklZt75lQ',
        'fold_the_blue_towel_in_half_ep_3.mp4': '1MntNWXgNSrd9bV6tJ_61_4tcVCFHy8Ad',
        'fold_the_blue_towel_in_half_ep_4.mp4': '17jutKvvW29mjLAgVIYHX1gghitLRZwt_',
        'fold_the_blue_towel_in_half_ep_5.mp4': '13N5yTgUAgE6wbCRTkTowZO8jcNeBd6fL',
        'pour_4_shakes_of_pepper_into_the_red_plate_ep_1.mp4': '1R4RX4E1isdOfQpBr7FL7wfUwSltm378r',
        'pour_5_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '1IWvkM8s1HQoRWHugoTHV7bLGSuALJTMi',
        'pour_1_shake_of_pepper_into_the_blue_plate_ep_3.mp4': '1azsCsnh_O0BinpbNi0upmbosvj6-iAVD',
        'pour_3_shakes_of_pepper_into_the_blue_plate_ep_4.mp4': '1MA88EQhH90C3rQP8M-LhdQ6dJN3G3nUs',
        'pour_5_shakes_of_pepper_into_the_blue_plate_ep_5.mp4': '13EGHQdM5VuX_Rcvy8WyfCIHpSLVTpdgU',
        'lift_the_green_bowl_two_times_ep_1.mp4': '1XDwr-LX73NJbLd2WMYDcA_Ow7n74qjRQ',
        'lift_the_blue_bowl_two_times_ep_2.mp4': '1nY99klK1dEYj3zrEOeC1dv21CWegoX62',
        'lift_the_red_bowl_two_times_ep_3.mp4': '1j3XzVRQzanTrBzDN5n1tiIey3d7NxVF4',
        'lift_the_yellow_bowl_two_times_ep_4.mp4': '1DmoOqgzmru62U6SaMEhk-Vw0YYOJuix6',
        'lift_the_yellow_bowl_four_times_ep_5.mp4': '1yQ4yquXmDoqcYQjOQfWd11QXZCovDCSA',
        'press_the_button_two_times_ep_1.mp4': '1TycbWol0f4GR4_jtImwTi3N6mPbi54nc',
        'press_the_button_four_times_ep_2.mp4': '15QzEIfHnc7w2dybO3Os-2XEelqswYlD_',
        'press_the_button_two_times_ep_3.mp4': '1QNd-jgQCVA5C8nHftsbHf1A7KROBeAJC',
        'press_the_button_four_times_ep_4.mp4': '1lu20YKujrGyK2gWf5SeP3Gsv_B1c_0nB',
        'press_the_button_five_times_ep_5.mp4': '1ZPn0JesLC2IYOmAV9bkDTOGH6fjAX6ug'
    },
    'id-pi-0-5': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '1rKml9VKP9wKa2w6s-HgbGvoLkf8CpFwk',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '1MbPba_dQHOlFxdp_X53In0wzBuiDPCC-',
        'put_the_bread_on_the_blue_plate_ep_3.mp4': '17GrITFXMku1JJzlr_DSduWTNpVHJgryH',
        'put_the_bread_on_the_red_plate_ep_4.mp4': '1dI7WTx1yV30TMSMTdckdPmufwV_r_sRU',
        'put_the_bread_on_the_red_plate_ep_5.mp4': '1QrEORFjzDCPhrvXdXA9UqZ_f9ziWKblf',
        'put_the_red_bowl_on_the_green_coaster_ep_1.mp4': '10gxNO3eUUwdtKUqa4iDAdK6lBwGDEOBX',
        'put_the_blue_bowl_on_the_orange_coaster_ep_2.mp4': '1ByQffXwHrRvayakWwrd2jAljUuidbig6',
        'put_the_blue_bowl_on_the_green_coaster_ep_3.mp4': '18bi5mXymaXLLMwVt7cHgT_aXgGj1qypw',
        'put_the_red_bowl_on_the_purple_coaster_ep_4.mp4': '1iPiHnSKdR_N5PEhd1w85JrBCm_wSJ_dJ',
        'put_the_yellow_bowl_on_the_purple_coaster_ep_5.mp4': '1rIfs9l1h6IKCTwh8k3Rm-9sGdijKV0kG',
        'stack_the_red_block_on_the_blue_block_ep_1.mp4': '1edlvf4hTM8Zwna3P9RlCqfboxTIY3Wrr',
        'stack_the_yellow_block_on_the_blue_block_ep_2.mp4': '121BOsC_5T2AxpUrpFlHgke9RrZsQx4lX',
        'stack_the_blue_block_on_the_yellow_block_ep_3.mp4': '1VBbUxad25r5VKRcp5Jjh-G3MmRU0S3AF',
        'stack_the_blue_block_on_the_red_block_ep_4.mp4': '1ffWAOx2CNGpLfOQtHRUx-G3NLowDrnDd',
        'stack_the_red_block_on_the_yellow_block_ep_5.mp4': '1wENNEr40PXJJezg2tpXfRAnU63OumVdF',
        'collect_2_blocks_into_the_blue_box_ep_1.mp4': '1Okam0JRHRTIbZWWHXBAWzEfPp1DSdD--',
        'collect_2_blocks_into_the_yellow_box_ep_2.mp4': '1cFhDhLBMhtpHnxmE21UyUxO07ConzA53',
        'collect_3_blocks_into_the_blue_box_ep_3.mp4': '19HoivEUtvQgXvbNw5rLY0pi-G3vDb88T',
        'collect_3_blocks_into_the_yellow_box_ep_4.mp4': '1FTs14m9EK38wx9UbY4IKhFTqvFx7Nygj',
        'collect_4_blocks_into_the_blue_box_ep_5.mp4': '1X3qVqedLGv0BPXTHMAnEkTgm3eH9CGQd',
        'fold_the_pink_towel_in_half_ep_1.mp4': '1-_Gt-05CYfyuqDaiIsULY-5Q_8WKCAYC',
        'fold_the_yellow_towel_in_half_ep_2.mp4': '1xZ8lZVjrRD9z-WLaetDDj--JTbbtG0dh',
        'fold_the_pink_towel_in_half_ep_3.mp4': '1uJvaMHZiYRPNQB21WVYBQ9G6Ehd5D9az',
        'fold_the_yellow_towel_in_half_ep_4.mp4': '1IRY_7lN11WFlTjofmxfZR_u9QoklmCLj',
        'fold_the_pink_towel_in_half_ep_5.mp4': '181HPEeosDiMVqQaDJ4o1GfeHhvg8l05Z',
        'open_the_oven_ep_1.mp4': '1uY8YxVfsTG-SNXQPX77WfmUy1RKYymxy',
        'open_the_oven_ep_2.mp4': '1zuquOdFibNLuYW6KBxpV7rRM6DcyK-QW',
        'open_the_oven_ep_3.mp4': '1p6NHt8AQj1rhuVykaZPWit4qUh-uprGc',
        'open_the_oven_ep_4.mp4': '1hkj3lhNy0JDF8rvZ2dlhoHUAQsQvfyAa',
        'open_the_oven_ep_5.mp4': '1jlN6MiuigTbz8Qh2O_bC11D6zxbWodSp',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_1.mp4': '1NDgSTqMN7t99q9j7MLvVoCReyynSRJXY',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_2.mp4': '1sQrpinEGCzCu0HX4vLAQPyvqhwk-tna-',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_3.mp4': '1Fn_xsouTJj3SfTCe1VCn-jflcsjdmami',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_4.mp4': '1zu7iDJwnvqUQdMLzukPM8SL8S4yOhVXJ',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_5.mp4': '1PXzAjs1n6XotYU-3O25hOuIa9Si4DymT',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_1.mp4': '1Yl32-0jdSFs5gs2_26jAxnBeXUWP9h6E',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '1Lu8Ys8DGkE-hPWLYa8r9AG5Kh9hT1iCi',
        'pour_2_shakes_of_pepper_into_the_red_plate_ep_3.mp4': '1iuP8QcPz5LZOGi7FePAB681B_CHfxpiW',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_4.mp4': '1XS4je0LQJkjiziYqrhbizGkLRSbobUhW',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_5.mp4': '1x6MsCT7gyFyu5N2Va6wmwpVM4km32uIm',
        'lift_the_green_bowl_one_time_ep_1.mp4': '19yc5Q_GSktnoBY_ipPb6ngo-NA-4Kgyc',
        'lift_the_blue_bowl_one_time_ep_2.mp4': '1gU0dxLOEt5Qjjp4grJPyQEksjWqmyRRl',
        'lift_the_red_bowl_three_times_ep_3.mp4': '1LZHn48zmQnCrzrkbBwZcdyDYZyDm8bVK',
        'lift_the_green_bowl_three_times_ep_4.mp4': '1wDC-C_B4uMk0se3RveLHyYWIWJ5tcQNb',
        'lift_the_blue_bowl_three_times_ep_5.mp4': '1s7eVCdbmPotiv5R69Wl96-CCL2hr6l86',
        'press_the_button_one_time_ep_1.mp4': '1CQErfX327_fwBW8lk59dSdmk_jZJWGf5',
        'press_the_button_three_times_ep_2.mp4': '165janlyCqwdT-0jVNTdOEtcuCfaDUT31',
        'press_the_button_one_time_ep_3.mp4': '1j7k2ch3I_8gD_inlGhJSfZD6W5Qn1-4a',
        'press_the_button_three_times_ep_4.mp4': '1jJ5I796Wcupg_KEAfh6C_s6ql6AU0klL',
        'press_the_button_three_times_ep_5.mp4': '1Djkw7MMd4YDsBo0oQxx4yhX7qj3ixjID'
    },
    'ood-pi-0-5': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '1cYJ_Ygp0fW0vHIVk2LEaqj9WvDtYbSR1',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '1t7RlHLjce3gb0-cy9O_nOlHE_dP4Ix-x',
        'put_the_bread_on_the_yellow_plate_ep_3.mp4': '18lcjKqMZd1gjyn9scypYV1lDsfGpVV2u',
        'put_the_bread_on_the_yellow_plate_ep_4.mp4': '1pPg6ydkEeCCR_z3U0_zeBUeFtBpQhgG6',
        'put_the_bread_on_the_yellow_plate_ep_5.mp4': '1ctaW6lx59-bG9CEZmRzyTbknPR5pyG9E',
        'put_the_blue_bowl_on_the_purple_coaster_ep_1.mp4': '1EyTEJf7J59cTi3o48Jqtdkg0fJZHZbCh',
        'put_the_red_bowl_on_the_orange_coaster_ep_2.mp4': '186_owSmImvQHYCMaI9_bErHuXarzBi-J',
        'put_the_yellow_bowl_on_the_green_coaster_ep_3.mp4': '1u9S5COmCCPzQ-HKgxzM2T5vDh_3SQ4vo',
        'put_the_yellow_bowl_on_the_orange_coaster_ep_4.mp4': '1Iu6seAJsb7LTSgtG1LWaV7N4ywoQ_d9H',
        'put_the_green_bowl_on_the_yellow_coaster_ep_5.mp4': '1qMc_8k9gAxur01bcH-l2QddtOSHCev39',
        'stack_the_yellow_block_on_the_red_block_ep_1.mp4': '1gtSmWVRWckSo7WteoT5yqWmR4OrlhNNm',
        'stack_the_blue_block_on_the_blue_block_ep_2.mp4': '1AkY6-nyCTSVItsuEeFWo9tkkG2Es0NRo',
        'stack_the_red_block_on_the_green_block_ep_3.mp4': '1SilganpbZ__jC5sW--qmNztxHjOmd1za',
        'stack_the_green_block_on_the_yellow_block_ep_4.mp4': '1905Awqqk3P1zVC357C3rwQSEJdtJv8xx',
        'stack_the_green_block_on_the_green_block_ep_5.mp4': '1tfsHoj6ve8d4cCOYGpT8IDPihbTSoPP0',
        'collect_2_blocks_into_the_pink_box_ep_1.mp4': '1GY3LeNL17jjVSutsh-EtnA6Ih9MK0pQs',
        'collect_3_blocks_into_the_pink_box_ep_2.mp4': '1cf-NG-6xjJ4JHebgdXwCmBhpcXfb6tg2',
        'collect_5_blocks_into_the_blue_box_ep_3.mp4': '1rMLa16PzcY6AOUccnUFeUHf5Wr5ykv-Z',
        'collect_5_blocks_into_the_yellow_box_ep_4.mp4': '1ggpWj-VGlYdMMe25WTyG7OOEk4EzoVLx',
        'collect_5_blocks_into_the_pink_box_ep_5.mp4': '1PnS1Ead41xPNYw78kIjRXQqX9IncJdvC',
        'fold_the_blue_towel_in_half_ep_1.mp4': '1dtTCJCXLSB6jlP6B1OeWS-r2fFGQzqOd',
        'fold_the_blue_towel_in_half_ep_2.mp4': '1j2I5hOQfPTZr96Up7q0ia0SAsTgCS73s',
        'fold_the_blue_towel_in_half_ep_3.mp4': '1CBD1dGXrPTq50JfxLqV8o2ckqml8LJWX',
        'fold_the_blue_towel_in_half_ep_4.mp4': '1ipoHUX3WncTYjFOmEAqlsNKC3ihmak-J',
        'fold_the_blue_towel_in_half_ep_5.mp4': '1b1SKKvzNx3HQEgFt3Yxwlae8idCfbsMu',
        'pour_4_shakes_of_pepper_into_the_red_plate_ep_1.mp4': '1GR7zATTUvZQPiGH2woQ_Ednmymy8sDjs',
        'pour_5_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '1yAjrJlg2EUyzqvOXO1CFbUHu0wMSaNAD',
        'pour_1_shake_of_pepper_into_the_blue_plate_ep_3.mp4': '1UEDvClFZtgbNGvJ1qN12izA6TqTKTSA1',
        'pour_3_shakes_of_pepper_into_the_blue_plate_ep_4.mp4': '16ZvYoPyAJC-GUKs2-ndPUt4Ah2Y8fgij',
        'pour_5_shakes_of_pepper_into_the_blue_plate_ep_5.mp4': '1-JuXzl2zMN9kmYuOrSvNp3yIMuZ7nQ0h',
        'lift_the_green_bowl_two_times_ep_1.mp4': '1O-t9nd69L1uYCu-KEvcHhglEIFEqTEJR',
        'lift_the_blue_bowl_two_times_ep_2.mp4': '1cm7iIPOi0cSHS7SD-0-REQZ8MWDFgg8W',
        'lift_the_red_bowl_two_times_ep_3.mp4': '1Lab3GH-zOUYyb98QWngUfWapbRU4MbQA',
        'lift_the_yellow_bowl_two_times_ep_4.mp4': '1QJnwPuXb4Jeb3oWxjRX-6HMCU4Ydhqg_',
        'lift_the_yellow_bowl_four_times_ep_5.mp4': '1TH4AL-gdmdChsJRbQQXyYQW_MHROzKYI',
        'press_the_button_two_times_ep_1.mp4': '1-S5CVseS00ug2oOS1ymB2LKXu-fstHPw',
        'press_the_button_four_times_ep_2.mp4': '1KJ1OtDCLH5tvuOFvnvpBWOy8n89WmYLz',
        'press_the_button_two_times_ep_3.mp4': '1ZZfgHPTwmMAHVZwkdM6O9r4CuZYPUHV6',
        'press_the_button_four_times_ep_4.mp4': '13DsvSqXbGlqdi8bFPHD5DSHAlcuxNkb7',
        'press_the_button_five_times_ep_5.mp4': '1vnh4i7KPwoOQg10SBT17sDBg9nh4Cvys'
    },
    'id-smolvla': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '1j3YMTR7hUjLW2AiOyybBs2nfUhD8Y3w4',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '1hyTnjZa0gtkIS9xMj9BeSUPFVVy5Kr9t',
        'put_the_bread_on_the_blue_plate_ep_3.mp4': '1516AfyYG92yW_v5oq1Unn37a7sBtzah2',
        'put_the_bread_on_the_red_plate_ep_4.mp4': '1ZuPjzjDNThd_7DWHeS2t69RxnY3kDvHk',
        'put_the_bread_on_the_red_plate_ep_5.mp4': '17xCPMP6t-gHXoRSygop5w9EDqyBh0xPZ',
        'put_the_red_bowl_on_the_green_coaster_ep_1.mp4': '1O7Kr2dtibcvt76_-d8M2yk7TnT7aupfE',
        'put_the_blue_bowl_on_the_orange_coaster_ep_2.mp4': '1NPNOVQ9NpOjL0AV36D0VxCUWZwWxonOc',
        'put_the_blue_bowl_on_the_green_coaster_ep_3.mp4': '1MdSlnYVX7dR7_D-EbZ-BUzjgTBreraeA',
        'put_the_red_bowl_on_the_purple_coaster_ep_4.mp4': '1xS1xEGx5CE5uIvmDJ0ovfosJ9vdXL93f',
        'put_the_yellow_bowl_on_the_purple_coaster_ep_5.mp4': '1YJOu5meQFrwfs8QSmDJut7tC9E3oCWhU',
        'stack_the_red_block_on_the_blue_block_ep_1.mp4': '1310Uh25GoxH9V5W7u2Cl88QGNmcQ3prz',
        'stack_the_yellow_block_on_the_blue_block_ep_2.mp4': '1jDLuBnH2t1NNKDhpZFFfPlYCPN7O-n5Q',
        'stack_the_blue_block_on_the_yellow_block_ep_3.mp4': '1-T0Hx99y-d2dEVACWycSMt7Sdfxb3_oJ',
        'stack_the_blue_block_on_the_red_block_ep_4.mp4': '1t9D4UKD6LFYyOLd2xhTa9FH0--Y5-3mN',
        'stack_the_red_block_on_the_yellow_block_ep_5.mp4': '1_Kjpn0xVWHvkzpQwHGjKq9skarBeNSb4',
        'collect_2_blocks_into_the_blue_box_ep_1.mp4': '1z952cnuH2C8QUP1dRoeUUCfR3uScTmBe',
        'collect_2_blocks_into_the_yellow_box_ep_2.mp4': '1MMTBRTK3x4TCvG2O6sN1sX19QUBRT4TJ',
        'collect_3_blocks_into_the_blue_box_ep_3.mp4': '1D6HGlgHUG5HD_FxZ0UI-kUdtPFfSvGs_',
        'collect_3_blocks_into_the_yellow_box_ep_4.mp4': '1t9Oa9LFj8gfOCyEgzOW0XF2ClH93IL7g',
        'collect_4_blocks_into_the_blue_box_ep_5.mp4': '1scY78vcL8CgHp3SHR2mIOWQ_aCo7D3PL',
        'fold_the_pink_towel_in_half_ep_1.mp4': '1E8UQd6CNphvjHFeO9lZc1eLAheC53Ci0',
        'fold_the_yellow_towel_in_half_ep_2.mp4': '1H6waihffba-ghILYL2hNfCvLPyo5QUi2',
        'fold_the_pink_towel_in_half_ep_3.mp4': '1moUIYh2bEphda7U0-WzrnK7zObxYxCvv',
        'fold_the_yellow_towel_in_half_ep_4.mp4': '1A-Vqli5AmcLKaJyhtcgO4ZnUIimUZEgV',
        'fold_the_pink_towel_in_half_ep_5.mp4': '1vXQsVZT4y2sk69kf05BMHXq1dy-gRq8R',
        'open_the_oven_ep_1.mp4': '10x4L-WtqselRJsYxFK8BgTETU-l7itsA',
        'open_the_oven_ep_2.mp4': '1Yzcqmd8WbTYX0o2dM5j_QHXkafCiq9OK',
        'open_the_oven_ep_3.mp4': '1g_rfJn2czA3vQY7RBYU9s0giKjoXcQ9u',
        'open_the_oven_ep_4.mp4': '1VuxmuEE01FICwodUNzeOkRol4vk514h4',
        'open_the_oven_ep_5.mp4': '1bsf9h2o9rUuJC_UtYeXBDmTJTyx_or2H',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_1.mp4': '1KxmJwILrtSg5QgihjfmTQ6425RZa_g1G',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_2.mp4': '1CeiLbljVSw4vmmNpLWILt0xxyRrtxTJN',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_3.mp4': '1jlHt7SmvVHZANiLTVY6H1-I22KtNHppJ',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_4.mp4': '1m5vK7S6ZlhMPzLyyIQeQuqk2pJGqFo9i',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_5.mp4': '1SeeUs1mJA7kF6n5zyPCPtrmtOCFv-cVM',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_1.mp4': '1hMHORpEec2mlD8_PSo8QUkdlylPkl5tL',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '1aXcl8xUdXy9Dw5uaRQojZ7YFzNO3j-mG',
        'pour_2_shakes_of_pepper_into_the_red_plate_ep_3.mp4': '1cMcJ6v_anmi14DadVQRjrSQTcfKI0Ve6',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_4.mp4': '1L4lSjvj61tDinOjCXxMTV-HYQh9hkR-0',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_5.mp4': '1Upo0H5tHATWEeUJoe7rtwX6Rj6GCgVur',
        'lift_the_green_bowl_one_time_ep_1.mp4': '1NQS3Uh3vB4dh0ZqUYMdq_BUCJAqpvD53',
        'lift_the_blue_bowl_one_time_ep_2.mp4': '1mQT9M-qvs1g_-ubzJFQws7f7LGL6SZxY',
        'lift_the_red_bowl_three_times_ep_3.mp4': '1FrQt2FPi1X_mSz-VPru26MU6yVjR_Qbw',
        'lift_the_green_bowl_three_times_ep_4.mp4': '15b8rG7IqT9wXgivHAbVkfpBRk-8pu8Gi',
        'lift_the_blue_bowl_three_times_ep_5.mp4': '1L164fAdli9nhVoytwqTaEKbQV6PsqCNp',
        'press_the_button_one_time_ep_1.mp4': '1ejVOtsUafZ0C2t8U9eAAQLNPp5GPC3v_',
        'press_the_button_three_times_ep_2.mp4': '10y7kXdD5SWfoXmPORmKdktKXqPFmQJU0',
        'press_the_button_one_time_ep_3.mp4': '1zcUJfuIs173BoDya1xSY0Tfb6rbw4mgF',
        'press_the_button_three_times_ep_4.mp4': '1fvvO9fmhADlTn0Y3LAquCRaTiVWJEusv',
        'press_the_button_three_times_ep_5.mp4': '1lbFXm2jPw4qB_ugTMRCnMYy1xeqXnAE2'
    },
    'ood-smolvla': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '1KcciWlQpmYW3qcq_bs2WU-bHh9wOQIvZ',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '1isjWk3X6sSKfaAzlQlA79l0micuYlCSI',
        'put_the_bread_on_the_yellow_plate_ep_3.mp4': '1dRugnAD1of5wLOvGztMONEDsLIhAmzyv',
        'put_the_bread_on_the_yellow_plate_ep_4.mp4': '11vI7G6UbXFQtL64xMr64tmP-bIq27Pf7',
        'put_the_bread_on_the_yellow_plate_ep_5.mp4': '1KQnF0KexiQ-81UorBTrkPCZRpLJIu62S',
        'put_the_blue_bowl_on_the_purple_coaster_ep_1.mp4': '1_QnMJkG4ixi74xDyIo2_mTfG6BiF8WBv',
        'put_the_red_bowl_on_the_orange_coaster_ep_2.mp4': '1znOxPJe0lmxfGE3xhM-_geY7ZeB3CGOj',
        'put_the_yellow_bowl_on_the_green_coaster_ep_3.mp4': '1L4DU4LIe6TUOlXsJChMyL_hFG95eP80-',
        'put_the_yellow_bowl_on_the_orange_coaster_ep_4.mp4': '1ra4qbYq0Obs88CgUqz6PHmGezE1F0A6h',
        'put_the_green_bowl_on_the_yellow_coaster_ep_5.mp4': '19Rm5RGRsvOwO7uaNfaFq4znbBhfgYsQo',
        'stack_the_yellow_block_on_the_red_block_ep_1.mp4': '1Is-lfWRE7Di7hJ63GlMC1quOjkYPtQiK',
        'stack_the_blue_block_on_the_blue_block_ep_2.mp4': '1wAPD7yVOR5IoMqJPj9WdwuWbK6azxoho',
        'stack_the_red_block_on_the_green_block_ep_3.mp4': '18OeBM3z2sC3F6fUj3rsv2hzmmwTHMRW6',
        'stack_the_green_block_on_the_yellow_block_ep_4.mp4': '18alwiynfQ8qES2Rv_fh2_PZxuasDfTOw',
        'stack_the_green_block_on_the_green_block_ep_5.mp4': '1DwGs0oKns0fXEIgQiHB-d1oyqibWHTy4',
        'collect_2_blocks_into_the_pink_box_ep_1.mp4': '1oCTa8uPnZKScbNu5qTvOxaxikMmyepka',
        'collect_3_blocks_into_the_pink_box_ep_2.mp4': '11lD2xgedwclyIeUI05EE2hg9oVKO2l6I',
        'collect_5_blocks_into_the_blue_box_ep_3.mp4': '1zJ7AG086YlF-o72vkDTldijqSmmjU_FC',
        'collect_5_blocks_into_the_yellow_box_ep_4.mp4': '1NJoxZYuAuj_SuNNwE8Gvi86x9J05bdtH',
        'collect_5_blocks_into_the_pink_box_ep_5.mp4': '1UXwW6BSkBTZXurjXjZxV_JIkey5dVuNS',
        'fold_the_blue_towel_in_half_ep_1.mp4': '1xBjWRyqjje3YLNjLucvWimWekpkTFHX4',
        'fold_the_blue_towel_in_half_ep_2.mp4': '1V0LUiEV-3mXjRfOp_BkJ9XT1vqNwcxOP',
        'fold_the_blue_towel_in_half_ep_3.mp4': '1iFaloSmj_wY8X3LEoJ8zLQfE1zOw45Ve',
        'fold_the_blue_towel_in_half_ep_4.mp4': '1sNWymcGGA8mOS6KaWB-2WytXIpMmfCxd',
        'fold_the_blue_towel_in_half_ep_5.mp4': '1_Cq6R5Oi7bgzL8fRHVvp3DQBXcGxd3sL',
        'pour_4_shakes_of_pepper_into_the_red_plate_ep_1.mp4': '1DXGxDCtZNHpFu8ngqorP4Ad-Fi8wLXue',
        'pour_5_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '1Yi2EID1Ncjn6dC8fDRjfXTsVFYuB-DgU',
        'pour_1_shake_of_pepper_into_the_blue_plate_ep_3.mp4': '1w4tVkBGeh28Izp9nFMINvkQlDtKBxGlb',
        'pour_3_shakes_of_pepper_into_the_blue_plate_ep_4.mp4': '1loiwwi6jycEeNRNd8Y6YeqML65adNwzo',
        'pour_5_shakes_of_pepper_into_the_blue_plate_ep_5.mp4': '1l5btbSPYjRBcCxustd0N2qqcWnTvlppe',
        'lift_the_green_bowl_two_times_ep_1.mp4': '1sl2a316CGHSJgatE2FeMLjkhaK7KJXGR',
        'lift_the_blue_bowl_two_times_ep_2.mp4': '1CqYo-gzr_0rra5KbMIiGyjFSxKnrQrNU',
        'lift_the_red_bowl_two_times_ep_3.mp4': '13JptUgKYIGj29wBgNuFgkG0AdE3VGwXA',
        'lift_the_yellow_bowl_two_times_ep_4.mp4': '1qpvd_lyOxCGhKLM95PmHNP-jZ5VYWLMd',
        'lift_the_yellow_bowl_four_times_ep_5.mp4': '1Is-w-TgEzRR5tEndjuQOLMl3zWpbx6eJ',
        'press_the_button_two_times_ep_1.mp4': '1_AK4d2NnP931dorbXD01QOQ6SRpi85J7',
        'press_the_button_four_times_ep_2.mp4': '178Ug7pHz4v6VTENLqvwhRZC6M55zMJXF',
        'press_the_button_two_times_ep_3.mp4': '1izWFB19GYyP-fJYnSVbOUVtswgjrd0bi',
        'press_the_button_four_times_ep_4.mp4': '1Upf1C03-QrPXmKJKz0IMPymVjFKiNwRb',
        'press_the_button_five_times_ep_5.mp4': '1FG7oEJ4Cooy5h2socrQuoHUEwpDvJXqn'
    },
    'id-x-vla': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '1KcciWlQpmYW3qcq_bs2WU-bHh9wOQIvZ',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '1isjWk3X6sSKfaAzlQlA79l0micuYlCSI',
        'put_the_bread_on_the_blue_plate_ep_3.mp4': '18uK-6cm0WqILvFNFPzgRyOvxottNNNGO',
        'put_the_bread_on_the_red_plate_ep_4.mp4': '1zHtNUNaUN9scLW4s13e7Liof25qjpwht',
        'put_the_bread_on_the_red_plate_ep_5.mp4': '1weOnz2BiXT_NMBpmPWiaOygA563lPFEL',
        'put_the_red_bowl_on_the_green_coaster_ep_1.mp4': '1hFzBNB-0evjmtxu-MOj57QXrieKF3Sze',
        'put_the_blue_bowl_on_the_orange_coaster_ep_2.mp4': '14ZGEjWTb49BPalUOEV88x_kL40ue1ALP',
        'put_the_blue_bowl_on_the_green_coaster_ep_3.mp4': '11wq4PQ3QwFjWDXNviVgfxT7UCtpVz4l8',
        'put_the_red_bowl_on_the_purple_coaster_ep_4.mp4': '1I4YNiTD4dH4GlEwsoCRBINe_HgokeFlh',
        'put_the_yellow_bowl_on_the_purple_coaster_ep_5.mp4': '1LDl0avNrEaTVbpmsGUFfk6-OHPfSKLb-',
        'stack_the_red_block_on_the_blue_block_ep_1.mp4': '1sYyc6jpqJwLRaZSV786lj662HRKgxZSG',
        'stack_the_yellow_block_on_the_blue_block_ep_2.mp4': '1PPGEt1t1owg4H2izzyD6HlLs7toMXLRX',
        'stack_the_blue_block_on_the_yellow_block_ep_3.mp4': '1ZUVbUEqPRd16HNNjfPZZoyQ5I04QKOxH',
        'stack_the_blue_block_on_the_red_block_ep_4.mp4': '1qXy7C-lMjwjCXd0Ck2uX7IyLolV-WyMX',
        'stack_the_red_block_on_the_yellow_block_ep_5.mp4': '1gmvV6oWVPm-Ux_daC9LD0CfeYbKQkTyZ',
        'collect_2_blocks_into_the_blue_box_ep_1.mp4': '1HCjreDW8980Hkex-c3CMKXwIiRGvUY-u',
        'collect_2_blocks_into_the_yellow_box_ep_2.mp4': '13X50ioczyWHdBTjGjnNv91iZBVz3rCcJ',
        'collect_3_blocks_into_the_blue_box_ep_3.mp4': '17SFSgEoHYyYHsLsESnLYWScwG9D79cJ3',
        'collect_3_blocks_into_the_yellow_box_ep_4.mp4': '1MFP3wZjgg43FJLKDXRKgGDHNg8yLcOiR',
        'collect_4_blocks_into_the_blue_box_ep_5.mp4': '1SvIANjqScUao8q9fxleZGHDJA-Gu4M7r',
        'fold_the_pink_towel_in_half_ep_1.mp4': '1civ6_fT9_-yXIzAS91kD9N0KyRVoKltB',
        'fold_the_yellow_towel_in_half_ep_2.mp4': '1fCvZeQ3YA0eYB02jlr3IfMb7RlsGkNmB',
        'fold_the_pink_towel_in_half_ep_3.mp4': '1NI_4EThdhLVI4NEyQmds_oDw6VGGosi4',
        'fold_the_yellow_towel_in_half_ep_4.mp4': '1nYF-5rIDAB4HPj7pZVDHJhK-7wqSANZb',
        'fold_the_pink_towel_in_half_ep_5.mp4': '1VuGd7XwnH3Zs21_cbDuKleC1KgvxHbP2',
        'open_the_oven_ep_1.mp4': '1BIUWrr5gzNQhKVWa2iPIFps2zqld52TX',
        'open_the_oven_ep_2.mp4': '12qxyCQWjQxPIvrfE8JaJb-ptF9PFuCoI',
        'open_the_oven_ep_3.mp4': '1wHCjsoB-FHlJfAbv3dXoNty_lf8WF0IB',
        'open_the_oven_ep_4.mp4': '14LtExCpc6T3EAEKQPM6CnWVLwLdshlhS',
        'open_the_oven_ep_5.mp4': '1OED_LOspxODl1KEUxbyx8KGLD8vdoH2h',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_1.mp4': '1wlgW68pxpSZIJsx6BvzdfFQEUOkNN84g',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_2.mp4': '19Usf4IYsl3x8F3QvEvZ191rWIBbRRsrL',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_3.mp4': '1sr-FlpXCkrdcGJ-OXYK8vuOfSnDraOlQ',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_4.mp4': '1_qUlPZuHofNCvplJdu5AOTd4cUqUztcY',
        'clean_the_whiteboard_with_the_whiteboard_eraser_ep_5.mp4': '1nSdslv5kAlgVDeQzOzrN_AcZzMv6W9IG',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_1.mp4': '1e0GE3Mdg-nZ2m9r2HsIUWDlYHiYKeW97',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '1H6DW7bFtpbaLF2cJtPdokLwUuX1gASvr',
        'pour_2_shakes_of_pepper_into_the_red_plate_ep_3.mp4': '1FZSGVbDSRnAH943NmkcFT1NFOt1G4fLj',
        'pour_1_shake_of_pepper_into_the_red_plate_ep_4.mp4': '1au-SY2PuscR2e2zx75dnlig-ic2dVPLD',
        'pour_3_shakes_of_pepper_into_the_red_plate_ep_5.mp4': '1tIP8T-NcKrlck5bhC8p3HDhORxQdQuOH',
        'lift_the_green_bowl_one_time_ep_1.mp4': '1vTyEK0L095aQBBmesvjcHIR_LdDvvmyb',
        'lift_the_blue_bowl_one_time_ep_2.mp4': '1munKHPyPbTLKXrXvjlKPfKv2crqTkkmJ',
        'lift_the_red_bowl_three_times_ep_3.mp4': '1lrClZ2-jhdCjg9zT8WmIhPehKjyzAjSP',
        'lift_the_green_bowl_three_times_ep_4.mp4': '1S_dI85oen4TuFTUy2NfV5JN29eTZaSXX',
        'lift_the_blue_bowl_three_times_ep_5.mp4': '1YI9-i3dzqaox2KmPeKBgI0j8eO-FT1g_',
        'press_the_button_one_time_ep_1.mp4': '1ws7OnW5QndCb52IEkuo-1MocjS66_0jk',
        'press_the_button_three_times_ep_2.mp4': '1QkqOcZTIll1Czv4wVX1fkovZZNY7DwTc',
        'press_the_button_one_time_ep_3.mp4': '1ebmMKKk4be8jbK_tK2WapWG2xbLonJOz',
        'press_the_button_three_times_ep_4.mp4': '1bAQSm5bWERWL7rT04ZCaBg0gU1M_Q2cU',
        'press_the_button_three_times_ep_5.mp4': '1BcrRtV-4DkeTHiKxu8HkcyjZVznjrLSV'
    },
    'ood-x-vla': {
        'put_the_bread_on_the_red_plate_ep_1.mp4': '1YhRMF-1iPurWOuhqHRFaf9kvO43wRzgc',
        'put_the_bread_on_the_blue_plate_ep_2.mp4': '1gkcvwjZAbzte1YzkMAo11qn0u6yIXKEb',
        'put_the_bread_on_the_yellow_plate_ep_3.mp4': '16jooAveeNtLzG6nDY_txBPsZ0bb32Vra',
        'put_the_bread_on_the_yellow_plate_ep_4.mp4': '10n3GSFo3df231Qw1il36uQlyMrimlCzX',
        'put_the_bread_on_the_yellow_plate_ep_5.mp4': '1FG0fw17MKmHQwDqhfIv8GC0ELJsBD6_3',
        'put_the_blue_bowl_on_the_purple_coaster_ep_1.mp4': '1zZ8suPbtOEEgtYUdhOJn4cV4s1ywCboV',
        'put_the_red_bowl_on_the_orange_coaster_ep_2.mp4': '1PLm7o_3Hyw5azBIOGJ5u2AqoZuY5DUcJ',
        'put_the_yellow_bowl_on_the_green_coaster_ep_3.mp4': '1VY_FjJnS2QBIv96hfcX31h2ma0zltmq3',
        'put_the_yellow_bowl_on_the_orange_coaster_ep_4.mp4': '16eCGs4-Rjm4jsFTAvdvkUldeO3Ey8FXL',
        'put_the_green_bowl_on_the_yellow_coaster_ep_5.mp4': '1TdSLkZUYtfN9NhS7CcyG8TpWsqtDRiiq',
        'stack_the_yellow_block_on_the_red_block_ep_1.mp4': '1yFo3L1u1XG4eMstJXB0D1i8Rtm0J1luW',
        'stack_the_blue_block_on_the_blue_block_ep_2.mp4': '1PNiCwhGf2C5i1m4nzA_jOUkglziYL8AO',
        'stack_the_red_block_on_the_green_block_ep_3.mp4': '1nK-o-5Z1cJSEantSTrGH8HQ1Zulpxkq9',
        'stack_the_green_block_on_the_yellow_block_ep_4.mp4': '14Zp67LTrf1yY8-sFDw-u7uOu1gRp4Ocm',
        'stack_the_green_block_on_the_green_block_ep_5.mp4': '1oVkWYSOQF6LSBjDFmX0l7tgj-f6mJTaD',
        'collect_2_blocks_into_the_pink_box_ep_1.mp4': '15mMZXVVIq5POsjNhHbPaASI3_XSKtWVC',
        'collect_3_blocks_into_the_pink_box_ep_2.mp4': '1xYPa4CSOu1G9xRQjeWRzsMUetjkgspcx',
        'collect_5_blocks_into_the_blue_box_ep_3.mp4': '1QjUrM4NwWUE5jNXG_N5W7BCOiNpnNFMY',
        'collect_5_blocks_into_the_yellow_box_ep_4.mp4': '1QlKmnMEoMbQY1d3PL10QIc50dhDb2sEc',
        'collect_5_blocks_into_the_pink_box_ep_5.mp4': '11ToNJ4IFWISgwBe_dDek8LorTBJFDCgY',
        'fold_the_blue_towel_in_half_ep_1.mp4': '1TpiscrP_-LAq5XcTgaGh1EsGR9KlFKmP',
        'fold_the_blue_towel_in_half_ep_2.mp4': '12ws95-G0vES7pKAG1PuCBth5WfCZ_v7a',
        'fold_the_blue_towel_in_half_ep_3.mp4': '1teHsH22M12ey5XBlGCxn0feSRZDOINMY',
        'fold_the_blue_towel_in_half_ep_4.mp4': '1W91c2EQ8aCjHL1Ny0PA3MdnYqzG2gFvT',
        'fold_the_blue_towel_in_half_ep_5.mp4': '1xqhPNEZUWpGtX52ofSvI2iM4ZmmwrPu0',
        'pour_4_shakes_of_pepper_into_the_red_plate_ep_1.mp4': '1oLaMBe3aRHk6LFI-kpFYKG3nIZJUxLv7',
        'pour_5_shakes_of_pepper_into_the_red_plate_ep_2.mp4': '1MjHfUevdh1kIujuczyyn1WjtYA400-L0',
        'pour_1_shake_of_pepper_into_the_blue_plate_ep_3.mp4': '16jfuOhgbBG1M9P1oLPc-UsCfbvieTfs8',
        'pour_3_shakes_of_pepper_into_the_blue_plate_ep_4.mp4': '1C_pzeHQXoioOqhcPS9swQwq4L3dRzQWK',
        'pour_5_shakes_of_pepper_into_the_blue_plate_ep_5.mp4': '1Q0hdcwz2vA9P-OchVKbC4j_Lcv-MSYlW',
        'lift_the_green_bowl_two_times_ep_1.mp4': '1VC9qX6m_Y19eO9zmF60azwlkycGIztug',
        'lift_the_blue_bowl_two_times_ep_2.mp4': '1EyHB7UeDGHJgKXuXz--490jgb_tLO-ym',
        'lift_the_red_bowl_two_times_ep_3.mp4': '1QQNpU8QCGSRvt6wKRiqij4QvFRHC0_cg',
        'lift_the_yellow_bowl_two_times_ep_4.mp4': '1k2Bix7Gda9qh9_B0YvOo2oVD5B0tAIF4',
        'lift_the_yellow_bowl_four_times_ep_5.mp4': '1VPuH5JdR9byHUL7xDvbOFc_nhbRL8LgF',
        'press_the_button_two_times_ep_1.mp4': '1vxB_PCKK23akH3FhupJDncGFcLOf0Rbz',
        'press_the_button_four_times_ep_2.mp4': '1jnq5E58WvmppZi6FVXwH0CxUlhjc1YnF',
        'press_the_button_two_times_ep_3.mp4': '1nMkyCad79UtDozkLKFZCWKs3FrpPPIhY',
        'press_the_button_four_times_ep_4.mp4': '1-WO4C-VRV-OZCJH6dvC-EKbIyM0BItdv',
        'press_the_button_five_times_ep_5.mp4': '1Q-oZbAQKqA6VaH5ph0t2UU9bfwFt15Yf'
    }
};

function buildGoogleDriveViewUrl(fileId) {
    return `https://drive.google.com/file/d/${fileId}/view?usp=drive_link`;
}

function buildVideoOverrides(datasetKey, driveIdsByFile) {
    const annotationFiles = datasetAnnotationFiles[datasetKey] || [];

    return Object.fromEntries(
        annotationFiles.flatMap((fileName, index) => {
            const fileId = driveIdsByFile[fileName];

            if (!fileId) {
                return [];
            }

            const taskNumber = Math.floor(index / 5) + 1;
            const runNumber = (index % 5) + 1;

            return [[`${taskNumber}-${runNumber}`, {
                url: buildGoogleDriveViewUrl(fileId)
            }]];
        })
    );
}

const videoLinkOverrides = Object.fromEntries(
    Object.entries(pageDriveIds).map(([pageKey, driveIdsByFile]) => {
        const datasetKey = pageKey.startsWith('id-') ? 'id' : 'ood';
        return [pageKey, buildVideoOverrides(datasetKey, driveIdsByFile)];
    })
);

const hiddenVideoSlots = {
    'ood-pi-0': new Set(['4-1'])
};

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
            const isHidden = hiddenVideoSlots?.[methodKey]?.has(overrideKey) || false;

            return {
                annotation: annotationFiles[index] ? formatVideoAnnotation(annotationFiles[index]) : `${row.task} | Run ${runNumber}`,
                url: override ? override.url : '#',
                hidden: isHidden
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