/* ===== ROWAPA 2027 · Themenlinien: fünf Punktfiguren bauen sich mit dem Scroll auf =====
   Inhalte (Titel, Text, Link) stehen in Webflow in der Karte #tslc und den vier Kacheln .tsl-t.
   Auf dem Handy entsteht daraus automatisch die Liste #twmob, mit Standbildern derselben Figuren.
   Kachel-Attribut data-l="Zu Mensch & Potenzial": Linktext in der Handy-Liste. */
(function(){const R=window.R,root=document.documentElement,{clamp}=R;
const N=matchMedia("(max-width:700px)").matches?3000:7000;
function makeShapes(){const Rn=Math.random,TAU=Math.PI*2;
 function S(){const p=[],c=[];return{p,c,add(x,y,z,k){p.push(x,y,z);c.push(k)},
  box(x0,y0,z0,w,h,d,n,k,ke){for(let i=0;i<n;i++){const e=Rn()<.55;let x,y,z;if(e){const ax=Math.floor(Rn()*3),t=Rn(),a=Rn()<.5?0:1,b=Rn()<.5?0:1;if(ax===0){x=x0+t*w;y=y0+a*h;z=z0+b*d}else if(ax===1){x=x0+a*w;y=y0+t*h;z=z0+b*d}else{x=x0+a*w;y=y0+b*h;z=z0+t*d}}else{const f=Math.floor(Rn()*6),u=Rn(),v=Rn();if(f<2){x=x0+u*w;y=y0+v*h;z=z0+(f?d:0)}else if(f<4){x=x0+(f===3?w:0);y=y0+v*h;z=z0+u*d}else{x=x0+u*w;y=y0+(f===5?h:0);z=z0+v*d}}this.add(x,y,z,e?ke:k)}},
  sph(cx,cy,cz,r,n,k,sx=1,sy=1,sz=1,half){for(let i=0;i<n;i++){let u=Rn()*2-1;if(half&&u<0)u=-u;const th=Rn()*TAU,s=Math.sqrt(1-u*u);this.add(cx+r*sx*s*Math.cos(th),cy+r*sy*u,cz+r*sz*s*Math.sin(th),k)}},
  seg(a,b,n,k,j=0){for(let i=0;i<n;i++){const t=Rn();this.add(a[0]+(b[0]-a[0])*t+(Rn()-.5)*j,a[1]+(b[1]-a[1])*t+(Rn()-.5)*j,a[2]+(b[2]-a[2])*t+(Rn()-.5)*j,k)}},
  ring(cx,cy,cz,r,n,k,tilt=0,arc=1,tube=0){for(let i=0;i<n;i++){const a=Rn()*TAU*arc-Math.PI/2,tr=tube*(Rn()-.5);const x=(r+tr)*Math.cos(a),z=(r+tr)*Math.sin(a);this.add(cx+x,cy+z*Math.sin(tilt)+(Rn()-.5)*tube,cz+z*Math.cos(tilt),k)}},
  bust(cx,cy,cz,s,n,kh,kb){this.sph(cx,cy+.95*s,cz,.36*s,Math.round(n*.38),kh);this.sph(cx,cy-.05*s,cz,1,Math.round(n*.62),kb,.78*s,.72*s,.42*s,true);this.seg([cx,cy+.55*s,cz],[cx,cy+.68*s,cz],Math.round(n*.04),kb,.12*s)}}}
 const out=[];
 {/* 1 Vertrieb: 3D-Balken und steigender Pfeil */const s=S();const H=[.8,1.2,1.7,2.3,3.0];H.forEach((h,i)=>s.box(-2.25+i*.95,-1.6,-.25,.55,h,.5,520,i===4?1:2,i===4?0:1));
  for(let i=0;i<520;i++){const t=Rn();const x=-2.4+4.7*t,y=-1.0+3.0*Math.pow(t,1.6);s.add(x+(Rn()-.5)*.05,y+(Rn()-.5)*.05,.55+(Rn()-.5)*.05,3)}
  s.seg([2.3,2.0,.55],[1.95,2.05,.55],50,3,.04);s.seg([2.3,2.0,.55],[2.18,1.68,.55],50,3,.04);s.ring(0,-1.62,0,3.0,240,2,0,1,.04);out.push(s)}
 {/* 2 Mensch & Potenzial: Person, um sie eine aufsteigende Spirale */const s=S();s.bust(0,-.35,0,1.25,1700,0,0);
  for(let i=0;i<900;i++){const t=Rn();const a=t*TAU*2.2,r=1.55+.25*t;s.add(Math.cos(a)*r,-.5+2.7*t,Math.sin(a)*r,t>.55?3:1)}
  s.seg([0,2.3,0],[0,2.85,0],60,3,.05);s.seg([0,2.9,0],[-.26,2.62,0],40,3,.04);s.seg([0,2.9,0],[.26,2.62,0],40,3,.04);s.ring(0,-.48,0,1.6,260,2,0,1,.05);out.push(s)}
 {/* 3 Leadership & Team: Führungsperson vorne, Team im Bogen, verbunden */const s=S();s.bust(0,-.2,.9,1.45,1100,3,0);
  const T=[[-1.85,-.3,-.4],[-.8,.05,-1.1],[.8,.05,-1.1],[1.85,-.3,-.4]];T.forEach(p=>{s.bust(p[0],p[1],p[2],1.0,560,1,1);s.seg([0,1.2,.9],[p[0],p[1]+.95,p[2]],70,2,.02)});
  for(let i=0;i<T.length-1;i++)s.seg([T[i][0],T[i][1]+.95,T[i][2]],[T[i+1][0],T[i+1][1]+.95,T[i+1][2]],50,2,.02);s.ring(0,-.45,-.1,2.5,320,2,0,1,.05);out.push(s)}
 {/* 4 Recruiting & Retention: Trichter, darunter ein Ring, der hält */const s=S();for(let i=0;i<1300;i++){const t=Rn();const y=2.1-2.2*t,r=.35+1.75*(1-t)*(1-t)+.0;const a=Rn()*TAU;s.add(Math.cos(a)*r,y,Math.sin(a)*r,Rn()<.15?1:0)}
  for(let i=0;i<380;i++){const t=Math.pow(Rn(),.7),y=1.9-2.4*t,r=(.3+1.4*(1-t)*(1-t))*Math.sqrt(Rn());const a=Rn()*TAU;s.add(Math.cos(a)*r,y,Math.sin(a)*r,Rn()<.25?3:1)}
  s.ring(0,-1.35,0,1.25,700,3,0,.92,.12);s.ring(0,-1.35,0,1.25,120,2,0,1,.02);[0,1,2,3,4].forEach(i=>{const a=i/5*TAU+.3;s.bust(Math.cos(a)*1.25,-1.25,Math.sin(a)*1.25,.32,110,1,1)});out.push(s)}
 {/* 5 Digital: Bildschirm mit Modulen, Tastatur, schwebende Bausteine */const s=S();const tilt=-.18,M=(x,y)=>[x,y*Math.cos(tilt),-.3+y*Math.sin(tilt)];
  const rect=(x0,y0,w,h,n,k,fill)=>{for(let i=0;i<n;i++){let x,y;if(!fill||Rn()<.5){const e=Math.floor(Rn()*4),t=Rn();x=e<2?x0+t*w:x0+(e===2?0:w);y=e<2?y0+(e?h:0):y0+t*h}else{x=x0+Rn()*w;y=y0+Rn()*h}const q=M(x,y);s.add(q[0],q[1]+.35,q[2],k)}};
  rect(-1.9,-1.05,3.8,2.4,700,0);rect(-1.7,-.85,.75,2.0,260,2,1);[0,1,2].forEach(i=>rect(-.75+i*.85,.55,.7,.6,140,2,1));rect(-.75,-.85,2.4,1.2,300,1);
  for(let i=0;i<220;i++){const a=Rn()*TAU,r=.32*Math.sqrt(Rn());const q=M(.45+Math.cos(a)*r,-.25+Math.sin(a)*r);s.add(q[0],q[1]+.35,q[2],3)}
  for(let i=0;i<520;i++){const u=Rn(),v=Rn();s.add(-2.1+4.2*u+(v-.5)*.3,-.75,-.25+1.4*v,v<.08||v>.92||u<.03||u>.97?0:2)}
  [[-2.7,1.6,.4],[2.6,1.3,.2],[2.4,-.3,.9],[-2.5,-.2,1]].forEach((c,i)=>s.box(c[0]-.18,c[1]-.18,c[2]-.18,.36,.36,.36,90,i%2?3:1,i%2?3:1));out.push(s)}
 /* alle Figuren in denselben Rahmen wie Vertriebsperformance setzen */
 const bb=s=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;for(let i=0;i<s.p.length;i+=3){const x=s.p[i],y=s.p[i+1];if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}return{x0,x1,y0,y1}};
 const ref=bb(out[0]);const rw=ref.x1-ref.x0,rh=ref.y1-ref.y0,rcx=(ref.x0+ref.x1)/2;
 out.forEach((s,k)=>{if(!k)return;const b=bb(s);const sc=Math.min(rw*1.3/(b.x1-b.x0),rh/(b.y1-b.y0));const cx=(b.x0+b.x1)/2;const oy=ref.y0;for(let i=0;i<s.p.length;i+=3){s.p[i]=rcx+(s.p[i]-cx)*sc;s.p[i+1]=oy+(s.p[i+1]-b.y0)*sc;s.p[i+2]*=sc}});
 /* 6 · Punktmeer wie im Header: flaches, welliges Feld, das die Karte ausfüllt */
 {const sea=S();for(let i=0;i<N;i++){const x=(Math.random()-.5)*7.6,z=(Math.random()-.5)*5.2;const y=-1.15+.32*Math.sin(x*1.3+z*.6)+.22*Math.sin(z*1.9-x*.4)+.08*Math.sin(x*4.1);sea.add(x,y,z,y>-.95&&Math.random()<.35?3:(Math.random()<.5?1:2))}out.push(sea)}
 return out.map(s=>{const P=new Float32Array(N*3),K=new Uint8Array(N);const m=s.c.length;for(let i=0;i<N;i++){const j=i<m?i:Math.floor(Math.random()*m);P[i*3]=s.p[j*3];P[i*3+1]=s.p[j*3+1];P[i*3+2]=s.p[j*3+2];K[i]=s.c[j]}
  /* nach Höhe sortieren: jeder Punkt wandert zu einem Punkt auf ähnlicher Höhe, so verformt sich die Figur statt zu zerfallen */
  const idx=Array.from({length:N},(_,i)=>i);const key=i=>P[i*3+1]*1+Math.atan2(P[i*3+2],P[i*3])*.035;idx.sort((a,b)=>key(a)-key(b));const P2=new Float32Array(N*3),K2=new Uint8Array(N);idx.forEach((o,n)=>{P2[n*3]=P[o*3];P2[n*3+1]=P[o*3+1];P2[n*3+2]=P[o*3+2];K2[n]=K[o]});
  return{P:P2,K:K2}})}
R.makeShapes=makeShapes;
const tsl=document.getElementById("tsl");if(!tsl)return;
const card=document.getElementById("tslc"),bgEl=tsl.querySelector(".tsl-bg"),tw=document.getElementById("tw"),sec=document.getElementById("themen");
/* Handy-Liste aus den Karten ableiten */
const items=[card,...tsl.querySelectorAll(".tsl-t")].map((el,i)=>{const h=el.querySelector("h3"),p=el.querySelector("p");const bar=el.querySelector(".tsl-bar");
 const href=(bar||el).getAttribute("href")||"#";const l=el.getAttribute("data-l")||(bar&&bar.textContent.trim())||"Mehr erfahren";return{n:h?h.innerHTML:"",t:p?p.innerHTML:"",l,href}});
const mob=document.getElementById("twmob");
if(mob&&!mob.children.length)mob.innerHTML=items.map((t,i)=>`<div class="m"><span class="no">${String(i+1).padStart(2,"0")}</span><h3>${t.n}</h3><img alt="" data-shot="${i}"><p>${t.t}</p><a class="lnk" href="${t.href}"><span class="b">${R.icon("arrow-right")}</span>${t.l}</a></div>`).join("");
/* Standbilder für das Handy, erst wenn sie gebraucht werden */
let shotsDone=false;
function shots(){if(shotsDone||innerWidth>860||!R.HAS3D||!mob)return;shotsDone=true;const SH=makeShapes();const cv=document.createElement("canvas");let r;try{r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true,preserveDrawingBuffer:true})}catch(e){return}
 r.setPixelRatio(Math.min(devicePixelRatio||1,2));const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(34,1,.1,100);
 const pos=new Float32Array(N*3),col=new Float32Array(N*3),rnd=new Float32Array(N);for(let i=0;i<N;i++)rnd[i]=Math.random();
 const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("color",new THREE.BufferAttribute(col,3));g.setAttribute("rnd",new THREE.BufferAttribute(rnd,1));g.setAttribute("sz",new THREE.BufferAttribute(new Float32Array(N).fill(1),1));
 const DPR=Math.min(devicePixelRatio||1,2);
 const mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uS:{value:31*DPR*R.dot},uT:{value:0}},
  vertexShader:`attribute vec3 color;attribute float rnd;attribute float sz;uniform float uS,uT;varying vec3 vC;varying float vA;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;float dz=clamp((-mv.z-8.)/5.,0.,1.);gl_PointSize=uS*(.55+rnd*.45)*(1.15-.35*dz)/-mv.z*sz;vC=color;vA=(1.-.4*dz);}`,
  fragmentShader:`varying vec3 vC;varying float vA;void main(){vec2 q=gl_PointCoord-.5;float d=length(q);if(d>.5)discard;gl_FragColor=vec4(vC,min(1.,vA*1.15)*smoothstep(.5,.34,d));}`});
 const pts=new THREE.Points(g,mat),grp=new THREE.Group();grp.add(pts);sc.add(grp);
 {let y0=1e9,y1=-1e9;const P0=SH[0].P;for(let i=1;i<P0.length;i+=3){if(P0[i]<y0)y0=P0[i];if(P0[i]>y1)y1=P0[i]}pts.position.y=-(y0+y1)/2}
 const PAL=[R.c("var(--c-manganese)"),R.c("var(--c-serpent)"),R.c(R.MX("var(--c-serpent)",53,"var(--c-sea)")),R.c("var(--c-plum)")].map(h=>new THREE.Color(h));
 r.setSize(560,460,false);cam.aspect=560/460;const d=11*Math.max(1,1.05/cam.aspect);cam.position.set(0,.5*d/11,d);cam.lookAt(0,0,0);cam.updateProjectionMatrix();grp.rotation.set(.12,-.5,0);
 const imgs=[...mob.querySelectorAll("img[data-shot]")];
 for(let k=0;k<5;k++){const A=SH[k];pos.set(A.P);for(let i=0;i<N;i++){const c=PAL[A.K[i]];col[i*3]=c.r;col[i*3+1]=c.g;col[i*3+2]=c.b}g.attributes.position.needsUpdate=true;g.attributes.color.needsUpdate=true;r.render(sc,cam);const url=cv.toDataURL("image/png");imgs.filter(m=>+m.dataset.shot===k).forEach(m=>m.src=url)}
 r.dispose()}
