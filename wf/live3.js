const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});
for(const vp of [{width:1280,height:720},{width:390,height:844}]){const p=await b.newPage({viewport:vp});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('https://rowapa-2027.webflow.io/?v='+Date.now(),{waitUntil:'networkidle',timeout:90000});await p.waitForTimeout(2500);
const st=await p.evaluate(()=>({erf:document.querySelectorAll('.erf-s').length,erfImg:[...document.querySelectorAll('.erf-im img')].slice(0,2).map(i=>i.src.slice(0,70)),bp:!!document.querySelector('.bp'),bpImg:(document.querySelector('.bp-bg img')||{}).src,bpEck:document.querySelectorAll('.bp-eck span').length,ins:document.querySelectorAll('.ins-c').length,insImg:(document.querySelector('.ins-im img')||{}).src,more:[...document.querySelectorAll('.ins-more a')].map(a=>a.textContent),tones:[...document.querySelectorAll('section[id]')].map(s=>s.id+':'+s.dataset.tone).join(' '),heads:[...document.querySelectorAll('section .h2')].map(h=>h.textContent.trim()).join(' | '),sw:document.documentElement.scrollWidth}));
console.log(vp.width,JSON.stringify(st,null,1),errs.slice(0,3));
const top=id=>p.evaluate(id=>document.getElementById(id).getBoundingClientRect().top+scrollY,id);
for(const id of ['antrieb','ergebnisse','cas','wissen','kontakt']){await p.evaluate(y=>R.lenis.scrollTo(y,{immediate:true}),(await top(id))+10);await p.waitForTimeout(1500);await p.screenshot({path:`wf/fb/L3_${id}_${vp.width}.png`})}
await p.close()}await b.close()})();
