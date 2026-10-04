/* GitHub Pages static build — local PIN gate restored */
const nocache = Date.now();

document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll(
    'img[src*="photo.jpg"], img[src*="sign.png"]'
  );
  imgs.forEach((img) => {
    if (!img.src.includes("nocache=")) {
      img.src = img.getAttribute("src").split("?")[0] + "?nocache=" + nocache;
    }
  });
});

// checkBan removed

var isWorking = true;

// Seamless banner ticker: text is prepared in an invisible field outside the
// visible area and the visible track always contains complete ready-to-show copies.
$(document).ready(function() {
  function initSmoothBanner(el, duration) {
    if (!el || el.dataset.smoothTicker === '1') return;
    el.dataset.smoothTicker = '1';

    var source = el.innerHTML;
    var prep = document.createElement('span');
    prep.className = 'banner-prep-field';
    prep.setAttribute('aria-hidden', 'true');
    prep.innerHTML = source;

    var viewport = document.createElement('span');
    viewport.className = 'banner-smooth-viewport';
    var track = document.createElement('span');
    track.className = 'banner-smooth-track';

    // Four complete copies prevent a visible blank interval on narrow iPhones.
    for (var i = 0; i < 4; i++) {
      var part = document.createElement('span');
      part.className = 'banner-smooth-part';
      part.innerHTML = prep.innerHTML;
      track.appendChild(part);
    }

    viewport.appendChild(track);
    el.innerHTML = '';
    el.appendChild(prep);
    el.appendChild(viewport);
    el.style.overflow = 'hidden';
    el.style.whiteSpace = 'nowrap';

    track.style.animationDuration = duration + 'ms';
    // The animation distance is exactly one copy, so the next copy is identical.
    track.style.setProperty('--banner-shift', '-25%');
  }

  document.querySelectorAll('.line1').forEach(function(el) {
    initSmoothBanner(el, 18000);
  });

  // Keep the faster єДокумент ticker speed requested earlier.
  document.querySelectorAll('.line2').forEach(function(el) {
    if (el.querySelector('.kalyna-marquee')) return;
    initSmoothBanner(el, 11000);
  });
});

function vhod(type) {
  if ($(".start-vhod > div.active")[0]) {
    if (type === "plus") {
      $(".start-vhod > div")[
        document.querySelectorAll(".start-vhod > div.active").length
      ].classList.add("active");
      if (document.querySelectorAll(".start-vhod > div.active").length == 4) {
        const startDiv = $(".start-div");

        // Плавно ховаємо
        startDiv.removeClass("active").addClass("hiding");

        // Через 400мс повністю видаляємо з DOM
        setTimeout(() => {
          startDiv.remove();
        }, 400);

        // Показуємо основний контент
        $(".main").addClass("active");
        $(".blockStart").addClass("active");

        // Після успішного 4-значного входу показуємо DEMO-плашку
        // разом із кнопкою «Перевірити» для 32-значного Full Access.
        if (typeof window.showFullAccessWarning === "function") {
          window.showFullAccessWarning();
        }
      }
    } else {
      $(".start-vhod > div")[
        document.querySelectorAll(".start-vhod > div.active").length - 1
      ].classList.remove("active");
    }
  } else {
    $(".start-vhod > div")[0].classList.add("active");
  }
}

document.querySelectorAll(".start-block > button").forEach(function (el) {
  el.addEventListener("click", function () {
    if ($(this).attr("data-type") == "delete") {
      vhod("minus");
    } else {
      vhod("plus");
    }
  });
});

document.querySelectorAll(".footer > button").forEach((div) => {
  div.addEventListener("click", function () {
    const selected = Number($(this).attr("data-index"));
    $(".footer > button").removeClass("active");
    this.classList.add("active");
    const currentBlock = document.querySelector(".block.active");
    if (currentBlock) currentBlock.classList.remove("active");
    const index = selected - 1;

    if (Number($(this).attr("data-index")) == 2) {
      $(".video-background").addClass("active");
    } else {
      $(".video-background").removeClass("active");
    }
    if (index == 1) {
      const activeMain = document.querySelector(".main.active");
      const footer = document.querySelector(".footer");
      if (!activeMain || !footer) return;
      activeMain.style.display = "flex";
      activeMain.style.flexDirection = "column";

      footer.style.position = "absolute";
      footer.style.zIndex = "20";

      document.querySelectorAll(".swiper-container").forEach(function (el) {
        el.style.height = "unset";
      });
      if (window.innerHeight < 700) {
        document.querySelectorAll(".swiper-slide").forEach(function (el) {
          el.style.height = "450px";
        });
      } else {
        document.querySelectorAll(".swiper-slide").forEach(function (el) {
          el.style.height = "500px";
        });
      }
    } else {
      const activeMain = document.querySelector(".main.active");
      const footer = document.querySelector(".footer");
      if (!activeMain || !footer) return;
      activeMain.style.display = "block";
      activeMain.style.flexDirection = "";
      document.querySelectorAll(".swiper-container").forEach(function (el) {
        el.style.height = "60%";
      });
      footer.style.position = "absolute";
      footer.style.zIndex = "20";
      document.querySelectorAll(".swiper-slide").forEach(function (el) {
        el.style.height = "100%";
      });
    }

    const targetBlock = document.querySelectorAll(".block")[index];
    if (targetBlock) {
      if (selected === 2) {
        // Documents should appear immediately without the generic page-in animation.
        targetBlock.classList.add("active");

        // Tapping Documents again always returns to the cards, not to a previously
        // scrolled full-info sheet. This also clears any stale touch/scroll state.
        if (typeof window.closeAllDocumentOverlays === "function") {
          window.closeAllDocumentOverlays();
        }
        targetBlock.scrollTop = 0;
        const slider = targetBlock.querySelector(".documentSlider");
        if (slider) slider.scrollIntoView({block:"start", behavior:"auto"});
        window.scrollTo(0, 0);
      } else {
        targetBlock.classList.remove("active");
        void targetBlock.offsetWidth;
        targetBlock.classList.add("active");
      }
    }
  });
});

document.querySelectorAll(".moreInfo").forEach((el) => {
  el.addEventListener("click", function (e) {
    e.stopPropagation();
    const dataIndex = $(this).attr("data-index");
    $(`.${dataIndex}_block_div`).addClass("active");
    $(`.${dataIndex}_block_div > div`).addClass("active");
  });
});

document.querySelectorAll(".close_block").forEach((el) => {
  el.addEventListener("click", function () {
    const dataIndex = $(this).attr("data-index");
    $(`.${dataIndex}_block_div`).removeClass("active");
    $(`.${dataIndex}_block_div > div`).removeClass("active");
  });
});

