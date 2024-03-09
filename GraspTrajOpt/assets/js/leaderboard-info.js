// Add new entries to 
// - leaderboard_entries
// - references
// - video_links

const leaderboard_entries = [
    // Model based grasping methods
    ['PoseRBPF@1@', 'GraspIt!@2@ + Top-Down', 'OMPL@3@', 'MoveIt', 'Near-to-Far', 'Model-Based', '58/100', '64/100', 'Fixed Random', 'Model-Based', '59/100', '59/100'],
    ['PoseCNN@4@', 'GraspIt!@2@ + Top-Down', 'OMPL@3@', 'MoveIt', 'Near-to-Far', 'Model-Based', '48/100', '50/100', 'Fixed Random', 'Model-Based', '38/100', '44/100'],
    ['GDRNPP@9@', 'GraspIt!@2@ + Top-Down', 'OMPL@3@', 'MoveIt', 'Near-to-Far', 'Model-Based', '66/100', '69/100', 'Fixed Random', 'Model-Based', '62/100', '64/100'],
    // Model free grasping methods
    ['UCN@5@', 'GraspNet@6@ + Top-Down', 'OMPL@3@', 'MoveIt', 'Near-to-Far', 'Model-Free', '43/100', '46/100', 'Fixed Random', 'Model-Free', '37/100', '40/100'],
    ['UCN@5@', 'Contact-graspnet@7@ + Top-Down', 'OMPL@3@', 'MoveIt', 'Near-to-Far', 'Model-Free', '60/100', '63/100', 'Fixed Random', 'Model-Free', '60/100', '64/100'],
    ['MSMFormer@8@', 'GraspNet@6@ + Top-Down', 'OMPL@3@', 'MoveIt', 'Near-to-Far', 'Model-Free', '38/100', '41/100', 'Fixed Random', 'Model-Free', '36/100', '41/100'],
    ['MSMFormer@8@', 'Contact-graspnet@7@ + Top-Down', 'OMPL@3@', 'MoveIt', 'Near-to-Far', 'Model-Free', '57/100', '65/100', 'Fixed Random', 'Model-Free', '61/100', '70/100'],
    ['MSMFormer@8@', 'Top-Down', 'OMPL@3@', 'MoveIt', 'Near-to-Far', 'Model-Free', '-', '-', 'Fixed Random', 'Model-Free', '56/100', '59/100'],
    // End-to-End Learning based Grasping
    ['DexNet 2.0 @10@', 'DexNet 2.0 @10@', 'OMPL@3@', 'MoveIt', 'Algorithmic', 'Model-Free', '-', '-', 'Algorithmic', 'Model-Free', '43/100', '51/100'],
]

const references = {
    "1": `X. Deng, A. Mousavian, Y. Xiang, F. Xia, T. Bretl, and D. Fox. Poserbpf: A rao–blackwellized
    particle filter for 6-d object pose tracking. IEEE Transactions on Robotics, 37(5):1328–1342,
    2021. <b>[</b> <a target="_blank" href="https://github.com/NVlabs/PoseRBPF">Official Code</a> | <a target="_blank" href="https://github.com/IRVLUTD/posecnn-pytorch">SceneReplica Version</a> <b>]</b>`,
    "2": `A. T. Miller and P. K. Allen. Graspit! a versatile simulator for robotic grasping. IEEE Robotics
    & Automation Magazine, 11(4):110–122, 2004. <b>[</b> <a target="_blank" href="https://github.com/graspit-simulator">Official Code</a> <b>]</b>`,
    "3": `I. A. Sucan, M. Moll, and L. E. Kavraki. The open motion planning library. IEEE Robotics &
    Automation Magazine, 19(4):72–82, 2012. <b>[</b> <a target="_blank" href="https://github.com/ompl/ompl">Official Code</a> <b>]</b>`,
    "4": `Y. Xiang, T. Schmidt, V. Narayanan, and D. Fox. Posecnn: A convolutional neural network for
    6d object pose estimation in cluttered scenes. arXiv preprint arXiv:1711.00199, 2017.
    <b>[</b> <a target="_blank" href="https://github.com/NVlabs/PoseCNN-PyTorch">Official Code</a> | <a target="_blank" href="https://github.com/IRVLUTD/PoseCNN-PyTorch-NV-Release">SceneReplica Version</a> <b>]</b>`,
    "5": `Y. Xiang, C. Xie, A. Mousavian, and D. Fox. Learning rgb-d feature embeddings for unseen
    object instance segmentation. In Conference on Robot Learning, pages 461–470. PMLR, 2021.
    <b>[</b> <a target="_blank" href="https://github.com/NVlabs/UnseenObjectClustering">Official Code</a> | <a target="_blank" href="https://github.com/IRVLUTD/UnseenObjectClustering">SceneReplica Version</a> <b>]</b>`,
    "6": `A. Mousavian, C. Eppner, and D. Fox. 6-dof graspnet: Variational grasp generation for object
    manipulation. In Proceedings of the IEEE/CVF International Conference on Computer Vision,
    pages 2901–2910, 2019.
    <b>[</b> <a target="_blank" href="https://github.com/NVlabs/6dof-graspnet">Official Code</a> | <a target="_blank" href="https://github.com/IRVLUTD/pytorch_6dof-graspnet">SceneReplica Version</a> <b>]</b>`,
    "7": `M. Sundermeyer, A. Mousavian, R. Triebel, and D. Fox. Contact-graspnet: Efficient 6-dof
    grasp generation in cluttered scenes. In 2021 IEEE International Conference on Robotics and
    Automation (ICRA), pages 13438–13444. IEEE, 2021.
    <b>[</b> <a target="_blank" href="https://github.com/NVlabs/contact_graspnet">Official Code</a> | <a target="_blank" href="https://github.com/IRVLUTD/contact_graspnet">SceneReplica Version</a> <b>]</b>`,
    "8": `Y. Lu, Y. Chen, N. Ruozzi, and Y. Xiang. Mean shift mask transformer for unseen object    instance segmentation. arXiv preprint arXiv:2211.11679, 2022.
    <b>[</b> <a target="_blank" href="https://github.com/YoungSean/UnseenObjectsWithMeanShift">Official Code</a> <b>]</b>`,
    "9": `G. Wang, F. Manhardt, F. Tombari, and X. Ji, 
    GDR-Net: Geometry-guided direct regression network for monocular 6d object pose estimation, 
    in IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), June 2021, pp. 16 611–16 62
    <b>[</b> <a target="_blank" href="https://github.com/shanice-l/gdrnpp_bop2022">Official Code</a> | <a target="_blank" href="https://github.com/IRVLUTD/gdrnpp_bop2022">SceneReplica Version</a> <b>]</b>`,
    "10": `J. Mahler, J. Liang, S. Niyaz, M. Laskey, R. Doan, X. Liu, J. A. Ojea,
    and K. Goldberg, “Dex-net 2.0: Deep learning to plan robust grasps
    with synthetic point clouds and analytic grasp metrics”, arXiv preprint
    arXiv:1703.09312, 2017.
    <b>[</b> <a target="_blank" href="https://github.com/BerkeleyAutomation/gqcnn">Official Code</a> | <a target="_blank" href="https://github.com/IRVLUTD/gqcnn">SceneReplica Version</a> <b>]</b>`
}

