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
 const duo=(o="")=>`<feColorMatrix in="SourceGraphic" type="matrix" values=".2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0"${o?"":""}/><feComponentTransfer result="d"><feFuncR type="table" tableValues="${tv(0)}"/><feFuncG type="table" tableValues="${tv(1)}"/><feFuncB type="table" tableValues="${tv(2)}"/></feComponentTransfer>`;
 /* Bildlook: «duo» volles CI-Duoton, «weich» Duoton mit rund einem Drittel Originalfarbe (CI Option B), «natur» fast Originalfarben, leicht entsättigt und kühl getönt (CI Option A) */
 const mix=(id,sat,kd,ko)=>`<filter id="${id}" color-interpolation-filters="sRGB">${duo()}<feColorMatrix in="SourceGraphic" type="saturate" values="${sat}" result="o"/><feComposite in="d" in2="o" operator="arithmetic" k1="0" k2="${kd}" k3="${ko}" k4="0"/></filter>`;
 svg.innerHTML=`<filter id="rw-duo" color-interpolation-filters="sRGB">${duo()}</filter>`+mix("rw-duo-weich",.6,.62,.38)+mix("rw-duo-natur",.72,.22,.78);
 document.body.appendChild(svg);root.classList.add("duo")})();

/* ---------- 2 · Wege: ruhige Varianten ---------- */
(function(){const sec=document.getElementById("pfade");if(!sec)return;const cards=[...sec.querySelectorAll(".pcard")];if(!cards.length)return;
 const calm=()=>sec.dataset.pfv==="r"||sec.dataset.pfv==="u";
 cards.forEach((c,i)=>{c.style.setProperty("--d",(i*.12).toFixed(2)+"s")});
 if(R.motion){cards.forEach(c=>c.classList.add("pf-pre"));const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove("pf-pre");io.unobserve(e.target)}}),{rootMargin:"0px 0px -12% 0px"});cards.forEach(c=>io.observe(c))}
 /* sanfte Parallaxe im Foto: das Bild bewegt sich etwas langsamer als die Karte */
 R.loops.push(()=>{if(!calm()||!R.motion)return;const ih=innerHeight;const r=sec.getBoundingClientRect();if(r.bottom<0||r.top>ih)return;
  cards.forEach(c=>{const ims=c.querySelectorAll(".im img,.im video.hv");if(!ims.length)return;const q=c.getBoundingClientRect();const p=clamp((ih-q.top)/(ih+q.height),0,1);const tf=`translateY(${((p-.5)*-7).toFixed(2)}%) scale(1.12)`;ims.forEach(im=>{im.style.transform=tf})})})})();

/* ---------- 2b · Wege: kurze Filmschleife, solange die Maus auf der Karte liegt ----------
   Ruhezustand bleibt das Foto. Nur auf Geräten mit Maus und ab Desktop-Breite, nicht bei reduzierter Bewegung.
   Quelle: Attribut data-hv an der Karte (URL einer MP4), sonst die Dateien aus dem Repo (WebM, Ersatz MP4) passend zum Etikett der Karte. */
(function(){const sec=document.getElementById("pfade");if(!sec)return;const cards=[...sec.querySelectorAll(".pcard")];if(!cards.length)return;
 const ok=()=>R.motion&&matchMedia("(hover:hover) and (pointer:fine) and (min-width:992px)").matches;
 const base=(()=>{const s=[...document.scripts].map(x=>x.src).find(u=>/rowapa-website@[^/]+\/dist\/rowapa\.js/.test(u));return s?s.replace(/dist\/rowapa\.js.*$/,"assets/video/"):""})();
 const KEY=[[/privat/i,"privat"],[/broker/i,"broker"],[/female|frauen/i,"female"]];
 const src=c=>{if(c.dataset.hv)return c.dataset.hv;if(!base)return"";const t=(c.querySelector(".tag")||c).textContent;const k=KEY.find(([r])=>r.test(t));return k?base+"rw-weg-"+k[1]+".mp4":""};
 const mk=c=>{let v=c.querySelector("video.hv");if(v)return v;const u=src(c);if(!u)return null;const im=c.querySelector(".im"),img=im&&im.querySelector("img");if(!img)return null;
  v=document.createElement("video");v.className="hv";v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;v.preload="auto";
  ["muted","playsinline","loop","disablepictureinpicture","aria-hidden"].forEach(a=>v.setAttribute(a,a==="aria-hidden"?"true":""));v.tabIndex=-1;const alt=c.dataset.hv?"":u.replace(/\.mp4$/,".webm");[[alt,"video/webm"],[u,"video/mp4"]].forEach(([x,t])=>{if(!x)return;const so=document.createElement("source");so.src=x;so.type=t;v.appendChild(so)});img.after(v);
  v.addEventListener("playing",()=>{if(c.classList.contains("hv-in"))c.classList.add("hv-on")});return v};
 /* Ladezeit: nichts wird vorab geladen. Die Datei der jeweiligen Karte (ca. 200 KB) wird erst geholt, wenn die Maus auf der Karte liegt;
    bis der Film läuft, bleibt das Standbild stehen. Handy, Tablet und reduzierte Bewegung laden nie einen Film. */
 cards.forEach(c=>{let tm=0;
  const on=()=>{if(!ok())return;const v=mk(c);if(!v)return;clearTimeout(tm);c.classList.add("hv-in");const p=v.play();if(p&&p.catch)p.catch(()=>{});if(!v.paused&&v.readyState>2)c.classList.add("hv-on")};
  const off=()=>{c.classList.remove("hv-in","hv-on");const v=c.querySelector("video.hv");if(v){clearTimeout(tm);tm=setTimeout(()=>{if(!c.classList.contains("hv-in"))v.pause()},600)}};
  c.addEventListener("pointerenter",e=>{if(e.pointerType==="mouse")on()});c.addEventListener("pointerleave",off);
  c.addEventListener("focusin",on);c.addEventListener("focusout",off)});
 /* ausserhalb des Bildes nie weiterlaufen lassen */
 addEventListener("visibilitychange",()=>{if(document.hidden)cards.forEach(c=>{const v=c.querySelector("video.hv");if(v)v.pause()})})})();

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

