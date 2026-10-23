const { chromium } = require('playwright');const fs=require('fs');const RP='/home/claude/rowapa-website/';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});
for(const vp of [{width:1440,height:830},{width:1280,height:720},{width:390,height:800}]){
const p=await b.newPage({viewport:vp});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/rowapa-website@[0-9a-f]+\/(dist|assets)\/.*/,r=>{const u=new URL(r.request().url());const f=decodeURIComponent(u.pathname.replace(/^.*rowapa-website@[0-9a-f]+\//,''));const ct=f.endsWith('.js')?'application/javascript':f.endsWith('.css')?'text/css':f.endsWith('.woff2')?'font/woff2':'application/octet-stream';r.fulfill({status:200,contentType:ct,body:fs.readFileSync(RP+f)})});
if(process.argv[2]!=='0')await p.addInitScript(()=>{document.addEventListener('DOMContentLoaded',()=>{document.documentElement.classList.add('ts');document.documentElement.setAttribute('data-ende','a')})});
await p.goto('https://rowapa-2027.webflow.io/?v='+Date.now(),{waitUntil:'networkidle',timeout:90000});await p.evaluate(()=>{const b=document.querySelector('.w-webflow-badge');if(b)b.remove()});await p.waitForTimeout(2000);
const y=await p.evaluate(()=>{const n=document.querySelector('#wissen .nl');return n.getBoundingClientRect().top+scrollY-innerHeight*.45});
await p.evaluate(y=>R.lenis?R.lenis.scrollTo(y,{immediate:true}):scrollTo(0,y),y);await p.waitForTimeout(1500);
await p.screenshot({path:`wf/fb/nl_${vp.width}.png`});
const st=await p.evaluate(()=>({wide:[...document.querySelectorAll('body *')].filter(e=>!e.closest('.mq')&&e.getBoundingClientRect().right>innerWidth+2&&getComputedStyle(e).position!=='fixed').slice(0,6).map(e=>(e.closest('section,footer')||{}).id+'>'+e.tagName+'.'+String(e.className).slice(0,30)),cls:document.documentElement.className,ende:document.documentElement.dataset.ende,bg:getComputedStyle(document.querySelector('#wissen .nl')).backgroundColor,sw:document.documentElement.scrollWidth}));
console.log(vp.width,st,errs.slice(0,2));await p.close()}await b.close()})();
