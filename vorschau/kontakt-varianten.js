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
