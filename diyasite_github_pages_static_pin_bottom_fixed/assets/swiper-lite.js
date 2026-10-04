/* DiyaSite local Swiper-compatible carousel core.
   Implements only the API used by this project; no CDN/network dependency. */
(function(global){
  'use strict';
  function arr(x){return Array.prototype.slice.call(x||[])}
  function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
  function LiteSwiper(target, options){
    if(!(this instanceof LiteSwiper)) return new LiteSwiper(target, options);
    this.params=options||{};
    this.el=typeof target==='string'?document.querySelector(target):target;
    if(!this.el) return this;
    this.wrapperEl=this.el.querySelector('.swiper-wrapper');
    this.slides=arr(this.el.querySelectorAll('.swiper-slide'));
    this.activeIndex=clamp(Number(this.params.initialSlide)||0,0,Math.max(0,this.slides.length-1));
    this.realIndex=this.activeIndex;
    this.destroyed=false;
    this._startX=0; this._startY=0; this._dx=0; this._dy=0; this._dragging=false; this._horizontal=false; this._moved=false;
    this._resizeTimer=0;
    this.el.swiper=this;
    this._buildPagination();
    this._bind();
    this.update();
    this.slideTo(this.activeIndex,0,false);
    this._emit('init');
  }
  LiteSwiper.prototype._emit=function(name){
    var fn=this.params&&this.params.on&&this.params.on[name];
    if(typeof fn==='function'){try{fn(this)}catch(e){}}
  };
  LiteSwiper.prototype._buildPagination=function(){
    var p=this.params&&this.params.pagination;
    if(!p||!p.el) return;
    this.paginationEl=this.el.querySelector(p.el)||document.querySelector(p.el);
    if(!this.paginationEl) return;
    this.paginationEl.innerHTML='';
    var self=this;
    this.slides.forEach(function(_,i){
      var b=document.createElement(p.clickable?'button':'span');
      b.className='swiper-pagination-bullet';
      if(p.clickable){b.type='button';b.setAttribute('aria-label','Перейти до слайда '+(i+1));b.addEventListener('click',function(e){e.preventDefault();self.slideTo(i,self.params.speed||300,true)});}
      self.paginationEl.appendChild(b);
    });
    this.paginationBullets=arr(this.paginationEl.children);
  };
  LiteSwiper.prototype._bind=function(){
    var self=this, el=this.el;
    function point(e){return e.touches&&e.touches[0]?e.touches[0]:e.changedTouches&&e.changedTouches[0]?e.changedTouches[0]:e}
    this._onStart=function(e){
      if(self.destroyed||self.params.allowTouchMove===false) return;
      if(e.button!=null&&e.button!==0) return;
      var p=point(e); self._startX=p.clientX; self._startY=p.clientY; self._dx=0; self._dy=0; self._dragging=true; self._horizontal=false; self._moved=false;
      if(self.wrapperEl) self.wrapperEl.style.transitionDuration='0ms';
      self.el.classList.add('swiper-touching'); self._emit('touchStart');
    };
    this._onMove=function(e){
      if(!self._dragging||self.destroyed) return;
      var p=point(e); self._dx=p.clientX-self._startX; self._dy=p.clientY-self._startY;
      if(!self._moved && Math.max(Math.abs(self._dx),Math.abs(self._dy))<3) return;
      self._moved=true;
      if(!self._horizontal) self._horizontal=Math.abs(self._dx)>Math.abs(self._dy)*1.05;
      if(!self._horizontal) return;
      if(e.cancelable) e.preventDefault();
      var base=-self.activeIndex*self._step();
      var resistance=self.params.resistanceRatio==null?0.72:Number(self.params.resistanceRatio);
      var dx=self._dx;
      if((self.activeIndex===0&&dx>0)||(self.activeIndex===self.slides.length-1&&dx<0)) dx*=resistance;
      self._setTranslate(base+dx);
    };
    this._onEnd=function(){
      if(!self._dragging||self.destroyed) return;
      self._dragging=false; self.el.classList.remove('swiper-touching');
      var horizontal=self._horizontal, dx=self._dx;
      self._emit('touchEnd');
      var threshold=Math.max(Number(self.params.threshold)||3,self._step()*(Number(self.params.longSwipesRatio)||0.22));
      var next=self.activeIndex;
      if(horizontal&&Math.abs(dx)>threshold) next+=dx<0?1:-1;
      self.slideTo(clamp(next,0,self.slides.length-1),self.params.speed==null?300:self.params.speed,true);
    };
    if(global.PointerEvent){
      el.addEventListener('pointerdown',this._onStart,{passive:true});
      global.addEventListener('pointermove',this._onMove,{passive:false});
      global.addEventListener('pointerup',this._onEnd,{passive:true});
      global.addEventListener('pointercancel',this._onEnd,{passive:true});
    } else {
      el.addEventListener('touchstart',this._onStart,{passive:true});
      el.addEventListener('touchmove',this._onMove,{passive:false});
      el.addEventListener('touchend',this._onEnd,{passive:true});
      el.addEventListener('touchcancel',this._onEnd,{passive:true});
    }
    this._onResize=function(){clearTimeout(self._resizeTimer);self._resizeTimer=setTimeout(function(){self.update();self.slideTo(self.activeIndex,0,false)},60)};
    global.addEventListener('resize',this._onResize,{passive:true});
    global.addEventListener('orientationchange',this._onResize,{passive:true});
  };
  LiteSwiper.prototype._slideWidth=function(){return Math.max(1,this.el.clientWidth||global.innerWidth||1)};
  LiteSwiper.prototype._space=function(){return Math.max(0,Number(this.params.spaceBetween)||0)};
  LiteSwiper.prototype._step=function(){return this._slideWidth()+this._space()};
  LiteSwiper.prototype._setTranslate=function(px){if(this.wrapperEl)this.wrapperEl.style.transform='translate3d('+Math.round(px)+'px,0,0)'};
  LiteSwiper.prototype.updateSlidesClasses=function(){
    var self=this;
    this.slides.forEach(function(s,i){
      s.classList.toggle('swiper-slide-active',i===self.activeIndex);
      s.classList.toggle('swiper-slide-prev',i===self.activeIndex-1);
      s.classList.toggle('swiper-slide-next',i===self.activeIndex+1);
      if(self.params.effect==='coverflow') s.style.transform='scale('+(i===self.activeIndex?'1':String((self.params.coverflowEffect&&self.params.coverflowEffect.scale)||0.9))+')';
    });
    if(this.paginationBullets)this.paginationBullets.forEach(function(b,i){b.classList.toggle('swiper-pagination-bullet-active',i===self.activeIndex)});
  };
  LiteSwiper.prototype.update=function(){
    if(this.destroyed||!this.el||!this.wrapperEl) return this;
    var width=this._slideWidth(), space=this._space(), step=width+space;
    var count=this.slides.length;
    this.slides.forEach(function(s,i){s.style.width=width+'px';s.style.flex='0 0 '+width+'px';s.style.marginRight=(i===count-1?0:space)+'px'});
    this.wrapperEl.style.width=(step*this.slides.length-space)+'px';
    this.updateSlidesClasses();
    this._setTranslate(-this.activeIndex*step);
    return this;
  };
  LiteSwiper.prototype.slideTo=function(index,speed,runCallbacks){
    if(this.destroyed||!this.wrapperEl) return this;
    index=clamp(Number(index)||0,0,Math.max(0,this.slides.length-1));
    this.activeIndex=index; this.realIndex=index;
    this.wrapperEl.style.transitionDuration=Math.max(0,Number(speed)||0)+'ms';
    this.wrapperEl.style.transitionTimingFunction='cubic-bezier(.25,.8,.35,1)';
    this.updateSlidesClasses();
    this._setTranslate(-index*this._step());
    var self=this;
    clearTimeout(this._transitionTimer);
    this._transitionTimer=setTimeout(function(){if(runCallbacks!==false)self._emit('transitionEnd')},Math.max(0,Number(speed)||0)+20);
    return this;
  };
  LiteSwiper.prototype.setProgress=function(progress,speed){
    var i=Math.round(clamp(Number(progress)||0,0,1)*Math.max(0,this.slides.length-1));
    return this.slideTo(i,speed||0,false);
  };
  LiteSwiper.prototype.destroy=function(){
    this.destroyed=true;
    if(this.el)this.el.swiper=null;
    return null;
  };
  global.Swiper=LiteSwiper;
})(window);
