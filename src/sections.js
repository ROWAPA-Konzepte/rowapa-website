/* ===== ROWAPA 2027 · Abschnitte: Kundenlogos, Partner, Wege, Leitsatz, Zitate =====
   Alles hier liest die Inhalte aus Webflow (auch aus CMS-Listen) und ergänzt nur die Bewegung.
   - Partner-Logo: Attribut data-scale="1.2" auf .ml gleicht optisch kleine Logos an (Standard 1)
   - Zitate: data-interval="6.5" auf #qs (Sekunden pro Zitat, oder Variable «Zitat Wechsel Sekunden»)
   - Leitsatz: die Zahl im Satz trägt data-to="20", die drei Zähler ebenfalls data-to */
(function(){const R=window.R,root=document.documentElement,{clamp}=R;const sm=R.sm;
const ratio=(img,cb)=>{const go=()=>{if(img.naturalWidth&&img.naturalHeight)cb(img.naturalWidth/img.naturalHeight)};if(img.complete)go();else img.addEventListener("load",go,{once:true})};

/* ---------- Kundenlogos: Laufband, alle Logos optisch gleich gross ---------- */
const mq=document.getElementById("mq");
if(mq){const one=[...mq.children];one.forEach(sp=>{const im=sp.querySelector("img");if(im)ratio(im,r=>{const h=Math.max(26,Math.min(58,Math.sqrt(5200/r)));im.style.height=h.toFixed(0)+"px"})});
 if(!mq.dataset.dup){mq.dataset.dup="1";one.forEach(sp=>{const c=sp.cloneNode(true);c.setAttribute("aria-hidden","true");c.querySelectorAll("img").forEach(i=>i.alt="");mq.appendChild(c);const ci=c.querySelector("img"),oi=sp.querySelector("img");if(ci&&oi)ratio(oi,()=>{ci.style.height=oi.style.height})})}}

/* ---------- Partner und Zertifizierungen: einheitliche Fläche, Kacheln bauen sich auf ---------- */
const SC={SAQ:1.3,SFPO:1.35,gutberaten:1.12,RMP:1.05,HWZ:.95,FPV:1.2,IfFP:1.1,Mendo:.95,"Super AI Labs":1.05};
const marks=document.getElementById("marks"),br=document.getElementById("branche");
const tiles=marks?[...marks.querySelectorAll(".ml")]:[];
tiles.forEach(t=>{const im=t.querySelector("img");if(!im)return;const sc=R.num(t,"data-scale",SC[im.alt]||1);ratio(im,r=>{const h=Math.max(24,Math.min(68,46/Math.sqrt(r/2.2)*sc));im.style.height=h.toFixed(0)+"px"})});
if(marks)marks.classList.add("mlogos");
R.loops.push(()=>{if(!br||!tiles.length)return;const r=br.getBoundingClientRect(),ih=innerHeight;if(r.bottom<0||r.top>ih)return;
 const m=marks.getBoundingClientRect();const p=R.motion?Math.max(0,Math.min(1,(ih*.95-m.top)/(ih*.55))):1;
 tiles.forEach((t,i)=>{const q=Math.max(0,Math.min(1,(p-i*.042)/.42));t.style.setProperty("--o",sm(q).toFixed(3))})});

/* ---------- Bilder sanft einblenden ---------- */
R.reveal(".fx");

/* ---------- Persönliche Entwicklung: Karten stapeln sich, Navigation folgt ---------- */
(function(){const sec=document.getElementById("pfade");if(!sec)return;const deck=document.getElementById("pfBd"),nav=document.getElementById("pfBn");if(!deck)return;
 const pcs=[...deck.querySelectorAll(".pcard")];pcs.forEach((c,i)=>c.style.setProperty("--i",i));
 if(nav&&!nav.children.length)nav.innerHTML=pcs.map((c,i)=>{const tag=c.querySelector(".tag");const ic=tag&&tag.querySelector("svg.ic,[data-icon]");const icn=ic?(ic.getAttribute("data-icon")||((ic.querySelector("use")||{getAttribute:()=>""}).getAttribute("href")||"").replace("#i-","")):"";return `<li data-i="${i}"><span>${icn?R.icon(icn):""}${String(i+1).padStart(2,"0")}</span><b>${tag?tag.textContent.trim():""}</b></li>`}).join("");
 const navs=nav?[...nav.children]:[];
 navs.forEach((n,i)=>n.addEventListener("click",()=>{const c=pcs[i];if(!c)return;const y=c.parentElement.getBoundingClientRect().top+scrollY+i*(c.offsetHeight+parseFloat(getComputedStyle(c).marginBottom))-130;R.goTo(y)}));
 function stack(cards,k){for(let i=0;i<cards.length;i++){const c=cards[i],n=cards[i+1];let s=1,b=1;if(n&&R.motion){const nr=n.getBoundingClientRect(),cr=c.getBoundingClientRect();const p=clamp(1-(nr.top-cr.top)/(cr.height*.9),0,1);s=1-p*k;b=1-p*.22}c.style.transform=s<1?`scale(${s.toFixed(4)})`:"";c.style.filter=b<1?`brightness(${b.toFixed(3)})`:""}}
 R.loops.push(()=>{if(innerWidth<=860){pcs.forEach(c=>{c.style.transform="";c.style.filter=""});return}const r=sec.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
  stack(pcs,.05);let a=0;pcs.forEach((c,i)=>{if(c.getBoundingClientRect().top<innerHeight*.5)a=i});navs.forEach((n,i)=>n.classList.toggle("on",i===a))})})();

/* ---------- Was uns antreibt: Wörter färben sich ein, Zahlen zählen mit dem Scroll ---------- */
(function(){const sec=document.getElementById("antrieb");if(!sec)return;const rv=sec.querySelector(".ab-rv");if(!rv)return;
 /* Wörter einzeln; ein Element mit data-to (die Zahl im Satz) bleibt ein eigenes Wort */
 if(!rv.querySelector(".w")){const parts=[];const walk=nodes=>nodes.forEach(nd=>{if(nd.nodeType===3){nd.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w))parts.push(document.createTextNode(w));else{const sp=document.createElement("span");sp.className="w";sp.textContent=w;parts.push(sp)}})}else if(nd.nodeType===1&&(nd.classList.contains("n20")||nd.hasAttribute("data-to"))){nd.classList.add("w");parts.push(nd)}else if(nd.nodeType===1){walk([...nd.childNodes])}});walk([...rv.childNodes]);rv.innerHTML="";parts.forEach(p=>rv.appendChild(p))}
 const n20=rv.querySelector(".n20,[data-to]");if(n20)n20.classList.add("n20");const num=e=>{const v=parseFloat(e.dataset.to);return isFinite(v)?v:(parseFloat(e.textContent)||0)};if(n20&&!n20.dataset.to)n20.dataset.to=String(num(n20));
 const ws=[...rv.querySelectorAll(".w")];const n=ws.length;
 const cis=[...sec.querySelectorAll(".ab-ci")],nums=cis.map(c=>c.querySelector("b"));nums.forEach(b=>{if(b&&!b.dataset.to)b.dataset.to=String(num(b))});
 R.loops.push(()=>{if(sec.offsetParent===null)return;const r=sec.getBoundingClientRect(),ih=innerHeight;if(r.bottom<0||r.top>ih)return;
  const p=R.motion?clamp((ih*.9-r.top)/(ih*.8),0,1):1;
  const a0=.04,a1=.72,fw=.12;ws.forEach((w,i)=>{const s=a0+(a1-a0-fw)*i/Math.max(1,n-1);const q=clamp((p-s)/fw,0,1);w.style.setProperty("--o",(.14+.86*sm(q)).toFixed(3))});
  const W=[[a0,a0+(a1-a0)*.5],[a0+(a1-a0)*.25,a0+(a1-a0)*.75],[a0+(a1-a0)*.5,a1]];
  nums.forEach((b,k)=>{if(!b)return;const w=W[Math.min(k,2)];const q=clamp((p-w[0])/(w[1]-w[0]),0,1);const v=String(Math.round(+b.dataset.to*sm(q)));if(b.textContent!==v)b.textContent=v;cis[k].style.setProperty("--o",sm(clamp(q*1.6,0,1)).toFixed(3))});
  if(n20){const v=String(n20.dataset.to);if(n20.textContent!==v)n20.textContent=v}})})();

