(function () {
  var ICONS = {
    email: 'logos/Email.svg',
    telegram: 'logos/Telegram.svg',
    whatsapp: 'logos/Whatsapp.svg',
    instagram: 'logos/Instagram.svg'
  };
  var NAMES = { email: 'Email', telegram: 'Telegram', whatsapp: 'WhatsApp', instagram: 'Instagram' };

  function safeUrl(u) {
    return /^(https?:|mailto:|tel:)/i.test(u) ? u : '';
  }

  function renderLinks(links) {
    var box = document.getElementById('links-list');
    if (!box || !Array.isArray(links)) return;
    box.innerHTML = '';
    links.forEach(function (l) {
      var card = document.createElement('div');
      card.className = 'service-card';

      var t = document.createElement('div');
      t.className = 'service-title';
      t.textContent = l.title || '';
      card.appendChild(t);

      if (l.desc) {
        var p = document.createElement('p');
        p.className = 'service-desc';
        p.textContent = l.desc;
        card.appendChild(p);
      }

      var href = safeUrl(l.url || '');
      if (href) {
        var a = document.createElement('a');
        a.className = 'btn btn-dark';
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener';
        a.appendChild(document.createTextNode((l.button || 'Открыть') + ' '));
        var arrow = document.createElement('span');
        arrow.className = 'arrow';
        arrow.textContent = '↗';
        a.appendChild(arrow);
        card.appendChild(a);
      }
      box.appendChild(card);
    });
  }

  function renderContacts(contacts) {
    var box = document.getElementById('contacts-list');
    if (!box || !Array.isArray(contacts)) return;
    box.innerHTML = '';
    contacts.forEach(function (c) {
      var url = (c.url || '').trim();
      if (c.type === 'email' && !/^mailto:/i.test(url)) url = 'mailto:' + url;
      var href = safeUrl(url);
      if (!href || !ICONS[c.type]) return;

      var a = document.createElement('a');
      a.className = 'social-item';
      a.href = href;
      a.title = NAMES[c.type];
      if (c.type !== 'email') {
        a.target = '_blank';
        a.rel = 'noopener';
      }
      var img = document.createElement('img');
      img.src = ICONS[c.type];
      img.alt = NAMES[c.type];
      img.setAttribute('height', '35%');
      a.appendChild(img);
      box.appendChild(a);
    });
  }

  // Если site.json нет или не загрузился — остаётся то, что написано в index.html
  fetch('site.json', { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
    .then(function (d) {
      renderLinks(d.links);
      renderContacts(d.contacts);
    })
    .catch(function () {});
})();
