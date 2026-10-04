/* iOS / Android viewport adapter v2 */
(function(){
  'use strict';
  var root=document.documentElement;
  var viewportRaf=0;
  var lastViewportHeight=0;
  var carouselGesture=false;
  var pendingViewport=false;

  function measuredHeight(){
    var h=window.visualViewport ? window.visualViewport.height : window.innerHeight;
    return h ? Math.round(h) : 0;
  }

  function setViewport(force){
    viewportRaf=0;
    if(carouselGesture && !force){
      pendingViewport=true;
      return;
    }
    var h=measuredHeight();
    if(!h) return;
    if(!force && h===lastViewportHeight) return;
    lastViewportHeight=h;
    root.style.setProperty('--ios-vh',h+'px');
    pendingViewport=false;
  }

  function queueViewportUpdate(force){
    if(viewportRaf) return;
    viewportRaf=requestAnimationFrame(function(){ setViewport(!!force); });
  }

  setViewport(true);
  window.addEventListener('resize',function(){queueViewportUpdate(false);},{passive:true});
  window.addEventListener('orientationchange',function(){
    setTimeout(function(){queueViewportUpdate(true);},100);
  },{passive:true});
  if(window.visualViewport){
    window.visualViewport.addEventListener('resize',function(){queueViewportUpdate(false);},{passive:true});
  }

  /* Freeze viewport-height writes while a card is being dragged. Safari may
     resize visualViewport when browser chrome moves; changing card height in
     the middle of a swipe is one of the main causes of visible jerks. */
  document.addEventListener('pointerdown',function(e){
    if(e.target && e.target.closest && e.target.closest('.documentSlider')) carouselGesture=true;
  },{passive:true,capture:true});
  function endCarouselGesture(){
    if(!carouselGesture) return;
    carouselGesture=false;
    if(pendingViewport) queueViewportUpdate(true);
  }
  document.addEventListener('pointerup',endCarouselGesture,{passive:true,capture:true});
  document.addEventListener('pointercancel',endCarouselGesture,{passive:true,capture:true});

  /* Do not steal touch gestures from Swiper. A flip is allowed only after a
     genuine tap on the card, not after a horizontal drag. */
  var startX=0,startY=0,moved=false;
  document.addEventListener('touchstart',function(e){
    var t=e.touches&&e.touches[0];
    if(!t) return;
    var card=e.target.closest&&e.target.closest('.documentSlider .slider');
    if(!card) return;
    startX=t.clientX; startY=t.clientY; moved=false;
  },{passive:true,capture:true});
  document.addEventListener('touchmove',function(e){
    if(!startX && !startY) return;
    var t=e.touches&&e.touches[0];
    if(!t) return;
    if(Math.abs(t.clientX-startX)>8 || Math.abs(t.clientY-startY)>8) moved=true;
  },{passive:true,capture:true});
  document.addEventListener('touchend',function(){
    startX=0;startY=0;moved=false;
    endCarouselGesture();
  },{passive:true,capture:true});
  document.addEventListener('touchcancel',endCarouselGesture,{passive:true,capture:true});

  document.addEventListener('dblclick',function(e){
    if(e.target.closest && (e.target.closest('button') || e.target.closest('.documentSlider'))){
      e.preventDefault();
    }
  },{passive:false});
})();
