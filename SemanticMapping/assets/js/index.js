// Last updated
var apiUrl = "https://api.github.com/repos/irvlutd/irvlutd.github.io/commits?sha=sem-map&per_page=1";
$.getJSON(apiUrl, function(data) {
var commitDate = new Date(data[0].commit.committer.date);
var formattedDate = commitDate.toDateString();
$('#last-updated').html(formattedDate);
});