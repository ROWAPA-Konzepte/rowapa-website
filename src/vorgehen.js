/* ===== ROWAPA 2027 · Unser Vorgehen (Konzeptphasen): Analysieren · Verstehen · Handeln · Messen =====
   Inhalte stehen in Webflow in den vier Elementen .vg-ds (Nummer, Titel, Kurzsatz in <strong>, Text).
   Daraus entstehen automatisch die Beschriftungen an der Punkt-Treppe und die Zeitleiste auf dem Handy. */
(function(){const R=window.R,root=document.documentElement,{clamp}=R;const sec=document.getElementById("vorgehen");if(!sec)return;
const vgD=sec.querySelector(".vg-d");if(!vgD)return;
const dss=[...vgD.querySelectorAll(".vg-ds")];
dss.forEach((e,i)=>{e.dataset.i=i;e.tabIndex=0;e.setAttribute("role","button")});
const S=dss.map((e,i)=>{const n=e.querySelector(".n"),b=e.querySelector("b"),d=e.querySelector(".d");const st=d&&d.querySelector("strong");let t="";if(d){const c=d.cloneNode(true);const s2=c.querySelector("strong");if(s2)s2.remove();t=c.innerHTML.trim()}return{n:n?n.textContent.trim():String(i+1).padStart(2,"0"),v:b?b.textContent.trim():"",s:st?st.innerHTML:"",t}});
const stair=vgD.querySelector(".vg-stair");
if(stair&&!stair.querySelector(".tag"))stair.insertAdjacentHTML("afterbegin",S.map((s,i)=>`<span class="tag" data-i="${i}">${s.n} · ${s.v}</span>`).join(""));
const loopEl=stair&&stair.querySelector(".vg-dloop");const loopTxt=loopEl?loopEl.textContent.replace(/^\W+/,"").trim():"Messen führt in die nächste Analyse";
const vgM=sec.querySelector(".vg-m");
if(vgM&&!vgM.children.length)vgM.innerHTML=S.map((s,i)=>`<li data-i="${i}"><span class="vg-nd"><i></i></span><div><span class="vg-no">${s.n}</span><h3>${s.v}</h3><p class="vg-s">${s.s}</p><p class="vg-t">${s.t}</p></div></li>`).join("")+`<li class="vg-mback"><span class="vg-loop">${R.icon("refresh-cw")}${loopTxt}</span></li>`;
 let D3=null;let dL=0,dS=-1,dOff=0;const bk=[0,0,0,0];let bl=0,dT=performance.now();
 if(R.HAS3D&&window.THREE){try{
  const cv=vgD.querySelector("canvas");const r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});const DPR=Math.min(devicePixelRatio||1,2);r.setPixelRatio(DPR);
  const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(32,1,.1,100),grp=new THREE.Group();sc.add(grp);
  const Rn=Math.random,TAU=Math.PI*2;
  const steps=[[],[],[],[]],loop=[];const add=(a,x,y,z,k)=>a.push([x,y,z,k]);
  const box=(a,x0,y0,z0,w,h,d,n,k)=>{for(let i=0;i<n;i++){let x,y,z;if(Rn()<.6){const ax=Math.floor(Rn()*3),t=Rn(),u=Rn()<.5?0:1,v=Rn()<.5?0:1;if(ax===0){x=x0+t*w;y=y0+u*h;z=z0+v*d}else if(ax===1){x=x0+u*w;y=y0+t*h;z=z0+v*d}else{x=x0+u*w;y=y0+v*h;z=z0+t*d}}else{const f=Math.floor(Rn()*3),p=Rn(),q=Rn();if(f===0){x=x0+p*w;y=y0+h;z=z0+q*d}else if(f===1){x=x0+p*w;y=y0+q*h;z=z0+d}else{x=x0+w;y=y0+q*h;z=z0+p*d}}add(a,x,y,z,1)}};
  const ring=(a,cx,cy,cz,R0,n,k,arc=1,a0=0,tube=.04,plane="xy")=>{for(let i=0;i<n;i++){const t=a0+Rn()*TAU*arc,tr=(Rn()-.5)*tube;const c=Math.cos(t)*(R0+tr),s=Math.sin(t)*(R0+tr);if(plane==="xy")add(a,cx+c,cy+s,cz+(Rn()-.5)*tube,k);else add(a,cx+c,cy+(Rn()-.5)*tube,cz+s,k)}};
  const seg=(a,p,q,n,k,j=.03)=>{for(let i=0;i<n;i++){const t=Rn();add(a,p[0]+(q[0]-p[0])*t+(Rn()-.5)*j,p[1]+(q[1]-p[1])*t+(Rn()-.5)*j,p[2]+(q[2]-p[2])*t+(Rn()-.5)*j,k)}};
  const sph=(a,cx,cy,cz,R0,n,k)=>{for(let i=0;i<n;i++){const u=Rn()*2-1,th=Rn()*TAU,s=Math.sqrt(1-u*u);add(a,cx+R0*s*Math.cos(th),cy+R0*u,cz+R0*s*Math.sin(th),k)}};
  const W=1.4,G=.5,H=.72,B=-2.2,X0=-3.7;
  for(let k=0;k<4;k++){const a=steps[k],x0=X0+k*(W+G),h=H*(k+1);box(a,x0,B,-W/2,W,h,W,1100,1);ring(a,x0+W/2,B+h,0,.55,160,2,1,0,.03,"xz");
   const cx=x0+W/2,cy=B+h+1.05;
   if(k===0){ring(a,cx-.1,cy+.1,0,.42,420,3,1,0,.07);seg(a,[cx+.2,cy-.2,0],[cx+.6,cy-.62,0],140,3,.08)}            /* Lupe */
   if(k===1){const P=[[cx-.5,cy-.3,0],[cx+.45,cy-.35,.1],[cx,cy+.45,-.1],[cx+.55,cy+.35,.2],[cx-.5,cy+.4,.1]];P.forEach(p=>sph(a,p[0],p[1],p[2],.13,90,3));[[0,1],[0,2],[1,2],[2,3],[1,3],[2,4],[0,4]].forEach(e=>seg(a,P[e[0]],P[e[1]],60,2,.02))}   /* Zusammenhänge */
   if(k===2){[.5,.33,.16].forEach((R0,j)=>ring(a,cx,cy,0,R0,220-j*50,j===2?3:2,1,0,.05));sph(a,cx,cy,0,.06,60,3);seg(a,[cx+1,cy+.55,.3],[cx+.05,cy+.02,0],150,3,.03)}   /* Ziel mit Pfeil */
   if(k===3){ring(a,cx,cy-.25,0,.68,420,2,.5,0,.08);seg(a,[cx,cy-.25,0],[cx+.45,cy+.25,0],160,3,.06);sph(a,cx,cy-.15,0,.07,50,3);
    for(let j=0;j<4;j++)seg(a,[cx-.45+j*.3,cy-.62,0],[cx-.45+j*.3,cy-.62+.12+j*.1,0],40,1,.06)}}                 /* Messinstrument */
  /* Bogen vom Messen zurück zum Analysieren */
  {const p0=[X0+3*(W+G)+W/2,B+H*4+1.9,0],p2=[X0+W/2,B+H+1.75,0],c1=[(p0[0]+p2[0])/2,B+H*4+3.4,-.8];for(let i=0;i<700;i++){const t=Rn(),u=1-t;const x=u*u*p0[0]+2*u*t*c1[0]+t*t*p2[0],y=u*u*p0[1]+2*u*t*c1[1]+t*t*p2[1],z=u*u*p0[2]+2*u*t*c1[2]+t*t*p2[2];loop.push([x,y,z,3,t])}
   for(let i=0;i<80;i++){const t=Rn();seg(loop,p2,[p2[0]-.28,p2[1]+.3,0],1,3,.03);seg(loop,p2,[p2[0]+.3,p2[1]+.25,0],1,3,.03)}loop.forEach(q=>{if(q[4]===undefined)q[4]=1})}
  const all=[];steps.forEach((a,k)=>a.forEach(q=>all.push([q[0],q[1],q[2],q[3],k,Rn()])));const tops=[0,1,2,3].map(k=>[X0+k*(W+G)+W/2,B+H*(k+1),W/2-.28]);loop.forEach(q=>all.push([q[0],q[1],q[2],q[3],4,q[4]]));
  const N=all.length,pos=new Float32Array(N*3),col=new Float32Array(N*3),rnd=new Float32Array(N),sz=new Float32Array(N),T=new Float32Array(N*3),St=new Float32Array(N*3);
  all.forEach((q,i)=>{T.set([q[0],q[1],q[2]],i*3);St.set([q[0]+(Rn()-.5)*3,q[1]-2.5-Rn()*3,q[2]+(Rn()-.5)*3],i*3);rnd[i]=Rn()});
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("color",new THREE.BufferAttribute(col,3));g.setAttribute("rnd",new THREE.BufferAttribute(rnd,1));g.setAttribute("sz",new THREE.BufferAttribute(sz,1));
  const mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uS:{value:30*DPR},uT:{value:0}},
   vertexShader:`attribute vec3 color;attribute float rnd;attribute float sz;uniform float uS,uT;varying vec3 vC;varying float vA;void main(){vec3 p=position+.015*vec3(sin(uT*1.1+rnd*40.),cos(uT*.9+rnd*30.),sin(uT*.7+rnd*20.));vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=uS*(.55+rnd*.45)/-mv.z*sz;vC=color;vA=min(1.,sz*1.4);}`,
   fragmentShader:`varying vec3 vC;varying float vA;void main(){vec2 q=gl_PointCoord-.5;float d=length(q);if(d>.5)discard;gl_FragColor=vec4(vC,vA*smoothstep(.5,.25,d));}`});
  grp.add(new THREE.Points(g,mat));
  const C=[R.c("var(--c-manganese)"),R.c("var(--c-serpent)"),R.c(R.MX("var(--c-serpent)",31,"var(--c-sea)")),R.c("var(--c-plum)")].map(h=>new THREE.Color(h)),Cdim=new THREE.Color(R.c(R.MX("var(--c-serpent)",38,"var(--c-snow)")));
  let mx=0,my=0,smx=0,smy=0;cv.addEventListener("pointermove",e=>{const b=cv.getBoundingClientRect();mx=(e.clientX-b.left)/b.width-.5;my=(e.clientY-b.top)/b.height-.5});cv.addEventListener("pointerleave",()=>{mx=my=0});
  const sm=x=>x*x*(3-2*x);
  /* Markierung wie bei «Klarheit»: Stab mit Plum-Kopf, springt auf die aktive Stufe */
  const pinPts=[];for(let i=0;i<120;i++)pinPts.push([(Rn()-.5)*.04,Rn()*.62,(Rn()-.5)*.04,1]);for(let i=0;i<280;i++){const u=Rn()*2-1,th=Rn()*TAU,s2=Math.sqrt(1-u*u),rr=.17*Math.cbrt(Rn());pinPts.push([rr*s2*Math.cos(th),.78+rr*u,rr*s2*Math.sin(th),3])}
  const PN=pinPts.length,pg=new THREE.BufferGeometry(),pp=new Float32Array(PN*3),pc=new Float32Array(PN*3),pr=new Float32Array(PN),ps=new Float32Array(PN).fill(1);pinPts.forEach((q,i)=>{pp.set([q[0],q[1],q[2]],i*3);const c=C[q[3]];pc.set([c.r,c.g,c.b],i*3);pr[i]=Rn()});
  pg.setAttribute("position",new THREE.BufferAttribute(pp,3));pg.setAttribute("color",new THREE.BufferAttribute(pc,3));pg.setAttribute("rnd",new THREE.BufferAttribute(pr,1));pg.setAttribute("sz",new THREE.BufferAttribute(ps,1));
  const pin=new THREE.Points(pg,mat);grp.add(pin);
  const lift=[0,0,0,0];let from=0,to=0,hop=1,pinS=0;const pv=new THREE.Vector3();
  D3={draw(pb,ai,bl,now,dt,tags){const w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return;if(cv.width!==Math.round(w*DPR)){r.setSize(w,h,false)}cam.aspect=w/h;const d=15.5*Math.max(1,1.15/cam.aspect);cam.position.set(0,1.2,d);cam.lookAt(0,.2,0);cam.updateProjectionMatrix();
    const t=now/1000;mat.uniforms.uT.value=R.motion?t:0;smx+=(mx-smx)*.06;smy+=(my-smy)*.06;/* frontal: alle Säulen auf einer Flucht, die Maus kippt nur leicht */grp.rotation.y=smx*.22;grp.rotation.x=.06+smy*.12;
    const bk=[0,1,2,3].map(k=>clamp(pb*1.7-k*.22,0,1));
    for(let k=0;k<4;k++){const tg=k===ai?.22:0;lift[k]+=(tg-lift[k])*(R.motion?Math.min(1,dt*7):1)}
    for(let i=0;i<N;i++){const q=all[i],k=q[4];let b;if(k<4){b=sm(clamp(bk[k]*1.35-q[5]*.35,0,1))}else{b=clamp(bl*1.4-q[5]*.4,0,1)}
     const ix=i*3,u=1-b,ly=k<4?lift[k]:0;pos[ix]=St[ix]*u+T[ix]*b;pos[ix+1]=St[ix+1]*u+(T[ix+1]+ly)*b;pos[ix+2]=St[ix+2]*u+T[ix+2]*b;sz[i]=b<=0?0:Math.min(1,b*2.2);
     let c=C[q[3]];if(k<4&&k!==ai&&q[3]===3)c=C[1];if(k<4&&k!==ai&&q[3]===1)c=Cdim;col[ix]=c.r;col[ix+1]=c.g;col[ix+2]=c.b}
    g.attributes.position.needsUpdate=true;g.attributes.color.needsUpdate=true;g.attributes.sz.needsUpdate=true;
    /* Markierung: Sprung im Bogen zur aktiven Stufe */
    if(ai!==to){from=to;to=ai;hop=0}hop=Math.min(1,hop+(R.motion?dt/.55:1));const e=sm(hop);const A=tops[from],Bt=tops[to];
    pin.position.set(A[0]+(Bt[0]-A[0])*e,A[1]+lift[from]*(1-e)+(Bt[1]+lift[to]-A[1]-lift[from]*(1-e))*e+Math.sin(Math.PI*hop)*.9*(from!==to?1:0),A[2]);
    pinS+=((bk[ai]>.9?1:0)-pinS)*Math.min(1,dt*6);pin.scale.setScalar(Math.max(.001,pinS));
    r.render(sc,cam);
    /* Beschriftungen an den Stufen */
    grp.updateMatrixWorld();tags.forEach((tg,k)=>{pv.set(tops[k][0],B,W/2).applyMatrix4(grp.matrixWorld).project(cam);tg.style.left=((pv.x*.5+.5)*w).toFixed(1)+"px";tg.style.top=((-pv.y*.5+.5)*h+22).toFixed(1)+"px";tg.style.opacity=bk[k]>.85?(k===ai?1:.7):0;tg.classList.toggle("on",k===ai)})}};
 }catch(e){D3=null}}
 const tagsD=[...vgD.querySelectorAll(".tag")];const setL=i=>{dL=i;dss.forEach((e,k)=>{e.classList.toggle("on",k===i);e.classList.toggle("done",k<i)})};setL(0);
 dss.forEach((e,i)=>{e.addEventListener("mouseenter",()=>setL(i));e.addEventListener("focus",()=>setL(i));e.addEventListener("click",()=>setL(i))});
 const vpin=sec.querySelector(".vg-pin");let vsp=sec.querySelector(".vg-sp");if(vpin&&!vsp){vsp=document.createElement("div");vsp.className="vg-sp";vsp.setAttribute("aria-hidden","true");vpin.after(vsp)}
 const vgPinOK=()=>root.classList.toggle("vg-pin-on",false);vgPinOK();addEventListener("resize",vgPinOK);
 const mls=vgM?[...vgM.querySelectorAll("li[data-i]")]:[];
 R.loops.push(()=>{if(sec.offsetParent===null)return;const r=sec.getBoundingClientRect(),ih=innerHeight;if(r.bottom<-50||r.top>ih+50)return;
  if(innerWidth<=860){mls.forEach(li=>{const q=li.getBoundingClientRect();li.classList.toggle("on",q.top<ih*.62)});return}
  const now=performance.now(),dt=Math.min(.05,(now-dT)/1000);dT=now;
  /* Halt: der Abschnitt bleibt stehen, während die vier Phasen nacheinander aktiv werden; danach läuft er weiter.
     Länge über die Webflow-Variable «Halt Vorgehen» (0 = kein Halt). */
  const pinned=root.classList.contains("vg-pin-on")&&vsp&&vsp.offsetHeight>20;
  if(pinned){const ph=vpin.offsetHeight,tp=ph<ih-72?72+(ih-72-ph)*.5:ih-ph;vpin.style.top=tp.toFixed(0)+"px";
   if(R.motion){const p=clamp((tp-r.top)/vsp.offsetHeight,0,1);const si=Math.min(3,Math.floor(p*4.0001));if(si!==dS){dS=si;setL(si)}}}
  else if(R.motion){if(vpin)vpin.style.top="";let si=0;dss.forEach((d,k)=>{if(d.getBoundingClientRect().top<ih*.58)si=k});if(si!==dS){dS=si;setL(si)}}
  const gb=vgD.getBoundingClientRect();const pb=R.motion?clamp((ih*.92-gb.top)/(ih*.55),0,1):1;const tl=dL===3?1:0;bl+=Math.max(-dt*2.4,Math.min(dt*1.4,tl-bl));if(!R.motion)bl=tl;
  if(D3)D3.draw(pb,dL,bl,now,dt,tagsD);sec.classList.toggle("vg-done",bl>.95)});
})();
