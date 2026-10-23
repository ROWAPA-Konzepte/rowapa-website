const { chromium } = require('playwright');const fs=require('fs');const RP='/home/claude/rowapa-website/';
const VS=(process.argv[2]||'abc').split('');const W=(process.argv[3]||'1440,1280').split(',').map(Number);
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});
for(const v of VS)for(const w of W){
const p=await b.newPage({viewport:{width:w,height:w>1300?830:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/rowapa-website@[0-9a-f]+\/(dist|assets)\/.*/,r=>{const u=new URL(r.request().url());const f=decodeURIComponent(u.pathname.replace(/^.*rowapa-website@[0-9a-f]+\//,''));const ct=f.endsWith('.js')?'application/javascript':f.endsWith('.css')?'text/css':f.endsWith('.woff2')?'font/woff2':'application/octet-stream';r.fulfill({status:200,contentType:ct,body:fs.readFileSync(RP+f)})});
await p.route(/rowapa-2027\.webflow\.io\/(\?.*)?$/,async r=>{const res=await r.fetch();let h=await res.text();
h=h.replace('</head>','<style>'+fs.readFileSync(RP+'vorschau/ende-varianten.css','utf8')+'</style></head>');
h=h.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/gh\/ROWAPA/,'<script>document.documentElement.classList.add("ts");try{localStorage.setItem("rw-ende","'+v+'")}catch(e){}'+fs.readFileSync(RP+'vorschau/ende-ton.js','utf8')+'</script><script src="https://cdn.jsdelivr.net/gh/ROWAPA');
h=h.replace('</body>','<script>'+fs.readFileSync(RP+'vorschau/ende-varianten.js','utf8')+'</script></body>');
r.fulfill({status:200,contentType:'text/html',body:h})});
await p.goto('https://rowapa-2027.webflow.io/?v='+Date.now(),{waitUntil:'networkidle',timeout:90000});await p.evaluate(()=>{const b=document.querySelector('.w-webflow-badge');if(b)b.remove()});await p.waitForTimeout(2000);
const top=id=>p.evaluate(id=>document.getElementById(id).getBoundingClientRect().top+scrollY,id);
let i=0;const y0=await top('ergebnisse'),y1=await top('kontakt');
for(let y=y0-40;y<y1+200;y+=(w>1300?760:660)){await p.evaluate(y=>R.lenis.scrollTo(y,{immediate:true}),y);await p.waitForTimeout(1300);await p.screenshot({path:`wf/fb/e${v}_${w}_${String(i++).padStart(2,'0')}.png`})}
const ov=await p.evaluate(()=>{const out=[];document.querySelectorAll('#ergebnisse .q,.team-g>figure,.cas,.news,.kc,.fq,.ml').forEach(c=>{const cr=c.getBoundingClientRect();if(!cr.width)return;c.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&(r.right>cr.right+2||r.bottom>cr.bottom+2)&&getComputedStyle(e).position!=='absolute')out.push(c.className.split(' ')[0]+'>'+(e.className||e.tagName)+' '+Math.round(r.right-cr.right)+'/'+Math.round(r.bottom-cr.bottom))})});return [...new Set(out)].slice(0,12)});
console.log(v,w,'shots',i,'overflow',ov,'ERR',errs.slice(0,3));await p.close()}
await b.close()})();
