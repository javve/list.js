---
---

{% include javascripts/vendor/jquery-1.8.3.min.js %}
{% include javascripts/vendor/bootstrap/transition.js %}
{% include javascripts/vendor/bootstrap/tab.js %}
{% include javascripts/vendor/bootstrap/tooltip.js %}
{% include javascripts/vendor/highlight.pack.js %}

hljs.initHighlightingOnLoad();

function annotate(annotations) {
  for (var id in annotations) {
    annotateBlock(id, annotations[id]);
  }
}
function annotateBlock(id, annotations) {
  $('#'+id).html(function(i, html) {
    for (var i = 0; i < annotations.length; i++) {
      html = html.replace(new RegExp(annotations[i][0], 'g'), function(match, p1) {
        return match.replace(new RegExp(p1), '<span class="annotation" title="'+annotations[i][1]+'">'+p1+'</span>')
      });
    }
    return html;
  });
  $('.annotation').tooltip();
}

$(window).load(function() { $('body').addClass('loaded'); });


$(window).load(function() {
  setTimeout(function() {
    if (window.annotations !== 'undefined') {
      annotate(window.annotations);
      $('code').tooltip();
    }
  }, 1000);
})


$('#basic-tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
});


var options = {
    valueNames: [ 'name', 'born' ]
};

var userList = new List('users', options);
