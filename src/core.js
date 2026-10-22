/* ===== ROWAPA 2027 · Kern: Grundfunktionen, Webflow-Anpassung, Navigation, Hauptschleife =====
   Einstellungen ohne Code (in Webflow als «Custom Attributes» setzbar):
   - main#top data-scroll-speed="0.16"  Weichheit des Scrollens (0.08 = sehr weich, 1 = normal)
   Alle Texte, Bilder und Links stehen als echte Elemente in Webflow; dieser Code ergänzt nur Effekte. */
window.R=(function(){
"use strict";
const root=document.documentElement,body=document.body;
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const R=Object.assign(window.R||{},{motion:!reduce,lenis:null,loops:[]});
R.clamp=(v,a,b)=>Math.max(a,Math.min(b,v));R.lerp=(a,b,t)=>a+(b-a)*t;R.ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;R.sm=x=>x*x*(3-2*x);
R.num=(el,attr,def)=>{const v=el&&el.getAttribute(attr);const n=parseFloat(v);return isFinite(n)?n:def};
/* Einstellung lesen: zuerst Attribut am Element, dann Webflow-Variable (Sammlung «ROWAPA Startseite»), sonst Standard */
/* CI-Farbe für die 3D-Punkte: liest die Webflow-Farbvariablen (auch Mischungen), z. B. R.c("var(--c-serpent)") */
R.c=(x,fb="#1D3149")=>{try{const e=document.createElement("i");e.style.cssText="position:absolute;visibility:hidden;color:"+x;document.body.appendChild(e);const v=getComputedStyle(e).color;e.remove();let m=v.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/),r;if(m)r=[+m[1],+m[2],+m[3]];else{m=v.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);if(m)r=[m[1]*255,m[2]*255,m[3]*255]}if(!r)return fb;return"#"+r.map(n=>Math.round(n).toString(16).padStart(2,"0")).join("")}catch(_){return fb}};
const MX=(a,p,b)=>`color-mix(in srgb,${a} ${p}%,${b})`;R.MX=MX;
R.cfg=(el,attr,v,def)=>{const a=parseFloat(el&&el.getAttribute(attr));if(isFinite(a))return a;const c=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--_rowapa-startseite---"+v));return isFinite(c)?c:def};
/* Grundzustand: eigenständige Startseite im Farbfluss, kompakte Dichte */
root.classList.add("fluid","sl");
root.classList.add("dk");
if(!R.motion)root.classList.add("still");
/* feste Darstellungsvarianten der freigegebenen Startseite (werden nur gesetzt, wenn in Webflow nichts anderes steht) */
[["themen","zl","e"],["themen","lay","a"],["themen","cta","1"],["pfade","pfv","b"],["antrieb","mc","d"],["vorgehen","vg","d"],["digi","dg","b"],["kontakt","lg","r"]].forEach(([id,k,v])=>{const e=document.getElementById(id);if(e&&!e.dataset[k])e.dataset[k]=v});
{const lg=document.querySelector(".logos");if(lg&&!lg.dataset.dl)lg.dataset.dl="1"}
return R})();