// Ініціалізація даних з localStorage (Settings) + Swiper
(function initFromLocalStorage() {
  var STORAGE_KEY = 'diya_settings';
  var s = {};
  try { s = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch(e) {}

  function set(sel, val) {
    if (!val) return;
    document.querySelectorAll(sel).forEach(function(el){ el.textContent = val; });
  }

  var fio = [s.last_name, s.first_name, s.middle_name].filter(Boolean).join(' ');
  set('#name', fio);
  set('#nameEn', s.name_en);
  set('#birthDate', s.birthdate);
  set('#rnokpp', s.rnokpp);
  set('#nomerPasport', s.passport_num);
  set('.user-passport-num', s.passport_num);
  set('#zagran_number', s.zagran_num);
  set('#zagranNumber', s.zagran_num);
  set('#placeBirth', s.place_birth);
  if (fio) set('#textName', fio.split(' ')[1] || '');

  if (s.signature) {
    document.querySelectorAll('img[src="sign.png"], img[src*="sign.png"]').forEach(function(img){
      img.src = s.signature;
      img.style.maxHeight = '40px';
      img.style.maxWidth = '100px';
      img.style.objectFit = 'contain';
    });
  }

  if (s.photo) {
    document.querySelectorAll('[data-document-photo="1"], img[src="photo.jpg"], img[src*="photo.jpg"]').forEach(function(img){
      img.src = s.photo;
      img.style.objectFit = 'cover';
    });
  }

  if (window.Swiper && document.querySelector(".documentSlider")) {
    new Swiper(".documentSlider", {
      initialSlide: 0,
      effect: "coverflow",
      speed: 360,
      pagination: { el: ".swiper-pagination", clickable: true },
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 0,
      grabCursor: false,
      touchRatio: 1,
      touchAngle: 50,
      threshold: 3,
      touchStartPreventDefault: false,
      touchMoveStopPropagation: false,
      simulateTouch: true,
      allowTouchMove: true,
      touchEventsTarget: "container",
      resistance: true,
      resistanceRatio: 0.72,
      followFinger: true,
      roundLengths: true,
      shortSwipes: true,
      longSwipes: true,
      longSwipesRatio: 0.22,
      longSwipesMs: 260,
      preventClicks: true,
      preventClicksPropagation: true,
      preventInteractionOnTransition: false,
      watchSlidesProgress: true,
      observer: false,
      observeParents: false,
      resizeObserver: true,
      updateOnWindowResize: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 1,
        scale: 0.90,
        slideShadows: false
      },
      cssMode: false,
      on: {
        init(swiper) {
          swiper.slides.forEach(slide => slide.classList.add("document-slide-animated"));
        },
        touchStart(swiper) {
          swiper.el.classList.add("is-touching");
        },
        touchEnd(swiper) {
          swiper.el.classList.remove("is-touching");
        },
        transitionEnd(swiper) {
          swiper.el.classList.remove("is-touching");
        }
      }
    });
  }
})();

document.querySelectorAll("#dataNow").forEach(function (el) {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Январь — это 0!
  const year = today.getFullYear();

  el.textContent = `${day}.${month}.${year}`;
});

const notification = document.getElementById("notification");
let notificationTimer = null;

function showNotification() {
  if (!notification) return;
  notification.classList.add("show");
  clearTimeout(notificationTimer);
  notificationTimer = setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

document.querySelectorAll(".copyPng").forEach((el) => {
  el.addEventListener("click", function (e) {
    e.stopPropagation();
    showNotification();
  });
});

let countdownInterval = null;
let countdownEndAt = 0;

// Генерация цифр под штрихкодом.
// Оставлено как отдельная функция, чтобы существующий интерфейс не менялся.
function randomizeShText(shTextElement) {
  if (!shTextElement) return;
  const spans = shTextElement.querySelectorAll("span");
  const codes = [
    Math.floor(Math.random() * 9000 + 1000),
    Math.floor(Math.random() * 9000 + 1000),
    Math.floor(Math.random() * 90000 + 10000),
  ];
  spans.forEach((span, idx) => {
    span.textContent = String(codes[idx % codes.length]);
  });
}

function startCountdown(element, minutes, seconds) {
  if (!element) return;

  clearInterval(countdownInterval);
  const totalSeconds = Math.max(0, (Number(minutes) || 0) * 60 + (Number(seconds) || 0));
  countdownEndAt = Date.now() + totalSeconds * 1000;

  const render = () => {
    const left = Math.max(0, Math.ceil((countdownEndAt - Date.now()) / 1000));
    const mm = Math.floor(left / 60);
    const ss = left % 60;
    element.textContent = `${mm}:${String(ss).padStart(2, "0")}`;

    if (left <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  };

  render();
  if (totalSeconds > 0) countdownInterval = setInterval(render, 1000);
}

// Найдите все элементы с классом 'countdown'
const countdownElements = document.querySelectorAll(
  ".qrcodeBlock > span > span"
);

document.querySelectorAll(".slider").forEach((card) => {
  // Only real document cards may flip. The final slide contains the
  // "Додати документ" and "Змінити порядок документів" actions and must
  // remain completely static.
  if (!card.querySelector(".content.front") || !card.querySelector(".content.back")) return;

  // Keep the rotation as an absolute cumulative angle.  This is important
  // on phones: 360deg must not reset the state back to 0deg.
  card.dataset.flipped = "0";
  card.dataset.rotation = "0";
  card.style.transform = "rotateY(0deg)";

  let rotationBusy = false;
  let lastPointerTime = 0;
  // A swipe/drag must only change the active document slide, never flip it.
  // Store the pointer start position and require a real tap (very small movement).
  let pointerStartX = null;
  let pointerStartY = null;
  let pointerMoved = false;

  card.addEventListener("pointerdown", function (event) {
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      pointerMoved = false;
    }
  }, { passive: true });

  card.addEventListener("pointermove", function (event) {
    if (pointerStartX === null || pointerStartY === null) return;
    if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
    const dx = Math.abs(event.clientX - pointerStartX);
    const dy = Math.abs(event.clientY - pointerStartY);
    // 10px tolerance keeps ordinary finger taps working while any swipe
    // intended for the document slider cancels the flip.
    if (dx > 10 || dy > 10) pointerMoved = true;
  }, { passive: true });

  const rotateDocument = function () {
    // Do not accept another tap while the current 700ms rotation is running.
    // This keeps every tap mapped to exactly one 180° step.
    if (rotationBusy) return;

    // Ignore a second event generated by the same touch.
    const now = Date.now();
    if (now - lastPointerTime < 120) return;
    lastPointerTime = now;

    const qrBlock = card.querySelector(".qrcodeBlock");
    if (qrBlock) {
      // iOS Safari can briefly paint the back face before the 3D transform
      // reaches 90deg. Keep the QR hidden during the first part of the flip
      // so it cannot flash through the front face.
      qrBlock.classList.remove("qr-ready");
      qrBlock.classList.add("qr-loading");
      clearTimeout(qrBlock._qrTimer);
      qrBlock._qrTimer = setTimeout(function(){
        qrBlock.classList.remove("qr-loading");
        qrBlock.classList.add("qr-ready");
      }, 380);
    }

    const element = card.querySelector(".qrcodeBlock > span > span");
    if (element) {
      const raw = (element.getAttribute("data-time") || "0:0").split(":");
      startCountdown(element, parseInt(raw[0], 10) || 0, parseInt(raw[1], 10) || 0);
    }

    randomizeShText(card.querySelector(".shText"));

    // Every tap goes only to the right:
    // 0 -> 180 -> 360 -> 540 -> 720 -> ...
    const currentRotation = Number(card.dataset.rotation || 0);
    const targetRotation = currentRotation + 180;
    card.dataset.rotation = String(targetRotation);
    card.dataset.flipped = "1";

    // On touch devices use the browser's native transform transition.
    // It avoids anime.js/swiper fighting over the same transform property.
    if (window.matchMedia && window.matchMedia("(max-width: 900px)").matches) {
      rotationBusy = true;
      card.style.transition = "-webkit-transform 700ms cubic-bezier(0.25, 0.8, 0.35, 1), transform 700ms cubic-bezier(0.25, 0.8, 0.35, 1)";
      card.style.webkitTransform = "rotateY(" + targetRotation + "deg) translateZ(0)";
      card.style.transform = "rotateY(" + targetRotation + "deg) translateZ(0)";
      window.setTimeout(function () {
        rotationBusy = false;
        // Re-apply the absolute angle so 360/540/720 are never normalized
        // back to zero by another mobile interaction.
        card.style.webkitTransform = "rotateY(" + targetRotation + "deg) translateZ(0)";
        card.style.transform = "rotateY(" + targetRotation + "deg) translateZ(0)";
      }, 720);
    } else {
      anime.remove(card);
      anime({
        targets: card,
        rotateY: targetRotation,
        easing: "easeInOutCubic",
        duration: 700
      });
    }
  };

  // Pointer events are more reliable than click for repeated taps on phones.
  card.addEventListener("pointerup", function (event) {
    // QR / Штрихкод buttons on the back face must never bubble into the
    // document-card flip handler. On mobile Safari/Chrome pointerup reaches
    // the card even when the button's click handler stops propagation.
    if (event.target && event.target.closest && event.target.closest(".qrChange > div[data-index]")) {
      pointerStartX = null;
      pointerStartY = null;
      pointerMoved = false;
      return;
    }
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      const wasMoved = pointerMoved;
      pointerStartX = null;
      pointerStartY = null;
      pointerMoved = false;

      // Do NOT flip after a swipe. Swiping is reserved for changing cards.
      if (wasMoved) return;

      event.preventDefault();
      event.stopPropagation();
      rotateDocument();
    }
  }, { passive: false });

  card.addEventListener("pointerdown", function (event) {
    if (event.target && event.target.closest && event.target.closest(".qrChange > div[data-index]")) {
      pointerStartX = null;
      pointerStartY = null;
      pointerMoved = false;
      event.stopPropagation();
    }
  }, { passive: false });

  card.addEventListener("pointercancel", function () {
    pointerStartX = null;
    pointerStartY = null;
    pointerMoved = false;
  }, { passive: true });

  // Keep normal mouse/desktop click behaviour.
  card.addEventListener("click", function (event) {
    if (event.detail === 0) return;
    if (window.matchMedia && window.matchMedia("(max-width: 900px)").matches) return;
    rotateDocument();
  });
});