shots();addEventListener("resize",shots);
/* Sicherung: Text in den Kacheln darf nie angeschnitten sein */
const fitT=()=>tsl.querySelectorAll(".tsl-t").forEach(t=>{const tx=t.querySelector(".tx");if(!tx)return;t.classList.remove("f1","f2","nofit");for(const c of ["f1","f2","nofit"]){if(tx.scrollHeight<=tx.clientHeight+1)break;t.classList.add(c)}});
addEventListener("resize",()=>requestAnimationFrame(fitT));setTimeout(fitT,50);if(document.fonts)document.fonts.ready.then(fitT);
/* Kacheln: Reihenfolge für den Aufbau */
[...tsl.querySelectorAll(".tsl-t")].forEach((t,j)=>{if(!t.dataset.st)t.dataset.st=String(2+j);const f=t.querySelector(".tsl-fig");if(f&&!f.dataset.fig)f.dataset.fig=String(j+1)});
 if(!R.HAS3D)return;
 const cv=tsl.querySelector(".tsl-gl");let r;try{r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true})}catch(e){return}
 const DPR=Math.min(devicePixelRatio||1,2);r.setPixelRatio(DPR);r.setScissorTest(true);r.autoClear=false;
 const SH=R.makeShapes();const figs=[...tsl.querySelectorAll(".tsl-fig")];
 const PALL=["#FFFFFF",R.c("var(--c-sea)"),R.c(R.MX("var(--c-serpent)",31,"var(--c-sea)")),R.c(R.MX("var(--c-plum)",80,"#fff"))].map(h=>new THREE.Color(h)),PALD=[R.c("var(--c-manganese)"),R.c("var(--c-serpent)"),R.c(R.MX("var(--c-serpent)",53,"var(--c-sea)")),R.c("var(--c-plum)")].map(h=>new THREE.Color(h));
 const VS=`attribute vec3 color;attribute float rnd;attribute float sz;uniform float uS,uT;varying vec3 vC;varying float vA;void main(){vec3 p=position+.018*vec3(sin(uT*1.1+rnd*40.),cos(uT*.9+rnd*30.),sin(uT*.7+rnd*20.));vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;float dz=clamp((-mv.z-8.)/5.,0.,1.);gl_PointSize=uS*(.55+rnd*.45)*(1.15-.35*dz)/-mv.z*sz;vC=color;vA=(1.-.4*dz)*min(sz*1.6,1.);}`;
 const FS=`varying vec3 vC;varying float vA;void main(){vec2 q=gl_PointCoord-.5;float d=length(q);if(d>.5)discard;gl_FragColor=vec4(vC,min(1.,vA*1.15)*smoothstep(.5,.34,d));}`;
 const F=figs.map((el,k)=>{const big=k===0;const n=big?(innerWidth>1200?5200:4200):1500;const S=SH[k],NS=S.K.length;
  const tgt=new Float32Array(n*3),st=new Float32Array(n*3),ctl=new Float32Array(n*3),pos=new Float32Array(n*3),col=new Float32Array(n*3),rnd=new Float32Array(n),sz=new Float32Array(n),dl=new Float32Array(n);
  let y0=1e9,y1=-1e9;for(let i=1;i<S.P.length;i+=3){y0=Math.min(y0,S.P[i]);y1=Math.max(y1,S.P[i])}const cy=(y0+y1)/2;const PAL=big?PALL:PALD;
  for(let i=0;i<n;i++){const j=Math.floor(Math.random()*NS);const x=S.P[j*3],y=S.P[j*3+1]-cy,z=S.P[j*3+2];tgt.set([x,y,z],i*3);
   /* Start: als feines Punktfeld unten in der Fläche, dann im Bogen in die Form */
   const sx=(Math.random()-.5)*9,sz0=(Math.random()-.5)*4,sy=-3.2+.25*Math.sin(sx*1.3+sz0)+(Math.random()-.5)*.3;st.set([sx,sy,sz0],i*3);
   ctl.set([(sx+x)/2+(Math.random()-.5)*3,Math.max(sy,y)+1+Math.random()*2.5,(sz0+z)/2],i*3);
   const c=PAL[S.K[j]];col.set([c.r,c.g,c.b],i*3);rnd[i]=Math.random();dl[i]=Math.pow(Math.random(),1.3)*.9+(y-y0+cy)/(y1-y0+1e-6)*.25}
  pos.set(st);const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("color",new THREE.BufferAttribute(col,3));g.setAttribute("rnd",new THREE.BufferAttribute(rnd,1));g.setAttribute("sz",new THREE.BufferAttribute(sz,1));
  const mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uS:{value:(big?30:22)*DPR*R.dot},uT:{value:0}},vertexShader:VS,fragmentShader:FS});
  const sc=new THREE.Scene(),grp=new THREE.Group();grp.add(new THREE.Points(g,mat));sc.add(grp);const cam=new THREE.PerspectiveCamera(34,1,.1,100);
  return{el,host:el.parentElement,n,tgt,st,ctl,pos,sz,dl,g,mat,grp,cam,sc,big,delay:big?.4:.6,mx:0,my:0,smx:0,smy:0,lastLt:-9}});
 let T=0;const MOVE=1.25,DONE=MOVE+1.2;
 /* Ablauf wie die Referenz: zuerst Titel und Textfelder, dann die Kästen rechts von oben nach unten, dann bauen sich die Grafiken auf */
 /* links und rechts gleichzeitig: Titel links mit dem ersten Kasten rechts, Beschrieb links mit den unteren Kästen *//* Fenster in Bildschirmhöhen Scrollweg [Start, Dauer]: links und rechts bauen sich schon während des Zooms auf, die Karte nach dem Zoom */const AW={0:[.19,.43],2:[.22,.43],3:[.28,.43],4:[.34,.43],5:[.4,.43],6:[.38,.43],1:[.76,.22],7:[.84,.22]};const FW=[[.79,.8],[.47,.77]];const TMAX=.6+.9+1.25+.05;const sts=[...tsl.querySelectorAll("[data-st]")];
 tsl.addEventListener("pointermove",e=>{for(const f of F){const b=f.host.getBoundingClientRect();if(e.clientX>=b.left&&e.clientX<=b.right&&e.clientY>=b.top&&e.clientY<=b.bottom){f.mx=(e.clientX-b.left)/b.width-.5;f.my=(e.clientY-b.top)/b.height-.5}else{f.mx=f.my=0}}});
 tsl.addEventListener("pointerleave",()=>F.forEach(f=>f.mx=f.my=0));
 let W=0,H=0;
 R.loops.push(now=>{if(innerWidth<=860)return;
  const b=tsl.getBoundingClientRect();if(b.bottom<0||b.top>innerHeight)return;{/* beim Verlassen löst sich der Hintergrund weich in den Farbfluss auf */const tb=tw.getBoundingClientRect().bottom;bgEl.style.opacity=root.classList.contains("fluid")?clamp((tb-innerHeight*.3)/(innerHeight*.7),0,1).toFixed(3):"1"}
  /* Start, sobald der Zoom fertig ist; zurück im Header wird für das nächste Mal zurückgesetzt */
  let nzE=-1;if(R.timed){if(tsl._t0==null&&(R.zoomP??1)>=.97&&b.top<innerHeight*.9)tsl._t0=now;nzE=tsl._t0==null?-1:(now-tsl._t0)/1000}
  const zp=R.zoomP??1,zs=R.zoomS??zp;/* Aufbau hängt 1:1 am Scroll: beginnt kurz vor Ende des Zooms, vorwärts baut es auf, rückwärts wieder ab */const KD=root.classList.contains("dk")?.72:1;const ZL=R.zoomLen||innerHeight*.9,BL=innerHeight*1.2*KD;const ready=zp>=.99;
  T=R.motion?clamp((scrollY-ZL*.88)/BL,0,1)*TMAX:(ready?TMAX:0);const sp=R.timed?(nzE<0?0:.15+nzE*.6):scrollY/(innerHeight*KD);if(R.timed){T=nzE<0?0:Math.min(1,nzE/2.6)*TMAX}const tt=now/1000;
  for(const el of sts){const w=AW[el.dataset.st];const q=R.motion?clamp((sp-w[0])/w[1],0,1):((ready||R.timed)?1:0);const k=q*q*(3-2*q);el.style.setProperty("--o",k.toFixed(3))}
  const w=Math.round(b.width),h=Math.round(b.height);if(w!==W||h!==H){W=w;H=h;r.setSize(w,h,false)}
  r.setScissor(0,0,w,h);r.setViewport(0,0,w,h);r.clear();
  for(const f of F){const fb=f.el.getBoundingClientRect();const x=fb.left-b.left,y=fb.top-b.top,fw=fb.width,fh=fb.height;if(fw<2||fh<2)continue;
   const fwn=FW[f.big?0:1];const lt=R.motion?(sp<=fwn[0]?-1:(sp-fwn[0])/fwn[1]*DONE):((ready||R.timed)?99:-1);
   if(!(lt>=DONE&&f.lastLt>=DONE)){f.lastLt=lt;const P=f.pos,S=f.st,C=f.ctl,T=f.tgt;
    for(let i=0;i<f.n;i++){const k0=lt<0?0:clamp((lt-f.dl[i])/MOVE,0,1),k=k0*k0*(3-2*k0),a=(1-k)*(1-k),bb=2*(1-k)*k,c=k*k,ix=i*3;
     P[ix]=a*S[ix]+bb*C[ix]+c*T[ix];P[ix+1]=a*S[ix+1]+bb*C[ix+1]+c*T[ix+1];P[ix+2]=a*S[ix+2]+bb*C[ix+2]+c*T[ix+2];f.sz[i]=lt<0?0:Math.min(1,k0*3)}
    f.g.attributes.position.needsUpdate=true;f.g.attributes.sz.needsUpdate=true}
   f.smx+=(f.mx-f.smx)*.07;f.smy+=(f.my-f.smy)*.07;f.mat.uniforms.uT.value=R.motion?tt:0;
   f.grp.rotation.y=-.5+(R.motion?Math.sin(tt*.3+f.delay*3)*.2:0)+f.smx*1.1;f.grp.rotation.x=.12+f.smy*.4;
   f.cam.aspect=fw/fh;const d=11*Math.max(1,1.05/f.cam.aspect)*(f.big?.84:.98);f.cam.position.set(0,.5*d/11,d);f.cam.lookAt(0,0,0);f.cam.updateProjectionMatrix();
   const vy=h-y-fh;r.setViewport(x,vy,fw,fh);r.setScissor(x,vy,fw,fh);r.render(f.sc,f.cam)}});
})();
