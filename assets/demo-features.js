(() => {
  const tg = 'https://t.me/DiyachannelUPD';
  const root = document.createElement('div');
  root.id = 'demoFeatureRoot';
  document.body.appendChild(root);

  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const shell = (title, body, cls='') => `
    <div class="df-screen ${cls}">
      <header class="df-head"><button class="df-back" aria-label="Назад">‹</button><h1>${title}</h1><span></span></header>
      <main class="df-content">${body}</main>
    </div>`;

  const screens = {
    history: shell('Історія підписань', `
      <div class="df-tabs"><button class="active">Авторизації</button><button>Підписання</button><button>Копії документів</button></div>
      <div class="df-empty"><div class="df-emoji">🤷</div><h2>Ви ще не здійснювали<br>авторизацію через Дія.Підпис.</h2></div>`),
    signature: shell('Дія.Підпис', `
      <section class="df-card"><span class="df-free">БЕЗКОШТОВНО</span><p>Дія.Підпис — це захищений електронний підпис у Дії для підтвердження особи та підписання документів онлайн.</p><div class="df-info">ⓘ &nbsp; Ознайомтесь зі змістом <u>Заяви про приєднання до Договору про надання електронних довірчих послуг</u></div></section>
      <button class="df-row df-faq">Питання та відповіді <b>→</b></button>
      <section class="df-card"><h2>Кроки активації:</h2><ol><li>Підготуйте фізичний документ.</li><li>Прикладіть документ до NFC-сканера телефона.</li><li>Пройдіть фотоідентифікацію.</li><li>Придумайте надійний код для підпису.</li></ol></section>
      <div class="df-info blue">ⓘ &nbsp; Підпис діятиме лише на пристрої, на якому його було активовано.</div>
      <button class="df-black" type="button" onclick="alert('Демо: активація підпису недоступна.')">Активувати підпис</button>`),
    notifications: shell('Повідомлення', `<div class="df-empty"><div class="df-emoji">👌</div><h2>У вас немає нових повідомлень.</h2></div>`),
    faq: shell('Питання та відповіді', `
      <input class="df-search" placeholder="🔍  Що шукаєте?" />
      <div class="df-list">${['Загальні питання','Авторизація','Дія.Підпис','Підключені пристрої','Документи','Сервіси'].map(x=>`<button class="df-row df-faq-item">${x}<b>→</b></button>`).join('')}</div>`),
    support: shell('Служба підтримки', `<section class="df-card support"><div class="tg-icon">➤</div><h2>Підтримка у Telegram</h2><p>Звертайтесь до нашої служби підтримки в Telegram.</p><a class="df-black" href="${tg}" target="_blank" rel="noopener noreferrer">➤ &nbsp; Перейти в Telegram</a><div class="df-info">ⓘ &nbsp; Підтримка доступна лише через Telegram.</div></section>`),
    devices: shell('Підключені пристрої', `<div class="df-devices">${[
      ['АКТИВНИЙ','Android 15','15.08.2026 / 21:24','16.08.2026 / 15:50'],
      ['НЕАКТИВНИЙ','Android 15','15.06.2026 / 23:47','26.06.2026 / 18:01'],
      ['НЕАКТИВНИЙ','Android 15','22.08.2025 / 20:52','22.08.2025 / 20:52'],
      ['НЕАКТИВНИЙ','Android 11','10.03.2025 / 15:45','30.07.2025 / 14:07']
    ].map((d,i)=>`<article class="df-device"><div><span class="df-status ${i?'off':'on'}">${d[0]}</span><strong>${d[1]}</strong></div><p>Авторизація: Застосунок ПриватБанк</p><p>Дата підключення: ${d[2]}</p><p>Дата останньої активності: ${d[3]}</p><b class="arrow">→</b></article>`).join('')}</div><button class="df-black" id="dfDeleteDevices">Видалити усі</button>`)
  };

  function open(name){
    root.innerHTML = screens[name];
    root.classList.add('open');
    root.querySelector('.df-back')?.addEventListener('click', close);
    root.querySelector('.df-faq')?.addEventListener('click', ()=>open('faq'));
    root.querySelectorAll('.df-faq-item').forEach(b=>b.addEventListener('click',()=>alert('Демо: розділ довідки відкрито.')));
    root.querySelector('#dfDeleteDevices')?.addEventListener('click',()=>{
      root.querySelector('.df-devices').innerHTML='<div class="df-empty small"><div class="df-emoji">👌</div><h2>Немає підключених пристроїв.</h2></div>';
    });
  }
  function close(){root.classList.remove('open'); root.innerHTML='';}

  const hideNativeError = () => {
    const popup = document.getElementById('error-popup');
    if (popup) {
      popup.classList.remove('active');
      popup.style.display = 'none';
      popup.setAttribute('aria-hidden', 'true');
    }
  };

  const bind = () => {
    const map = {'Повідомлення':'notifications','Дія.Підпис':'signature','Історія підписань':'history','Підключені пристрої':'devices','Служба підтримки':'support','Питання та відповіді':'faq'};
    document.querySelectorAll('.columnMenu span').forEach(span=>{
      const key=span.textContent.trim();
      if(!map[key]) return;
      const item = span.closest('div');
      if (!item) return;
      item.addEventListener('click', e=>{
        e.preventDefault();
        e.stopImmediatePropagation();
        hideNativeError();
        open(map[key]);
      }, true);
    });
  };

  // The original demo shell can show a generic error modal when a menu item
  // is clicked. Menu demo screens handle those actions locally, so suppress
  // the native error popup while they are being opened.
  document.addEventListener('click', e => {
    const item = e.target.closest?.('.columnMenu > div, .columnMenu > div > div');
    if (item && item.closest('.columnMenu')) hideNativeError();
  }, true);

  const errorPopup = document.getElementById('error-popup');
  if (errorPopup) {
    new MutationObserver(() => {
      if (root.classList.contains('open')) hideNativeError();
    }).observe(errorPopup, { attributes: true, attributeFilter: ['class', 'style'] });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', bind); else bind();
})();