// QR / Штрихкод: состояние меняется только внутри текущей карточки.
// Раньше использовались глобальные .changeCode/.shText, из-за чего
// переключение одной карточки меняло код у остальных.
function setCodeMode(cardRoot, mode) {
  if (!cardRoot) return;
  const code = cardRoot.querySelector('.changeCode');
  const shText = cardRoot.querySelector('.shText');
  const controls = cardRoot.querySelectorAll('.qrChange > div > div');
  if (!code) return;

  const isBarcode = mode === 'barcode';
  code.classList.toggle('shcode', isBarcode);
  code.classList.toggle('qrcode', !isBarcode);
  if (shText) shText.style.display = isBarcode ? 'flex' : 'none';

  controls.forEach((control, index) => {
    const selected = isBarcode ? index === 1 : index === 0;
    control.style.background = selected ? 'black' : '#ddd';
    const img = control.querySelector('img');
    if (img) img.style.filter = selected ? 'brightness(0) invert(1)' : 'brightness(1) invert(0)';
  });
}


// v117: iOS-safe QR / barcode controls. Use pointerup on the whole visible
// control instead of relying only on the synthesized click event. Safari can
// suppress that click after the barcode layout changes.
document.querySelectorAll('.qrcodeBlock .qrChange > div[data-index]').forEach(function (control) {
  control.addEventListener('pointerup', function (event) {
    if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
    event.preventDefault();
    event.stopPropagation();
    const cardRoot = this.closest('.qrcodeBlock');
    if (!cardRoot) return;
    const mode = this.getAttribute('data-index') === '2' ? 'barcode' : 'qr';
    if (mode === 'barcode') randomizeShText(cardRoot.querySelector('.shText'));
    setCodeMode(cardRoot, mode);
    cardRoot.dataset.lastCodeControlTap = String(Date.now());
  }, { passive: false });
});

document.querySelectorAll('.qrChange > div > div').forEach(function (control) {
  control.addEventListener('click', function (event) {
    event.stopPropagation();
    const qrChange = this.closest('.qrChange');
    const cardRoot = qrChange && qrChange.closest('.qrcodeBlock');
    if (!cardRoot) return;
    const mode = this.parentElement && this.parentElement.getAttribute('data-index') === '2'
      ? 'barcode'
      : 'qr';
    if (mode === 'barcode') randomizeShText(cardRoot.querySelector('.shText'));
    setCodeMode(cardRoot, mode);
  });
});

if (window.Swiper && document.querySelector(".sliderNews")) {
  new Swiper(".sliderNews", {
    pagination: {
      el: ".swiper-pagination2",
      clickable: true,
    },
    spaceBetween: 30,
    observer: true,
    observeParents: true,
  });
}

function getCurrentDateTime() {
  // Получаем текущую дату и время
  const now = new Date();

  // Получаем часы и минуты
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Дополняем нулями до двух цифр при необходимости
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Получаем день, месяц и год
  let day = now.getDate();
  let month = now.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
  const year = now.getFullYear();

  // Дополняем нулями до двух цифр при необходимости
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  // Формируем строку в нужном формате
  const formattedDateTime = `${hours}:${minutes} | ${day}.${month}.${year}`;

  return formattedDateTime;
}

// Выводим текущие дату и время в нужном формате
document.querySelectorAll("#getCurrentDateTime").forEach((e) => {
  e.textContent = getCurrentDateTime();
});

// Открытие QR/штрихкода внутри конкретной карточки.
// Используем data-атрибуты/классы вместо дублирующихся id.
document.querySelectorAll('.qrcodeBlock .qrChange > div[data-index="1"]').forEach(function (control) {
  control.addEventListener('click', function (event) {
    event.stopPropagation();
    const cardRoot = this.closest('.qrcodeBlock');
    if (cardRoot) setCodeMode(cardRoot, 'qr');
  });
});

document.querySelectorAll('.qrcodeBlock .qrChange > div[data-index="2"]').forEach(function (control) {
  control.addEventListener('click', function (event) {
    event.stopPropagation();
    const cardRoot = this.closest('.qrcodeBlock');
    if (!cardRoot) return;
    randomizeShText(cardRoot.querySelector('.shText'));
    setCodeMode(cardRoot, 'barcode');
  });
});

// v134: removed delayed Documents deactivation; footer navigation owns active state.
// $('.study').parent('div').remove();

// Пройдитесь по всем элементам и запустите для каждого обратный отсчёт
// Функция для показа попапа
function showNoInternetPopup() {
  const popup = document.getElementById("no-internet-popup");
  popup.classList.add("active");
}

// Функция для скрытия попапа
function hideNoInternetPopup() {
  const popup = document.getElementById("no-internet-popup");
  popup.classList.remove("active");
}

// Закрытие попапа при клике на фон
document
  .getElementById("no-internet-popup")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      hideNoInternetPopup();
    }
  });

// Обработчик для кнопки "Оновити"
document.getElementById("update-button").addEventListener("click", function () {
  const userAgent = navigator.userAgent;
  let updateUrl;

  if (/android/i.test(userAgent)) {
    updateUrl = "https://play.google.com/store/apps/details?id=ua.gov.diia.app";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    updateUrl = "https://apps.apple.com/ua/app/%D0%B4%D1%96%D1%8F/id1483878560";
  } else {
    // По умолчанию Play Market, если User Agent не распознан
    updateUrl = "https://play.google.com/store/apps/details?id=ua.gov.diia.app";
  }

  window.location.href = updateUrl;
});

// Обработчики для кнопок в "Сервіси"
document.querySelectorAll(".services > div").forEach((service) => {
  service.addEventListener("click", function (e) {
    e.preventDefault();
    showErrorPopup();
  });
});

