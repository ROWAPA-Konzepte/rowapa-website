const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});
for(const v of 'abc'){const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+'/tmp/claude-0/-home-claude/9363aa6e-333b-592b-a1e5-50a0aa69243f/scratchpad/pv9/t.html#ende-'+v,{waitUntil:'networkidle',timeout:90000});await p.waitForTimeout(2500);
const st=await p.evaluate(()=>({ende:document.documentElement.dataset.ende,ts:document.documentElement.classList.contains('ts'),tone:document.getElementById('ergebnisse').dataset.tone,y:scrollY}));
const top=id=>p.evaluate(id=>document.getElementById(id).getBoundingClientRect().top+scrollY,id);
let i=0;for(const id of ['ergebnisse','wissen','faq']){await p.evaluate(y=>R.lenis.scrollTo(y,{immediate:true}),(await top(id))+40);await p.waitForTimeout(1400);await p.screenshot({path:'/tmp/claude-0/-home-claude/9363aa6e-333b-592b-a1e5-50a0aa69243f/scratchpad/pv9/'+`p${v}${i++}.png`})}
console.log(v,st,errs.slice(0,3));await p.close()}await b.close()})();
