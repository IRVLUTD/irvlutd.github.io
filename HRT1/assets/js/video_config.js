// -----------------------------
// 1) CONFIG — easy to edit
// -----------------------------

// How many videos per row (1..6)
const VIDEOS_PER_ROW = 4;

// Shared task description list (same for all trials; 16 entries)
const TASKS = [
  "Task 1: Put bread in toaster.",
  "Task 2: Clean plate with tissue.",
  "Task 3: Clean plate with brush.",
  "Task 4: Move the chair.",
  "Task 5: Rearrange sugarbox in the shelf.",
  "Task 6: Close jar with lid.",
  "Task 7: Take out sugarbox from the shelf.",
  "Task 8: Put seasoning on omelette.",
  "Task 9: Place bottle in the shelf.",
  "Task 10: Hang the cap onto a wall hook.",
  "Task 11: Remove the cap from a wall hook.",
  "Task 12: Pour lays on the plate.",
  "Task 13: Clean plate with towel.",
  "Task 14: Put toy in bin.",
  "Task 15: Close the fire extinguisher door.",
  "Task 16: Displace cracker box."
];

// One place to edit per-trial data: each trial has 16 clips with { src, ok }
const TRIALS = {
  "trial-0": [
    { src: "assets/videos/human_demo/task_27_put_bread_inside_toaster.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_44_12s_clean_plate_with_tissue.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_45_12s_clean_plate_with_brush.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_18_10s-move-chair.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_57_rearrange_sugrabox_shelf.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_47_8s_close_jar_with_red_lid_with_left_hand.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_59_takeout_sugarbox_from_shelf.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_39_seasoning_on_omlette_v1.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_56_put_bottle_in_shelf.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_33_hang_cap.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_48_4s_remove_cap_from_hook_left_hand_person2.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_41_12s_serve_lays_on_plate_left_hand.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_42_13s_clean_plate_with_towel.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_28_put_toy_in_bin.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_54_7s_close_fire_extinguisher_door.mp4", successful_trial: true },
    { src: "assets/videos/human_demo/task_26_crackerbox.mp4", successful_trial: true }
  ],
  "trial-1": [
    { src: "assets/videos/trials/task_1_trial_1.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_2_trial_1.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_3_trial_1.mp4", successful_trial: true },
    { src: "assets/videos/trials/task_4_trial_1.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_5_trial_1.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_6_trial_1.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_7_trial_1.mp4", successful_trial: true },
    { src: "assets/videos/trials/task_8_trial_1.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_9_trial_1.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_10_trial_1.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_11_trial_1.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_12_trial_1.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_13_trial_1.mp4", successful_trial: true },
    { src: "assets/videos/trials/task_14_trial_1.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_15_trial_1.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_16_trial_1.mp4", successful_trial: true  }
  ],
  "trial-2": [
    { src: "assets/videos/trials/task_1_trial_2.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_2_trial_2.mp4", successful_trial: true },
    { src: "assets/videos/trials/task_3_trial_2.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_4_trial_2.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_5_trial_2.mp4", successful_trial: false  },
    { src: "assets/videos/trials/task_6_trial_2.mp4", successful_trial: true },
    { src: "assets/videos/trials/task_7_trial_2.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_8_trial_2.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_9_trial_2.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_10_trial_2.mp4", successful_trial: false  },
    { src: "assets/videos/trials/task_11_trial_2.mp4", successful_trial: true },
    { src: "assets/videos/trials/task_12_trial_2.mp4", successful_trial: false  },
    { src: "assets/videos/trials/task_13_trial_2.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_14_trial_2.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_15_trial_2.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_16_trial_2.mp4", successful_trial: true }
  ],
  "trial-3": [
    { src: "assets/videos/trials/task_1_trial_3.mp4", successful_trial: true },
    { src: "assets/videos/trials/task_2_trial_3.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_3_trial_3.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_4_trial_3.mp4", successful_trial: true },
    { src: "assets/videos/trials/task_5_trial_3.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_6_trial_3.mp4", successful_trial: false  },
    { src: "assets/videos/trials/task_7_trial_3.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_8_trial_3.mp4", successful_trial: true },
    { src: "assets/videos/trials/task_9_trial_3.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_10_trial_3.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_11_trial_3.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_12_trial_3.mp4", successful_trial: true },
    { src: "assets/videos/trials/task_13_trial_3.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_14_trial_3.mp4", successful_trial: true  },
    { src: "assets/videos/trials/task_15_trial_3.mp4", successful_trial: true },
    { src: "assets/videos/trials/task_16_trial_3.mp4", successful_trial: true  }
  ]
};