// Обработчики для кнопок в "Меню"
document
  .querySelectorAll(".columnMenu > div > div:not(#openSettingsBtn), .columnMenu > button")
  .forEach((menuItem) => {
    menuItem.addEventListener("click", function (e) {
      e.preventDefault();
      showErrorPopup();
    });
  });

// Обработчики для кнопок в "Стрічка" (block1 blockStart)

// Попап только на кнопки с id="buttonLoad"
document.querySelectorAll("#buttonLoad").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    showErrorPopup();
  });
});

// А третью кнопку делаем без id и с прямой ссылкой
// (удалите id="buttonLoad" у третьей кнопки в HTML)

// Обработчик для "Незламність" в "Стрічка"

// Обработчик для "Популярні послуги" в "Стрічка"
document
  .querySelectorAll(".block1.blockStart .popular_poslugu_block > div")
  .forEach((popularItem) => {
    popularItem.addEventListener("click", function (e) {
      e.preventDefault();
      showErrorPopup();
    });
  });

// The final action slide has no .content.front/.content.back, so the flip handler
// already ignores it. Do not stop pointer/touch propagation here: Swiper needs
// those gestures so the user can always swipe back from the final slide.

// Обработчики для "Додати документ" и "Змінити порядок документів" в "Документи"
document
  .querySelectorAll(".block2 .swiper-slide:last-child > .slider > div")
  .forEach((docAction) => {
    docAction.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      showErrorPopup();
    });
  });

document.addEventListener("DOMContentLoaded", function () {
  const startDiv = document.querySelector(".start-div");
  if (startDiv) startDiv.classList.add("active");

  // v161: use the original Face ID icon on all devices.
  const icon = document.getElementById("biometryIcon");
  if (icon) {
    icon.src = "assets/biometrics.png?v=161";
    icon.alt = "Face ID";
    document.documentElement.classList.remove("android-device");
  }
});

const biometryBtn = document.querySelector(".biometry-btn");
if (biometryBtn) biometryBtn.addEventListener("click", () => {
  const startDiv = $(".start-div");

  startDiv.removeClass("active").addClass("hiding");

  setTimeout(() => {
    startDiv.remove();
  }, 400);

  $(".main").addClass("active");
  $(".blockStart").addClass("active");
});

function showErrorPopup() {
  const popup = document.getElementById("error-popup");
  if (popup) popup.classList.add("active");
}

document.querySelectorAll(".error-close, .error-retry").forEach((btn) => {
  btn.addEventListener("click", () => {
    const popup = document.getElementById("error-popup");
    if (popup) popup.classList.remove("active");
  });
});

const ModalMoove = (modal, modalContent, overlay) => {
  if (!modal || !modalContent || !overlay) return;

  // v152: native content scrolling + bottom-sheet pull-to-close.
  // While the details are scrolled, vertical swipes belong only to the content.
  // The sheet itself starts moving only when the gesture begins at scrollTop=0
  // and the finger is pulled downward. This keeps two-way scrolling working and
  // still lets the user swipe the sheet down to get back to the document cards.
  const handle = modal.querySelector(".handle");

  let startY = 0;
  let currentY = 0;
  let startX = 0;
  let currentX = 0;
  let draggingSheet = false;
  let gestureCanDragSheet = false;

  function beginGesture(e, forceSheetDrag) {
    const touch = e.touches && e.touches[0];
    if (!touch) return;
    startY = currentY = touch.clientY;
    startX = currentX = touch.clientX;
    draggingSheet = false;
    gestureCanDragSheet = forceSheetDrag === true || modalContent.scrollTop <= 1;
  }

  function moveSheetBy(diffY) {
    const y = Math.max(0, diffY);
    modal.style.transition = "none";
    overlay.style.transition = "none";
    modal.style.top = `calc(5% + ${y}px)`;
    overlay.style.opacity = String(Math.max(0, 0.7 - y / 700));
  }

  function updateGesture(e, forceSheetDrag) {
    const touch = e.touches && e.touches[0];
    if (!touch) return;
    currentY = touch.clientY;
    currentX = touch.clientX;

    const diffY = currentY - startY;
    const diffX = currentX - startX;

    if (!gestureCanDragSheet && !forceSheetDrag) return;
    if (Math.abs(diffX) > Math.abs(diffY)) return;
    if (diffY <= 0) return;

    // If the gesture started inside the content, never steal it after the page
    // has already begun scrolling. A new pull at scrollTop=0 will close the sheet.
    if (!forceSheetDrag && modalContent.scrollTop > 1 && !draggingSheet) {
      gestureCanDragSheet = false;
      return;
    }

    if (diffY < 6 && !draggingSheet) return;
    draggingSheet = true;
    if (e.cancelable) e.preventDefault();
    moveSheetBy(diffY);
  }

  function finishGesture() {
    const diffY = currentY - startY;
    const shouldClose = draggingSheet && diffY > 120;

    modal.style.transition = "top 0.28s ease";
    overlay.style.transition = "opacity .2s ease";

    if (shouldClose) {
      modal.style.top = "100%";
      modal.classList.remove("open");
      overlay.classList.add("hidden");
      overlay.style.opacity = "0.7";
      // Reset for the next opening only after the closing animation starts.
      requestAnimationFrame(() => { modalContent.scrollTop = 0; });
    } else if (draggingSheet) {
      modal.style.top = "5%";
      overlay.style.opacity = "0.7";
    }

    draggingSheet = false;
    gestureCanDragSheet = false;
  }

  // Handle: always draggable.
  if (handle) {
    handle.addEventListener("touchstart", function (e) {
      beginGesture(e, true);
    }, { passive: true });

    handle.addEventListener("touchmove", function (e) {
      updateGesture(e, true);
    }, { passive: false });

    handle.addEventListener("touchend", finishGesture, { passive: true });
    handle.addEventListener("touchcancel", finishGesture, { passive: true });
  }

  // Content: scroll normally in both directions. Only a NEW downward pull that
  // starts at the very top becomes a sheet-close gesture.
  modalContent.addEventListener("touchstart", function (e) {
    if (handle && e.target && e.target.closest && e.target.closest(".handle")) return;
    beginGesture(e, false);
  }, { passive: true });

  modalContent.addEventListener("touchmove", function (e) {
    if (handle && e.target && e.target.closest && e.target.closest(".handle")) return;
    updateGesture(e, false);
  }, { passive: false });

  modalContent.addEventListener("touchend", finishGesture, { passive: true });
  modalContent.addEventListener("touchcancel", finishGesture, { passive: true });
};
const modalPasport = document.getElementById("pasport-modal");
const modalContentPasport = document.querySelector(".pasport-modal-content");

const modalZagran = document.getElementById("zagran-modal");
const modalContentZagran = document.querySelector(".zagran-modal-content");

const modalStudy = document.getElementById("study-modal");
const modalContentStudy = document.querySelector(".study-modal-content");

const modalPrava = document.getElementById("prava-modal");
const modalContentPrava = document.querySelector(".prava-modal-content");

const modaleDoc = document.getElementById("eDoc-modal");
const modalContenteDoc = document.querySelector(".eDoc-modal-content");

const modalBirth = document.getElementById("birth-modal");
const modalContentBirth = document.querySelector(".birth-modal-content");

const overlay = document.getElementById("overlay");
ModalMoove(modalBirth, modalContentBirth, overlay);
ModalMoove(modalPasport, modalContentPasport, overlay);
ModalMoove(modalZagran, modalContentZagran, overlay);
ModalMoove(modalStudy, modalContentStudy, overlay);
ModalMoove(modalPrava, modalContentPrava, overlay);
ModalMoove(modaleDoc, modalContenteDoc, overlay);