/* ---------- 4 · Video in einer Ebene über der Seite ----------
   Ladezeit: Vimeo lädt erst beim Klick. Beim Überfahren wird nur die Verbindung zu Vimeo vorbereitet, damit der Film schneller startet. */
(function(){const vs=[...document.querySelectorAll("[data-video]")];if(!vs.length)return;
 const embed=u=>{const m=String(u).match(/vimeo\.com\/(?:video\/)?(\d+)/);if(m)return`https://player.vimeo.com/video/${m[1]}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`;const y=String(u).match(/(?:youtu\.be\/|v=)([\w-]{11})/);if(y)return`https://www.youtube-nocookie.com/embed/${y[1]}?autoplay=1&rel=0`;return u};
 let box=null;const close=()=>{if(!box)return;box.remove();box=null;if(R.lenis)R.lenis.start()};
 const open=u=>{close();box=document.createElement("div");box.className="vlb";box.setAttribute("role","dialog");box.setAttribute("aria-modal","true");box.setAttribute("aria-label","Video");
  box.innerHTML=`<div class="vlb-in"><iframe src="${embed(u)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Video"></iframe><a class="vlb-alt" href="${u}" target="_blank" rel="noopener">Video startet nicht? Auf Vimeo ansehen</a></div><button type="button" class="vlb-x" aria-label="Schliessen">×</button>`;
  box.addEventListener("click",e=>{if(e.target===box||e.target.classList.contains("vlb-x"))close()});document.body.appendChild(box);if(R.lenis)R.lenis.stop();box.querySelector(".vlb-x").focus()};
 addEventListener("keydown",e=>{if(e.key==="Escape")close()});
 let warm=false;const pre=()=>{if(warm)return;warm=true;["https://player.vimeo.com","https://i.vimeocdn.com","https://f.vimeocdn.com"].forEach(h=>{const l=document.createElement("link");l.rel="preconnect";l.href=h;l.crossOrigin="";document.head.appendChild(l)})};
 vs.forEach(v=>{v.addEventListener("pointerenter",pre,{once:true});v.addEventListener("focus",pre,{once:true});v.style.cursor="pointer";v.setAttribute("tabindex","0");v.setAttribute("role","button");v.addEventListener("click",e=>{e.preventDefault();open(v.dataset.video)});v.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open(v.dataset.video)}})})})();