/* ---------- FAQ: Nummern 01, 02, … ---------- */
document.querySelectorAll(".fqs .fq").forEach((f,i)=>{const n=f.querySelector(".n");if(n&&!n.textContent.trim())n.textContent=String(i+1).padStart(2,"0")});

/* ---------- Kundenstimmen: wechseln von selbst, Punkte zum Springen ---------- */
(function(){const box=document.getElementById("qs");if(!box)return;const qs=[...box.querySelectorAll(".q")];if(!qs.length)return;const qnav=document.getElementById("qnav");const IV=R.cfg(box,"data-interval","zitat-wechsel-sekunden",6.5);
 qs.forEach((q,i)=>q.classList.toggle("on",i===0));
 if(qnav)qnav.innerHTML=qs.map((_,i)=>`<button type="button" aria-label="Zitat ${i+1}" aria-pressed="${i===0}"><i></i></button>`).join("");
 const qb=qnav?[...qnav.children]:[];let qI=0,qT=0;
 function showQ(i){qI=i;qT=0;qs.forEach((q,j)=>q.classList.toggle("on",j===i));qb.forEach((b,j)=>b.setAttribute("aria-pressed",String(j===i)))}
 qb.forEach((b,i)=>b.addEventListener("click",()=>showQ(i)));
 R.loops.push(()=>{if(!qb.length)return;if(!R.motion){qb[qI].style.setProperty("--qp",1);return}qT+=R.dt||.016;qb[qI].style.setProperty("--qp",Math.min(1,qT/IV).toFixed(3));if(qT>IV)showQ((qI+1)%qs.length)})})();
})();