/* ---------- Webflow-Anpassung ---------- */
(function(){const R=window.R;
 /* 1 · CMS-Listen: Webflow legt um jede Liste zwei Hüllen und um jeden Eintrag eine. Der Code braucht die Einträge direkt im Behälter. */
 document.querySelectorAll("[data-cms]").forEach(box=>{const list=box.querySelector(".w-dyn-items");if(!list)return;
  const items=[...list.querySelectorAll(":scope > .w-dyn-item")];const frag=document.createDocumentFragment();
  let cards=items.map(it=>{const kids=[...it.children];return (kids.length===1&&!it.classList.contains("keep"))?kids[0]:it});
  /* Reihenfolge aus dem CMS-Feld «Reihenfolge» (Attribut data-order), sonst wie geliefert */
  if(cards.some(c=>c.hasAttribute("data-order")))cards=cards.map((c,i)=>[c,i]).sort((a,b)=>((parseFloat(a[0].dataset.order)||9999)-(parseFloat(b[0].dataset.order)||9999))||a[1]-b[1]).map(x=>x[0]);
  cards.forEach(c=>frag.appendChild(c));
  const wrap=box.querySelector(".w-dyn-list");(wrap||list).replaceWith(frag);
  box.querySelectorAll(".w-dyn-empty").forEach(e=>e.remove())});
 /* leere CMS-Felder (z. B. fehlender Link) */
 document.querySelectorAll(".w-dyn-bind-empty").forEach(e=>{if(e.tagName==="IMG")e.remove()});
 /* 1b · Zeichenflächen: Webflow kennt kein <canvas>; ein Platzhalter <div data-canvas="id"> wird zur Zeichenfläche (Klasse bleibt) */
 document.querySelectorAll("[data-canvas]").forEach(d=>{const c=document.createElement("canvas");const id=d.getAttribute("data-canvas");if(id)c.id=id;if(d.className)c.className=d.className;const lb=d.getAttribute("data-label");if(lb)c.setAttribute("aria-label",lb);else c.setAttribute("aria-hidden","true");d.replaceWith(c)});
 /* 2 · Symbole: <span class="ic" data-icon="anchor"> wird zum SVG-Symbol */
 const NS="http://www.w3.org/2000/svg";
 const sp=document.createElementNS(NS,"svg");sp.setAttribute("width","0");sp.setAttribute("height","0");sp.setAttribute("aria-hidden","true");sp.style.position="absolute";
 let defs=`<symbol id="s-shield" viewBox="0 0 121.61 125.98">${R.LOGO.shield}</symbol><symbol id="s-word" viewBox="152.6 35.2 309.5 55.6">${R.LOGO.word}</symbol>`;
 for(const k in R.ICONS)defs+=`<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${R.ICONS[k]}</symbol>`;
 sp.innerHTML="<defs>"+defs+"</defs>";document.body.prepend(sp);
 R.icon=(n,c)=>`<svg class="ic${c?" "+c:""}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
 /* Symbol-Platzhalter: <span class="ic i-arrow-right">→</span> (Klasse i-NAME) oder <span class="ic" data-icon="NAME"> */
 R.fillIcons=(scope)=>(scope||document).querySelectorAll("[data-icon],.ic[class*='i-']").forEach(s=>{if(s.tagName==="svg"||s.dataset.done)return;const cls=(s.getAttribute("class")||"ic").split(/\s+/).filter(Boolean);const ic=cls.find(c=>c.indexOf("i-")===0);const n=s.getAttribute("data-icon")||(ic&&ic.slice(2));if(!n||!R.ICONS[n])return;
  if(cls.includes("ic")){const t=document.createElement("template");t.innerHTML=R.icon(n,cls.filter(c=>c!=="ic"&&c!==ic).join(" "));s.replaceWith(t.content.firstChild)}else{s.innerHTML=R.icon(n);s.dataset.done="1"}});
 R.fillIcons();
 /* Kleine Zierelemente, die Webflow als leere Inline-Elemente verlieren kann */
 const need=(sel,tag,cls,first)=>document.querySelectorAll(sel).forEach(e=>{if([...e.children].some(c=>c.tagName===tag.toUpperCase()&&(!cls||c.classList.contains(cls))))return;const n=document.createElement(tag);if(cls)n.className=cls;first?e.prepend(n):e.append(n)});
 need("#h1 .ln","i","",false);need(".tsl .bd","i","",true);need(".burger","span","",false);need(".fq summary","span","pl",false);
 /* Symbole, die Webflow in Links und Inline-Elementen nicht speichert, ergänzt der Code */
 const addIc=(sel,name,first)=>document.querySelectorAll(sel).forEach(e=>{if(e.querySelector("svg.ic"))return;const t=document.createElement("template");t.innerHTML=R.icon(name);first?e.prepend(t.content.firstChild):e.append(t.content.firstChild)});
 addIc('#mm .panel[data-p="tun"] .it',"arrow-right",false);addIc(".tsl-bar i","arrow-right",false);addIc(".nl b","mail",true);
 {const ni=document.getElementById("nmail");if(ni&&!ni.getAttribute("placeholder"))ni.setAttribute("placeholder","name@firma.ch")}
 /* 3 · Logos: <span data-logo="shield|word|full"> */
 document.querySelectorAll("[data-logo]").forEach(e=>{const k=e.getAttribute("data-logo");if(k==="full")e.innerHTML='<svg class="sh" aria-hidden="true"><use href="#s-shield"/></svg><svg class="wd" aria-hidden="true"><use href="#s-word"/></svg>';else if(k==="word")e.innerHTML='<svg viewBox="0 0 309.5 55.6" preserveAspectRatio="xMidYMin meet" aria-hidden="true"><use href="#s-word" width="309.5" height="55.6"/></svg>';else e.innerHTML='<svg aria-hidden="true"><use href="#s-'+k+'"/></svg>'});
})();

/* ---------- Scrollen, Navigation, Hauptschleife ---------- */
(function(){const R=window.R,root=document.documentElement;const {clamp}=R;
 const isTouch=matchMedia("(hover:none)").matches;
 const speed=Math.min(1,Math.max(.04,R.cfg(document.querySelector("[data-scroll-speed]"),"data-scroll-speed","scroll-weichheit",.16)));
 function startLenis(){if(R.lenis||!window.Lenis||isTouch||!R.motion)return;try{R.lenis=new Lenis({lerp:speed})}catch(e){R.lenis=null}}
 startLenis();
 const nav=document.getElementById("nav"),mm=document.getElementById("mm");let openKey=null,tO=0,tC=0;R.nav=nav;
 if(nav&&mm){
  const mmB=[...nav.querySelectorAll("[data-mm]")];
  const openMM=k=>{openKey=k;mm.classList.add("on");mm.querySelectorAll(".panel").forEach(p=>p.classList.toggle("cur",p.dataset.p===k));mmB.forEach(b=>b.setAttribute("aria-expanded",String(b.dataset.mm===k)))};
  const closeMM=()=>{openKey=null;mm.classList.remove("on");mmB.forEach(b=>b.setAttribute("aria-expanded","false"))};R.closeMM=closeMM;
  mmB.forEach(b=>{b.setAttribute("role","button");b.setAttribute("aria-expanded","false");b.addEventListener("click",e=>{e.preventDefault();openKey===b.dataset.mm?closeMM():openMM(b.dataset.mm)});b.addEventListener("mouseenter",()=>{clearTimeout(tC);clearTimeout(tO);tO=setTimeout(()=>openMM(b.dataset.mm),openKey?60:300)});b.addEventListener("mouseleave",()=>{clearTimeout(tO);tC=setTimeout(closeMM,450)})});
  mm.addEventListener("mouseenter",()=>clearTimeout(tC));mm.addEventListener("mouseleave",()=>{tC=setTimeout(closeMM,450)});
  /* Vorschau im Mega-Menü: Bild und Text kommen aus den Attributen des Menüpunkts */
  const pvi=mm.querySelector(".prev img"),pvt=mm.querySelector(".prev b"),pvp=mm.querySelector(".prev p");
  mm.querySelectorAll(".it[data-pv-title]").forEach(a=>a.addEventListener("mouseenter",()=>{if(pvt)pvt.textContent=a.getAttribute("data-pv-title");if(pvp)pvp.textContent=a.getAttribute("data-pv-text")||"";const im=a.getAttribute("data-pv-img");if(pvi&&im)pvi.src=im;mm.querySelectorAll(".it").forEach(x=>x.classList.toggle("hot",x===a))}));
  /* Handy-Menü: wird aus dem Mega-Menü abgeleitet, damit Menüpunkte nur an einer Stelle gepflegt werden */
  const mnav=document.getElementById("mnav"),burger=nav.querySelector(".burger");
  if(mnav&&!mnav.children.length){let h="";mm.querySelectorAll(".mcol").forEach(c=>{const t=c.querySelector(".mt");h+=`<div class="mg"><span class="mt">${t?t.textContent.replace("→","").trim():""}</span>`;c.querySelectorAll("a.it").forEach(a=>{h+=`<a href="${a.getAttribute("href")}">${a.textContent.trim()}</a>`});h+="</div>"});
   const plain=[...nav.querySelectorAll(".menu > a:not([data-mm])")].map(a=>`<a href="${a.getAttribute("href")}">${a.textContent.trim()}</a>`).join("");if(plain)h+=`<div class="mg">${plain}</div>`;
   const cta=nav.querySelector(".cta");const langs=[...nav.querySelectorAll(".lang a")].map(a=>`<a href="${a.getAttribute("href")}">${a.textContent.trim()}</a>`).join("");
   h+=`<div class="row">${cta?`<a class="k" href="${cta.getAttribute("href")}">${cta.textContent.trim()}</a>`:""}${langs}</div>`;mnav.innerHTML=h}
  const setM=o=>{nav.classList.toggle("mopen",o);if(burger){burger.setAttribute("aria-expanded",String(o));burger.setAttribute("aria-label",o?"Menü schliessen":"Menü öffnen")}root.classList.toggle("mlock",o);if(R.lenis){o?R.lenis.stop():R.lenis.start()}};
  if(burger)burger.addEventListener("click",e=>{e.preventDefault();setM(!nav.classList.contains("mopen"))});if(mnav)mnav.addEventListener("click",e=>{if(e.target.closest("a"))setM(false)});
  addEventListener("keydown",e=>{if(e.key==="Escape"){closeMM();setM(false)}});
 }
 /* Sprung zu einem Abschnitt: eine ruhige Fahrt (Dauer nach Distanz), Abschnitt landet direkt unter der Navigation */
 const navH=()=>{const n=document.querySelector("header.nav,.nav");return n?n.offsetHeight:0};
 const tgt=t=>typeof t==="number"?t:t.getBoundingClientRect().top+scrollY-navH();
 const io3=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
 R.goTo=t=>{const y=tgt(t);
  if(R.lenis&&R.motion){const d=Math.abs(y-scrollY),dur=Math.min(2.2,Math.max(.8,.6+d/6000));
   R.lenis.scrollTo(y,{duration:dur,easing:io3,lock:true,force:true,onComplete:()=>{if(typeof t==="number")return;const y2=tgt(t);if(Math.abs(y2-scrollY)>3)R.lenis.scrollTo(y2,{duration:.45,easing:io3,force:true})}})}
  else if(R.lenis)R.lenis.scrollTo(y,{immediate:true,force:true});else scrollTo({top:y,behavior:"auto"})};
 /* Abfangen in der Capture-Phase, damit das Webflow-eigene Ankerscrollen nicht zusätzlich läuft */
 window.addEventListener("click",e=>{const a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a||a.hasAttribute("data-mm"))return;const id=a.getAttribute("href");if(id.length<2){e.preventDefault();return}let t=null;try{t=document.querySelector(id)}catch(_){}if(!t)return;e.preventDefault();e.stopImmediatePropagation();if(R.closeMM)R.closeMM();R.goTo(t)},true);
 /* Bilder sanft einblenden */
 R.reveal=function(sel){const els=[...document.querySelectorAll(sel)];els.forEach(el=>{if(el.getBoundingClientRect().top>innerHeight*.95)el.classList.add("pre")});const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove("pre");io.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px"});els.forEach(el=>io.observe(el))};
 /* Hauptschleife */
 let lastY=0,prevT=performance.now();R.dt=0;
 function frame(now){requestAnimationFrame(frame);R.dt=Math.min(.05,(now-prevT)/1000);prevT=now;if(R.lenis)R.lenis.raf(now);const y=scrollY;
  if(nav){nav.classList.toggle("solid",y>30||!!openKey);if(!openKey&&!nav.classList.contains("mopen")){if(y>lastY+6&&y>innerHeight*1.2)nav.classList.add("hide");else if(y<lastY-6)nav.classList.remove("hide")}}lastY=y;
  for(const f of R.loops){try{f(now)}catch(err){if(!f._warned){f._warned=1;console.warn("ROWAPA",err)}}}}
 requestAnimationFrame(frame);
 /* 3D-Helfer */
 R.HAS3D=!!window.THREE;
 if(R.HAS3D){R.lin=h=>new THREE.Color(h).convertSRGBToLinear();
  R.renderer=function(cv){let r;try{r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true})}catch(e){return null}r.setPixelRatio(Math.min(devicePixelRatio||1,2));r.outputEncoding=THREE.sRGBEncoding;return r};
  R.fit=function(r,cam,cv){const w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return false;const s=r.getSize(new THREE.Vector2());if(s.x!==w||s.y!==h){r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}return true}}
 R.visible=function(el){const o={v:false};new IntersectionObserver(es=>es.forEach(e=>o.v=e.isIntersecting),{rootMargin:"120px"}).observe(el);return o};
})();