window.closeAllDocumentOverlays = function () {
  document.querySelectorAll(".document_block_div").forEach(function (el) {
    el.classList.remove("active");
    const panel = el.querySelector(":scope > div");
    if (panel) panel.classList.remove("active");
  });
  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.classList.remove("open");
    modal.style.top = "100%";
    const content = modal.querySelector(".modal-content");
    if (content) content.scrollTop = 0;
  });
  if (overlay) {
    overlay.classList.add("hidden");
    overlay.style.opacity = "0.7";
  }
};

document.querySelectorAll("#fullInfoPasport").forEach((el) => {
  el.addEventListener("click", function () {
    modalPasport.style.top = "5%";
    modalPasport.classList.add("open");
    overlay.classList.remove("hidden");
    const dataIndex = this.getAttribute("data-index");
    $(`.pasport_block_div`).removeClass("active");
    $(`.pasport_block_div > div`).removeClass("active");
  });
});

document.querySelectorAll("#fullInfoZagran").forEach((el) => {
  el.addEventListener("click", function () {
    modalZagran.style.top = "5%";
    modalZagran.classList.add("open");
    overlay.classList.remove("hidden");
    const dataIndex = this.getAttribute("data-index");
    $(`.zagran_block_div`).removeClass("active");
    $(`.zagran_block_div > div`).removeClass("active");
  });
});

document.querySelectorAll("#fullInfoStudy").forEach((el) => {
  el.addEventListener("click", function () {
    modalStudy.style.top = "5%";
    modalStudy.classList.add("open");
    overlay.classList.remove("hidden");
    const dataIndex = this.getAttribute("data-index");
    $(`.study_block_div`).removeClass("active");
    $(`.study_block_div > div`).removeClass("active");
  });
});

document.querySelectorAll("#fullInfoeDoc").forEach((el) => {
  el.addEventListener("click", function () {
    modaleDoc.style.top = "5%";
    modaleDoc.classList.add("open");
    overlay.classList.remove("hidden");
    const dataIndex = this.getAttribute("data-index");
    $(`.eDoc_block_div`).removeClass("active");
    $(`.eDoc_block_div > div`).removeClass("active");
  });
});
document.querySelectorAll("#fullInfoBirth").forEach((el) => {
  el.addEventListener("click", function () {
    modalBirth.style.top = "5%";
    modalBirth.classList.add("open");
    overlay.classList.remove("hidden");
    $(`.birth_block_div`).removeClass("active");
    $(`.birth_block_div > div`).removeClass("active");
  });
});
document.querySelectorAll("#fullInfoPrava").forEach((el) => {
  el.addEventListener("click", function () {
    modalPrava.style.top = "5%";
    modalPrava.classList.add("open");
    overlay.classList.remove("hidden");
    const dataIndex = this.getAttribute("data-index");
    $(`.prava_block_div`).removeClass("active");
    $(`.prava_block_div > div`).removeClass("active");
  });
});

function startModalCountdown(modalSelector) {
  const timerEl = document.querySelector(
    `${modalSelector} .qrcodeBlock > span > span[data-time]`
  );
  if (!timerEl) return;

  const time = timerEl.getAttribute("data-time").split(":");
  let minutes = parseInt(time[0], 10);
  let seconds = parseInt(time[1], 10);

  // Очищаем старый таймер, если был
  if (window.modalCountdownInterval)
    clearInterval(window.modalCountdownInterval);

  window.modalCountdownInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(window.modalCountdownInterval);
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    timerEl.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }, 1000);
}

// 2. Закрытие любой модалки + остановка таймера
function closeAllModals() {
  document.querySelectorAll(".modal.open").forEach((m) => {
    m.classList.remove("open");
  });
  if (window.modalCountdownInterval) {
    clearInterval(window.modalCountdownInterval);
    window.modalCountdownInterval = null;
  }
}

// 3. Универсальный обработчик для всех кнопок "Повна інформація"
document.querySelectorAll('[id^="fullInfo"]').forEach((btn) => {
  btn.addEventListener("click", function () {
    const id = this.id; // например fullInfoPasport, fullInfoZagran и т.д.

    let modalId = "";
    if (id.includes("Pasport")) modalId = "#pasport-modal";
    else if (id.includes("Zagran")) modalId = "#zagran-modal";
    else if (id.includes("Study")) modalId = "#study-modal";
    else if (id.includes("Prava")) modalId = "#prava-modal";
    else if (id.includes("Birth")) modalId = "#birth-modal";
    // Добавь сюда новые, если появятся (например #fullInfoPodatki → '#podatki-modal')

    if (modalId && document.querySelector(modalId)) {
      closeAllModals(); // закрываем все предыдущие
      document.querySelector(modalId).classList.add("open");
      startModalCountdown(modalId);

      // Обновляем цифры под штрихкодом, если в модалке есть .shText
      const shTextInModal = document.querySelector(`${modalId} .shText`);
      randomizeShText(shTextInModal);

      // Закрываем меню с опциями (чтобы не висело)
      const docType = modalId.replace("#", "").replace("-modal", "");
      $(`.${docType}_block_div`).removeClass("active");
      $(`.${docType}_block_div > div`).removeClass("active");
    }
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", function (e) {
    if (e.target === this || e.target.classList.contains("handle")) {
      closeAllModals();
    }
  });
});

