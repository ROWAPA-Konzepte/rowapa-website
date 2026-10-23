const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});
for(const vp of [{width:1440,height:830},{width:390,height:800}]){const p=await b.newPage({viewport:vp});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('https://rowapa-2027.webflow.io/?v='+Date.now(),{waitUntil:'networkidle',timeout:90000});await p.waitForTimeout(2500);
const st=await p.evaluate(()=>({sha:(document.querySelector('script[src*="rowapa-website@"]')||{}).src?.match(/@([0-9a-f]{7})/)?.[1],cls:document.documentElement.className,ende:document.documentElement.dataset.ende,nl:getComputedStyle(document.querySelector('#wissen .nl')).backgroundColor,qk:getComputedStyle(document.querySelector('#ergebnisse .q .qk')).fontSize,sw:document.documentElement.scrollWidth}));
for(const id of ['ergebnisse','wissen','faq']){const y=await p.evaluate(id=>document.getElementById(id).getBoundingClientRect().top+scrollY+60,id);await p.evaluate(y=>window.R&&R.lenis?R.lenis.scrollTo(y,{immediate:true}):scrollTo(0,y),y);await p.waitForTimeout(1500);await p.screenshot({path:`wf/fb/live_${vp.width}_${id}.png`})}
console.log(vp.width,st,errs.slice(0,2));await p.close()}await b.close()})();
