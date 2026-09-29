$(document).ready(function() {
    // project title alias: [project_href, project_git_branch]
    var projects = {
        "FewSOL" : ["../FewSOL", "FewSOL"],
        "Proto-CLIP" : ["../Proto-CLIP", "proto-clip"],
        "SceneReplica": ["../SceneReplica", "scene-replica"],
        "NIDSNet" : ["../NIDSNet", "NIDSNet"],
        "iTeach" : ["../iTeach", "iTeach"],
        "HRT1" : ["../HRT1", "hrt1"],
        "RPX" : ["../RPX", "rpx"],
    }

    const title_el = document.getElementById("title");
    const current_project_name = title_el ? title_el.getAttribute("project-name") : null;

    // Related research dropdown.
    //
    // Populated FIRST and in its own try/catch. This block used to run last,
    // after the credits block below — so any throw up there (a page whose
    // project-name is missing from `projects`, or a page with no
    // #website-template-credits element) aborted $(document).ready() and left
    // the dropdown silently empty. Ordering it first means the navigation
    // cannot be taken down by the footer code.
    try {
        const related_research = document.getElementById("related-research")
        const related_research_home = document.getElementById("related-research-home")
        const related_research_dropdown = document.getElementById("related-research-dropdown")
        if(related_research !== null && related_research_home !== null && related_research_dropdown !== null){
            related_research_home.setAttribute("href", "https://jishnujayakumar.github.io");
            related_research.innerHTML = "Related Research"
            for (const [project_name, project_info] of Object.entries(projects)) {
                if (project_name != current_project_name){
                    related_research_dropdown.innerHTML += "<a class='navbar-item' href='" + project_info[0] + "' target='_blank'><center>" + project_name + "</center></a>"
                }
            }
        }
    } catch (e) {
        console.error("[related-research] dropdown failed to populate:", e);
    }

    // Website template credits + last-updated stamp.
    const website_template_credits = document.getElementById("website-template-credits")
    if(current_project_name != 'FewSOL' && website_template_credits !== null){
        // This append was written for the old footer, which ended with
        // "Website template adapted from Nerfies and ". The clap footer carries
        // its own "Template inspired by FewSOL" span, so on those pages the
        // append produced a duplicate credit and a stray trailing period.
        // Only add it where the page does not already credit FewSOL.
        const already_credited = document.querySelector('footer a[href*="FewSOL"], footer a[href*="fewsol"]') !== null;
        if (!already_credited) {
            website_template_credits.innerHTML += "<a class='royal-theme-btn-fewsol' target='_blank' href='" + projects['FewSOL'][0] + "'><span class='small-caps'>FewSOL</span></a>."
        }

        // Last updated — only for projects with a known branch. Unknown ones
        // previously threw here and took the whole ready() handler with them.
        const project_info = projects[current_project_name];
        if (project_info) {
            var apiUrl = "https://api.github.com/repos/irvlutd/irvlutd.github.io/commits?sha=" + project_info[1] + "&per_page=1";
            $.getJSON(apiUrl, function(data) {
                if (!data || !data[0]) return;
                var commitDate = new Date(data[0].commit.committer.date);
                $('#last-updated').html(commitDate.toDateString());
            });
        }
    }

  });
