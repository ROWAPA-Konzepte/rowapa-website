/* ===== ROWAPA 2027 · Ruhige Effekte (Feedback 22.10.2026)
   1. Einheitliche Fotobehandlung: alle Fotos im CI-Duoton (Manganese Black → Sea Cliff), wie auf rowapa.ch
   2. Wege (#pfade data-pfv): "r" = drei Karten in einer Reihe, "u" = untereinander über die ganze Breite, "b" = alter Stapel
   3. Ab «Aktuelles» bis zum Schluss: Tiefe (Elemente kommen ruhig von hinten nach vorne).
      Variante über data-late an einem beliebigen Element (z. B. #cas): "depth" (Standard), "focus" (Unschärfe → scharf), "lines" (Linien zeichnen sich), "off"
   4. Video: Element mit data-video="https://vimeo.com/…" öffnet den Film in einer Ebene über der Seite */
(function(){const R=window.R,root=document.documentElement,{clamp}=R;const ease=t=>1-Math.pow(1-t,3);

/* ---------- 1 · Duoton-Filter aus den CI-Variablen ---------- */
(function(){const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);
 const lo=hx(R.c("var(--c-manganese)","#1D3149")),mid=hx(R.c(R.MX("var(--c-serpent)",62,"var(--c-snow)"),"#7E95B6")),hi=hx(R.c(R.MX("var(--c-sea)",22,"#fff"),"#E9F1F8"));
 const tv=k=>[lo[k],mid[k],hi[k]].map(v=>v.toFixed(3)).join(" ");
 const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.setAttribute("aria-hidden","true");svg.setAttribute("width","0");svg.setAttribute("height","0");svg.style.cssText="position:absolute;width:0;height:0;overflow:hidden";
 svg.innerHTML=`<filter id="rw-duo" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0"/><feComponentTransfer><feFuncR type="table" tableValues="${tv(0)}"/><feFuncG type="table" tableValues="${tv(1)}"/><feFuncB type="table" tableValues="${tv(2)}"/></feComponentTransfer></filter>`;
 document.body.appendChild(svg);root.classList.add("duo")})();

/* ---------- 2 · Wege: ruhige Varianten ---------- */
(function(){const sec=document.getElementById("pfade");if(!sec)return;const cards=[...sec.querySelectorAll(".pcard")];if(!cards.length)return;
 const calm=()=>sec.dataset.pfv==="r"||sec.dataset.pfv==="u";
 cards.forEach((c,i)=>{c.style.setProperty("--d",(i*.12).toFixed(2)+"s")});
 if(R.motion){cards.forEach(c=>c.classList.add("pf-pre"));const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove("pf-pre");io.unobserve(e.target)}}),{rootMargin:"0px 0px -12% 0px"});cards.forEach(c=>io.observe(c))}
 /* sanfte Parallaxe im Foto: das Bild bewegt sich etwas langsamer als die Karte */
 R.loops.push(()=>{if(!calm()||!R.motion)return;const ih=innerHeight;const r=sec.getBoundingClientRect();if(r.bottom<0||r.top>ih)return;
  cards.forEach(c=>{const im=c.querySelector(".im img");if(!im)return;const q=c.getBoundingClientRect();const p=clamp((ih-q.top)/(ih+q.height),0,1);im.style.transform=`translateY(${((p-.5)*-7).toFixed(2)}%) scale(1.12)`})})})();

/* ---------- 3 · Ab «Aktuelles»: ruhige Tiefe ---------- */
(function(){const host=document.querySelector("[data-late]");const mode=()=>(document.querySelector("[data-late]")||{dataset:{}}).dataset.late||"depth";
 const SEL=["#ergebnisse .head","#ergebnisse .rgrid>div:first-child","#ergebnisse .video","#cas .head","#cas .cas","#cas .news","#wissen .head","#wissen .kc","#wissen .nl","#faq .head","#faq .fq","#kontakt .wrap>div:first-child"];
 const els=[];SEL.forEach(s=>document.querySelectorAll(s).forEach(e=>{if(!els.includes(e))els.push(e)}));if(!els.length)return;
 els.forEach(e=>{e.classList.add("dz");e.classList.remove("pre")});
 /* kleine Staffelung innerhalb einer Reihe */
 const rowIdx=new Map();els.forEach(e=>{const p=e.parentElement;const sib=els.filter(x=>x.parentElement===p);rowIdx.set(e,sib.length>1?sib.indexOf(e):0)});
 let last="";
 R.loops.push(()=>{const m=mode();if(m!==last){last=m;root.dataset.lateFx=m;els.forEach(e=>{e.style.transform="";e.style.opacity="";e.style.filter="";e.style.removeProperty("--e")})}
  if(m==="off"||!R.motion)return;const ih=innerHeight;
  els.forEach(e=>{const r=e.getBoundingClientRect();if(r.top>ih*1.1||r.bottom<-ih*.2)return;
   const st=Math.min(rowIdx.get(e),4)*.06;const p=clamp((ih*(1-st)-r.top)/(ih*.5),0,1),t=ease(p);
   if(m==="depth"){e.style.transform=`translateY(${((1-t)*36).toFixed(1)}px) scale(${(.93+.07*t).toFixed(4)})`;e.style.opacity=(.15+.85*t).toFixed(3);e.style.setProperty("--e",t.toFixed(3))}
   else if(m==="focus"){e.style.filter=t<.999?`blur(${((1-t)*9).toFixed(2)}px)`:"";e.style.transform=`scale(${(1.025-.025*t).toFixed(4)})`;e.style.opacity=(.2+.8*t).toFixed(3)}
   else if(m==="lines"){e.style.setProperty("--e",t.toFixed(3));e.style.opacity=(.2+.8*clamp(t*1.4-.2,0,1)).toFixed(3);e.style.transform=`translateY(${((1-t)*14).toFixed(1)}px)`}})})})();

/* ---------- 4 · Video in einer Ebene über der Seite ---------- */
(function(){const vs=[...document.querySelectorAll("[data-video]")];if(!vs.length)return;
 const embed=u=>{const m=String(u).match(/vimeo\.com\/(?:video\/)?(\d+)/);if(m)return`https://player.vimeo.com/video/${m[1]}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`;const y=String(u).match(/(?:youtu\.be\/|v=)([\w-]{11})/);if(y)return`https://www.youtube-nocookie.com/embed/${y[1]}?autoplay=1&rel=0`;return u};
 let box=null;const close=()=>{if(!box)return;box.remove();box=null;if(R.lenis)R.lenis.start()};
 const open=u=>{close();box=document.createElement("div");box.className="vlb";box.setAttribute("role","dialog");box.setAttribute("aria-modal","true");box.setAttribute("aria-label","Video");
  box.innerHTML=`<div class="vlb-in"><iframe src="${embed(u)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Video"></iframe><a class="vlb-alt" href="${u}" target="_blank" rel="noopener">Video startet nicht? Auf Vimeo ansehen</a></div><button type="button" class="vlb-x" aria-label="Schliessen">×</button>`;
  box.addEventListener("click",e=>{if(e.target===box||e.target.classList.contains("vlb-x"))close()});document.body.appendChild(box);if(R.lenis)R.lenis.stop();box.querySelector(".vlb-x").focus()};
 addEventListener("keydown",e=>{if(e.key==="Escape")close()});
 vs.forEach(v=>{v.style.cursor="pointer";v.setAttribute("tabindex","0");v.setAttribute("role","button");v.addEventListener("click",e=>{e.preventDefault();open(v.dataset.video)});v.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open(v.dataset.video)}})})})();
})();
