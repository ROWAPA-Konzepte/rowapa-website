const { chromium } = require('playwright');const fs=require('fs');const RP='/home/claude/rowapa-website/';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});
for(const v of ['0','1','2'])for(const vp of [{width:1440,height:900},{width:390,height:844}]){const p=await b.newPage({viewport:vp,deviceScaleFactor:vp.width<500?2:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/rowapa-website@[0-9a-f]+\/(dist|assets)\/.*/,r=>{const u=new URL(r.request().url());const f=decodeURIComponent(u.pathname.replace(/^.*rowapa-website@[0-9a-f]+\//,''));let body=fs.readFileSync(RP+f);if(f.endsWith('rowapa.css'))body=body.toString()+fs.readFileSync(RP+'vorschau/nl-farbe.css','utf8');const ct=f.endsWith('.js')?'application/javascript':f.endsWith('.css')?'text/css':f.endsWith('.woff2')?'font/woff2':'application/octet-stream';r.fulfill({status:200,contentType:ct,body})});
await p.addInitScript(v=>{document.addEventListener('DOMContentLoaded',()=>{if(v!=='0')document.documentElement.setAttribute('data-nlf',v)})},v);
await p.goto('https://rowapa-2027.webflow.io/?v='+Date.now(),{waitUntil:'networkidle',timeout:90000});await p.evaluate(()=>{const b=document.querySelector('.w-webflow-badge');if(b)b.remove()});await p.waitForTimeout(2000);
const y=await p.evaluate(()=>{const n=document.querySelector('#wissen .nl');return n.getBoundingClientRect().top+scrollY-innerHeight*(innerWidth<500?.35:.5)});
await p.evaluate(y=>R.lenis.scrollTo(y,{immediate:true}),y);await p.waitForTimeout(400);await p.evaluate(y=>R.lenis.scrollTo(y+1,{immediate:true}),y);await p.waitForTimeout(2200);
await p.screenshot({path:`wf/fb/nlf${v}_${vp.width}.png`});
if(vp.width>500){await p.setViewportSize({width:1440,height:1800});await p.waitForTimeout(1500);await p.screenshot({path:`wf/fb/nlf${v}_tall.png`})}
console.log(v,vp.width,await p.evaluate(()=>getComputedStyle(document.querySelector('#wissen .nl')).backgroundColor),errs.slice(0,2));await p.close()}
await b.close()})();
