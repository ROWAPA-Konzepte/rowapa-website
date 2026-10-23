const { chromium } = require('playwright');const fs=require('fs');const RP='/home/claude/rowapa-website/';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});
for(const vp of [{width:1440,height:900},{width:1280,height:720}]){const p=await b.newPage({viewport:vp});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/rowapa-website@[0-9a-f]+\/(dist|assets)\/.*/,r=>{const u=new URL(r.request().url());const f=decodeURIComponent(u.pathname.replace(/^.*rowapa-website@[0-9a-f]+\//,''));const ct=f.endsWith('.js')?'application/javascript':f.endsWith('.css')?'text/css':f.endsWith('.woff2')?'font/woff2':'application/octet-stream';r.fulfill({status:200,contentType:ct,body:fs.readFileSync(RP+f)})});
await p.goto('https://rowapa-2027.webflow.io/?v='+Date.now(),{waitUntil:'networkidle',timeout:90000});await p.evaluate(()=>{const b=document.querySelector('.w-webflow-badge');if(b)b.remove()});await p.waitForTimeout(1500);
const dg=await p.evaluate(()=>document.getElementById('digi').getBoundingClientRect().top+scrollY);
const W=vp.width;const st=async n=>p.screenshot({path:`wf/fb/dg${W}_${n}.png`});
const info=()=>p.evaluate(()=>{const s=document.getElementById('digi');return {t0:s._t0!=null,p0:s._p0,q:getComputedStyle(document.querySelector('.dg-card')).getPropertyValue('--q')}});
// scroll gradually into section like a user, quickly
for(let y=dg-600;y<=dg+300;y+=150){await p.evaluate(y=>R.lenis.scrollTo(y,{immediate:true}),y);await p.waitForTimeout(80)}
await p.waitForTimeout(300);await st('a_0.6s');console.log(W,'0.6s',await info());
await p.waitForTimeout(1200);await st('b_1.8s');
await p.waitForTimeout(1600);await st('c_3.4s');console.log(W,'3.4s',await info());
for(const d of [600,1100]){await p.evaluate(y=>R.lenis.scrollTo(y,{immediate:true}),dg+300+d);await p.waitForTimeout(900);await st('d_'+d);console.log(W,'+'+d,await info())}
const er=await p.evaluate(()=>document.getElementById('ergebnisse').getBoundingClientRect().top+scrollY);await p.evaluate(y=>R.lenis.scrollTo(y+120,{immediate:true}),er);await p.waitForTimeout(1500);await st('erg');
console.log(W,await p.evaluate(()=>{const v=document.querySelector('#ergebnisse .video').getBoundingClientRect();return {vw:Math.round(v.width),vh:Math.round(v.height),bottom:Math.round(v.bottom),ih:innerHeight}}),errs.slice(0,2));await p.close()}
await b.close()})();
