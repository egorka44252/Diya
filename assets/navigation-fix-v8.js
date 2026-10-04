(function(){
  'use strict';

  var FOOTER_ICONS = {
    '1': { normal: 'assets/nav-feed-off-v88.png', active: 'assets/nav-feed-on-v90.png' },
    '2': { normal: 'assets/nav-documents-off-v88.png', active: 'assets/nav-documents-on-v90.png' },
    '4': { normal: 'assets/nav-services-off-v88.png', active: 'assets/nav-services-on-v90.png' },
    '5': { normal: 'assets/nav-menu-off-v88.png', active: 'assets/nav-menu-on-v90.png' }
  };

  var lastNavIndex = 0;
  var lastNavAt = 0;
  var currentTab = 1;
  var pendingTab = 0;
  var navTimer = 0;
  var LOADER_MS = 1000;

  function getBlocks(){
    return Array.prototype.slice.call(document.querySelectorAll('.main > .block'));
  }

  function syncFooterIcon(item, isActive){
    var index = item.getAttribute('data-index');
    var pair = FOOTER_ICONS[index];
    if(!pair) return;
    var img = item.querySelector('.footer-icon img');
    if(!img) return;
    var src = isActive ? pair.active : pair.normal;
    if(img.getAttribute('src') !== src) img.setAttribute('src', src);
  }

  function syncFooter(n){
    document.querySelectorAll('.footer > [data-index]').forEach(function(item){
      var active = item.getAttribute('data-index') === String(n);
      item.classList.toggle('active', active);
      syncFooterIcon(item, active);
      if(active) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
  }

  function preloadIcons(){
    Object.keys(FOOTER_ICONS).forEach(function(key){
      [FOOTER_ICONS[key].normal, FOOTER_ICONS[key].active].forEach(function(src){
        var img = new Image();
        img.src = src;
      });
    });
    var crest = new Image();
    crest.src = 'assets/gerb.png';
  }

  function ensureLoader(){
    var overlay = document.getElementById('diyaTabLoader');
    if(overlay) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'diyaTabLoader';
    overlay.className = 'diya-tab-loader';
    overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML = '<div class="diya-tab-loader-crest"><img src="assets/gerb.png" alt=""></div>';
    document.body.appendChild(overlay);
    return overlay;
  }

  function showLoader(){
    var overlay = ensureLoader();
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden','false');
  }

  function hideLoader(){
    var overlay = document.getElementById('diyaTabLoader');
    if(!overlay) return;
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden','true');
  }

  function resetDocumentsToFirst(target){
    if(!target) return;
    var tries = 0;
    function reset(){
      var slider = target.querySelector('.documentSlider');
      var swiper = slider && slider.swiper;
      if(!swiper || swiper.destroyed){
        if(tries++ < 12) window.setTimeout(reset, 40);
        return;
      }
      try {
        swiper.update();
        swiper.slideTo(0, 0, false);
        if(typeof swiper.setProgress === 'function') swiper.setProgress(0, 0);
        swiper.updateSlidesClasses();
      } catch (_) {}
    }
    if(window.requestAnimationFrame){
      requestAnimationFrame(function(){ reset(); requestAnimationFrame(reset); });
    } else reset();
    window.setTimeout(reset, 90);
    window.setTimeout(reset, 240);
  }

  function applyTabBackground(n){
    document.body.setAttribute('data-diya-tab', String(n));
    document.documentElement.setAttribute('data-diya-tab', String(n));
  }

  function showTabImmediate(n){
    n = Number(n);
    if(!(n >= 1 && n <= 5)) return;

    var blocks = getBlocks();
    var target = blocks[n - 1];
    if(!target) return;

    blocks.forEach(function(block, i){
      var active = i === (n - 1);
      block.classList.toggle('active', active);
      block.setAttribute('aria-hidden', active ? 'false' : 'true');
      block.style.removeProperty('display');
    });

    syncFooter(n);
    applyTabBackground(n);

    var bg = document.querySelector('.video-background');
    if(bg) bg.classList.toggle('active', n === 2);

    target.querySelectorAll('.pre').forEach(function(scroller){ scroller.scrollTop = 0; });
    if(n === 2) resetDocumentsToFirst(target);
    currentTab = n;
    pendingTab = 0;
  }

  function transitionToTab(n){
    n = Number(n);
    if(!(n >= 1 && n <= 5)) return;
    if(n === currentTab && !pendingTab) return;
    if(n === pendingTab) return;

    if(navTimer){
      clearTimeout(navTimer);
      navTimer = 0;
    }

    pendingTab = n;
    syncFooter(n); // Highlight target immediately.

    // Documents and Menu switch instantly: no loading overlay.
    if(n === 2 || n === 5){
      hideLoader();
      showTabImmediate(n);
      return;
    }

    showLoader();
    navTimer = window.setTimeout(function(){
      navTimer = 0;
      showTabImmediate(n);
      requestAnimationFrame(function(){
        requestAnimationFrame(hideLoader);
      });
    }, LOADER_MS);
  }

  function handleNavEvent(e){
    var item = e.target && e.target.closest ? e.target.closest('.footer > [data-index]') : null;
    if(!item) return;
    var n = Number(item.getAttribute('data-index'));
    if(!(n >= 1 && n <= 5)) return;

    var now = Date.now();
    if(lastNavIndex === n && (now - lastNavAt) < 300){
      if(e.cancelable) e.preventDefault();
      e.stopPropagation();
      return;
    }
    lastNavIndex = n;
    lastNavAt = now;

    if(e.cancelable) e.preventDefault();
    e.stopPropagation();
    transitionToTab(n);
  }

  function bind(){
    if(document.documentElement.dataset.navV142Bound) return;
    document.documentElement.dataset.navV142Bound = '1';
    preloadIcons();
    ensureLoader();

    if(window.PointerEvent) document.addEventListener('pointerup', handleNavEvent, true);
    else document.addEventListener('touchend', handleNavEvent, {capture:true, passive:false});
    document.addEventListener('click', handleNavEvent, true);

    var active = document.querySelector('.footer > [data-index].active');
    var start = active ? Number(active.getAttribute('data-index')) : 1;
    if(!(start >= 1 && start <= 5)) start = 1;
    showTabImmediate(start);
    hideLoader();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, {once:true});
  else bind();

  window.DiyaShowTab = transitionToTab;
  window.DiyaShowTabImmediate = showTabImmediate;
})();
