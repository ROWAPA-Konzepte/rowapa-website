/* ===== ROWAPA 2027 · Ausklang: Logo mit unseren Werten, Punktemeer im Kontakt, Schriftzug im Footer =====
   - .spin data-text="Souverän · Inspirierend · Klar · "  Text im Ring (wird zweimal gesetzt, damit der Kreis voll ist)
   - footer .bigword: der Schriftzug fährt mit dem Scroll von unten ein */
(function(){const R=window.R,sm=R.sm;
const kon=document.getElementById("kontakt"),spin=kon&&kon.querySelector(".spin");
if(spin&&!spin.querySelector("svg")){const one=(spin.getAttribute("data-text")||"Souverän · Inspirierend · Klar · ").replace(/\s*$/," ");
 spin.setAttribute("aria-hidden","true");
 spin.innerHTML=`<svg viewBox="0 0 300 300"><defs><path id="cpath" d="M150 150 m-122 0 a122 122 0 1 1 244 0 a122 122 0 1 1 -244 0"/></defs><g class="txt"><text><textPath href="#cpath" textLength="752" lengthAdjust="spacing">${(one+one).replace(/&/g,"&amp;").replace(/</g,"&lt;")}</textPath></text></g><circle cx="150" cy="150" r="96" fill="#FFFFFF" class="disk"/><svg x="105" y="104" width="90" height="93" viewBox="0 0 121.61 125.98" class="shd"><use href="#s-shield" width="121.61" height="125.98"/></svg></svg>`}
const bw=document.querySelector("footer .bigword");
if(bw&&!bw.querySelector("svg"))bw.innerHTML='<svg viewBox="0 0 309.5 55.6" preserveAspectRatio="xMidYMin meet" aria-hidden="true"><use href="#s-word" width="309.5" height="55.6"/></svg>';
const bs=bw&&bw.querySelector("svg"),ks=kon&&kon.querySelector(".ksea");
R.loops.push(()=>{const ih=innerHeight;
 if(bs){const r=bw.getBoundingClientRect();if(r.top<ih+20){const p=R.motion?Math.max(0,Math.min(1,(ih-r.top)/(r.height*1.05))):1;const e=sm(p);bs.style.transform=`translateY(${((1-e)*92).toFixed(2)}%)`;bs.style.opacity=(.15+.85*e).toFixed(3)}}
 if(ks){const r=kon.getBoundingClientRect();if(r.top<ih&&r.bottom>0){const p=R.motion?Math.max(0,Math.min(1,(ih-r.top)/(ih*.75))):1;ks.style.opacity=sm(p).toFixed(3);ks.style.transform=`translateY(${((1-sm(p))*60).toFixed(1)}px)`}}});
})();