const video_links = {
    "1": [
        // scene-ID, near-to-far-vid-link, fix-rand-vid-link
        [10, 'https://drive.google.com/file/d/15LcsuBJjX8J20CjmgEj-W2fFiFt4yg6k/preview', '#'],
        [25, 'https://drive.google.com/file/d/1jHSvNdiZCI8VFi38-q6lNblunsMgFqOG/preview', '#'],
        [27, 'https://drive.google.com/file/d/1ZAIbBTiPOzGuJGOLLpo5LxAcdSgoYWjg/preview', '#'],
        [33, 'https://drive.google.com/file/d/1cFZtlqYCbHURYzFIQRqndfvet9BXCjrK/preview', '#'],
        [36, 'https://drive.google.com/file/d/1Ga-SbVMbkKgx2FPQyUXGnOmGHnnLVaHB/preview', '#'],
        [38, 'https://drive.google.com/file/d/1zVAB74xCLNPqmwAW7W91tt4xS5MGQr99/preview', '#'],
        [39, 'https://drive.google.com/file/d/10DeH0vdR6TjqoblUVvzryhoSHucdtLMI/preview', '#'],
        [48, 'https://drive.google.com/file/d/1kJOnKi8GQWuRgoXLVP7pC4ohT4Xwmf_R/preview', '#'],
        [56, 'https://drive.google.com/file/d/1VBNRh7I5_50sDasOeXDFrZlEUBg55f_w/preview', '#'],
        [65, 'https://drive.google.com/file/d/18BXWWZdEvVLOAidklOayFvZtx1tPvxKk/preview', '#'],
        [68, 'https://drive.google.com/file/d/1XJz3EaUNVdgf1GWpvw3sgxB_lFIP1ofR/preview', '#'],
        [77, 'https://drive.google.com/file/d/1u65S8vyxmb-zJLSAWJaI_1BdNqxFtT7g/preview', '#'],
        [83, 'https://drive.google.com/file/d/1W0OHLREmwYPREs-zWIasU46fIKTftodU/preview', '#'],
        [84, 'https://drive.google.com/file/d/1Pz6DVe0uaUUhOOj7LNXWyilRO8b2qHmI/preview', '#'],
        [104, 'https://drive.google.com/file/d/1Pn2GXrpwz_sQjhCDyNIuLfnomIqTzsQL/preview', '#'],
        [122, 'https://drive.google.com/file/d/1miPIchdg6PwDsyzjT0jrLE_6ajUdjmy3/preview', '#'],
        [130, 'https://drive.google.com/file/d/15W0LTyG_q4J0hD48YxZvvU1JJUJpDIKv/preview', '#'],
        [141, 'https://drive.google.com/file/d/1fv2iM5j9_1R1njOTzAbd6edfVWKMTPLb/preview', '#'],
        [148, 'https://drive.google.com/file/d/1GO5SfUwm_KNS4jXkWSicJMoYptT7HAzN/preview', '#'],
        [161, 'https://drive.google.com/file/d/1cCBzobehGKYluJEfUeMVkMsvm_Od4TpI/preview', '#'],
    ],
    }