/* ===== Дія.AI Chat Logic ===== */
(function() {
  var aiMessages = [];
  var isAiTyping = false;

  function getMsgsEl() { return document.getElementById('diyaAiMessages'); }

  function scrollDown() {
    var el = getMsgsEl();
    if (el) el.scrollTop = el.scrollHeight;
  }

  // Set today's date chip
  function initDateChip() {
    var chip = document.getElementById('daiDateChip');
    if (!chip) return;
    var d = new Date();
    var months = ['січ.','лют.','бер.','квіт.','трав.','черв.','лип.','серп.','вер.','жовт.','лист.','груд.'];
    chip.textContent = d.getDate() + ' ' + months[d.getMonth()];
  }

  function initGreetingName() {
    var el = document.getElementById('daiGreetingName');
    if (!el) return;
    try {
      var s = JSON.parse(localStorage.getItem('diya_settings')) || {};
      var name = s.first_name || s.last_name || '';
      if (name) el.textContent = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    } catch(e) {}
  }

  // Append AI message block with sparkle icon + actions
  function appendAiBlock(text) {
    var el = getMsgsEl();
    if (!el) return;
    var block = document.createElement('div');
    block.className = 'dai-msg-block';

    var row = document.createElement('div');
    row.className = 'dai-msg-row';

    var icon = document.createElement('div');
    icon.className = 'dai-sparkle-icon';
    icon.innerHTML = '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2l1.8 6.2L18 10l-6.2 1.8L10 18l-1.8-6.2L2 10l6.2-1.8L10 2Z" fill="currentColor"/><path d="M16 2l.9 2.6L19.5 5.5l-2.6.9L16 9l-.9-2.6L12.5 5.5l2.6-.9L16 2Z" fill="currentColor" opacity="0.5"/></svg>';

    var textDiv = document.createElement('div');
    textDiv.className = 'dai-msg-text';
    // Split by newlines into paragraphs
    text.split('\n').filter(function(l){ return l.trim(); }).forEach(function(line) {
      var p = document.createElement('p');
      p.textContent = line;
      textDiv.appendChild(p);
    });

    row.appendChild(icon);
    row.appendChild(textDiv);

    var actions = document.createElement('div');
    actions.className = 'dai-actions';
    actions.innerHTML = [
      '<button class="dai-action-btn" title="Подобається"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 22V11M2 13v7a2 2 0 002 2h11.26a2 2 0 001.96-1.6l1.54-7A2 2 0 0016.8 11H13V5a2 2 0 00-2-2h-.01a2 2 0 00-2 2v3L7 11" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
      '<button class="dai-action-btn" title="Не подобається"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 2v11m5-9v7a2 2 0 01-2 2H8.74a2 2 0 01-1.96 1.6L5.24 21A2 2 0 007.2 23H11v-3a2 2 0 012 2h.01a2 2 0 002-2v-3l2-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
      '<button class="dai-action-btn" title="Копіювати"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></button>'
    ].join('');

    block.appendChild(row);
    block.appendChild(actions);
    el.appendChild(block);
    scrollDown();
  }

  // Append user bubble
  function appendUserBubble(text) {
    var el = getMsgsEl();
    if (!el) return;
    var div = document.createElement('div');
    div.className = 'dai-user-bubble';
    div.textContent = text;
    el.appendChild(div);
    scrollDown();
  }

  // Typing indicator
  function showTyping() {
    var el = getMsgsEl();
    if (!el) return;
    var block = document.createElement('div');
    block.className = 'dai-msg-block';
    block.id = 'dai-typing';
    var row = document.createElement('div');
    row.className = 'dai-msg-row';
    var icon = document.createElement('div');
    icon.className = 'dai-sparkle-icon';
    icon.innerHTML = '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2l1.8 6.2L18 10l-6.2 1.8L10 18l-1.8-6.2L2 10l6.2-1.8L10 2Z" fill="currentColor"/></svg>';
    var dots = document.createElement('div');
    dots.className = 'dai-typing-dots';
    dots.innerHTML = '<span></span><span></span><span></span>';
    row.appendChild(icon);
    row.appendChild(dots);
    block.appendChild(row);
    el.appendChild(block);
    scrollDown();
  }

  function removeTyping() {
    var t = document.getElementById('dai-typing');
    if (t) t.remove();
  }

  async function sendToAI(userText) {
    if (isAiTyping) return;
    isAiTyping = true;
    aiMessages.push({ role: 'user', content: userText });
    appendUserBubble(userText);
    showTyping();
    setTimeout(function(){
      removeTyping();
      appendAiBlock('Дія.AI недоступна у статичній GitHub Pages версії.');
      isAiTyping = false;
    }, 250);
  }

  document.addEventListener('DOMContentLoaded', function() {
    initDateChip();
    initGreetingName();

    var sendBtn = document.getElementById('diyaAiSend');
    var input = document.getElementById('diyaAiInput');

    if (sendBtn && input) {
      sendBtn.addEventListener('click', function() {
        var txt = input.value.trim();
        if (!txt || isAiTyping) return;
        input.value = '';
        sendToAI(txt);
      });
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          var txt = input.value.trim();
          if (!txt || isAiTyping) return;
          input.value = '';
          sendToAI(txt);
        }
      });
    }
  });
})();

/* ===== Persistent offline photo storage (IndexedDB) ===== */
(function(){
  var DB_NAME='diya_offline_store_v1', STORE='photos', KEY='document_photo';
  function openDB(){return new Promise(function(resolve,reject){
    if(!window.indexedDB) return reject(new Error('IndexedDB unavailable'));
    var req=indexedDB.open(DB_NAME,1);
    req.onupgradeneeded=function(){try{req.result.createObjectStore(STORE);}catch(e){}};
    req.onsuccess=function(){resolve(req.result)};
    req.onerror=function(){reject(req.error||new Error('IndexedDB error'))};
  });}
  window.diYaPhotoStore={
    get:async function(){try{var db=await openDB();return await new Promise(function(res,rej){var r=db.transaction(STORE,'readonly').objectStore(STORE).get(KEY);r.onsuccess=function(){res(r.result||'')};r.onerror=function(){rej(r.error)}})}catch(e){return ''}},
    set:async function(v){try{var db=await openDB();await new Promise(function(res,rej){var r=db.transaction(STORE,'readwrite').objectStore(STORE).put(v,KEY);r.onsuccess=function(){res()};r.onerror=function(){rej(r.error)}});return true}catch(e){return false}},
    clear:async function(){try{var db=await openDB();await new Promise(function(res,rej){var r=db.transaction(STORE,'readwrite').objectStore(STORE).delete(KEY);r.onsuccess=function(){res()};r.onerror=function(){rej(r.error)}})}catch(e){}}
  };
})();

