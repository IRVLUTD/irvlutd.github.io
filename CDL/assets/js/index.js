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
        if (i >= 0 && i < 7) {
            row_prefix += `<td>${entry[i]}</td>`;
        } 

    }



    let n2f_html = (display_n2f) ? `<tr>${row_prefix}${th_n2f_content}</tr>` : ''
    let frnd_html = (display_frnd) ? `<tr>${row_prefix}${th_frnd_content}</tr>` : ''

    // return `<tr><th>${idx+1}</th>${th_content}</tr>` Use for rank
    return `${n2f_html}`
}

$(document).ready(function () {
    let leaderboard_body = ''

    for (let [index, leaderboard_entry] of leaderboard_entries.entries()) {
        leaderboard_body += get_leaderboard_entry(index, leaderboard_entry)
    }

    $('#leaderboard-body').html(leaderboard_body);

    let leaderboard_body_imagenet = ''

    for (let [index, leaderboard_entry_imagenet] of leaderboard_entries_imagenet.entries()) {
        leaderboard_body_imagenet += get_leaderboard_entry(index, leaderboard_entry_imagenet)
    }

    $('#leaderboard-body_imagenet').html(leaderboard_body_imagenet);



    // Get the table and table body elements
    var table = $('#leaderboard-table');
    var tbody = table.find('tbody');

    // Define the default sort column index
    var defaultSortColumn = 5; // Set it to the desired column index (0-based)

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
            // Check if values are numbers
            var aNum = parseFloat(aValue);
            var bNum = parseFloat(bValue);
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return isAscending ? aNum - bNum : bNum - aNum;
            }else{
            if (aValue < bValue) {
                return isAscending ? -1 : 1;
            }
            if (aValue > bValue) {
                return isAscending ? 1 : -1;
            }
            return 0;
        }
        });

        // Clear the table body and re-append the sorted rows
        tbody.empty();
        $.each(rows, function (index, row) {
            tbody.append(row);
        });
    }


    // Get the table and table body elements
    var table_imagenet = $('#leaderboard-table_imagenet');
    var tbody_imagenet = table_imagenet.find('tbody');

    // Define the default sort column index
    var defaultSortColumn = 5; // Set it to the desired column index (0-based)

    // Sort the default column by default
    sortTable_imagenet(defaultSortColumn);

    // Attach a click event handler to table headers
    table_imagenet.find('th').click(function () {
        var column = $(this).index(); // Get the column index

        // Check if the column is already sorted
        var isAscending = $(this).hasClass('sorted-asc');
        table_imagenet.find('th').removeClass('sorted-asc sorted-desc');

        // Sort the table rows based on the selected column and sort order
        sortTable_imagenet(column, !isAscending);

        // Update the sort order indicator
        if (isAscending) {
            $(this).removeClass('sorted-asc').addClass('sorted-desc');
        } else {
            $(this).removeClass('sorted-desc').addClass('sorted-asc');
        }
    });

    function sortTable_imagenet(column, isAscending) {
        // Get the rows
        var rows = tbody_imagenet.find('tr').get();

        // Sort the rows based on the selected column and sort order
        rows.sort(function (a, b) {
            var aValue = $(a).find('td').eq(column).text().toUpperCase();
            var bValue = $(b).find('td').eq(column).text().toUpperCase();
            // Check if values are numbers
            var aNum = parseFloat(aValue);
            var bNum = parseFloat(bValue);
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return isAscending ? aNum - bNum : bNum - aNum;
            }else{

            if (aValue < bValue) {
                return isAscending ? -1 : 1;
            }
            if (aValue > bValue) {
                return isAscending ? 1 : -1;
            }
            return 0;
        }
        });

        // Clear the table body and re-append the sorted rows
        tbody_imagenet.empty();
        $.each(rows, function (index, row) {
            tbody_imagenet.append(row);
        });
    }
    
    // ImageNet-R
    

    // references
    let references_html = ``
    for (reference in references) {
        references_html += `<li id="bib-${reference}" class="references">${references[reference]}</li>`
    }
    $('#references').html(references_html)
})








