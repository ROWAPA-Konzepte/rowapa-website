const { chromium } = require('playwright');const fs=require('fs');const RP='/home/claude/rowapa-website/';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});
for(const vp of [{width:1414,height:782},{width:1280,height:720},{width:390,height:844}]){const p=await b.newPage({viewport:vp});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/rowapa-website@[0-9a-f]+\/(dist|assets)\/.*/,r=>{const u=new URL(r.request().url());const f=decodeURIComponent(u.pathname.replace(/^.*rowapa-website@[0-9a-f]+\//,''));const ct=f.endsWith('.js')?'application/javascript':f.endsWith('.css')?'text/css':f.endsWith('.woff2')?'font/woff2':'application/octet-stream';r.fulfill({status:200,contentType:ct,body:fs.readFileSync(RP+f)})});
await p.route(/rowapa-2027\.webflow\.io\/(\?.*)?$/,async r=>{const res=await r.fetch();let h=await res.text();
h=h.replace('</head>','<style>'+fs.readFileSync(RP+'vorschau/insights.css','utf8')+'</style></head>');
h=h.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/gh\/ROWAPA/,'<script>document.documentElement.classList.add("qz");'+fs.readFileSync(RP+'vorschau/insights.js','utf8')+'</script><script src="https://cdn.jsdelivr.net/gh/ROWAPA');
r.fulfill({status:200,contentType:'text/html',body:h})});
await p.goto('https://rowapa-2027.webflow.io/?v='+Date.now(),{waitUntil:'networkidle',timeout:90000});await p.evaluate(()=>{const b=document.querySelector('.w-webflow-badge');if(b)b.remove()});await p.waitForTimeout(2000);
const W=vp.width;const top=id=>p.evaluate(id=>document.getElementById(id).getBoundingClientRect().top+scrollY,id);
await p.evaluate(y=>R.lenis.scrollTo(y,{immediate:true}),(await top('ergebnisse'))+(W<500?380:150));await p.waitForTimeout(1500);await p.screenshot({path:`wf/fb/nb_q_${W}.png`});
if(W>500){await p.click('.qz-b[data-d="1"]');await p.click('.qz-b[data-d="1"]');await p.waitForTimeout(800);console.log('counter',await p.textContent('.qz-c'))}
const wy=await top('wissen');await p.evaluate(y=>R.lenis.scrollTo(y,{immediate:true}),wy-20);await p.waitForTimeout(1500);await p.screenshot({path:`wf/fb/nb_w_${W}.png`});
if(W>500){await p.click('.nb-b[data-d="1"]');await p.waitForTimeout(900);await p.screenshot({path:`wf/fb/nb_w2_${W}.png`});
 const before=await p.evaluate(()=>document.querySelector('.nb-row').scrollLeft);await p.mouse.move(W/2,500);await p.mouse.wheel(300,0);await p.waitForTimeout(800);const after=await p.evaluate(()=>[document.querySelector('.nb-row').scrollLeft,scrollY]);console.log('hwheel',before,after)}
await p.evaluate(y=>R.lenis.scrollTo(y,{immediate:true}),wy+700);await p.waitForTimeout(1200);await p.screenshot({path:`wf/fb/nb_w3_${W}.png`});
console.log(W,await p.evaluate(()=>({cas:!!document.getElementById('cas'),cards:document.querySelectorAll('.nb-card').length,sw:document.documentElement.scrollWidth,icons:document.querySelectorAll('.nb-card svg').length})),errs.slice(0,3));await p.close()}
await b.close()})();
