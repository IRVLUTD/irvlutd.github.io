// Add new entries to 
// - leaderboard_entries
// - references
// - video_links

const leaderboard_entries = [
    // Model based grasping methods






    ['#', 'ViT-Small', 'CODA@3@', '#', '10', '82.18', '6.48'],
    ['ViT-Base', 'ViT-Small', 'CODA@3@', 'KD@4@', '10', '82.39', '7.33'],
    ['ViT-Base', 'ViT-Small', 'CODA@3@', 'DKD@5@', '10', '82.27', '7.81'],
    ['ViT-Base', 'ViT-Small', 'CODA@3@', 'FitNets@6@', '10', '81.83', '8.83'],
    ['ViT-Base', 'ViT-Small', 'CODA@3@', 'ReviewKD@7@', '10', '82.20', '7.54'],
    ['ViT-Base', 'ViT-Small', 'CODA@3@', 'KD-Token@8@', '10', '83.72', '6.40'],  
    ['#', 'ViT-Base', 'CODA@3@', '#', '10', '86.16', '5.63'],
    ['ViT-Large', 'ViT-Base', 'CODA@3@', 'KD@4@', '10', '87.41', '5.45'],
    ['ViT-Large', 'ViT-Base', 'CODA@3@', 'DKD@5@', '10', '85.42', '6.55'],
    ['ViT-Large', 'ViT-Base', 'CODA@3@', 'FitNets@6@', '10', '85.95', '6.56'],
    ['ViT-Large', 'ViT-Base', 'CODA@3@', 'ReviewKD@7@', '10', '86.21', '5.64'],
    ['ViT-Large', 'ViT-Base', 'CODA@3@', 'KD-Token@8@', '10', '88.10', '5.39'],


    
    ['#', 'ViT-Small', 'Dual@2@', '#', '10', '79.85', '6.12'],
    ['ViT-Base', 'ViT-Small', 'Dual@2@', 'KD@4@', '10', '80.16', '5.76'],
    ['ViT-Base', 'ViT-Small', 'Dual@2@', 'DKD@5@', '10', '80.44', '6.96'],
    ['ViT-Base', 'ViT-Small', 'Dual@2@', 'FitNets@6@', '10', '80.70', '5.73'],
    ['ViT-Base', 'ViT-Small', 'Dual@2@', 'ReviewKD@7@', '10', '80.33', '5.86'],
    ['ViT-Base', 'ViT-Small', 'Dual@2@', 'KD-Token@8@', '10', '81.32', '5.67'],  
    ['#', 'ViT-Base', 'Dual@2@', '#', '10', '84.66', '5.91'],
    ['ViT-Large', 'ViT-Base', 'Dual@2@', 'KD@4@', '10', '83.40', '8.23'],
    ['ViT-Large', 'ViT-Base', 'Dual@2@', 'DKD@5@', '10', '84.93', '4.95'],
    ['ViT-Large', 'ViT-Base', 'Dual@2@', 'FitNets@6@', '10', '83.12', '8.33'],
    ['ViT-Large', 'ViT-Base', 'Dual@2@', 'ReviewKD@7@', '10', '84.11', '5.19'],
    ['ViT-Large', 'ViT-Base', 'Dual@2@', 'KD-Token@8@', '10', '85.32', '5.64'],



    ['#', 'ViT-Small', 'L2P@1@', '#', '10', '77.71', '7.12'],
    ['ViT-Base', 'ViT-Small', 'L2P@1@', 'KD@4@', '10', '77.92', '8.30'],
    ['ViT-Base', 'ViT-Small', 'L2P@1@', 'DKD@5@', '10', '78.21', '9.13'],
    ['ViT-Base', 'ViT-Small', 'L2P@1@', 'FitNets@6@', '10', '79.56', '5.89'],
    ['ViT-Base', 'ViT-Small', 'L2P@1@', 'ReviewKD@7@', '10', '78.50', '8.04'],
    ['ViT-Base', 'ViT-Small', 'L2P@1@', 'KD-Token@8@', '10', '79.78', '7.07'],  
    ['#', 'ViT-Base', 'L2P@1@', '#', '10', '83.02', '6.06'],
    ['ViT-Large', 'ViT-Base', 'L2P@1@', 'KD@4@', '10', '80.96', '10.17'],
    ['ViT-Large', 'ViT-Base', 'L2P@1@', 'DKD@5@', '10', '83.29', '4.99'],
    ['ViT-Large', 'ViT-Base', 'L2P@1@', 'FitNets@6@', '10', '83.60', '5.21'],
    ['ViT-Large', 'ViT-Base', 'L2P@1@', 'ReviewKD@7@', '10', '83.12', '7.97'],
    ['ViT-Large', 'ViT-Base', 'L2P@1@', 'KD-Token@8@', '10', '85.20', '4.58'],
   







   
   
]

