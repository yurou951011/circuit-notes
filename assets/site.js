(function () {
  var L = (window.LESSONS || []).slice().sort(function (a, b) { return a.id.localeCompare(b.id); });
  var key = function (l) { return l.id + "-" + l.slug; };

  var list = document.getElementById("lesson-list");
  if (list) {
    list.innerHTML = L.map(function (l) {
      return '<a class="card" href="lessons/' + key(l) + '.html">' +
        '<span class="no">第 ' + l.id + ' 課</span><h3>' + l.title + '</h3>' +
        '<p>' + l.summary + '</p><span class="tags">' + l.tags.join("、") + '</span></a>';
    }).join("");
  }

  var cur = document.body.getAttribute("data-lesson");
  var pager = document.getElementById("pager");
  if (cur && pager) {
    var i = L.findIndex(function (l) { return key(l) === cur; });
    var prev = L[i - 1], next = L[i + 1];
    pager.innerHTML =
      (prev ? '<a href="' + key(prev) + '.html">上一課：' + prev.title + '</a>' : '<span></span>') +
      (next ? '<a href="' + key(next) + '.html">下一課：' + next.title + '</a>' : '<span></span>');
  }
})();
