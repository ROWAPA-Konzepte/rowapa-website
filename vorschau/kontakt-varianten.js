/* Kontakt-Vorschläge: Vorschau-Verhalten (Formulare senden hier nicht wirklich) */
(function(){const k=document.getElementById("kontakt");if(!k)return;
 k.querySelectorAll(".kv-form").forEach(f=>f.addEventListener("submit",e=>{e.preventDefault();if(!f.checkValidity()){f.reportValidity();return}const d=f.querySelector(".kv-done");if(d){d.hidden=false}f.querySelectorAll("input,textarea,button").forEach(x=>x.disabled=true)}));
 const log=k.querySelector(".kv-log"),inp=k.querySelector(".kv-input input"),form=k.querySelector(".kv-input");if(!log||!form)return;let step=0;
 const add=(t,who)=>{const m=document.createElement("div");m.className="kv-msg "+who;m.textContent=t;log.appendChild(m);log.scrollTop=log.scrollHeight};
 const send=t=>{t=t.trim();if(!t)return;const q=log.querySelector(".kv-quick");if(q)q.remove();add(t,"me");inp.value="";
  if(step===0){step=1;setTimeout(()=>{add("Danke! Damit wir Ihnen antworten können: Wie lautet Ihre E-Mail-Adresse oder Telefonnummer?","them");inp.placeholder="E-Mail oder Telefon …"},700)}
  else if(step===1){step=2;setTimeout(()=>{add("Perfekt, Ihre Nachricht ist bei uns. Ich melde mich in der Regel am selben Arbeitstag. Jennifer Boek","them");inp.placeholder="Weitere Nachricht …"},700)}
  else setTimeout(()=>add("Danke, ist ergänzt.","them"),600)};
 form.addEventListener("submit",e=>{e.preventDefault();send(inp.value)});
 log.querySelectorAll(".kv-quick button").forEach(b=>b.addEventListener("click",()=>send(b.textContent)));
})();
/* D · Buchungsfenster: in Webflow öffnet der Knopf das Buchungstool (Calendly oder Microsoft Bookings); hier ein Platzhalter */
(function(){const bs=document.querySelectorAll("[data-book]");if(!bs.length)return;
 const days=["Mo","Di","Mi","Do","Fr"],slots=["09:00","10:30","14:00","16:00"];
 const m=document.createElement("div");m.className="kv-modal";m.hidden=true;m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");m.setAttribute("aria-label","Erstgespräch buchen");
 m.innerHTML='<div class="kv-modal-in"><button class="kv-x" type="button" aria-label="Schliessen">×</button><h3>Erstgespräch buchen</h3><p>30 Minuten mit Jennifer Boek. Wählen Sie einen freien Termin.</p><div class="kv-cal">'+days.map(d=>'<div><b>'+d+'</b>'+slots.map(s=>'<button type="button">'+s+'</button>').join("")+'</div>').join("")+'</div><p class="kv-note">Vorschau: Hier erscheint später der Kalender aus Calendly oder Microsoft Bookings.</p></div>';
 document.body.appendChild(m);const close=()=>{m.hidden=true;if(window.R&&R.lenis)R.lenis.start()};
 m.addEventListener("click",e=>{if(e.target===m||e.target.classList.contains("kv-x"))close()});addEventListener("keydown",e=>{if(e.key==="Escape")close()});
 m.querySelectorAll(".kv-cal button").forEach(b=>b.addEventListener("click",()=>{m.querySelector(".kv-modal-in").innerHTML='<button class="kv-x" type="button" aria-label="Schliessen">×</button><h3>Danke, Ihr Termin ist reserviert.</h3><p>Sie erhalten gleich eine Bestätigung per E-Mail. (Vorschau)</p>'}));
 bs.forEach(b=>b.addEventListener("click",e=>{e.preventDefault();m.hidden=false;if(window.R&&R.lenis)R.lenis.stop();const x=m.querySelector(".kv-x");if(x)x.focus()}));
})();