const leaderboard_entries_imagenet = [
    // Model based grasping methods





    ['#', 'ViT-Small', 'CODA@3@', '#', '10', '67.44', '8.52'],
    ['ViT-Base', 'ViT-Small', 'CODA@3@', 'KD@4@', '10', '69.23', '8.57'],
    ['ViT-Base', 'ViT-Small', 'CODA@3@', 'DKD@5@', '10', '68.92', '8.39'],
    ['ViT-Base', 'ViT-Small', 'CODA@3@', 'FitNets@6@', '10', '69.87', '7.38'],
    ['ViT-Base', 'ViT-Small', 'CODA@3@', 'ReviewKD@7@', '10', '70.19', '7.68'],
    ['ViT-Base', 'ViT-Small', 'CODA@3@', 'KD-Token@8@', '10', '70.94', '6.17'],  
    ['#', 'ViT-Base', 'CODA@3@', '#', '10', '75.78', '5.70'],
    ['ViT-Large', 'ViT-Base', 'CODA@3@', 'KD@4@', '10', '77.51', '3.44'],
    ['ViT-Large', 'ViT-Base', 'CODA@3@', 'DKD@5@', '10', '76.70', '4.84'],
    ['ViT-Large', 'ViT-Base', 'CODA@3@', 'FitNets@6@', '10', '74.55', '6.81'],
    ['ViT-Large', 'ViT-Base', 'CODA@3@', 'ReviewKD@7@', '10', '75.72', '4.14'],
    ['ViT-Large', 'ViT-Base', 'CODA@3@', 'KD-Token@8@', '10', '77.28', '4.63'],


    
    ['#', 'ViT-Small', 'Dual@2@', '#', '10', '64.27', '5.93'],
    ['ViT-Base', 'ViT-Small', 'Dual@2@', 'KD@4@', '10', '65.68', '7.26'],
    ['ViT-Base', 'ViT-Small', 'Dual@2@', 'DKD@5@', '10', '65.44', '7.27'],
    ['ViT-Base', 'ViT-Small', 'Dual@2@', 'FitNets@6@', '10', '66.20', '5.93'],
    ['ViT-Base', 'ViT-Small', 'Dual@2@', 'ReviewKD@7@', '10', '65.69', '6.56'],
    ['ViT-Base', 'ViT-Small', 'Dual@2@', 'KD-Token@8@', '10', '66.81', '4.55'],  
    ['#', 'ViT-Base', 'Dual@2@', '#', '10', '72.44', '3.80'],
    ['ViT-Large', 'ViT-Base', 'Dual@2@', 'KD@4@', '10', '73.90', '3.31'],
    ['ViT-Large', 'ViT-Base', 'Dual@2@', 'DKD@5@', '10', '75.24', '4.15'],
    ['ViT-Large', 'ViT-Base', 'Dual@2@', 'FitNets@6@', '10', '71.23', '5.71'],
    ['ViT-Large', 'ViT-Base', 'Dual@2@', 'ReviewKD@7@', '10', '72.19', '5.72'],
    ['ViT-Large', 'ViT-Base', 'Dual@2@', 'KD-Token@8@', '10', '73.63', '3.50'],



    ['#', 'ViT-Small', 'L2P@1@', '#', '10', '61.95', '6.52'],
    ['ViT-Base', 'ViT-Small', 'L2P@1@', 'KD@4@', '10', '63.36', '6.74'],
    ['ViT-Base', 'ViT-Small', 'L2P@1@', 'DKD@5@', '10', '62.91', '6.55'],
    ['ViT-Base', 'ViT-Small', 'L2P@1@', 'FitNets@6@', '10', '64.29', '6.37'],
    ['ViT-Base', 'ViT-Small', 'L2P@1@', 'ReviewKD@7@', '10', '63.64', '6.36'],
    ['ViT-Base', 'ViT-Small', 'L2P@1@', 'KD-Token@8@', '10', '65.09', '5.37'],  
    ['#', 'ViT-Base', 'L2P@1@', '#', '10', '71.59', '5.65'],
    ['ViT-Large', 'ViT-Base', 'L2P@1@', 'KD@4@', '10', '74.12', '4.60'],
    ['ViT-Large', 'ViT-Base', 'L2P@1@', 'DKD@5@', '10', '74.58', '4.69'],
    ['ViT-Large', 'ViT-Base', 'L2P@1@', 'FitNets@6@', '10', '70.39', '5.84'],
    ['ViT-Large', 'ViT-Base', 'L2P@1@', 'ReviewKD@7@', '10', '72.17', '6.11'],
    ['ViT-Large', 'ViT-Base', 'L2P@1@', 'KD-Token@8@', '10', '71.89', '3.42'],
   


   
]

const references = {
    "1": `Zifeng Wang, Zizhao Zhang, Chen-Yu Lee, Han Zhang, Ruoxi Sun, Xiaoqi Ren, Guolong Su,
Vincent Perot, Jennifer Dy, and Tomas Pfister. Learning to prompt for continual learning. In
Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, pages
139–149, 2022. <b>[</b> <a target="_blank" href="https://arxiv.org/abs/2112.08654">Paper</a> <b>]</b>`,
    "2": `Zifeng Wang, Zizhao Zhang, Sayna Ebrahimi, Ruoxi Sun, Han Zhang, Chen-Yu Lee, Xiaoqi
Ren, Guolong Su, Vincent Perot, Jennifer Dy, et al. Dualprompt: Complementary prompting for
rehearsal-free continual learning. In European Conference on Computer Vision, pages 631–648.
Springer, 2022. <b>[</b> <a target="_blank" href="https://arxiv.org/abs/2204.04799">Paper</a> <b>]</b>`,
    "3": `James Seale Smith, Leonid Karlinsky, Vyshnavi Gutta, Paola Cascante-Bonilla, Donghyun
Kim, Assaf Arbelle, Rameswar Panda, Rogerio Feris, and Zsolt Kira. Coda-prompt: Continual
decomposed attention-based prompting for rehearsal-free continual learning. In Proceedings
of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), pages
11909–11919, June 2023. <b>[</b>  <a target="_blank" href="https://arxiv.org/abs/2211.13218">Paper</a><b>]</b>`,
    "4": `Geoffrey Hinton, Oriol Vinyals, and Jeff Dean. Distilling the
knowledge in a neural network, 2015. <b>[</b> <a target="_blank" href="https://arxiv.org/abs/1503.02531">Paper</a><b>]</b>`,
    "5": `Borui Zhao, Quan Cui, Renjie Song, Yiyu Qiu, and Jiajun
Liang. Decoupled knowledge distillation. In Proceedings of
the IEEE/CVF Conference on Computer Vision and Pattern
Recognition (CVPR), pages 11953–11962, 2022. <b>[</b> <a target="_blank" href="https://arxiv.org/abs/2203.08679">Paper</a><b>]</b>`,
    "6": `Adriana Romero, Nicolas Ballas, Samira Ebrahimi Kahou,
Antoine Chassang, Carlo Gatta, and Yoshua Bengio. Fitnets:
Hints for thin deep nets. arXiv preprint arXiv:1412.6550,
2014. <b>[</b> <a target="_blank" href="https://arxiv.org/abs/1412.6550">Paper</a><b>]</b>`,
    "7": `Pengguang Chen, Shu Liu, Hengshuang Zhao, and Jiaya Jia.
Distilling knowledge via knowledge review. In Proceedings
of the IEEE/CVF Conference on Computer Vision and Pat-
tern Recognition (CVPR), pages 5008–5017, 2021. <b>[</b> <a target="_blank" href="https://arxiv.org/abs/2104.09044">Paper</a><b>]</b>`,
    "8": `Hugo Touvron, Matthieu Cord, Matthijs Douze, Francisco
Massa, Alexandre Sablayrolles, and Herv´e J´egou. Training
data-efficient image transformers & distillation through at-
tention. arXiv preprint arXiv:2012.12877, 2020. <b>[</b> <a target="_blank" href="https://arxiv.org/abs/2012.12877">Paper</a><b>]</b>`,
}

