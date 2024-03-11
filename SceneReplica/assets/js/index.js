function get_link(idx, category, vli) {
    return `<td><span class="icon scene-video-link" onclick="process_vid_link('${idx}', '${category}', '${vli}')"><i class="fas fa-link"></i></span></td>`
}

function process_vid_link(id, category, vli) {
    window.localStorage.setItem("cat", category);
    window.localStorage.setItem("id", id);
    window.localStorage.setItem('vli', vli);
    window.location.href = './scene-videos';
}


function parse_query() {
    // Get the query string from the current URL
    var queryString = window.location.search;

    // Create a new URLSearchParams object with the query string
    var searchParams = new URLSearchParams(queryString);

    // Create an empty object to store the parsed parameters
    var queryParams = {};

    // Iterate over the parameters and store them in the object
    searchParams.forEach(function (value, name) {
        queryParams[name] = value;
    });

    return queryParams;
}

function get_leaderboard_entry(idx, entry) {
    let n = entry.length
    let row_prefix = `<td>${idx + 1}</td>`
    let th_n2f_content = ``
    let th_frnd_content = ``
    let display_n2f = true
    let display_frnd = true
    for (var i = 0; i < n; i += 1) {
    //  Don't display an order's results if its grasping and pick and place success are -, -
    // meaning the corresponding order is not supported by the row method / pipeline
        entry[i] = entry[i].replace(/@(\d+)@/g, '<a href="#bib-$1"> [$1]</a>');
        if (i >= 0 && i < 4) {
            row_prefix += `<td>${entry[i]}</td>`;
        } else if (i >= 4 && i < 8) {
            display_n2f = (entry[6] != '-' && entry[7] != '-')
            th_n2f_content += display_n2f ? `<td>${entry[i]}</td>` : '';
        } else if (i >= 8 && i < n) {
            display_frnd = (entry[10] != '-' && entry[11] != '-')
            th_frnd_content += display_frnd ? `<td>${entry[i]}</td>` : '';
        }

    }

    th_n2f_content += (display_n2f) ? get_link(idx + 1, 'Near-to-Far', 1) : ''
    th_frnd_content += (display_frnd) ? get_link(idx + 1, 'Fixed-Random', 2) : ''

    let n2f_html = (display_n2f) ? `<tr>${row_prefix}${th_n2f_content}</tr>` : ''
    let frnd_html = (display_frnd) ? `<tr>${row_prefix}${th_frnd_content}</tr>` : ''

    // return `<tr><th>${idx+1}</th>${th_content}</tr>` Use for rank
    return `${n2f_html}${frnd_html}`
}

$(document).ready(function () {
    let leaderboard_body = ''

    for (let [index, leaderboard_entry] of leaderboard_entries.entries()) {
        leaderboard_body += get_leaderboard_entry(index, leaderboard_entry)
    }

    $('#leaderboard-body').html(leaderboard_body);

    // Get the table and table body elements
    var table = $('#leaderboard-table');
    var tbody = table.find('tbody');

    // Define the default sort column index
    var defaultSortColumn = 7; // Set it to the desired column index (0-based)

    // Sort the default column by default
    sortTable(defaultSortColumn);

    // Attach a click event handler to table headers
    table.find('th').click(function () {
        var column = $(this).index(); // Get the column index

        // Check if the column is already sorted
        var isAscending = $(this).hasClass('sorted-asc');
        table.find('th').removeClass('sorted-asc sorted-desc');

        // Sort the table rows based on the selected column and sort order
        sortTable(column, !isAscending);

        // Update the sort order indicator
        if (isAscending) {
            $(this).removeClass('sorted-asc').addClass('sorted-desc');
        } else {
            $(this).removeClass('sorted-desc').addClass('sorted-asc');
        }
    });

    // Function to sort the table rows based on a given column index and sort order
    function sortTable(column, isAscending) {
        // Get the rows
        var rows = tbody.find('tr').get();

        // Sort the rows based on the selected column and sort order
        rows.sort(function (a, b) {
            var aValue = $(a).find('td').eq(column).text().toUpperCase();
            var bValue = $(b).find('td').eq(column).text().toUpperCase();
            if (aValue < bValue) {
                return isAscending ? -1 : 1;
            }
            if (aValue > bValue) {
                return isAscending ? 1 : -1;
            }
            return 0;
        });

        // Clear the table body and re-append the sorted rows
        tbody.empty();
        $.each(rows, function (index, row) {
            tbody.append(row);
        });
    }


    // references
    let references_html = ``
    for (reference in references) {
        references_html += `<li id="bib-${reference}" class="references">${references[reference]}</li>`
    }
    $('#references').html(references_html)
})


