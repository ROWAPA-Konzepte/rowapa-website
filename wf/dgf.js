const { chromium } = require('playwright');const fs=require('fs');const RP='/home/claude/rowapa-website/';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));

await p.goto('https://rowapa-2027.webflow.io/?v='+Date.now(),{waitUntil:'networkidle',timeout:90000});await p.waitForTimeout(1500);
const d=await p.evaluate(()=>document.getElementById('digi').getBoundingClientRect().top+scrollY);
await p.addInitScript(()=>{document.addEventListener('DOMContentLoaded',()=>document.documentElement.classList.add('hz'))});const rd=()=>p.evaluate(()=>{const c=document.querySelector('.dg-card');return {q:+(+getComputedStyle(c).getPropertyValue('--q')||0).toFixed(2),lay:Math.round(document.querySelector('.dg-lay').getBoundingClientRect().top)}});
// kontinuierlich scrollen wie ein Nutzer: 40px alle 60ms
let y=d-500;const out=[];for(let i=0;i<60;i++){y+=40;await p.evaluate(y=>R.lenis.scrollTo(y,{immediate:true}),y);await p.waitForTimeout(60);if(i%4===0)out.push([Math.round(y-d),JSON.stringify(await rd())])}
console.log(out.map(x=>x.join(' ')).join('\n'),errs);await b.close()})();