const video_links = {
    "1": [
        // scene-ID, near-to-far-vid-link, fix-rand-vid-link
        [10, 'https://drive.google.com/file/d/1iH_yzc2oADWUyigakGnOY2Aald8kUsF5/preview', 'https://www.youtube.com/embed/xotvTLLUBjc'],
        [25, 'https://drive.google.com/file/d/1lFAba7ZQs2sfQQK4DnfpA-jZJcqBZrbD/preview', 'https://drive.google.com/file/d/18Ltzd3dnj_C2AUUasRgQ_SyZBY-zzPfS/preview'],
        [27, 'https://drive.google.com/file/d/1PUFa-2pfaLhLPJUGnBOWISyCyltEQQPl/preview', 'https://drive.google.com/file/d/1B7ad2z5vS6yImecfqvXnZUEhhlEUYZ4w/preview'],
        [33, 'https://drive.google.com/file/d/1eua9_t38DaqDw9B0bCUJnEk0iQ6lVOCv/preview', 'https://drive.google.com/file/d/1AReJZRaUgMx_RBzDOlcWdeQd3lffbzgh/preview'],
        [36, 'https://drive.google.com/file/d/13HMz_TFdJDc1ayH0G0d8AkBGN4AqHM_Y/preview', 'https://drive.google.com/file/d/1eAqjss6mbifX8zx_JUO95lkL0E-jmx0k/preview'],
        [38, 'https://drive.google.com/file/d/1VT9k9aD8mzaWaf-G7QARF8z8FvBkqeHz/preview', 'https://drive.google.com/file/d/1r0lUhEbpNvDCVVPGv_yVnjOemx7l4F25/preview'],
        [39, 'https://drive.google.com/file/d/1HYz5ln3qjHwvUHJUTGJPrYyLFFQRBIaz/preview', 'https://drive.google.com/file/d/1RL3N5u82Sv4-tP45c2xxw2SR2gCzQKqU/preview'],
        [48, 'https://drive.google.com/file/d/1-ZoI3YzIQEqZsjSDdNwE5I-9efmvQX6Y/preview', 'https://drive.google.com/file/d/1-e3HIx0QYCTNW1PsfV7qhPrk5TH5tOFp/preview'],
        [56, 'https://drive.google.com/file/d/1FQlZGXkvsFcKm-r1MOV161w_nQllhdyd/preview', 'https://drive.google.com/file/d/1aJvtL-IqeRpD8Hbo1EKfdju-OJx5vtQD/preview'],
        [65, 'https://drive.google.com/file/d/1cvsroRCuV0bA7F8SJgnQ9m7iQR7Up6GE/preview', 'https://drive.google.com/file/d/1vBYjvsqlbW8kAODIqiUY72EBBZEWhzJ8/preview'],
        [68, 'https://drive.google.com/file/d/1A0gIdgkj73JpQ-7OjIeHE2ft5vzFZT10/preview', 'https://drive.google.com/file/d/1XKjiTVObpkAlEdKHOrCRR0wKCsqiewuk/preview'],
        [77, 'https://drive.google.com/file/d/1wBMtemAZ9Slsq-_aqFzEeNb7ocXCl7cn/preview', 'https://drive.google.com/file/d/1EP3Fj9X5w5jOcPJ1B_DO2fO92NOrISP0/preview'],
        [83, 'https://drive.google.com/file/d/1r-zmDW0buE_lFGLVccgHw_UL6rM01q22/preview', 'https://drive.google.com/file/d/15mK_WPUOirW2KT6igGNAqdeUhldNRPON/preview'],
        [84, 'https://drive.google.com/file/d/1FzaEGm8tOdnAjDoEaP9ZZtrINVMPk90R/preview', 'https://drive.google.com/file/d/1QcwXw9hHtOI6XArMw4CCfXFRJBabQhyc/preview'],
        [104, 'https://drive.google.com/file/d/1OQPixzjHgyJmXKvj4HVO7joVH9GRA99r/preview', 'https://drive.google.com/file/d/1r54S6QnxjWtsHZk0em6xxWvdtuvROmJO/preview'],
        [122, 'https://drive.google.com/file/d/1yXpjsvFIUg7w7mrOAPVvuJje_LLLZOfP/preview', 'https://drive.google.com/file/d/1klo1gP5Na9FaAqpxUxhkn-YTXRjb2LOA/preview'],
        [130, 'https://drive.google.com/file/d/108Nv8ReXVNeti77hcjMiSuBisZPS0gHH/preview', 'https://drive.google.com/file/d/1EbD_VxRozrGRNJ4vr_1RsZXBRPtdW48N/preview'],
        [141, 'https://drive.google.com/file/d/1Y8KfiUEB-J8D0s-ufgoifSBMtqNiNakd/preview', 'https://drive.google.com/file/d/1UC_y3zSMuuir27FUBDT0CbcyiUGZ1F1d/preview'],
        [148, 'https://drive.google.com/file/d/1pkCsOlTKhmli4Ymvw-CG5Z5USQ3xcRTV/preview', 'https://drive.google.com/file/d/1N1xil_4YHRxgk6UR5SsKsMp8oVIF4nMg/preview'],
        [161, 'https://drive.google.com/file/d/1sANwBr_RjTUQ1V7uEMpCChQyowIZksOg/preview', 'https://drive.google.com/file/d/1kSUyt24OeNgbxQPdNaBX8YXzYUkWV7Xe/preview'],
    ],
    "2": [
        [10, 'https://drive.google.com/file/d/1WslIEADcu89f0xYXCYpxPhDBTLGKkbB3/preview', 'https://drive.google.com/file/d/13cRsFkjtcJ12UzJMXtl_WxXQaPkrhoWq/preview'],
        [25, 'https://drive.google.com/file/d/1_jqH1GeTX-BaMyr8SX3fpPOqtIgVUQln/preview', 'https://drive.google.com/file/d/13cRsFkjtcJ12UzJMXtl_WxXQaPkrhoWq/preview'],
        [27, 'https://drive.google.com/file/d/1QPSeha4bQraORkHJqiJPf-se7g2NffuQ/preview', 'https://drive.google.com/file/d/1C0cEHArbdu3ahmhlBe2iSvX2QXM16BE-/preview'],
        [33, 'https://drive.google.com/file/d/1p-v1cNzJqmrRJxJL54js0pr-Q6PeON9L/preview', 'https://drive.google.com/file/d/12GR7Y7SPglZFVdgYyDkXa2jr3VcogU2y/preview'],
        [36, 'https://drive.google.com/file/d/1v26WBsH82wmbNvfBT0pOSlYuZeEaF8-k/preview', 'https://drive.google.com/file/d/1cu_6tdB4-tLlCCY7aLKnS_DTkV2IgVRT/preview'],
        [38, 'https://drive.google.com/file/d/1eTjgOJiLpcDMOsSVbil6JUe0XnJi8b6I/preview', 'https://drive.google.com/file/d/1MHQeE6d6xr4SaDzjSnHbaJCY1iDRFlIs/preview'],
        [39, 'https://drive.google.com/file/d/19jb1c9Zcqx-tkrJ8-b4KZehpqUrqyXYW/preview', 'https://drive.google.com/file/d/1GVnRWOd-jI2bgLtO6oCVxGkGV6NiUxdJ/preview'],
        [48, 'https://drive.google.com/file/d/12jJKTpHtxIW-Hk0u9Xl65DaCdBjt_A-N/preview', 'https://drive.google.com/file/d/1ph_QiKEh9IVUvhgL36oC6q8nHGvHvT43/preview'],
        [56, 'https://drive.google.com/file/d/1O12duR_wWeVkfxXypomUgph-HkfXx0p5/preview', 'https://drive.google.com/file/d/1dOJ55QQbE7E4LUBKol3VKJRKex-PF6JH/preview'],
        [65, 'https://drive.google.com/file/d/15xotcELK-bZEY8WegWy91xXdOFEHmtgC/preview', 'https://drive.google.com/file/d/1Mv7J3YNaihZ5uYheOmftU8eI89oVFSWQ/preview'],
        [68, 'https://drive.google.com/file/d/1byfdLov_J8DXS35sOUgBmoFaM9XhTZbC/preview', 'https://drive.google.com/file/d/1SuZjKISiUEpk7QMHp1t3SmdonjqKvaDn/preview'],
        [77, 'https://drive.google.com/file/d/1JSk6gfh3v1h5tZsKumbFO_ykAaFd13eL/preview', 'https://drive.google.com/file/d/1Sas4HsRdp2SKdl-Ey0SG1jPD8rDn2mr2/preview'],
        [83, 'https://drive.google.com/file/d/1wf6UCdF85Vwxt3HK326APQa5-cMsYP1Z/preview', 'https://drive.google.com/file/d/1NNEVh9yAm0GIhl_AFb_qzgMXhHDJJzQ3/preview'],
        [84, 'https://drive.google.com/file/d/1XIc0F_s9Q0pYWiMZeDicqqBETZt5jjJ5/preview', 'https://drive.google.com/file/d/1FW_8zF8SRhoO62slyYkz3FBGsats1VXs/preview'],
        [104, 'https://drive.google.com/file/d/1T65qkjUGmkf5_XDNVDixlaaPcY3qKtOG/preview', 'https://drive.google.com/file/d/1Ms1SIDFn47xG_GqFOiw42iHjF-ko8OYA/preview'],
        [122, 'https://drive.google.com/file/d/1LJFZwvA9izreexgGteAd191WufGMwUVP/preview', 'https://drive.google.com/file/d/1Zrt7tg6VIg3qZp7YBhvyvrEc-qht69m0/preview'],
        [130, 'https://drive.google.com/file/d/1NiNX1qTcZv6MDdIIgBSdXgmaKdYapfSQ/preview', 'https://drive.google.com/file/d/1Cyp_o8aY795-B2OwVbR7VLDQgY-WgUJW/preview'],
        [141, 'https://drive.google.com/file/d/1rPusFFYr4skSGYqsXKba_GcMwN_yuhLK/preview', 'https://drive.google.com/file/d/1kGnMNvxCo408Qxrf5-e6xkfwiA1Abxav/preview'],
        [148, 'https://drive.google.com/file/d/100MgOOXERs_5BdDMbB2jpqXpVyh6yl31/preview', 'https://drive.google.com/file/d/1Gm4OPzxCoJh-KQ4P_HmawN4F56HpB5Ri/preview'],
        [161, 'https://drive.google.com/file/d/1hPt4sJMLrprWt3lulskDzUN6SSHNipRG/preview', 'https://drive.google.com/file/d/1qXg4XsOR2vD8lebKrAc5A_iwDqBk1k4K/preview'],
    ],
    "3" : [
        // scene-ID, near-to-far-vid-link, fix-rand-vid-link
        [10, 'https://drive.google.com/file/d/14crOLrKkuQcjSDea5l90uQYogAdle_VB/preview', 'https://drive.google.com/file/d/1vPjQRB3ym55XQlq58MiAHou9RR6pXREi/preview'],
        [25, 'https://drive.google.com/file/d/19vsJiK3zykXd3HLwTyZH1D6dFHCm1oLi/preview', 'https://drive.google.com/file/d/1YsDhzxwtDmlidL0R7Cpk9DHE8BPNnOJJ/preview'],
        [27, 'https://drive.google.com/file/d/1m1FCl4dlvLB20NauASTvPFk3rybw6UbU/preview', 'https://drive.google.com/file/d/1i_otp0ytWxCJGEX4IA2diVl9RDi_1u-Z/preview'],
        [33, 'https://drive.google.com/file/d/1rBetdy_ZgJupBR-W_PlZhM0VbNFgp3UF/preview', 'https://drive.google.com/file/d/1I0YBgfRTlDIFN1oGbcflNT6zKZylI91I/preview'],
        [36, 'https://drive.google.com/file/d/1J_bwKhqJ9F3isIykyor9yrzoYalsoDqc/preview', 'https://drive.google.com/file/d/17SYtqoLdr1ro0d5JF9vYYrmSjpHkhpYM/preview'],
        [38, 'https://drive.google.com/file/d/1JpM0R2PFOU9PGoVoDrVLdNIN51_YcIDm/preview', 'https://drive.google.com/file/d/1_uU-yVvUyFQv9jvxT4o9pY-FywgfUrBw/preview'],
        [39, 'https://drive.google.com/file/d/1mMJ9zIzOIe-DMlm7JxWediQnmW-kG5If/preview', 'https://drive.google.com/file/d/1NqIbJQtSIrU-VpoPTIL3wmzofLn4bZsi/preview'],
        [48, 'https://drive.google.com/file/d/1sqJN8ZQXuWcctGO2nrbigv508tu2ny6K/preview', 'https://drive.google.com/file/d/1Ru7NYzpC2_f_6frfigdbXQIj4gRH7JVL/preview'],
        [56, 'https://drive.google.com/file/d/16dd8ZjeE_T86MfML378myGZaFfm3Hsdk/preview', 'https://drive.google.com/file/d/1lGWaLCxk0-udU296-rAZx8QcOnyqv283/preview'],
        [65, 'https://drive.google.com/file/d/1L15AQkW1YI3Bnxk29jQ2lzxbFO7iTGE8/preview', 'https://drive.google.com/file/d/1H7pLQ2BYSpgIf0-JHAG3ndxuG7WIimUg/preview'],
        [68, 'https://drive.google.com/file/d/1CSMnNGYCjGc_MbtDpf7sEb5RLPuVexP8/preview', 'https://drive.google.com/file/d/1QXQ2Az77f2kIC_RTSlPN438HeKoFsQzE/preview'],
        [77, 'https://drive.google.com/file/d/1MGsl49wXhS67_L2a1L2SgaLBmMZpqk4h/preview', 'https://drive.google.com/file/d/1jcgZxQ1uL2BuWHKbQbK21rcJVmGBGRl1/preview'],
        [83, 'https://drive.google.com/file/d/1jGa2oGVRU1CqdhhV0S_YQtZZqOeDW2gH/preview', 'https://drive.google.com/file/d/1kNOzS3qTuBo0l7jDpsoQda7uLqjNuM68/preview'],
        [84, 'https://drive.google.com/file/d/1k41SpdJwWan3Q-gRdSwpUCaEAZCd6ERI/preview', 'https://drive.google.com/file/d/1DCQaAssktQZtWyxFZZ7mcn07J2Vj9KHK/preview'],
        [104, 'https://drive.google.com/file/d/1hgsvO0W4sCmKRoRAcpaFT_G6RrAgmhzD/preview', 'https://drive.google.com/file/d/1KEe8FivTXNuahecF7e2p5m3yMT9UVmaO/preview'],
        [122, 'https://drive.google.com/file/d/1rqWidaXzKQB1pCYaQS-yH7fyWbgGBMea/preview', 'https://drive.google.com/file/d/1G6hjwEesPy4Ibx8q18CpW59vRjQGk9OM/preview'],
        [130, 'https://drive.google.com/file/d/1RhxlM2pAIeNHXJv5G4gh2lRUAyTzeuOQ/preview', 'https://drive.google.com/file/d/1zd4BtHJl5L37RDbB0TFRNDR5euMSGbVc/preview'],
        [141, 'https://drive.google.com/file/d/1vgBQMNXuLQBLVx_wykHEN2V3FjndNFOt/preview', 'https://drive.google.com/file/d/1oUIVasUpBPgInq3prUzcubYLjm6B4Ca7/preview'],
        [148, 'https://drive.google.com/file/d/1bYFnTdty26wtfqXFoecapcZO9oYqxDYS/preview', 'https://drive.google.com/file/d/1eW6hMqgoP5PVlYNHj_XGDPpZTvk881uF/preview'],
        [161, 'https://drive.google.com/file/d/1H7Dm89164gUigNCNovfY6eqYaDkCMJcr/preview', 'https://drive.google.com/file/d/1-h7RxVnfz0x9bJrMCKPn6ai-JyJLxMiJ/preview'],
    ],
    "4" : [
        [10, 'https://drive.google.com/file/d/1L1lXhu6yW0QS895RmGxL4EYtrRegBBWl/preview', 'https://drive.google.com/file/d/1zfUbB9i0V36RsdOuNwC2HnZ1nEBSAWmN/preview'],
        [25, 'https://drive.google.com/file/d/1goTiU8mWVvpAobglIuo-7XkOZy9bRXeR/preview', 'https://drive.google.com/file/d/1uwi1eGQvsKoboxRft4GXajavQx8Jt7vo/preview'],
        [27, 'https://drive.google.com/file/d/1NR7nsfyYoAPWgftPJ4XvbrryyYcNlygA/preview', 'https://drive.google.com/file/d/1hbkXBq9boB2TgNQ2Kg6uNJRbBVPUYxzL/preview'],
        [33, 'https://drive.google.com/file/d/1etFmhBWFp9EtRbOQRSHUahbzwcal4zH4/preview', 'https://drive.google.com/file/d/1GrDFlGsWzZ73zvpcQlPXyFEI4_XRAhas/preview'],
        [36, 'https://drive.google.com/file/d/1JuvUJyGUbWTXme_vZNS-8Xp-rlwo7suZ/preview', 'https://drive.google.com/file/d/1tiZJiw6YEZav7ua1u0HTdUg_Z8uXlRlL/preview'],
        [38, 'https://drive.google.com/file/d/16WruRXpUpSJkbiwBnl0iGGN86PvFgYav/preview', 'https://drive.google.com/file/d/1bKozWKg6Ck3vaqShmEGfQdV7nIXKrB-3/preview'],
        [39, 'https://drive.google.com/file/d/1fEIK0pctDmE4T3ME8gCnL061GaEw090p/preview', 'https://drive.google.com/file/d/1mgnuno_QuulRLbKb_hKWncZY1gChrhDA/preview'],
        [48, 'https://drive.google.com/file/d/1IteRkL1AV7jH4vzZ7G3vzJB9-HECRbDh/preview', 'https://drive.google.com/file/d/1LaOI2WMjnysjs_GvWFZDB_lZ0SfoYSxB/preview'],
        [56, 'https://drive.google.com/file/d/1AqA7T8LVGcm6bM37ySpfk-cYDe5SHBvK/preview', 'https://drive.google.com/file/d/1YUmU0XheJEtEIsGYyyKBjwJoHhJll4zL/preview'],
        [65, 'https://drive.google.com/file/d/1gnADRWiFhfKLngwhmLt-Nve9-JfKk_4Z/preview', 'https://drive.google.com/file/d/18fDQ6bdE5mcJghLEdfw8ULiCZHJmHgcA/preview'],
        [68, 'https://drive.google.com/file/d/14kVlNGvbRFtUSIGI4qezYoDfuFwe201w/preview', 'https://drive.google.com/file/d/1xoxOtR9SFvNrILo-idGt9-4PNg-97bkC/preview'],
        [77, 'https://drive.google.com/file/d/1E64gkJXcSd6O8TjrXeb91z1yuZDe1u9U/preview', 'https://drive.google.com/file/d/15GX5uz8LQGoh3hucVDY4mBs43fdAmwh2/preview'],
        [83, 'https://drive.google.com/file/d/1qnKLUhnD1Sjgg-1TC2HHq0St_16KruoR/preview', 'https://drive.google.com/file/d/15aAOB08VCF-kUaJAG_zzmRSZoy9YeJtT/preview'],
        [84, 'https://drive.google.com/file/d/1bYlLGH-TEQLxP5D68NxB9rigcwMrKu2a/preview', 'https://drive.google.com/file/d/1yQE4ipL0al6OymaRguiGBhApg7Z_3Kv1/preview'],
        [104, 'https://drive.google.com/file/d/1XcB3fDGlIxKMEeCC1-CSKqxkoF_6f_Dy/preview', 'https://drive.google.com/file/d/1_AXKDHTMK70m75elWU8DQeeGX0cdR0a7/preview'],
        [122, 'https://drive.google.com/file/d/1eM9yFkY1jvKJhaGX9svNwH67IMw9KTPH/preview', 'https://drive.google.com/file/d/1OAwzgB6RAhSV42_0_Shllor2X5xXWA8a/preview'],
        [130, 'https://drive.google.com/file/d/1K_kbXxigTBzfzMU643eNaU_8Dqnn6MMp/preview', 'https://drive.google.com/file/d/10J-7F3DOQQQiiTD1xS4DRZ3d6YXa0ETY/preview'],
        [141, 'https://drive.google.com/file/d/1vjy7U0R5na5YZcUnsl7kWvQW1ab3KDfC/preview', 'https://drive.google.com/file/d/1LLJ3SmnSi_5jwUfiaQsUGy-3SqKeliM8/preview'],
        [148, 'https://drive.google.com/file/d/1IIwyeI_wFyIDIdKWWyp6cjOKuZh5kVWd/preview', 'https://drive.google.com/file/d/1PRk_H99WO0izBFP6L6wKqlM793ai_AIC/preview'],
        [161, 'https://drive.google.com/file/d/1CTUTNaiYpbgF-wPwpfNjS6zeIXfqZUmz/preview', 'https://drive.google.com/file/d/1wUSf-jj56oZanvmwipsPKfKbALleMEnA/preview'],
    ],
    "5": [
        [10, 'https://drive.google.com/file/d/1Dqsgm0VvaFrM87-4BjzrcyWeVsn8YXQA/preview', 'https://drive.google.com/file/d/1DPPqh51c1TTzuaIRscf9WOp1rMbx903L/preview'],
        [25, 'https://drive.google.com/file/d/19kpWMNdApCj0GgzAmIbKGslY8fCILa39/preview', 'https://drive.google.com/file/d/1KP3aEs_TOFWBoj5BI_2RvH2l5MddvbFY/preview'],
        [27, 'https://drive.google.com/file/d/1pp4uendPHViGih4sGIidObhLVIbKm7aA/preview', 'https://drive.google.com/file/d/1JIQW6KlthN8_bxQXhNmBH50zPkrB4JQP/preview'],
        [33, 'https://drive.google.com/file/d/13ZHaBs-l9P_jLvMUenLnBp1Cgg_s2GDN/preview', 'https://drive.google.com/file/d/1ozAPr1OrzR4txzpjeMuwrnfUl0pIVVXQ/preview'],
        [36, 'https://drive.google.com/file/d/1vkWc0ySCH30O3mI4m3ph3wOrg3nl0NIG/preview', 'https://drive.google.com/file/d/1ahH1Lv8gfldsrqSJzsWS7Mii6q13QRM0/preview'],
        [38, 'https://drive.google.com/file/d/1jYIwRPjbLaYymO1QyjSeEEi5ZUsYq_P_/preview', 'https://drive.google.com/file/d/1w6nm5fAgfOYjzH7G8AzS6bQRKc6J6lJN/preview'],
        [39, 'https://drive.google.com/file/d/1kI1XlWV_xouG9BWPAXUdx8p4UuZNYUud/preview', 'https://drive.google.com/file/d/1prxMyiFOAqJrlOi-KPk-9QVT99v8sRto/preview'],
        [48, 'https://drive.google.com/file/d/1V7gcxGrl4-UxHWWHSQdnoCs3BHvla7tO/preview', 'https://drive.google.com/file/d/1fKN1V-ans9wFhLpS8dIvIIWEOXaIi_s1/preview'],
        [56, 'https://drive.google.com/file/d/1gxCEaU4kiRf4Tk2M0K_7nq2gr4gnU69i/preview', 'https://drive.google.com/file/d/1MOHbF_0ugiuR2h7FLqOUDBxFi_eCAvuq/preview'],
        [65, 'https://drive.google.com/file/d/1omWqP1CEKOKIauRUemBpnxsPjBXwe54f/preview', 'https://drive.google.com/file/d/1KnytMvcOzCGOj6VgKoEhEz_xbkA6UgxH/preview'],
        [68, 'https://drive.google.com/file/d/1_aa9oNAAygU5J3pzWu24cvzF7_mlDNB1/preview', 'https://drive.google.com/file/d/1kKIi_TWTC2cj5o60v5TI9qTKTwfeLtWx/preview'],
        [77, 'https://drive.google.com/file/d/16ZbcOBpKPA8ME0suME_Y0asz7icxSUCO/preview', 'https://drive.google.com/file/d/1TkY2oJjGKbQQWUK81pwe6zP_PDK0Q-gV/preview'],
        [83, 'https://drive.google.com/file/d/1QDaJ5I9gEPL5aiQt2ipCQiUqqZOCttte/preview', 'https://drive.google.com/file/d/1JhPe9yRoJLu-FIk3tycBuMZ2ZNbpHu1T/preview'],
        [84, 'https://drive.google.com/file/d/1LD2CJmDdtoN9hjwNu1zlOuju8NzAUF57/preview', 'https://drive.google.com/file/d/1me5gWVPPthdIrGMVQc1FaHid1tshRcPe/preview'],
        [104, 'https://drive.google.com/file/d/1btOXSlVk00NPaxxkEVNeVfobFNl0y0T0/preview', 'https://drive.google.com/file/d/156x7IhHjHgJh1znpugCMLQ22vpiqfGTE/preview'],
        [122, 'https://drive.google.com/file/d/1fapzqVxJrjUnJ6mF0WxxaaBny4YcnDpA/preview', 'https://drive.google.com/file/d/1OPemxMkOds0UGri6tgfjse-X28Ghp-bO/preview'],
        [130, 'https://drive.google.com/file/d/1c2Aq5w7T9B5HeF6FYIC026BKt-Z7bpZ1/preview', 'https://drive.google.com/file/d/1vKtEuh6PhWWa509iSexiNkI3RcdnGk4f/preview'],
        [141, 'https://drive.google.com/file/d/1EImUALS5z2-4cyt00CTHdYFAEpX9Ad6w/preview', 'https://drive.google.com/file/d/19_mKNtwC8UcrcKSi-Eam0WJb6CRCZiB8/preview'],
        [148, 'https://drive.google.com/file/d/1hftbFClyqC5QIkNskj5wx0GIFMsAMhjZ/preview', 'https://drive.google.com/file/d/1mAtJNVgqsrckq0cAq9eL4kS8ImcC6rTd/preview'],
        [161, 'https://drive.google.com/file/d/1g9bbmTZaTM0e8WLKxZMFvRU4CnkWFs3_/preview', 'https://drive.google.com/file/d/1lyCV1mnd6a-CpQEoqS7kJv98KbTJ5ReT/preview'],
    ],
    "6": [
        [10, 'https://drive.google.com/file/d/1vkaerTV_Ya5DW2Be8WjzE-jTLdkfBkPq/preview', 'https://drive.google.com/file/d/1FS-Lo-au_j4X8VwQxnWJNo_tK37jhIy2/preview'],
        [25, 'https://drive.google.com/file/d/1e89E6GHPjJ7HK82fMwexvRk8bm4b6Wif/preview', 'https://drive.google.com/file/d/1GqhRhmmcFtVgfUcDKEsh5I06boOeVgVS/preview'],
        [27, 'https://drive.google.com/file/d/1FVI9qX8vg99llhRvM4B5GjJcUtOUtlmt/preview', 'https://drive.google.com/file/d/1AZgDUweafJSZaCrLRai6I_UzcH5GV7bb/preview'],
        [33, 'https://drive.google.com/file/d/1S1jQF_p4FBjVO3qt3DJLgBDm6ycbOi-X/preview', 'https://drive.google.com/file/d/1EkB7x8tdxadkW83pNUlA9lsqGhCBMOMJ/preview'],
        [36, 'https://drive.google.com/file/d/1ipeAHXzWbrWQsoUjP8InuP9jlRgAHiQ-/preview', 'https://drive.google.com/file/d/1PMDmcxwMdkgfskjePj5dzCoYlJ2Vgyjl/preview'],
        [38, 'https://drive.google.com/file/d/1koocEQxGrqOtRTvv_1fK122idGIWxMuk/preview', 'https://drive.google.com/file/d/1Zpl3EoA1Y-0scDsP4WPoihaMQ-Wy4dws/preview'],
        [39, 'https://drive.google.com/file/d/1jK-3soJGRZhQLVX6ZPEb225g0uwF6eLK/preview', 'https://drive.google.com/file/d/15Hf_qJW8ZjTiMoO1uJpWi_bHwj-21efo/preview'],
        [48, 'https://drive.google.com/file/d/1TcQYh705_YCEc6qfRhvsrJqLYAeOhzwp/preview', 'https://drive.google.com/file/d/1bD69Zv7fDItLl-6jLBT_0QolYFwlslvB/preview'],
        [56, 'https://drive.google.com/file/d/10sLbSLEmWWQcP1ctCbuCiAjgTjzNBYed/preview', 'https://drive.google.com/file/d/11w5T1CUgE2gOuljT04e1ivrg3vf8ReRn/preview'],
        [65, 'https://drive.google.com/file/d/1sCKTOTlC4fcg47Syxr-fjw66TPG728nK/preview', 'https://drive.google.com/file/d/1ibyTMpz_2t6lDGUTVM7w7R_DHSUADHyF/preview'],
        [68, 'https://drive.google.com/file/d/1YzlPhhenRFcaoOuAgBWljZZPJzeGVVOg/preview', 'https://drive.google.com/file/d/1Ps6eH-jgGfHlNeU3Xjp1ewoh1Hf1wlo8/preview'],
        [77, 'https://drive.google.com/file/d/1kK1kdDmifR-mKEINP6d8Dnr0drnx4CoF/preview', 'https://drive.google.com/file/d/1_kH5DdhAzvN6EJh-H5nvoNKIZOPwvMB2/preview'],
        [83, 'https://drive.google.com/file/d/1iU8pw8Cg0Arx6SDgSwI3rXAwnmqJkFQz/preview', 'https://drive.google.com/file/d/1dAWBZJNMyIjr_f8Yq1CSAv4tgu8-0A5v/preview'],
        [84, 'https://drive.google.com/file/d/1hndtoGYamYqv4YFFAKQIt6wiZ7KtoC-9/preview', 'https://drive.google.com/file/d/14xayRqb2SovLKE-gqcYsbhYVj8IGjrjw/preview'],
        [104, 'https://drive.google.com/file/d/1FM5nObpLmtTbxyTuqDzCj7u9VYnoTku1/preview', 'https://drive.google.com/file/d/1x9mjHOMNUwchEZDr5TT2G9PZR2i13ocB/preview'],
        [122, 'https://drive.google.com/file/d/1mQATBo0rpoa7BaLB7ryJn_Z3OCI5o8iJ/preview', 'https://drive.google.com/file/d/1lGRxezjX0RULkUcNvcil_kB-7Uw-qhDu/preview'],
        [130, 'https://drive.google.com/file/d/1Q8BVvel1MtzaAxUC71yTTxQJ8FcnVuxX/preview', 'https://drive.google.com/file/d/1LY8UD33EE8T-SvYLjiwjUvFBZcykGPbF/preview'],
        [141, 'https://drive.google.com/file/d/16hAe9RAbWAo3ZC6E0qPwOZyqkQL2Jw3J/preview', 'https://drive.google.com/file/d/1wwjNppsWLv3qKOlCzb590-XqMrfPdDb1/preview'],
        [148, 'https://drive.google.com/file/d/1J_Qsk6rCdbsq-GxSAsW7hExV2MilFu_U/preview', 'https://drive.google.com/file/d/1re43m1gu1ByegE5l90uAOzy9O3NOzN-N/preview'],
        [161, 'https://drive.google.com/file/d/12U6RRhYcYR_tO4QT6itVrPHkkkqbRyIR/preview', 'https://drive.google.com/file/d/16VgHycDFbRV4LqmjYInWt89mVkfD_gM7/preview'],
    ],
    "7": [
        [10, 'https://drive.google.com/file/d/1fZ9Z2ieS4mnPI-9oVbS4Piy599meqByQ/preview', 'https://drive.google.com/file/d/1QOp2Chl3EXx02z5-i-u5gCjH9jF7UpBZ/preview'],
        [25, 'https://drive.google.com/file/d/1rb-R-eev5zb5Bm5NhZEriG5m9RTXVGfK/preview', 'https://drive.google.com/file/d/1fhi7du_bPiIORTZ0P2T39bQ8QmH03tYm/preview'],
        [27, 'https://drive.google.com/file/d/1TBnwGlWit7nxssacTg2rvG8LEbRH2UUb/preview', 'https://drive.google.com/file/d/1HNdDKQ72DGRbaNxkOLTaxc9RM_nNn2DJ/preview'],
        [33, 'https://drive.google.com/file/d/1Vx21mTWSEsHN9oVoUCjvreZWfLM2vA_f/preview', 'https://drive.google.com/file/d/134yShQh3NiANHVoh7vMJOWfKqGAjI8rm/preview'],
        [36, 'https://drive.google.com/file/d/1B0nxOFhVmkTqi6fk8taEe_n0igwdCVEX/preview', 'https://drive.google.com/file/d/1FJehbCSEOuKmT8WhmKmsFcrsKWJguie_/preview'],
        [38, 'https://drive.google.com/file/d/1WAgt21I3DXU6rE3bs98xVH-HJHIgO0Uy/preview', 'https://drive.google.com/file/d/1LAAg_LmslJGpxwEZ049MpdR5CeaWBWZI/preview'],
        [39, 'https://drive.google.com/file/d/1qgHlCsjdhqgMQwPLTpQ3cNMw5b9zghgY/preview', 'https://drive.google.com/file/d/1zXHDwziVXwhxISZTxR0dhUnmveVWHWRr/preview'],
        [48, 'https://drive.google.com/file/d/1lKzjsQOcCXIJnjVK6d_nAotVruqzTeWK/preview', 'https://drive.google.com/file/d/1VeIbGYNOX_wRfUTSh4VUpEHzQmD8rGo_/preview'],
        [56, 'https://drive.google.com/file/d/1hphUwhP_Wl48dopm8sU8eJ7eACUlnx6-/preview', 'https://drive.google.com/file/d/10nM-MIe4D9y1GujbL1hnVEdOPm-5LhMs/preview'],
        [65, 'https://drive.google.com/file/d/17qGVzrlZZJbcKzzwvbp2et56OTo6RNg1/preview', 'https://drive.google.com/file/d/18jmuUxtA_az5ppjNIXYhy0BHrkheoSU4/preview'],
        [68, 'https://drive.google.com/file/d/1TZH1vT_wsDSMUAsMbtuKR33lZYPDE2t4/preview', 'https://drive.google.com/file/d/1dhiEEb6CV9aocbb7Bzsx8h4LCD53nkSu/preview'],
        [77, 'https://drive.google.com/file/d/1H3CSU-p-HP-GwOH84vuQPVCln-pYeX6Y/preview', 'https://drive.google.com/file/d/108eEOUXZtjmTjp4sVhSUna9VMUpAf_dp/preview'],
        [83, 'https://drive.google.com/file/d/1ylB3UkBFQHspdl1aN9uM54oUKXql2cWV/preview', 'https://drive.google.com/file/d/1cVC-hbnmOGJaxLLkw_TUo7ANdoll1h31/preview'],
        [84, 'https://drive.google.com/file/d/1bFx9-leAS05ZkjH4PtD0D9KL_-hfCx52/preview', 'https://drive.google.com/file/d/146leYqCPfG4z7BKePLFsOaaK5aDjxwaQ/preview'],
        [104, 'https://drive.google.com/file/d/1O4aV2MzESLNxMUR4qdr7rdjVGIPt3EkB/preview', 'https://drive.google.com/file/d/1U6ScgMSQuA8HZcR5skljkly6FG9zXvQm/preview'],
        [122, 'https://drive.google.com/file/d/1zBcp8kyVTpHEyi9t4oiP4jFW6aKY0zTq/preview', 'https://drive.google.com/file/d/1flJGuf0twvHwf7P7cXH7jfiiYZ0TcSLE/preview'],
        [130, 'https://drive.google.com/file/d/1nztLw2Qa-M7lZmIhO-PnemmgnFHn-AX7/preview', 'https://drive.google.com/file/d/15SyCNKNSZNpajvdJ3ZLdplxvz1CxgfW0/preview'],
        [141, 'https://drive.google.com/file/d/1Kk3_ykPyv2RBxGVm7qi8M6-ce3Y4tox1/preview', 'https://drive.google.com/file/d/1QBn18MOm4TDcYJNpEUlYw6PIYJ3gA_E_/preview'],
        [148, 'https://drive.google.com/file/d/1-_rbNqLwHE1elHFxLeBERadWkfFCSspb/preview', 'https://drive.google.com/file/d/1si0d00jQVUvPjZzlUMMgR2ARex2UmIac/preview'],
        [161, 'https://drive.google.com/file/d/1RDCpIuiywXrWJ5cmISav0N-cBQB5JZeD/preview', 'https://drive.google.com/file/d/1ao23IW0_Dmgiz5f-QAI01sMBDoNbN89Z/preview'],
    ],
    "8" : [
        // scene-ID, near-to-far-vid-link, fix-rand-vid-link (NOTE: only has rand order as top-down)
        [10, '', 'https://drive.google.com/file/d/12fIJHWb6wBiFsU7-ZWjgdzusMKW0-NJp/preview'],
        [25, '', 'https://drive.google.com/file/d/1994DFwYVFGq--1qODxfcU-elTf14MVoM/preview'],
        [27, '', 'https://drive.google.com/file/d/1D1XDzPen1G8MDYvE8I3-VhozuvNQhtsu/preview'],
        [33, '', 'https://drive.google.com/file/d/1MwVI3eGh0p2Rj7hS3rwrFMIHCDCuwXJv/preview'],
        [36, '', 'https://drive.google.com/file/d/1i2PDVnvSOty99brC68wFRaI6Yo7whsE7/preview'],
        [38, '', 'https://drive.google.com/file/d/1p0SriKV4JjvRlnp_Aa69YEBWwHouesz7/preview'],
        [39, '', 'https://drive.google.com/file/d/1m-eNCEexnQy-brKdK7hjg4WTCX08j5mv/preview'],
        [48, '', 'https://drive.google.com/file/d/19mVDP17obJ9cH0w38AUvoPbHlLMrJ3Tn/preview'],
        [56, '', 'https://drive.google.com/file/d/1CvUNihOsntoEUhwUD6adIzmkidd2gTId/preview'],
        [65, '', 'https://drive.google.com/file/d/1W32zkOQkdSaD6QDUrkoco_F-dE-tor2D/preview'],
        [68, '', 'https://drive.google.com/file/d/1TDpHQ_Tj15HSKRbhTs31t7Djk_SjSE2q/preview'],
        [77, '', 'https://drive.google.com/file/d/1U0AMXoKb3Xqs3T2hb3f12r0-soZl2K3i/preview'],
        [83, '', 'https://drive.google.com/file/d/1Pu5ghkaEeVm_EKEJ44DZorSnIeZQwZI2/preview'],
        [84, '', 'https://drive.google.com/file/d/12-c75_VlSFKNJF6IJkfO0f0BKOXKLUd0/preview'],
        [104, '', 'https://drive.google.com/file/d/1neCTx0zYuOGsQ1r3i_4kH0KwCREFPMi2/preview'],
        [122, '', 'https://drive.google.com/file/d/1R-_vn7T6ag6Ja-rT2aGFraCO4kIEKrFr/preview'],
        [130, '', 'https://drive.google.com/file/d/1WL_AnE1uXy6tXyGDdLpGIiUWcBU75Ep4/preview'],
        [141, '', 'https://drive.google.com/file/d/1BXnWwJyF1dae_6WNr8QUxd6ciZEq9w_E/preview'],
        [148, '', 'https://drive.google.com/file/d/1N85p_KE71ThBAYgo3vlDSE5Z-h4BL2Gx/preview'],
        [161, '', 'https://drive.google.com/file/d/1wou7Loh397q62U2fXN1q658_kRb4iM0V/preview'],
    ],
    "9" : [
        // scene-ID, near-to-far-vid-link, fix-rand-vid-link (NOTE: only has rand order as top-down)
        [10, '', 'https://drive.google.com/file/d/12fIJHWb6wBiFsU7-ZWjgdzusMKW0-NJp/preview'],
        [25, '', 'https://drive.google.com/file/d/1994DFwYVFGq--1qODxfcU-elTf14MVoM/preview'],
        [27, '', 'https://drive.google.com/file/d/1D1XDzPen1G8MDYvE8I3-VhozuvNQhtsu/preview'],
        [33, '', 'https://drive.google.com/file/d/1MwVI3eGh0p2Rj7hS3rwrFMIHCDCuwXJv/preview'],
        [36, '', 'https://drive.google.com/file/d/1i2PDVnvSOty99brC68wFRaI6Yo7whsE7/preview'],
        [38, '', 'https://drive.google.com/file/d/1p0SriKV4JjvRlnp_Aa69YEBWwHouesz7/preview'],
        [39, '', 'https://drive.google.com/file/d/1m-eNCEexnQy-brKdK7hjg4WTCX08j5mv/preview'],
        [48, '', 'https://drive.google.com/file/d/19mVDP17obJ9cH0w38AUvoPbHlLMrJ3Tn/preview'],
        [56, '', 'https://drive.google.com/file/d/1CvUNihOsntoEUhwUD6adIzmkidd2gTId/preview'],
        [65, '', 'https://drive.google.com/file/d/1W32zkOQkdSaD6QDUrkoco_F-dE-tor2D/preview'],
        [68, '', 'https://drive.google.com/file/d/1TDpHQ_Tj15HSKRbhTs31t7Djk_SjSE2q/preview'],
        [77, '', 'https://drive.google.com/file/d/1U0AMXoKb3Xqs3T2hb3f12r0-soZl2K3i/preview'],
        [83, '', 'https://drive.google.com/file/d/1Pu5ghkaEeVm_EKEJ44DZorSnIeZQwZI2/preview'],
        [84, '', 'https://drive.google.com/file/d/12-c75_VlSFKNJF6IJkfO0f0BKOXKLUd0/preview'],
        [104, '' ,'https://drive.google.com/file/d/1neCTx0zYuOGsQ1r3i_4kH0KwCREFPMi2/preview'], 
        [122, '' ,'https://drive.google.com/file/d/1R-_vn7T6ag6Ja-rT2aGFraCO4kIEKrFr/preview'], 
        [130, '' ,'https://drive.google.com/file/d/1WL_AnE1uXy6tXyGDdLpGIiUWcBU75Ep4/preview'],
        [141, '' ,'https://drive.google.com/file/d/1BXnWwJyF1dae_6WNr8QUxd6ciZEq9w_E/preview'], 
        [148, '' ,'https://drive.google.com/file/d/1N85p_KE71ThBAYgo3vlDSE5Z-h4BL2Gx/preview'], 
        [161, '' ,'https://drive.google.com/file/d/1wou7Loh397q62U2fXN1q658_kRb4iM0V/preview'],
    ],
}
