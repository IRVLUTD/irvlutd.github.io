$(document).ready(function() {
    // project title alias: [project_href, project_git_branch]
    var projects = {
        "FewSOL" : ["../FewSOL", "FewSOL"],
        "Proto-CLIP" : ["../Proto-CLIP", "proto-clip"],
    }

    const current_project_name = document.getElementById("title").getAttribute("project-name");

    // related research dropdown
    const related_research = document.getElementById("related-research")
    const related_research_home = document.getElementById("related-research-home")
    const related_research_dropdown = document.getElementById("related-research-dropdown")
    related_research_home.setAttribute("href", "https://jishnujayakumar.github.io");
    related_research.innerHTML = "Related Research"
    for (const [project_name, project_info] of Object.entries(projects)) {
        if (project_name != current_project_name){
            related_research_dropdown.innerHTML += "&nbsp;<a class='navbar-item' href='" + project_info[0] + "'><center>" + project_name + "</center></a>"
        }
    }

    // website templated credits
    const website_template_credits = document.getElementById("website-template-credits")
    if(current_project_name != 'FewSOL'){
        website_template_credits.innerHTML += "<a target='_blank' href='" + projects['FewSOL'][0] + "'><span class='small-caps black-font'>FewSOL</span></a> ← <a target='_blank' href='https://nerfies.github.io'><span class='small-caps black-font'>Nerfies</span></a>."
        // Last updated
        var apiUrl = "https://api.github.com/repos/irvlutd/irvlutd.github.io/commits?sha=" + projects[current_project_name][1] + "&per_page=1";
        $.getJSON(apiUrl, function(data) {
        var commitDate = new Date(data[0].commit.committer.date);
        var formattedDate = commitDate.toDateString();
        $('#last-updated').html(formattedDate);
        });
    }
  });