/* ===== Settings Logic ===== */
(function() {
  var STORAGE_KEY = 'diya_settings';
  var PENDING_KEY = 'diya_settings_pending_sync';

  function loadSettings() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch(e) { return {}; }
  }
  function saveLocalSettings(s, pending) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch(e) {}
    if (pending) {
      try { localStorage.setItem(PENDING_KEY, JSON.stringify(s)); } catch(e) {}
    } else {
      try { localStorage.removeItem(PENDING_KEY); } catch(e) {}
    }
  }
  function displayDate(v) {
    var x=String(v||'').trim();
    var m=x.match(/^(\d{4})-(\d{2})-(\d{2})$/); if(m) return m[3]+'.'+m[2]+'.'+m[1];
    var m2=x.match(/^(\d{2})[.\/-](\d{2})[.\/-](\d{4})$/); if(m2) return m2[1]+'.'+m2[2]+'.'+m2[3];
    return x;
  }
  function apiDate(v) {
    var x=String(v||'').trim();
    var m=x.match(/^(\d{2})[.\/-](\d{2})[.\/-](\d{4})$/); if(m) return m[3]+'-'+m[2]+'-'+m[1];
    return x;
  }
  async function saveSettings(s) {
    // GitHub Pages static mode: persist settings only in this browser.
    delete s._clearPhoto;
    saveLocalSettings(s, false);
    applySettings(s);
    return true;
  }
  async function syncProfileFromServer() {
    // No database/server in the GitHub Pages build.
    applySettings(loadSettings());
    return true;
  }

  function applySettings(s) {
    s = s || {};

    // Photo is used by several document cards.
    if (s.photo) {
      document.querySelectorAll('[data-document-photo="1"], img[src="photo.jpg"], img[src*="photo.jpg"]').forEach(function(img) {
        if (img.id !== 'photoPreview') {
          img.src = s.photo;
          img.style.objectFit = 'cover';
        }
      });
    }

    var fullName = [s.last_name, s.first_name, s.middle_name].filter(function(v){ return String(v || '').trim(); }).join(' ');
    if (!fullName) {
      var tgName = String(s.tg_username || '').trim().replace(/^@+/, '');
      if (tgName) fullName = '@' + tgName;
    }

    // The document templates use classes (not IDs), so update every occurrence.
    document.querySelectorAll('.user-name, #name').forEach(function(el){
      el.textContent = fullName || 'Тут твоє ім\'я';
    });
    document.querySelectorAll('.user-name-en, #nameEn').forEach(function(el){
      el.textContent = s.name_en || 'This your name';
    });
    document.querySelectorAll('.user-birthdate, #birthDate').forEach(function(el){
      el.textContent = displayDate(s.birthdate) || '12.07.1999';
    });
    document.querySelectorAll('.user-placebirth, #placeBirth').forEach(function(el){
      el.textContent = s.place_birth || 'Київ';
    });
    var demoRnokpp = String(s.rnokpp || '').replace(/\D/g,'').slice(0,10); document.querySelectorAll('#docRnokpp').forEach(function(el){ el.textContent = demoRnokpp ? 'РНОКПП: ' + demoRnokpp : 'Не вказано'; }); document.querySelectorAll('.user-rnokpp').forEach(function(el){ el.textContent = demoRnokpp || 'Не вказано'; });
    document.querySelectorAll('#nomerPasport, .user-passport-num').forEach(function(el){ el.textContent = s.passport_num || ''; });
    document.querySelectorAll('#zagran_number, #zagranNumber').forEach(function(el){ el.textContent = s.zagran_num || ''; });

    var firstName = s.first_name || '';
    document.querySelectorAll('#textName').forEach(function(el){
      el.textContent = firstName || (s.last_name || '');
    });

    var greetEl = document.getElementById('daiGreetingName');
    if (greetEl) {
      var greetName = s.first_name || s.last_name || '';
      greetEl.textContent = greetName ? greetName.charAt(0).toUpperCase() + greetName.slice(1).toLowerCase() : 'друже';
    }

    // Apply the saved demo signature to the document signature placeholders.
    // These cards remain clearly marked as DEMO/non-official elsewhere in the UI.
    var sig = String(s.signature || '').trim();
    document.querySelectorAll('.demo-signature-image, img[src="sign.png"], img[src*="/sign.png"]').forEach(function(img){
      if (sig) {
        img.src = sig;
        img.alt = 'Збережений підпис Demo';
        img.style.display = '';
        img.style.objectFit = 'contain';
      } else {
        img.src = 'sign.png';
        img.alt = 'Підпис не додано';
      }
    });
  }

  function fillForm(s) {
    var f = function(id, val) { var el = document.getElementById(id); if (el) el.value = val || ''; };
    f('set_last_name',    s.last_name);
    f('set_first_name',   s.first_name);
    f('set_middle_name',  s.middle_name);
    f('set_name_en',      s.name_en);
    f('set_birthdate',    s.birthdate);
    f('set_rnokpp',       s.rnokpp);
    f('set_passport_num', s.passport_num);
    f('set_zagran_num',   s.zagran_num);
    f('set_place_birth',  s.place_birth);
    f('set_passport_issue', s.passport_issue);
    f('set_passport_expiry', s.passport_expiry);
    f('set_registration', s.registration);
    f('set_gender', s.gender);
    f('set_bank_address', s.bank_address);
    f('set_student', s.student);
    f('set_driver_license', s.driver_license);
    var preview = document.getElementById('photoPreview');
    if (preview && s.photo) preview.src = s.photo;
    var demoDoc = document.getElementById('demoDocumentPhotoPreview');
    if (demoDoc) { if (s.demoDocumentPhoto) { demoDoc.src=s.demoDocumentPhoto; demoDoc.style.display='block'; } else { demoDoc.style.display='none'; } }
    var canvas = document.getElementById('signatureCanvas');
    if (canvas) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (s.signature) {
        var img = new Image();
        img.onload = function(){ ctx.drawImage(img, 0, 0, canvas.width, canvas.height); };
        img.src = s.signature;
      }
    }
  }

  function isCanvasBlank(canvas) {
    var blank = document.createElement('canvas');
    blank.width = canvas.width; blank.height = canvas.height;
    return canvas.toDataURL() === blank.toDataURL();
  }

  function readForm() {
    var g = function(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
    var canvas = document.getElementById('signatureCanvas');
    var current = loadSettings();
    var sig = (canvas && !isCanvasBlank(canvas)) ? canvas.toDataURL() : (current.signature || '');
    return {
      photo:        current.photo || '',
      last_name:    g('set_last_name'),
      first_name:   g('set_first_name'),
      middle_name:  g('set_middle_name'),
      name_en:      g('set_name_en'),
      birthdate:    g('set_birthdate'),
      rnokpp:       g('set_rnokpp'),
      passport_num: g('set_passport_num'),
      zagran_num:   g('set_zagran_num'),
      place_birth:  g('set_place_birth'),
      passport_issue: g('set_passport_issue'),
      passport_expiry: g('set_passport_expiry'),
      registration: g('set_registration'),
      gender: g('set_gender'),
      bank_address: g('set_bank_address'),
      student: g('set_student'),
      driver_license: g('set_driver_license'),
      signature:    sig,
    };
  }

  function initSignatureCanvas() {
    var canvas = document.getElementById('signatureCanvas');
    if (!canvas) return;
    var newCanvas = canvas.cloneNode(true);
    canvas.parentNode.replaceChild(newCanvas, canvas);
    canvas = newCanvas;
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    var s = loadSettings();
    if (s.signature) {
      var img = new Image();
      img.onload = function(){ ctx.drawImage(img, 0, 0, canvas.width, canvas.height); };
      img.src = s.signature;
    }
    var drawing = false;
    function getPos(e) {
      var r = canvas.getBoundingClientRect();
      var sx = canvas.width / r.width, sy = canvas.height / r.height;
      var src = e.touches ? e.touches[0] : e;
      return { x: (src.clientX - r.left) * sx, y: (src.clientY - r.top) * sy };
    }
    canvas.addEventListener('mousedown',  function(e){ drawing=true; var p=getPos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); });
    canvas.addEventListener('mousemove',  function(e){ if(!drawing) return; var p=getPos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); });
    canvas.addEventListener('mouseup',    function(){ drawing=false; });
    canvas.addEventListener('mouseleave', function(){ drawing=false; });
    canvas.addEventListener('touchstart', function(e){ e.preventDefault(); drawing=true; var p=getPos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); }, {passive:false});
    canvas.addEventListener('touchmove',  function(e){ e.preventDefault(); if(!drawing) return; var p=getPos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); }, {passive:false});
    canvas.addEventListener('touchend',   function(){ drawing=false; });
    var clearBtn = document.getElementById('clearSignBtn');
    if (clearBtn) {
      var nb = clearBtn.cloneNode(true);
      clearBtn.parentNode.replaceChild(nb, clearBtn);
      nb.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var s = loadSettings(); s.signature = ''; saveSettings(s);
        document.querySelectorAll('img[src*="sign"]').forEach(function(img){ img.src = 'sign.png'; });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    var modal        = document.getElementById('settingsModal');
    var openBtn      = document.getElementById('openSettingsBtn');
    var closeBtn     = document.getElementById('closeSettingsBtn');
    var saveBtn      = document.getElementById('saveSettingsBtn');
    var fileInput    = document.getElementById('photoFileInput');
    var clearPhotoBtn= document.getElementById('clearPhotoBtn');

    if (!modal) return;

    applySettings(loadSettings());
    if (window.diYaPhotoStore) window.diYaPhotoStore.get().then(function(photo){
      if(photo){
        var ss=loadSettings();
        ss.photo=photo;
        ss.demoDocumentPhoto=photo;
        saveLocalSettings(ss,false);
        applySettings(ss);
      }
    });
    syncProfileFromServer().then(function(){
      // Never lose the last local photo just because the server response has no photo field.
      if (window.diYaPhotoStore) window.diYaPhotoStore.get().then(function(photo){
        if(photo){
          var ss=loadSettings(); ss.photo=photo; ss.demoDocumentPhoto=photo;
          saveLocalSettings(ss,false); applySettings(ss);
        }
      });
    });
    window.addEventListener('online', function(){
      syncProfileFromServer().then(function(){
        if (window.diYaPhotoStore) window.diYaPhotoStore.get().then(function(photo){
          if(photo){ var ss=loadSettings(); ss.photo=photo; ss.demoDocumentPhoto=photo; saveLocalSettings(ss,false); applySettings(ss); }
        });
      });
    });
    window.addEventListener('pageshow', function(){
      applySettings(loadSettings());
      if (window.diYaPhotoStore) window.diYaPhotoStore.get().then(function(photo){
        if(photo){ var ss=loadSettings(); ss.photo=photo; ss.demoDocumentPhoto=photo; saveLocalSettings(ss,false); applySettings(ss); }
      });
      if (navigator.onLine) syncProfileFromServer();
    });

    openBtn && openBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      e.stopPropagation();
      modal.classList.remove('hidden');
      await syncProfileFromServer();
      fillForm(loadSettings());
      setTimeout(initSignatureCanvas, 50);
    });

    closeBtn && closeBtn.addEventListener('click', function() {
      modal.classList.add('hidden');
    });

    saveBtn && saveBtn.addEventListener('click', async function() {
      var s = readForm();
      saveBtn.disabled = true;
      var ok = await saveSettings(s);
      saveBtn.disabled = false;
      if (!ok) {
        var nerr = document.getElementById('notification');
        if (nerr) { nerr.textContent = 'Не вдалося зберегти налаштування'; nerr.classList.add('show'); setTimeout(function(){nerr.classList.remove('show');},2500); }
        return;
      }
      await syncProfileFromServer();
      applySettings(loadSettings());
      modal.classList.add('hidden');
      var n = document.getElementById('notification');
      if (n) {
        var orig = n.textContent;
        n.textContent = '✓ Збережено';
        n.classList.add('show');
        setTimeout(function(){ n.classList.remove('show'); setTimeout(function(){ n.textContent = orig; }, 300); }, 2000);
      }
    });

    fileInput && fileInput.addEventListener('change', function() {
      var file = this.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function(e) {
        var source = new Image();
        source.onload = function() {
          // Keep localStorage small and loading fast without changing the UI.
          var maxSide = 1600;
          var scale = Math.min(1, maxSide / Math.max(source.naturalWidth, source.naturalHeight));
          var canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(source.naturalWidth * scale));
          canvas.height = Math.max(1, Math.round(source.naturalHeight * scale));
          var ctx = canvas.getContext('2d');
          ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
          var quality = 0.94, dataUrl = canvas.toDataURL('image/jpeg', quality);
          while (dataUrl.length > 500000 && quality > 0.55) { quality -= 0.04; dataUrl = canvas.toDataURL('image/jpeg', quality); }
          var preview = document.getElementById('photoPreview');
          if (preview) preview.src = dataUrl;
          var s = loadSettings();
          s.photo = dataUrl;
          s.demoDocumentPhoto = dataUrl;
          delete s._clearPhoto;
          // Persist the actual image in IndexedDB first. This is the offline source of truth.
          saveLocalSettings(s, true);
          if (window.diYaPhotoStore) {
            window.diYaPhotoStore.set(dataUrl).catch(function(){});
          }
          applySettings(s);
          // Try the server in the background; offline use must not depend on this request.
          saveSettings(s).catch(function(){});
        };
        source.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });

    clearPhotoBtn && clearPhotoBtn.addEventListener('click', function() {
      var s = loadSettings(); s.photo = ''; s.demoDocumentPhoto=''; s._clearPhoto=true; if(window.diYaPhotoStore) window.diYaPhotoStore.clear(); saveSettings(s);
      var preview = document.getElementById('photoPreview');
      if (preview) preview.src = 'assets/photo.jpg';
      document.querySelectorAll('img[src*="data:image"]').forEach(function(img){
        if (img.id !== 'photoPreview' && !img.src.includes('sign')) img.src = 'assets/photo.jpg';
      });
    });
  });
})();

