/* Vorschau 23.10.2026: «Aktuelles» und «Wissen & Impulse» zu einer Reihe «Neu bei ROWAPA» zusammenlegen.
   Läuft vor rowapa.js. Liest die vorhandenen CMS-Einträge aus und baut daraus eine blätterbare Kartenreihe. */
(function(){var cas=document.getElementById("cas"),w=document.getElementById("wissen");if(!cas||!w)return;
 var T=function(e,s){var x=e&&e.querySelector(s);return x?x.textContent.trim():""};
 var esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
 var items=[];var c=cas.querySelector("a.cas");
 if(c){var ci=c.querySelector("img");items.push({big:1,img:ci?ci.getAttribute("src"):"",alt:ci?ci.getAttribute("alt"):"",type:"Programm",icon:"graduation-cap",badge:T(c,".badge").replace(/^[•·\s]+/,""),title:T(c,"h3"),text:T(c,"p"),tags:["Leadership & Team"],href:c.getAttribute("href")||"#"})}
 var TAG={"SOUVERÄN ICH":["Female Empowerment"],"Zeitmanagement":["Vertriebsperformance"]};
 var tagsFor=function(t){for(var k in TAG)if(t.indexOf(k)===0)return TAG[k];return[]};
 var news=[].slice.call(cas.querySelectorAll(".news")).sort(function(a,b){return(+b.dataset.order||0)-(+a.dataset.order||0)});
 news.forEach(function(n){var ic=n.querySelector("[data-icon]");items.push({img:"",type:T(n,".nk span"),icon:ic?ic.getAttribute("data-icon"):"sparkles",title:T(n,"h3"),text:T(n,"p"),tags:tagsFor(T(n,"h3")),href:n.getAttribute("href")||"#"})});
 var kcs=[].slice.call(w.querySelectorAll(".kc")).sort(function(a,b){return(+a.dataset.order||0)-(+b.dataset.order||0)});
 kcs.forEach(function(k){var im=k.querySelector("img"),ic=k.querySelector("small [data-icon]");items.push({img:im?im.getAttribute("src"):"",alt:im?im.getAttribute("alt"):"",type:T(k,"small span"),icon:ic?ic.getAttribute("data-icon"):"book-open",title:T(k,"h3"),text:T(k,"p"),tags:tagsFor(T(k,"h3")),href:k.getAttribute("href")||"#"})});
 var card=function(it){var media=it.img?'<div class="nb-im"><img src="'+esc(it.img)+'" alt="'+esc(it.alt||it.title)+'" loading="lazy">'+(it.badge?'<span class="nb-badge">'+esc(it.badge)+'</span>':'')+'</div>':'<div class="nb-im nb-ph" aria-hidden="true"><span class="ic" data-icon="'+esc(it.icon)+'"></span><em>Bild folgt</em></div>';
  return '<a class="nb-card'+(it.big?' nb-big':'')+'" href="'+esc(it.href)+'">'+media+'<div class="nb-bd"><p class="nb-meta"><span class="ic" data-icon="calendar"></span><span>[Datum]</span><span class="nb-sep">|</span><span>'+esc(it.type)+'</span></p><h3>'+esc(it.title)+'</h3>'+(it.text?'<p class="nb-tx">'+esc(it.text)+'</p>':'')+(it.tags.length?'<p class="nb-tags">'+it.tags.map(function(t){return'<span>'+esc(t)+'</span>'}).join("")+'</p>':'')+'</div></a>'};
 var CH=function(d){return'<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="'+(d?"m9 18 6-6-6-6":"m15 18-6-6 6-6")+'"/></svg>'};
 var head='<div class="head nb-head"><div><span class="kick">Aktuelles &amp; Impulse</span><h2 class="h2">Neu bei ROWAPA</h2><p class="lead">Programme, Termine, Beiträge und Videos aus Vertrieb und Führung.</p></div><div class="nb-ctl"><a class="lnk" href="#"><span class="b"><span class="ic i-arrow-right">→</span></span>Alle Inhalte</a><span class="nb-arrows"><button type="button" class="nb-b" data-d="-1" aria-label="Zurück blättern">'+CH(0)+'</button><button type="button" class="nb-b" data-d="1" aria-label="Weiter blättern">'+CH(1)+'</button></span></div></div>';
 var row='<div class="nb-row" tabindex="0" aria-label="Neu bei ROWAPA, seitlich blätterbar">'+items.map(card).join("")+'</div>';
 var wrap=w.querySelector(".wrap"),nl=w.querySelector(".nl");
 [].slice.call(wrap.children).forEach(function(ch){if(ch!==nl)ch.remove()});
 wrap.insertAdjacentHTML("afterbegin",head+row);w.classList.add("nb");cas.remove();
 var r=wrap.querySelector(".nb-row"),bs=wrap.querySelectorAll(".nb-b");
 var upd=function(){bs[0].disabled=r.scrollLeft<4;bs[1].disabled=r.scrollLeft+r.clientWidth>r.scrollWidth-4};
 bs.forEach(function(b){b.addEventListener("click",function(){var cw=r.querySelector(".nb-card:not(.nb-big)");var st=(cw?cw.getBoundingClientRect().width:300)+24;r.scrollBy({left:+b.dataset.d*st,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})})});
 r.addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);setTimeout(upd,50);
})();
