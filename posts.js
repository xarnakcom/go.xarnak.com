(function () {
  var list = document.getElementById('posts-list');
  if (!list) return;

  function formatDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text; // textContent — безопасно, HTML не исполняется
    return e;
  }

  function render(posts) {
    posts.sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });
    list.innerHTML = '';

    if (!posts.length) {
      list.appendChild(el('p', 'posts-empty', 'Пока постов нет.'));
      return;
    }

    posts.forEach(function (p) {
      var card = el('article', 'post');
      if (p.date) card.appendChild(el('time', 'post-date', formatDate(p.date)));
      if (p.title) card.appendChild(el('h3', 'post-title', p.title));

      if (p.image) {
        var img = el('img', 'post-img');
        img.src = p.image;
        img.alt = p.title || '';
        img.loading = 'lazy';
        card.appendChild(img);
      }

      if (p.text) card.appendChild(el('p', 'post-text', p.text));

      if (p.link) {
        var a = el('a', 'btn btn-dark post-link', (p.linkText || 'Открыть') + ' ↗');
        a.href = p.link;
        a.target = '_blank';
        a.rel = 'noopener';
        card.appendChild(a);
      }
      list.appendChild(card);
    });
  }

  fetch('posts.json', { cache: 'no-cache' })
    .then(function (r) { return r.json(); })
    .then(render)
    .catch(function () {
      list.appendChild(el('p', 'posts-empty', 'Не удалось загрузить посты.'));
    });
})();
