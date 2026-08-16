(() => {
  const tg = 'https://t.me/DiyachannelUPD';
  const root = document.createElement('div');
  root.id = 'demoFeatureRoot';
  document.body.appendChild(root);

  const esc = s => String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));

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
      <div class="df-empty">
        <div class="df-emoji">🤷</div>
        <h2>Ви ще не здійснювали<br>авторизацію через Дія.Підпис.</h2>
      </div>`),

    signature: shell('Дія.Підпис', `
      <section class="df-card">
        <span class="df-free">БЕЗКОШТОВНО</span>
        <p>Дія.Підпис — це захищений електронний підпис у Дії для підтвердження особи та підписання документів онлайн.</p>
        <div class="df-info">ⓘ &nbsp; Ознайомтесь зі змістом <u>Заяви про приєднання до Договору про надання електронних довірчих послуг</u></div>
      </section>
      <button class="df-row df-faq" type="button">Питання та відповіді <b>→</b></button>
      <section class="df-card">
        <h2>Кроки активації:</h2>
        <ol>
          <li>Підготуйте фізичний документ.</li>
          <li>Прикладіть документ до NFC-сканера телефона.</li>
          <li>Пройдіть фотоідентифікацію.</li>
          <li>Придумайте надійний код для підпису.</li>
        </ol>
      </section>
      <div class="df-info blue">ⓘ &nbsp; Підпис діятиме лише на пристрої, на якому його було активовано.</div>
      <button class="df-black" type="button" id="dfActivate">Активувати підпис</button>`),

    notifications: shell('Повідомлення', `
      <div class="df-empty">
        <div class="df-emoji">👌</div>
        <h2>У вас немає нових повідомлень.</h2>
      </div>`),

    faq: shell('Питання та відповіді', `
      <input class="df-search" placeholder="🔍  Що шукаєте?" />
      <div class="df-list">
        ${['Загальні питання','Авторизація','Дія.Підпис','Підключені пристрої','Документи','Сервіси']
          .map(x => `<button class="df-row df-faq-item" type="button">${esc(x)}<b>→</b></button>`).join('')}
      </div>`),

    devices: shell('Підключені пристрої', `
      <div class="df-devices">
        ${[
          ['АКТИВНИЙ','Android 15','15.08.2026 / 21:24','16.08.2026 / 15:50'],
          ['НЕАКТИВНИЙ','Android 15','15.06.2026 / 23:47','26.06.2026 / 18:01'],
          ['НЕАКТИВНИЙ','Android 15','22.08.2025 / 20:52','22.08.2025 / 20:52'],
          ['НЕАКТИВНИЙ','Android 11','10.03.2025 / 15:45','30.07.2025 / 14:07']
        ].map((d,i) => `
          <article class="df-device">
            <div><span class="df-status ${i ? 'off' : 'on'}">${d[0]}</span><strong>${d[1]}</strong></div>
            <p>Авторизація: Застосунок ПриватБанк</p>
            <p>Дата підключення: ${d[2]}</p>
            <p>Дата останньої активності: ${d[3]}</p>
            <b class="arrow">→</b>
          </article>`).join('')}
      </div>
      <button class="df-black" type="button" id="dfDeleteDevices">Видалити усі</button>`)
  };

  function open(name) {
    if (!screens[name]) return;
    root.innerHTML = screens[name];
    root.classList.add('open');

    root.querySelector('.df-back')?.addEventListener('click', close);
    root.querySelector('.df-faq')?.addEventListener('click', () => open('faq'));
    root.querySelector('#dfActivate')?.addEventListener('click', () => {
      alert('Демо: активація підпису недоступна.');
    });
    root.querySelectorAll('.df-faq-item').forEach(btn => {
      btn.addEventListener('click', () => alert('Демо: розділ довідки відкрито.'));
    });
    root.querySelector('#dfDeleteDevices')?.addEventListener('click', () => {
      const list = root.querySelector('.df-devices');
      if (list) {
        list.innerHTML = '<div class="df-empty small"><div class="df-emoji">👌</div><h2>Немає підключених пристроїв.</h2></div>';
      }
    });
  }

  function close() {
    root.classList.remove('open');
    root.innerHTML = '';
  }

  function openSupport() {
    root.innerHTML = `
      <div class="df-support-overlay" role="dialog" aria-modal="true" aria-label="Служба підтримки">
        <div class="df-support-sheet">
          <div class="df-sheet-handle" aria-hidden="true"></div>
          <button class="df-sheet-close" type="button" aria-label="Закрити">×</button>
          <h2>Служба підтримки</h2>
          <p class="df-support-subtitle">Оберіть зручний спосіб зв'язку з нами</p>

          <div class="df-support-list">
            <a class="df-support-row" href="${tg}" target="_blank" rel="noopener noreferrer">
              <span class="df-support-icon telegram">➤</span>
              <span>Telegram</span><b>›</b>
            </a>
            <a class="df-support-row" href="https://m.me/" target="_blank" rel="noopener noreferrer">
              <span class="df-support-icon messenger">✦</span>
              <span>Facebook Messenger</span><b>›</b>
            </a>
            <a class="df-support-row" href="viber://forward?text=Доброго дня" rel="noopener noreferrer">
              <span class="df-support-icon viber">☎</span>
              <span>Viber</span><b>›</b>
            </a>
          </div>
        </div>
      </div>`;

    root.classList.add('open', 'support-open');

    const overlay = root.querySelector('.df-support-overlay');
    const sheet = root.querySelector('.df-support-sheet');
    root.querySelector('.df-sheet-close')?.addEventListener('click', close);

    overlay?.addEventListener('click', e => {
      if (e.target === overlay) close();
    });

    sheet?.addEventListener('click', e => e.stopPropagation());
  }

  // One delegated handler for the actual menu rows.
  // This avoids nested span/div listeners fighting with the app's existing handlers.
  function bindMenu() {
    const menu = document.querySelector('.columnMenu');
    if (!menu || menu.dataset.dfBound === '1') return;
    menu.dataset.dfBound = '1';

    const map = {
      'Повідомлення': 'notifications',
      'Дія.Підпис': 'signature',
      'Історія підписань': 'history',
      'Підключені пристрої': 'devices',
      'Питання та відповіді': 'faq'
    };

    menu.addEventListener('click', e => {
      const row = e.target.closest(':scope > div > div');
      if (!row || !menu.contains(row)) return;

      const label = row.querySelector('span')?.textContent?.trim() || '';

      if (label === 'Служба підтримки') {
        e.preventDefault();
        e.stopPropagation();
        openSupport();
        return;
      }

      if (map[label]) {
        e.preventDefault();
        e.stopPropagation();
        open(map[label]);
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindMenu, { once: true });
  } else {
    bindMenu();
  }
})();
