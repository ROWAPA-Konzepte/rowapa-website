/* ===== Startseite Abschluss (Standard 23./24.10.2026), aktiv mit html.hz =====
   Baut aus den CMS-Daten in Webflow:
   1 · «Unsere Erfolge»: Kundenstimmen (Sammlung Kundenstimmen, Bild im Feld «Bild») mit Bild links, Text rechts, Pfeile mit Zähler
   2 · «Im Blickpunkt»: erster Eintrag der Sammlung Blickpunkt (Träger-Element [data-bp] mit Attributen)
   3 · «Neueste Insights»: Sammlung Insights (Träger-Elemente [data-ins]) als blätterbare Kartenreihe
   Inhalte pflegt das Team im CMS; dieses Modul ordnet sie nur an. */
(function(){const D=document,root=D.documentElement;if(!root.classList.contains("hz"))return;
 const $=(s,r)=>(r||D).querySelector(s),$$=(s,r)=>[...(r||D).querySelectorAll(s)];
 const esc=t=>String(t==null?"":t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 const src=(D.currentScript&&D.currentScript.src)||(($$("script[src*='rowapa-website@']")[0]||{}).src||"");const BASE=src.replace(/dist\/rowapa\.js.*$/,"");
 const CH=(d,w)=>`<svg viewBox="0 0 24 24" width="${w||26}" height="${w||26}" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${d?"m9 18 6-6-6-6":"m15 18-6-6 6-6"}"/></svg>`;
 const AR='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';
 const CAL='<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
 const ord=e=>+(e.dataset.order||0);const imgOf=e=>{const i=e&&$("img",e);const s=i?(i.currentSrc||i.getAttribute("src")||""):"";return /placeholder|^$/.test(s)?"":s};
 const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;

 /* 1 · Unsere Erfolge */
 const er=D.getElementById("ergebnisse");if(er&&$(".rgrid",er)){
  const qs=$$(".q",er).sort((a,b)=>ord(a)-ord(b));const n=qs.length;
  const vid=$(".video[data-video]",er),vurl=vid?vid.getAttribute("data-video"):"";
  const S=qs.map((q,i)=>{const k=$(".qk",q),b=$("blockquote",q),c=$("cite",q);return{t:k?k.textContent.trim():"",q:b?b.textContent.trim().replace(/^[«"]|[»"]$/g,""):"",who:c&&$("b",c)?$("b",c).textContent.trim():"",fn:c&&$(".fn",c)?$(".fn",c).textContent.trim():"",img:imgOf(q)||`${BASE}vorschau/bilder/erfolg-${i%8+1}.jpg`}});
  if(n){const html=`<div class="erf" aria-roledescription="Karussell" aria-label="Unsere Erfolge"><div class="erf-im">${S.map((s,i)=>`<img src="${esc(s.img)}" alt="" class="${i?"":"on"}" loading="${i?"lazy":"eager"}">`).join("")}</div><div class="erf-tx"><div class="erf-nav"><button type="button" class="erf-b" data-d="-1" aria-label="Vorheriger Erfolg">${CH(0)}</button><span class="erf-c" aria-live="polite"><b>1</b>/${n}</span><button type="button" class="erf-b" data-d="1" aria-label="Nächster Erfolg">${CH(1)}</button></div><div class="erf-st">${S.map((s,i)=>`<div class="erf-s${i?"":" on"}" aria-hidden="${i?"true":"false"}"><h3>${esc(s.t)}</h3><i class="erf-bar"></i><p>«${esc(s.q)}»</p><p class="erf-who"><b>${esc(s.who)}</b>${s.fn?`<span>${esc(s.fn)}</span>`:""}</p><a class="erf-btn" href="#"${i?' tabindex="-1"':""}>Mehr lesen${AR}</a></div>`).join("")}</div></div></div>`;
   const rg=$(".rgrid",er);rg.insertAdjacentHTML("beforebegin",html);rg.remove();
   const head=$(".head",er),scr=D.createElement("div");scr.className="erf-scr";if(head){head.parentNode.insertBefore(scr,head);scr.appendChild(head)}else er.querySelector(".wrap").prepend(scr);scr.appendChild($(".erf",er));
   const th=$(".team-h",er);if(th&&vurl){const a=D.createElement("a");a.className="lnk erf-vid";a.href="#";a.setAttribute("data-video",vurl);a.innerHTML='<span class="b"><span class="ic i-play">▶</span></span>Wer wir sind · Video';const l=$(".lnk",th),g=D.createElement("div");g.className="team-links";if(l){l.replaceWith(g);g.append(a,l)}else th.appendChild(a)}
   let cur=0;const im=$$(".erf-im img",er),st=$$(".erf-s",er),cnt=$(".erf-c b",er);
   const go=i=>{cur=(i+n)%n;im.forEach((x,j)=>x.classList.toggle("on",j===cur));st.forEach((x,j)=>{x.classList.toggle("on",j===cur);x.setAttribute("aria-hidden",j===cur?"false":"true");const a=$(".erf-btn",x);if(a){if(j===cur)a.removeAttribute("tabindex");else a.setAttribute("tabindex","-1")}});cnt.textContent=cur+1};
   $$(".erf-b",er).forEach(b=>b.addEventListener("click",()=>go(cur+ +b.dataset.d)))}}

 /* 2 · Im Blickpunkt */
 const cas=D.getElementById("cas");const bpI=cas?$$("[data-bp]",cas).sort((a,b)=>ord(a)-ord(b))[0]:null;
 if(cas&&bpI){const d=bpI.dataset;const B={titel:d.titel||"",text:d.text||"",eck:(d.eck||"").split(/\s*[·|;]\s*|\n/).filter(Boolean),btn:d.btn||"Mehr erfahren",link:d.link||"#",zweit:d.zweit||"",zlink:d.zlink||"",bild:imgOf(bpI.closest(".w-dyn-item")||bpI)||imgOf(bpI)};
  cas.innerHTML=`<div class="bp"><div class="bp-bg" aria-hidden="true">${B.bild?`<div class="bp-fd"><img src="${esc(B.bild)}" alt="" loading="lazy"></div>`:""}</div><div class="wrap"><div class="bp-in"><div class="head"><div><span class="kick">Im Blickpunkt</span><h2 class="h2">Im Blickpunkt</h2><p class="lead hz-line">${esc(B.titel)}</p></div></div>${B.text?`<p class="bp-tx">${esc(B.text)}</p>`:""}${B.eck.length?`<p class="bp-eck">${B.eck.map(x=>`<span>${esc(x)}</span>`).join("")}</p>`:""}<div class="bp-b"><a class="casb-btn pl" href="${esc(B.link)}">${esc(B.btn)}${AR}</a>${B.zweit&&B.zlink?`<a class="bp-z" href="${esc(B.zlink)}">${esc(B.zweit)}${AR}</a>`:""}</div></div></div></div>`;
  cas.classList.add("bpx");cas.removeAttribute("data-late")}

 /* 3 · Neueste Insights */
 const w=D.getElementById("wissen");const ins=w?$$("[data-ins]",w).sort((a,b)=>ord(a)-ord(b)):[];
 if(w&&ins.length){const wr=$(".wrap",w),nl=$(".nl",w);
  const more=$$(".kc",w).map(k=>{const y=$("small span",k);const t=y?y.textContent.trim():"";return{t:t==="Webinar"?"Live-Webinare":t,h:k.getAttribute("href")||"#",y:t}}).filter(x=>x.y==="ROWAPA TV"||x.y==="Webinar");
  const P=ins.map(e=>{const d=e.dataset;return{t:d.titel||"",dt:d.datum||"",k:d.kat||"",l:d.link||"#",img:imgOf(e.closest(".w-dyn-item")||e)||imgOf(e)}});
  const cards=P.map(p=>`<a class="ins-c" href="${esc(p.l)}"><div class="ins-im">${p.img?`<img src="${esc(p.img)}" alt="" loading="lazy">`:""}</div><p class="ins-m">${CAL}<span>${esc(p.dt)}${p.dt?" | ":""}Blog</span></p><h3>${esc(p.t)}</h3>${p.k?`<p class="ins-tg"><span>${esc(p.k)}</span></p>`:""}</a>`).join("");
  [...wr.children].forEach(ch=>{if(ch!==nl)ch.remove()});
  wr.insertAdjacentHTML("afterbegin",`<div class="ins"><div class="ins-l"><div><span class="kick">Insights</span><h2 class="h2">Neueste Insights</h2><p class="lead hz-line">Beiträge aus Vertrieb und Führung.</p></div><a class="casb-btn ol dk" href="https://rowapa.ch/blog-news/">Alle anzeigen${AR}</a>${more.length?`<p class="ins-more">${more.map(x=>`<a href="${esc(x.h)}">${esc(x.t)}</a>`).join("")}</p>`:""}</div><div class="ins-r"><div class="ins-row" tabindex="0" aria-label="Neueste Insights, seitlich blätterbar">${cards}</div><button type="button" class="ins-b" data-d="-1" aria-label="Zurück blättern">${CH(0,24)}</button><button type="button" class="ins-b" data-d="1" aria-label="Weiter blättern">${CH(1,24)}</button></div></div>`);
  w.classList.add("insx");w.removeAttribute("data-late");
  const r=$(".ins-row",w),bs=$$(".ins-b",w);const upd=()=>{bs[0].hidden=r.scrollLeft<8;bs[1].hidden=r.scrollLeft+r.clientWidth>r.scrollWidth-8};
  bs.forEach(b=>b.addEventListener("click",()=>{const c=$(".ins-c",r);r.scrollBy({left:+b.dataset.d*((c?c.getBoundingClientRect().width:300)+28),behavior:reduced?"auto":"smooth"})}));
  r.addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);setTimeout(upd,60)}

 /* Themenlinien 2 | 1 | 2: Kacheln links und rechts verteilen */
 const tr=D.getElementById("tslr");if(tr)$$(".tsl-t",tr).forEach((t,i)=>{t.classList.add(i<2?"tl-l":"tl-r");t.style.setProperty("--row",String(i%2+2))});
 if(window.R&&R.fillIcons)R.fillIcons(D);
})();
