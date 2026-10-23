const { chromium } = require('playwright');const fs=require('fs');const RP='/home/claude/rowapa-website/';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});
const p=await b.newPage({viewport:{width:1414,height:782},deviceScaleFactor:2});
await p.route(/rowapa-website@[0-9a-f]+\/(dist|assets)\/.*/,r=>{const u=new URL(r.request().url());const f=decodeURIComponent(u.pathname.replace(/^.*rowapa-website@[0-9a-f]+\//,''));const ct=f.endsWith('.js')?'application/javascript':f.endsWith('.css')?'text/css':f.endsWith('.woff2')?'font/woff2':'application/octet-stream';r.fulfill({status:200,contentType:ct,body:fs.readFileSync(RP+f)})});
await p.goto('https://rowapa-2027.webflow.io/?v='+Date.now(),{waitUntil:'networkidle',timeout:90000});await p.waitForTimeout(2500);
const m=()=>p.evaluate(()=>{const c=document.querySelector('.nav .cta').getBoundingClientRect(),l=document.querySelector('.nav .lang').getBoundingClientRect();return {cta:[Math.round(c.width),Math.round(c.height)],lang:[Math.round(l.width),Math.round(l.height)],bg:getComputedStyle(document.querySelector('.nav .cta')).backgroundColor}});
console.log('top',await m());await p.screenshot({path:'wf/fb/nav_top.png',clip:{x:700,y:0,width:714,height:90}});
await p.evaluate(()=>R.lenis.scrollTo(document.getElementById('ergebnisse').offsetTop,{immediate:true}));await p.waitForTimeout(1500);
console.log('light',await m());await p.screenshot({path:'wf/fb/nav_light.png',clip:{x:700,y:0,width:714,height:90}});await b.close()})();
