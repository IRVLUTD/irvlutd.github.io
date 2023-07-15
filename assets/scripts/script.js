function copyToClipboard() {
    var content = document.querySelector('.bib-container pre code').textContent;

    var tempTextarea = document.createElement('textarea');
    tempTextarea.value = content;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);

    var original_html = $('#copy-btn').html();
    $('#copy-btn').html(`<i class="fas fa-check copy-success-highlight"></i>`);

    setTimeout(function() {
        // code or function to execute after timeout
        $('#copy-btn').html(original_html);
    }, 1250);

  }
  