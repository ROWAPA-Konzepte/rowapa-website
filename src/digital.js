/* ===== ROWAPA 2027 · ROWAPA Digital: Wissensplattform als Punktkugel, fünf Werkzeuge im Orbit, kurzer Halt =====
   Inhalte: die Karten .dg-card (Webflow-CMS «Werkzeuge»): Symbol (data-icon), Untertitel, Name, Text.
   Die Kacheln im Orbit entstehen automatisch aus den Karten.
   - Länge des Halts: Variable «Halt ROWAPA Digital» (Standard 110 svh, 0 = kein Halt) oder Attribut data-halt="110" auf #digi */
(function(){const R=window.R,root=document.documentElement,{clamp}=R;const sec=document.getElementById("digi");if(!sec)return;
 const TAU=Math.PI*2,sm=R.sm;
 const stage=document.getElementById("dgStage"),cv=stage.querySelector("canvas"),glow=stage.querySelector(".dg-glow"),core=stage.querySelector(".dg-core"),lay=sec.querySelector(".dg-lay"),base=sec.querySelector(".dg-base"),sp=sec.querySelector(".dg-sp");
 const cards=[...sec.querySelectorAll(".dg-card")];const K=cards.length;if(!K)return;
 cards.forEach((c,i)=>{c.dataset.i=i;c.tabIndex=0});
 const tilesBox=document.getElementById("dgTiles");
 if(tilesBox&&!tilesBox.children.length)tilesBox.innerHTML=cards.map((c,i)=>{const ic=c.querySelector(".ic0 [data-icon],.ic0 svg use");const icn=ic?(ic.getAttribute("data-icon")||(ic.getAttribute("href")||"").replace("#i-","")):"";const n=(c.querySelector("h3")||{}).textContent||"",s=(c.querySelector(".sub")||{}).textContent||"";
  return `<button type="button" class="dg-tile" data-i="${i}" aria-label="${n.trim()}: ${s.trim()}"><span class="sq">${icn?R.icon(icn):""}</span><span class="nm">${n.trim()}</span></button>`}).join("");
 const tiles=[...sec.querySelectorAll(".dg-tile")],lis=[],cIc=cards.map(c=>c.querySelector(".ic0"));
 const halt=R.cfg(sec,"data-halt","halt-rowapa-digital",110);if(sp&&sec.hasAttribute("data-halt"))sp.style.setProperty("--halt",halt+"svh");
 let act=0,userT=-1e9,autoT=performance.now();const setA=(i,user)=>{act=i;if(user)userT=performance.now();autoT=performance.now();
  tiles.forEach((e,k)=>e.classList.toggle("on",k===i));cards.forEach((e,k)=>e.classList.toggle("on",k===i))};
 [tiles,cards].forEach(L=>L.forEach((e,i)=>{e.addEventListener("mouseenter",()=>setA(i,true));e.addEventListener("focus",()=>setA(i,true));e.addEventListener("click",()=>setA(i,true))}));setA(0,false);
 /* ---------- Punktszene ---------- */
 let G=null;
 if(R.HAS3D&&window.THREE){try{
  const r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});const DPR=Math.min(devicePixelRatio||1,2);r.setPixelRatio(DPR);
  const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(30,1,.1,200),grp=new THREE.Group();sc.add(grp);
  const Rn=Math.random,RS=1.75,RX=4.7,RZ=4.7;
  /* Typen: 0 Kugelhülle, 1 Netzknoten, 2 Netzkante, 3 Bahn, 4 Werkzeugpunkt, 5 Speiche */
  const P=[];const add=(x,y,z,ty,c,k=-1,t=0)=>P.push({x,y,z,ty,c,k,t,s:Rn()});
  const NS=3600;for(let i=0;i<NS;i++){const y=1-2*(i+.5)/NS,rr=Math.sqrt(1-y*y),th=i*2.399963;const j=1+(Rn()-.5)*.03;add(Math.cos(th)*rr*RS*j,y*RS*j,Math.sin(th)*rr*RS*j,0,y>.15?0:(y<-.45?2:1))}
  /* Netz im Innern: Wissen, das verbunden ist */
  const nodes=[];for(let i=0;i<38;i++){let x,y,z;do{x=Rn()*2-1;y=Rn()*2-1;z=Rn()*2-1}while(x*x+y*y+z*z>1);nodes.push([x*1.35,y*1.35,z*1.35])}
  nodes.forEach((n,i)=>{const pl=i%6===0;for(let j=0;j<26;j++){const u=Rn()*2-1,th=Rn()*TAU,s2=Math.sqrt(1-u*u),rr=.055*Math.cbrt(Rn());add(n[0]+rr*s2*Math.cos(th),n[1]+rr*u,n[2]+rr*s2*Math.sin(th),1,pl?3:0)}
   const d=nodes.map((m,k)=>[k,(m[0]-n[0])**2+(m[1]-n[1])**2+(m[2]-n[2])**2]).filter(q=>q[0]>i).sort((a,b)=>a[1]-b[1]).slice(0,2);
   d.forEach(([k])=>{const m=nodes[k];for(let j=0;j<34;j++){const t=Rn();add(n[0]+(m[0]-n[0])*t,n[1]+(m[1]-n[1])*t,n[2]+(m[2]-n[2])*t,2,1)}})});
  for(let i=0;i<1500;i++){const a=Rn()*TAU,j=(Rn()-.5)*.05;add(Math.cos(a)*(RX+j),(Rn()-.5)*.03,Math.sin(a)*(RZ+j),3,1,-1,a)}
  for(let k=0;k<K;k++){for(let i=0;i<150;i++){const u=Rn()*2-1,th=Rn()*TAU,s2=Math.sqrt(1-u*u),rr=.17*Math.cbrt(Rn());add(rr*s2*Math.cos(th),rr*u,rr*s2*Math.sin(th),4,0,k)}
   for(let i=0;i<190;i++)add((Rn()-.5)*.03,(Rn()-.5)*.03,(Rn()-.5)*.03,5,1,k,Rn())}
  const N=P.length,pos=new Float32Array(N*3),col=new Float32Array(N*3),rnd=new Float32Array(N),sz=new Float32Array(N),St=new Float32Array(N*3);
  P.forEach((q,i)=>{rnd[i]=q.s;const a=Rn()*TAU,u=Rn()*2-1,s2=Math.sqrt(1-u*u),rr=6+Rn()*6;St.set([rr*s2*Math.cos(a),rr*u*.6-2,rr*s2*Math.sin(a)],i*3)});
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("color",new THREE.BufferAttribute(col,3));g.setAttribute("rnd",new THREE.BufferAttribute(rnd,1));g.setAttribute("sz",new THREE.BufferAttribute(sz,1));
  const mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{uS:{value:40*DPR*Math.sqrt(R.dot)},uT:{value:0}},
   vertexShader:`attribute vec3 color;attribute float rnd;attribute float sz;uniform float uS,uT;varying vec3 vC;varying float vA;void main(){vec3 p=position+.012*vec3(sin(uT*1.1+rnd*40.),cos(uT*.9+rnd*30.),sin(uT*.7+rnd*20.));vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=uS*(.55+rnd*.45)/-mv.z*max(sz,.0001);vC=color;vA=min(1.,sz*1.2);}`,
   fragmentShader:`varying vec3 vC;varying float vA;void main(){vec2 q=gl_PointCoord-.5;float d=length(q);if(d>.5)discard;gl_FragColor=vec4(vC*vA,vA*smoothstep(.5,.15,d));}`});
  grp.add(new THREE.Points(g,mat));
  /* Farben auf Dunkel: Sea, Serpent hell, Serpent, Plum (aufgehellt für den dunklen Grund) */
  const C=[R.c("var(--c-sea)"),R.c(R.MX("var(--c-serpent)",50,"var(--c-sea)")),R.c("var(--c-serpent)"),R.c(R.MX("var(--c-plum)",85,"#fff"))].map(h=>new THREE.Color(h)),Cw=new THREE.Color(R.c(R.MX("var(--c-sea)",23,"#fff"))),Cd=new THREE.Color(R.c(R.MX("var(--c-manganese)",51,"var(--c-serpent)")));
  let mx=0,my=0,smx=0,smy=0;stage.addEventListener("pointermove",e=>{const b=stage.getBoundingClientRect();mx=(e.clientX-b.left)/b.width-.5;my=(e.clientY-b.top)/b.height-.5});stage.addEventListener("pointerleave",()=>{mx=my=0});
  const v3=new THREE.Vector3(),TP=Array.from({length:K},()=>[0,0,0]);
  /* o: {pb Aufbau, e Austritt der Werkzeuge, m Verwandlung, th Bahnwinkel, sa Kugeldrehung, ai aktiv, t Zeit, fit Kameraabstand} */
  const inv=new THREE.Matrix4(),ray=new THREE.Vector3(),TQ=Array.from({length:K},()=>[0,0,0]),SC=[0,0,0];
  /* Bildschirmpunkt (px im Canvas) auf die Ebene z=0 der Welt, dann in Gruppenkoordinaten */
  const unp=(px,py,w,h,outA)=>{ray.set(px/w*2-1,-(py/h*2-1),.5).unproject(cam).sub(cam.position).normalize();const t=-cam.position.z/ray.z;v3.copy(cam.position).addScaledVector(ray,t).applyMatrix4(inv);outA[0]=v3.x;outA[1]=v3.y;outA[2]=v3.z};
  G={draw(o){const w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return null;if(cv.width!==Math.round(w*DPR))r.setSize(w,h,false);
    cam.aspect=w/h;const tn=Math.tan(15*Math.PI/180),dv=3.7/tn,dh=(RX+1.7)/(tn*cam.aspect);const d=Math.max(dv,dh)*(o.fit||1);
    cam.position.set(0,0,d);cam.lookAt(0,0,0);cam.updateProjectionMatrix();cam.updateMatrixWorld();mat.uniforms.uT.value=R.motion?o.t:0;
    const m=o.m,ms=sm(m);smx+=(mx-smx)*.05;smy+=(my-smy)*.05;grp.rotation.x=.56+smy*.08*(1-ms)-ms*.3;grp.rotation.y=smx*.18*(1-ms);grp.position.y=.45;grp.updateMatrixWorld();inv.copy(grp.matrixWorld).invert();
    const ca=Math.cos(o.sa),sa=Math.sin(o.sa),pb=o.pb;let sk=1;SC[0]=SC[1]=SC[2]=0;
    /* Verwandlung (B): Kugel wird klein und setzt sich zwischen Karten und Fundament, die Speichen führen zu den Karten */
    if(m>0&&o.tg){const wpp=2*d*tn/h;unp(o.tg.sx,o.tg.sy,w,h,TQ[0]);const skT=Math.max(.2,o.tg.sr*wpp/RS);sk=1+(skT-1)*ms;SC[0]=TQ[0][0]*ms;SC[1]=TQ[0][1]*ms;SC[2]=TQ[0][2]*ms;
     for(let k=0;k<K;k++)unp(o.tg.c[k][0],o.tg.c[k][1],w,h,TQ[k])}
    const ring=clamp((pb-.25)/.5,0,1),fadeS=1;
    for(let k=0;k<K;k++){const a=o.th+k*TAU/K,ek=o.ek[k];TP[k][0]=Math.cos(a)*RX*ek;TP[k][1]=0;TP[k][2]=Math.sin(a)*RZ*ek}
    const TM=TP.map((p,k)=>{if(!(m>0&&o.tg))return p;const mk=sm(clamp(m*1.25-k*.06,0,1));return [p[0]+(TQ[k][0]-p[0])*mk,p[1]+(TQ[k][1]-p[1])*mk,p[2]+(TQ[k][2]-p[2])*mk]});
    for(let i=0;i<N;i++){const q=P[i],ix=i*3;let x,y,z,s,c;
     if(q.ty<=2){const b=sm(clamp(pb*1.45-q.s*.45,0,1));const rx=q.x*ca-q.z*sa,rz=q.x*sa+q.z*ca;x=rx*sk+SC[0];y=q.y*sk+SC[1];z=rz*sk+SC[2];
      x=St[ix]+(x-St[ix])*b;y=St[ix+1]+(y-St[ix+1])*b;z=St[ix+2]+(z-St[ix+2])*b;s=b*fadeS*(q.ty===0?1:q.ty===1?.85:.5)*(1-.35*ms);
      c=C[q.c];if(q.ty===0){/* Licht von oben vorne */const lt=clamp(.55+.45*(rz/RS)+.25*(q.y/RS),0,1.2);c=v3c.copy(Cd).lerp(C[q.c],lt)}}
     else if(q.ty===3){const vis=((q.t/TAU+.25)%1)<ring?1:0;x=q.x;y=q.y;z=q.z;s=vis*.62*(1-ms);c=C[1]}
     else{const k=q.k,tk=o.tk[k],tp=TM[k];const on=k===o.ai;
      if(q.ty===4){x=tp[0]+q.x;y=tp[1]+q.y;z=tp[2]+q.z;s=tk*(1-ms)*1.1;c=on?C[3]:C[0]}
      else{const dx=tp[0]-SC[0],dy=tp[1]-SC[1],dz=tp[2]-SC[2],L=Math.hypot(dx,dy,dz)||1,f0=Math.min(1,RS*sk/L),f=f0+(1-f0)*q.t;x=SC[0]+dx*f+q.x;y=SC[1]+dy*f+q.y;z=SC[2]+dz*f+q.z;
       const ph=((q.t-o.t*.45+k*.21)%1+1)%1,pulse=ph<.07?1:0;s=tk*(pulse?1.2:.5)*(1+.25*ms);c=pulse?(on?C[3]:Cw):C[1]}}
     pos[ix]=x;pos[ix+1]=y;pos[ix+2]=z;sz[i]=s;col[ix]=c.r;col[ix+1]=c.g;col[ix+2]=c.b}
    g.attributes.position.needsUpdate=true;g.attributes.color.needsUpdate=true;g.attributes.sz.needsUpdate=true;r.render(sc,cam);
    /* Bildschirmlagen für Kacheln (auf der Bahn), Kern und Leuchten */
    const out={w,h,tools:[],core:null};
    for(let k=0;k<K;k++){v3.set(TP[k][0],TP[k][1],TP[k][2]).applyMatrix4(grp.matrixWorld);const zc=v3.z;v3.project(cam);out.tools.push({x:(v3.x*.5+.5)*w,y:(-v3.y*.5+.5)*h,z:zc})}
    v3.set(SC[0],SC[1],SC[2]).applyMatrix4(grp.matrixWorld).project(cam);const cx=(v3.x*.5+.5)*w,cy=(-v3.y*.5+.5)*h;v3.set(SC[0],SC[1]-RS*sk,SC[2]).applyMatrix4(grp.matrixWorld).project(cam);
    out.core={x:cx,y:cy,rad:Math.abs((-v3.y*.5+.5)*h-cy)};return out}};
  const v3c=new THREE.Color();
 }catch(e){G=null}}
 const pinOK=()=>root.classList.toggle("dg-pin-on",R.motion&&innerWidth>860&&halt>0);pinOK();addEventListener("resize",pinOK);
 let th=-.35,sa=0,last=performance.now();const ek=new Array(K).fill(1),tk=new Array(K).fill(1);
 R.loops.push(()=>{if(sec.offsetParent===null)return;const rr=sec.getBoundingClientRect(),ih=innerHeight;if(rr.bottom<-50||rr.top>ih+50)return;
  const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;const v="b",big=innerWidth>860,mot=R.motion;
  const pinned=root.classList.contains("dg-pin-on");const mode=pinned?"b":(v==="c"&&big?"c":"a");
  /* Aufbau beim Hereinscrollen (1:1 mit dem Scroll) */
  const sr=stage.getBoundingClientRect();let pb=mot?clamp((ih*.98-sr.top)/(ih*.62),0,1):1;
  let e=1,m=0;
  /* zeitgesteuert (Entscheid 23.10.2026): Kugel und fünf Werkzeuge bauen sich von selbst auf, sobald sichtbar; nur das Verteilen in die Karten folgt dem Scroll */
  if(R.timed&&mot){if(sec._t0==null&&sr.top<ih*.75)sec._t0=now;}let tE=(R.timed&&mot)?(sec._t0==null?0:(now-sec._t0)/1000):-1;
  if(mode==="b"){const hd=sec.querySelector(".dg-head");stage.style.setProperty("--st",(hd.offsetTop+hd.offsetHeight+6)+"px");const padT=parseFloat(getComputedStyle(sec).paddingTop)||0,rng=sp.offsetHeight||ih;const stT=parseFloat(getComputedStyle(lay).top)||72;const p=clamp((stT-(rr.top+padT))/rng,0,1);
   /* durchgehend: erst bauen sich die Werkzeuge auf, ohne Pause fliegen sie danach in die Karten; kein toter Scrollweg */if(tE>=0&&tE<.05&&p>.5&&sec._p0==null){/* von unten hereingescrollt: Aufbau gilt als fertig */sec._t0=now-3e3;sec._p0=.1;tE=3}
   if(tE>=0){/* Aufbau läuft als Animation zu Ende; erst danach verteilt der Scroll die Werkzeuge, ab der Stelle, an der der Aufbau fertig war */e=clamp(tE/2.8,0,1);pb=clamp(tE/1.3,0,1);if(tE>=2.9&&sec._p0==null)sec._p0=clamp(Math.max(.1,p),.1,.72);if(sec._p0!=null){m=sm(clamp((p-sec._p0)/(1-sec._p0),0,1));if(m>0){e=1;pb=1}}else m=0}else{e=clamp(p/.46,0,1);m=sm(clamp((p-.46)/.54,0,1));pb=Math.max(pb,clamp((ih-rr.top-padT)/(ih*.7),0,1))}}
  for(let k=0;k<K;k++){const ee=mode==="b"?sm(clamp((e-k*.17)/.32,0,1)):1;ek[k]=ee;tk[k]=mode==="b"?Math.min(ee*1.6,1)*clamp((pb-.5)/.2,0,1):clamp((pb-.52-k*.06)/.16,0,1)}
  /* Drehung: A und B langsam umlaufend, C dreht das gewählte Werkzeug nach vorn */
  if(mode==="c"){const tg=Math.PI/2-.7-act*TAU/K;let d=((tg-th)%TAU+TAU*1.5)%TAU-TAU/2;th+=mot?d*Math.min(1,dt*3.2):d}
  else if(mot)th+=dt*(.055*(1-m));
  if(mot)sa+=dt*.12;
  /* Auto-Wechsel der Hervorhebung, solange niemand berührt */
  let ai=act;if(mode==="b"&&e<1){ai=Math.max(0,Math.min(K-1,Math.floor(e*K*1.06)))}else if(mode==="b"&&m>0&&m<1){ai=-1}
  if(mot&&now-userT>6000&&now-autoT>3400&&tk[K-1]>.99&&!(mode==="b"&&m<1))setA((act+1)%K,false);
  let tg=null;if(mode==="b"&&m>0){const cs=cards.map(c=>c.getBoundingClientRect()),bR=base.getBoundingClientRect();const top=Math.max(...cs.map(c=>c.bottom));tg={c:cs.map(c=>[c.left+c.width/2-sr.left,c.bottom-sr.top]),sx:sr.width/2,sy:(top+bR.top)/2-sr.top,sr:Math.max(26,(bR.top-top)*.3)}}
  const o=G?G.draw({pb,e,m,th,sa,ai,t:now/1000,ek,tk,tg,fit:mode==="c"?1.02:(big?1:(innerWidth<561?.92:1.04))}):null;
  /* Kacheln über den Werkzeugen, in B fliegen sie in die Karten */
  const stR=sr;tiles.forEach((el,k)=>{let x,y,z=0,op=tk[k],scl=1,lab=1;
   if(o){x=o.tools[k].x;y=o.tools[k].y;z=o.tools[k].z}else{const a=th+k*TAU/K;x=stR.width*(.5+.42*Math.cos(a));y=stR.height*(.5+.22*Math.sin(a));z=Math.sin(a)}
   const depth=clamp((z+4.4)/8.8,0,1);scl=(.84+.2*depth)*Math.min(1,Math.max(.6,stR.height/560));
   if(o&&o.core){const dx=x-o.core.x,dy=y-o.core.y;if(z<0&&Math.hypot(dx,dy)<o.core.rad*1.15){op*=.3;lab=0}}
   if(mode==="b"){const mm=sm(clamp(m*1.25-k*.06,0,1));if(mm>0){const cr=cIc[k].getBoundingClientRect();const tx=cr.left+cr.width/2-stR.left,ty=cr.top+cr.height/2-stR.top;x+=(tx-x)*mm;y+=(ty-y)*mm;scl=scl+(cr.width/(el.offsetWidth||84)-scl)*mm;lab=1-clamp(mm*1.6,0,1);op=op*(1-clamp((mm-.9)/.1,0,1))}
    cIc[k].style.opacity=(clamp((mm-.9)/.1,0,1)).toFixed(3)}
   else cIc[k].style.opacity="";
   el.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${scl.toFixed(3)})`;el.style.opacity=op.toFixed(3);el.style.zIndex=String(10+Math.round(depth*10));el.style.setProperty("--lab",lab.toFixed(3));el.style.pointerEvents=op>.5?"":"none";el.classList.toggle("on",k===ai)});
  cards.forEach((c,k)=>c.classList.toggle("on",k===ai));lis.forEach((c,k)=>c.classList.toggle("on",k===ai));
  if(o&&o.core){glow.style.setProperty("--gx",o.core.x.toFixed(1)+"px");glow.style.setProperty("--gy",o.core.y.toFixed(1)+"px");glow.style.setProperty("--gr",Math.max(120,o.core.rad*3.6).toFixed(1)+"px");
   core.style.transform=`translate(${o.core.x.toFixed(1)}px,${(o.core.y+o.core.rad*1.14+34).toFixed(1)}px)`}
  const coreOp=clamp((pb-.6)/.25,0,1)*(1-sm(clamp(m/.3,0,1)));core.style.opacity=coreOp.toFixed(3);glow.style.opacity=(clamp(pb*1.4,0,1)).toFixed(3);
  /* Karten und Fundament */
  if(mode==="b"){const cq=sm(clamp((m-.3)/.55,0,1));cards.forEach(c=>{c.style.setProperty("--q",cq.toFixed(3))});base.style.setProperty("--q",sm(clamp((m-.55)/.4,0,1)).toFixed(3));sec.classList.toggle("dg-done",m>.99);
   /* Ausstieg: sobald der Halt endet, blendet der ganze Block aus, bevor «Aktuelles» kommt */
   const bR2=base.getBoundingClientRect();const out=mot?sm(clamp((bR2.bottom-ih*.25)/(ih*.45),0,1)):1;lay.style.opacity=out<1?out.toFixed(3):""}
  else{cards.forEach((c,k)=>{const q=mot?clamp((ih*.97-c.getBoundingClientRect().top)/(ih*.3)-k*.12,0,1):1;c.style.setProperty("--q",sm(q).toFixed(3))});lis.forEach((l,k)=>{const q=mot?clamp((ih*.95-l.getBoundingClientRect().top)/(ih*.25),0,1):1;l.style.setProperty("--q",sm(q).toFixed(3))});
   const bq=mot?clamp((ih*.98-base.getBoundingClientRect().top)/(ih*.3),0,1):1;base.style.setProperty("--q",sm(bq).toFixed(3));sec.classList.toggle("dg-done",true)}
 });
})();