/* ---------- 5 · Newsletter Variante C: Punktemeer wie im Header, bewegt sich, wenn die Maus darüberfährt ---------- */
(function(){const w=document.getElementById("wissen");if(!w)return;const nl=w.querySelector(".nl");if(!nl)return;
 let box=nl.querySelector(".nl-sea");if(!box){box=document.createElement("div");box.className="nl-sea";box.setAttribute("aria-hidden","true");box.innerHTML="<canvas></canvas>";nl.prepend(box)}
 const cv=box.querySelector("canvas"),ctx=cv.getContext("2d");if(!ctx)return;
 const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));const CM=hx(R.c("var(--c-manganese)")),CS=hx(R.c("var(--c-serpent)")),CP=hx(R.c("var(--c-plum)"));
 const NX=190,NZ=30,P=[];for(let j=0;j<NZ;j++)for(let i=0;i<NX;i++)P.push([i/(NX-1)*2-1,j/(NZ-1),Math.random()]);
 let t=Math.random()*10,sp=0,hov=0,mx=-9,my=-9,last=performance.now(),W=0,H=0,DPR=1;
 nl.addEventListener("pointerenter",()=>{hov=1});nl.addEventListener("pointerleave",()=>{hov=0;mx=my=-9});
 nl.addEventListener("pointermove",e=>{const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
 R.loops.push(now=>{if(w.dataset.nl!=="c")return;const r=nl.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
  const dt=Math.min(.05,(now-last)/1000);last=now;
  DPR=Math.min(devicePixelRatio||1,2);const bw=box.clientWidth,bh=box.clientHeight;if(!bw||!bh)return;
  if(bw!==W||bh!==H){W=bw;H=bh;cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR)}
  sp+=((R.motion?hov:0)-sp)*Math.min(1,dt*2.5);t+=dt*(.04+1.1*sp);
  ctx.setTransform(DPR,0,0,DPR,0,0);ctx.clearRect(0,0,W,H);
  const f=W*.16,cx=W*.68,hy=H*.06,vs=H*.6,cam=1.15;
  for(let k=0;k<P.length;k++){const p=P[k];const z=1+(1-p[1])*5.5,X=p[0]*9;
   let Y=.32*Math.sin(X*.85+t*1.5+z*.6)+.22*Math.sin(z*1.25-t*1.05+X*.2);
   let sx=cx+X/z*f,sy=hy+(cam-Y)/z*vs;
   if(sp>.01&&mx>-9){const d=Math.hypot(sx-mx,sy-my);if(d<150){const a=(1-d/150);Y+=sp*.6*a*a*Math.sin(d*.07-t*6);sy=hy+(cam-Y)/z*vs}}
   if(sx<-4||sx>W+4||sy<-4||sy>H+4)continue;
   const depth=1-(z-1)/5.5,al=.18+Math.pow(depth,.9)*.72;
   const c=p[2]<.035?CP:(Y>.18?CS:CM);const rad=Math.max(.6,1.9/z);
   ctx.fillStyle=`rgba(${c[0]},${c[1]},${c[2]},${al.toFixed(3)})`;ctx.beginPath();ctx.arc(sx,sy,rad,0,6.2832);ctx.fill()}})})();

/* ---------- 6 · Kontakt: Porträt der Ansprechperson in der Mitte des Werte-Rings ---------- */
(function(){const k=document.getElementById("kontakt");if(!k)return;const ph=k.querySelector(".kp-photo"),sp=k.querySelector(".spin");if(!ph||!sp)return;
 const put=()=>{if(ph.parentElement!==sp){sp.appendChild(ph);sp.classList.add("has-photo")}};put();setTimeout(put,400);
 /* Name direkt unter dem Ring, damit klar ist, wer die Ansprechpartnerin ist */
 if(!k.querySelector(".kp-cap")){const nm=(k.querySelector(".kp-name")||{}).textContent||"",rl=(k.querySelector(".kp-k")||{}).textContent||"Ihre Ansprechpartnerin";if(nm.trim()){const c=document.createElement("div");c.className="kp-cap";c.innerHTML=`<b>${nm.trim()}</b><span>${rl.trim()}</span>`;sp.after(c);k.classList.add("has-cap")}}})();

/* ---------- 7 · Textlinks: Pfeil-Symbol ergänzen, wo Webflow es nicht speichern kann ---------- */
document.querySelectorAll("a.lnk").forEach(a=>{if(!a.querySelector(".b")){const b=document.createElement("span");b.className="b";b.innerHTML=R.icon("arrow-right");a.prepend(b)}});

/* ---------- 8 · Footer: Impulse abonnieren (nutzt das Webflow-Formular im Abschnitt Wissen) ---------- */
(function(){const box=document.querySelector("[data-fnl]");const src=document.querySelector("#wissen .nl form");if(!box||!src)return;
 box.innerHTML='<form class="fnl-form" novalidate><label class="sr" for="fnl-mail">E-Mail-Adresse</label><input id="fnl-mail" type="email" required autocomplete="email" placeholder="name@firma.ch"><button class="btn pl" type="submit">Abonnieren</button></form><p class="fnl-msg" role="status" hidden></p>';
 const f=box.querySelector("form"),inp=f.querySelector("input"),msg=box.querySelector(".fnl-msg");
 f.addEventListener("submit",e=>{e.preventDefault();if(!inp.checkValidity()){inp.reportValidity();return}
  const t=src.querySelector('input[type=email]');t.value=inp.value;
  const wrap=src.closest(".w-form"),done=wrap&&wrap.querySelector(".w-form-done"),fail=wrap&&wrap.querySelector(".w-form-fail");
  msg.hidden=false;msg.textContent="Einen Moment …";
  if(src.requestSubmit)src.requestSubmit();else src.submit();
  let n=0;const iv=setInterval(()=>{n++;const ok=done&&getComputedStyle(done).display!=="none",ko=fail&&getComputedStyle(fail).display!=="none";
   if(ok){clearInterval(iv);msg.textContent="Danke! Die nächsten Impulse kommen direkt in Ihr Postfach.";f.hidden=true}
   else if(ko||n>40){clearInterval(iv);msg.textContent="Das hat leider nicht geklappt. Bitte prüfen Sie die E-Mail-Adresse."}},250)})})();
document.documentElement.lang=document.documentElement.lang&&document.documentElement.lang!=="en"?document.documentElement.lang:"de";
})();