// Keep fullscreen popups outside containers with overflow/transform rules.
// This prevents the error overlay from being clipped to a partial screen.
(function moveFullscreenPopupsToBody() {
  function move() {
    ["error-popup", "no-internet-popup"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (el.parentNode !== document.body) {
        document.body.appendChild(el);
      }
      // Не задаём width:100vw: в некоторых WebView/масштабированных окнах
      // vw рассчитывается не от фактической области отображения.
      // inset:0 + fixed растягивает слой по реальному viewport.
      el.style.setProperty('position', 'fixed', 'important');
      el.style.setProperty('inset', '0', 'important');
      el.style.setProperty('width', 'auto', 'important');
      el.style.setProperty('height', 'auto', 'important');
      el.style.setProperty('left', '0', 'important');
      el.style.setProperty('right', '0', 'important');
      el.style.setProperty('top', '0', 'important');
      el.style.setProperty('bottom', '0', 'important');
      el.style.setProperty('transform', 'none', 'important');
    });
  }

  // app.js is loaded at the end of <body>, so move them immediately.
  move();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", move, { once: true });
  }
})();


/* GitHub static mode: signature is drawn and stored locally in Settings. */

/* HARD FIX: keep document faces as true opposite planes on every phone/browser. */
(function(){
  function forceFaces(card){
    if(!card || !card.querySelector) return;
    var front=card.querySelector(':scope > .content.front');
    var back=card.querySelector(':scope > .content.back');
    if(!front || !back) return;
    [front,back].forEach(function(el){
      el.style.setProperty('position','absolute','important');
      el.style.setProperty('inset','0','important');
      el.style.setProperty('width','100%','important');
      el.style.setProperty('height','100%','important');
      el.style.setProperty('margin','0','important');
      el.style.setProperty('transform-style','preserve-3d','important');
      el.style.setProperty('-webkit-transform-style','preserve-3d','important');
      el.style.setProperty('backface-visibility','hidden','important');
      el.style.setProperty('-webkit-backface-visibility','hidden','important');
      el.style.setProperty('transform-origin','50% 50%','important');
      el.style.setProperty('-webkit-transform-origin','50% 50%','important');
    });
    front.style.setProperty('transform','rotateY(0deg)','important');
    front.style.setProperty('-webkit-transform','rotateY(0deg)','important');
    back.style.setProperty('transform','rotateY(180deg)','important');
    back.style.setProperty('-webkit-transform','rotateY(180deg)','important');
    back.style.setProperty('background','#fff','important');
  }
  function scan(){
    document.querySelectorAll('.documentSlider .slider').forEach(forceFaces);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',scan); else scan();
  setTimeout(scan,300); setTimeout(scan,1000); setTimeout(scan,2000);
  window.addEventListener('pageshow',scan);
})();


/* v132 document photo recovery: keep every card photo alive even if the
   authenticated photo endpoint temporarily fails or a stale src is restored. */
(function(){
  function bind(){
    document.querySelectorAll('[data-document-photo="1"]').forEach(function(img){
      if(img.dataset.photoRecoveryBound==='1') return;
      img.dataset.photoRecoveryBound='1';
      img.addEventListener('load',function(){ img.dataset.photoRecoveryBusy='0'; });
      img.addEventListener('error',function(){
        if(img.dataset.photoRecoveryBusy==='1') return;
        img.dataset.photoRecoveryBusy='1';
        var packaged='assets/photo.jpg?v=132';
        var useFallback=function(local){
          var candidate=String(local||'');
          if(candidate && candidate!==img.src){ img.src=candidate; return; }
          if(!String(img.src||'').includes('assets/photo.jpg')) img.src=packaged;
          else img.dataset.photoRecoveryBusy='0';
        };
        try{
          if(window.diYaPhotoStore && typeof window.diYaPhotoStore.get==='function'){
            window.diYaPhotoStore.get().then(useFallback).catch(function(){useFallback('');});
          }else useFallback('');
        }catch(e){ useFallback(''); }
      });
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind,{once:true}); else bind();
  window.addEventListener('pageshow',bind);
})();

// v158: larger crisp Android fingerprint control; local dependency build.
