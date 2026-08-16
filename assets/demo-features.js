(() => {
  const tg = 'https://t.me/DiyachannelUPD';
  const root = document.createElement('div');
  root.id = 'demoFeatureRoot';
  document.body.appendChild(root);

  const shell = (title, body, cls='') => `
    <div class="df-screen ${cls}">
      <header class="df-head">
        <button class="df-back" aria-label="Назад" type="button">‹</button>
        <h1>${title}</h1><span></span>
      </header>
      <main class="df-content">${body}</main>
    </div>`;

  const screens = {
    history: shell('Історія підписань', `
      <div class="df-tabs">
        <button class="active" type="button">Авторизації</button>
        <button type="button">Підписання</button>
        <button type="button">Копії документів</button>
      </div>
      <div class="df-empty"><div class="df-emoji">🤷</div><h2>Ви ще не здійснювали<br>авторизацію через Дія.Підпис.</h2></div>`),

    signature: shell('Дія.Підпис', `
      <section class="df-card">
        <span class="df-free">БЕЗКОШТОВНО</span>
        <p>Дія.Підпис — це захищений електронний підпис у Дії для підтвердження особи та підписання документів онлайн.</p>
        <div class="df-info">ⓘ &nbsp; Ознайомтесь зі змістом <u>Заяви про приєднання до Договору про надання електронних довірчих послуг</u></div>
      </section>
      <button class="df-row df-faq" type="button">Питання та відповіді <b>→</b></button>
      <section class="df-card"><h2>Кроки активації:</h2><ol>
        <li>Підготуйте фізичний документ.</li>
        <li>Прикладіть документ до NFC-сканера телефона.</li>
        <li>Пройдіть фотоідентифікацію.</li>
        <li>Придумайте надійний код для підпису.</li>
      </ol></section>
      <div class="df-info blue">ⓘ &nbsp; Підпис діятиме лише на пристрої, на якому його було активовано.</div>
      <button class="df-black" type="button" onclick="alert('Демо: активація підпису недоступна.')">Активувати підпис</button>`),

    notifications: shell('Повідомлення', `
      <div class="df-empty"><div class="df-emoji">👌</div><h2>У вас немає нових повідомлень.</h2></div>`),

    faq: shell('Питання та відповіді', `
      <input class="df-search" placeholder="🔍  Що шукаєте?" />
      <div class="df-list">${['Загальні питання','Авторизація','Дія.Підпис','Підключені пристрої','Документи','Сервіси']
        .map(x => `<button class="df-row df-faq-item" type="button">${x}<b>→</b></button>`).join('')}</div>`),

    devices: shell('Підключені пристрої', `
      <div class="df-devices">${[
        ['АКТИВНИЙ','Android 15','15.08.2026 / 21:24','16.08.2026 / 15:50'],
        ['НЕАКТИВНИЙ','Android 15','15.06.2026 / 23:47','26.06.2026 / 18:01'],
        ['НЕАКТИВНИЙ','Android 15','22.08.2025 / 20:52','22.08.2025 / 20:52'],
        ['НЕАКТИВНИЙ','Android 11','10.03.2025 / 15:45','30.07.2025 / 14:07']
      ].map((d,i) => `<article class="df-device">
        <div><span class="df-status ${i?'off':'on'}">${d[0]}</span><strong>${d[1]}</strong></div>
        <p>Авторизація: Застосунок ПриватБанк</p>
        <p>Дата підключення: ${d[2]}</p>
        <p>Дата останньої активності: ${d[3]}</p>
        <b class="arrow">→</b>
      </article>`).join('')}</div>
      <button class="df-black" id="dfDeleteDevices" type="button">Видалити усі</button>`),

    support: `
      <div class="df-support-overlay" role="dialog" aria-modal="true" aria-label="Служба підтримки">
        <div class="df-support-sheet">
          <div class="df-sheet-handle"></div>
          <button class="df-sheet-close" type="button" aria-label="Закрити">×</button>
          <h1>Служба підтримки</h1>
          <p class="df-support-subtitle">Оберіть зручний спосіб зв'язку з нами</p>
          <div class="df-support-list">
            <a href="${tg}" target="_blank" rel="noopener noreferrer"><span class="df-support-icon tg">➤</span><span>Telegram</span><b>›</b></a>
            <a href="#" data-demo-contact="messenger"><span class="df-support-icon messenger">⌁</span><span>Facebook Messenger</span><b>›</b></a>
            <a href="#" data-demo-contact="viber"><span class="df-support-icon viber">☎</span><span>Viber</span><b>›</b></a>
          </div>
        </div>
      </div>`
  };

  let current = null;

  function open(name) {
    current = name;
    root.innerHTML = screens[name] || '';
    root.classList.add('open');

    const back = root.querySelector('.df-back');
    if (back) back.addEventListener('click', close);

    root.querySelector('.df-faq')?.addEventListener('click', () => open('faq'));

    root.querySelectorAll('.df-faq-item').forEach(btn => {
      btn.addEventListener('click', () => alert('Демо: розділ довідки відкрито.'));
    });

    root.querySelector('#dfDeleteDevices')?.addEventListener('click', () => {
      const list = root.querySelector('.df-devices');
      if (list) list.innerHTML = '<div class="df-empty small"><div class="df-emoji">👌</div><h2>Немає підключених пристроїв.</h2></div>';
    });

    root.querySelector('.df-sheet-close')?.addEventListener('click', close);
    root.querySelector('.df-support-overlay')?.addEventListener('click', e => {
      if (e.target.classList.contains('df-support-overlay')) close();
    });

    root.querySelectorAll('[data-demo-contact]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        alert('Демо: цей спосіб зв’язку відкривається на пристрої користувача.');
      });
    });
  }

  function close() {
    current = null;
    root.classList.remove('open');
    root.innerHTML = '';
  }

  function bindMenu() {
    const map = {
      'Повідомлення': 'notifications',
      'Дія.Підпис': 'signature',
      'Історія підписань': 'history',
      'Підключені пристрої': 'devices',
      'Служба підтримки': 'support',
      'Питання та відповіді': 'faq'
    };

    document.querySelectorAll('.columnMenu span').forEach(span => {
      const key = span.textContent.trim();
      const target = map[key];
      if (!target || span.dataset.demoBound === '1') return;

      const row = span.parentElement;
      if (!row) return;

      span.dataset.demoBound = '1';
      row.style.cursor = 'pointer';
      row.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        open(target);
      });
    });

    // Settings already has its own modal in the page. Keep it working.
    const settings = document.getElementById('openSettingsBtn');
    if (settings && settings.dataset.demoBound !== '1') {
      settings.dataset.demoBound = '1';
      settings.addEventListener('click', e => e.stopPropagation());
    }

    // Demo actions for menu items that otherwise have no handler.
    document.querySelectorAll('.columnMenu span').forEach(span => {
      const key = span.textContent.trim();
      if (span.dataset.demoActionBound === '1') return;

      if (key === 'Оновити застосунок') {
        span.dataset.demoActionBound = '1';
        span.parentElement?.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          alert('Застосунок уже має актуальну демо-версію.');
        });
      }

      if (key === 'Копіювати номер пристрою') {
        span.dataset.demoActionBound = '1';
        span.parentElement?.addEventListener('click', async e => {
          e.preventDefault();
          e.stopPropagation();
          const value = 'DEMO-DEVICE-0001';
          try {
            await navigator.clipboard.writeText(value);
            alert('Номер пристрою скопійовано.');
          } catch {
            alert('Номер пристрою: ' + value);
          }
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindMenu, {once:true});
  } else {
    bindMenu();
  }
})();
