/* ===== ROWAPA 2027 · Header: Punktemeer, Zeilenwechsel, Zoom in die Themenlinien, Farbfluss, Titelaufbau =====
   Einstellungen (Custom Attributes):
   - #hero  data-rotate="3.8"       Sekunden pro Headerzeile (oder Variable «Headerzeile Wechsel Sekunden»)
   - #themen data-zoom="0.72"        Länge des Zooms (oder Variable «Zoom Laenge Themen»; 1 = grosszügig, 0.72 = kompakt)
   - jeder Abschnitt data-tone="white|snow|sea|ink|deep|plum|serpent|cream"  Grundfarbe im Farbfluss */
(function(){const R=window.R,root=document.documentElement,{clamp,lerp,ease}=R;

/* ---------- Farbfluss: Abschnitt in der Bildmitte bestimmt die Grundfarbe, Übergänge werden gemischt ---------- */
const toned=[...document.querySelectorAll("[data-tone]")].filter(e=>e!==root);let tone="";
const COL={white:[255,255,255],snow:[232,233,233],sea:[160,196,223],ink:[29,49,73],deep:[17,29,44],plum:[170,19,81],serpent:[72,110,163],cream:[247,247,245]};
const sm=R.sm;const toneOf=s=>s.id==="themen"?"cream":(s.dataset.tone||"white");let lastCol="";
R.loops.push(()=>{const ih=innerHeight,c=ih*.5;
 let t=toned.length?toned[0].dataset.tone:"white";for(const el of toned){const r=el.getBoundingClientRect();if(r.top<=c&&r.bottom>c){t=el.dataset.tone;break}}if(t!==tone){tone=t;root.dataset.tone=t}
 const S=toned.filter(s=>(s.tagName==="SECTION"||s.tagName==="FOOTER")&&s.id!=="hero"&&s.offsetParent!==null);const Z=ih*.55;let a=COL.white,b=a,k=0;
 for(let i=0;i<S.length;i++){const r=S[i].getBoundingClientRect();if(r.top<=c&&r.bottom>c){a=COL[toneOf(S[i])]||a;const db=r.bottom-c,dt=c-r.top;
  if(db<Z&&S[i+1]){b=COL[toneOf(S[i+1])]||a;k=sm(.5*(1-db/Z)*2)/2}else if(dt<Z&&S[i-1]){b=COL[toneOf(S[i-1])]||a;k=sm(.5*(1-dt/Z)*2)/2}break}}
 const m=a.map((v,j)=>Math.round(v+(b[j]-v)*k));const col=`rgb(${m.join(",")})`;if(col!==lastCol){lastCol=col;document.body.style.backgroundColor=col}});

/* ---------- Headerzeilen: Weiss, Blau, Grau wandern ---------- */
const hero=document.getElementById("hero");
const lns=[...document.querySelectorAll("#h1 .ln")],COLS=["c-w","c-b","c-g"];let hI=0,lastC=performance.now(),shown=-1;const ROT=R.cfg(hero,"data-rotate","headerzeile-wechsel-sekunden",3.8)*1000;
lns.forEach((l,i)=>l.addEventListener("mouseenter",()=>{hI=i;lastC=performance.now()}));
if(lns.length)R.loops.push(now=>{if(R.motion&&now-lastC>ROT){lastC=now;hI=(hI+1)%lns.length}if(shown===hI)return;shown=hI;lns.forEach((l,i)=>{const k=(i-hI+lns.length)%lns.length;l.classList.remove(...COLS);l.classList.add(COLS[k%3]);l.classList.toggle("on",i===hI)})});

/* ---------- Punktemeer (Header und Kontakt) ---------- */
function horizon(sec,cv,o){if(!R.HAS3D||!sec||!cv)return;const r=R.renderer(cv);if(!r){cv.style.display="none";return}
 const lin=R.lin,sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(55,1,.1,200);
 const NX=o.nx,NZ=o.nz,W=70,D=70;const n=NX*NZ,pos=new Float32Array(n*3),rnd=new Float32Array(n);let k=0;
 for(let z=0;z<NZ;z++)for(let xx=0;xx<NX;xx++){pos[k*3]=(xx/(NX-1)-.5)*W;pos[k*3+1]=0;pos[k*3+2]=6-z/(NZ-1)*D;rnd[k]=Math.random();k++}
 const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));g.setAttribute("rnd",new THREE.BufferAttribute(rnd,1));
 const mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,
  uniforms:{uT:{value:0},uAmp:{value:1},uM:{value:new THREE.Vector2(0,-6)},uRip:{value:0},uS:{value:o.size*Math.min(devicePixelRatio||1,2)},uC1:{value:lin(o.c1)},uC2:{value:lin(o.c2)},uC3:{value:lin(o.c3)},uK:{value:o.alpha},uDis:{value:0}},
  vertexShader:`attribute float rnd;uniform float uT,uAmp,uRip,uS,uDis;uniform vec2 uM;varying float vH;varying float vA;varying float vR;
  void main(){vec3 p=position;float h=sin(p.x*.22+uT*.5)*.5+sin(p.z*.3-uT*.65)*.42+sin((p.x+p.z)*.14+uT*.3)*.6+sin(p.x*.7-p.z*.5+uT*.9)*.1;
   float r=distance(p.xz,uM);float rip=exp(-r*.25)*sin(r*1.8-uT*4.)*.7*uRip;p.y=(h*uAmp)+rip;p.y-=uDis*(1.5+rnd*7.);p.x+=uDis*sin(rnd*91.)*3.5;p.z+=uDis*cos(rnd*57.)*2.;vH=clamp((h*uAmp+rip)*.45+.5,0.,1.);vR=rnd;
   vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=uS*(.55+rnd*.5)*(.75+.5*vH)/-mv.z;
   float fz=smoothstep(-64.,-18.,p.z);vA=(.25+.75*fz)*(.5+.5*vH)*(1.-uDis*(.4+.6*rnd));}`,
  fragmentShader:`uniform vec3 uC1,uC2,uC3;uniform float uK;varying float vH;varying float vA;varying float vR;void main(){vec2 q=gl_PointCoord-.5;float d=length(q);if(d>.5)discard;
   vec3 c=mix(uC1,uC2,smoothstep(.3,.8,vH));float cr=smoothstep(.8,.95,vH)*step(.9,vR);c=mix(c,uC3,cr);float e=smoothstep(.5,.1,d);gl_FragColor=vec4(c,e*vA*uK);}`});
 sc.add(new THREE.Points(g,mat));
 const ray=new THREE.Raycaster(),pl=new THREE.Plane(new THREE.Vector3(0,1,0),0),mv=new THREE.Vector2(),hit=new THREE.Vector3();let rip=0;const mT=new THREE.Vector2(0,-6);
 sec.addEventListener("pointermove",e=>{const b=cv.getBoundingClientRect();mv.set((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1);ray.setFromCamera(mv,cam);if(ray.ray.intersectPlane(pl,hit)){mT.set(hit.x,hit.z);rip=1}});
 const vis=R.visible(sec),t0=performance.now(),isHero=sec===hero;
 R.loops.push(now=>{if(!vis.v||!R.fit(r,cam,cv))return;const t=(now-t0)/1000;const hp=clamp(scrollY/(sec.clientHeight*.8),0,1);const u=mat.uniforms;
  u.uT.value=R.motion?t:2;u.uAmp.value=lerp(o.amp,.6,ease(hp));u.uDis.value=Math.max(0,1-(R.heroIntro??1));if(isHero)sec.style.setProperty("--hf","0");rip*=.985;u.uRip.value=R.motion?rip:0;u.uM.value.lerp(mT,.08);
  const mob=innerWidth<700;cam.fov=mob?75:58;cam.position.set(0,lerp(o.camY,o.camY+1.3,hp),7);cam.lookAt(0,o.look,-14);cam.updateProjectionMatrix();r.render(sc,cam)})}
const SEA={c1:"#486EA3",c2:"#FFFFFF",c3:"#D2306F"};
horizon(hero,document.getElementById("cH"),Object.assign({nx:320,nz:200,size:54,alpha:1,amp:1.1,camY:4.6,look:-3.8},SEA));
horizon(document.getElementById("kontakt"),document.getElementById("cK"),Object.assign({nx:260,nz:150,size:50,alpha:.8,amp:1,camY:4.2,look:-3.4},SEA));

/* ---------- Zoom: der Header zieht sich in die Karte der ersten Themenlinie zusammen ---------- */
const themen=document.getElementById("themen"),tw=document.getElementById("tw"),card=document.getElementById("tslc");
const hwrap=hero&&hero.querySelector(".wrap");let hcd=hero&&hero.querySelector(".hcard");
if(hero&&!hcd){hcd=document.createElement("div");hcd.className="hcard";hcd.setAttribute("aria-hidden","true");hero.appendChild(hcd)}
function setZoom(){if(!tw)return;const big=innerWidth>860;const K=R.cfg(themen,"data-zoom","zoom-laenge-themen",.72);
 if(big){R.twOff=innerHeight;R.zoomLen=innerHeight*.8*K;tw.style.height=`calc(100svh + ${Math.round(165*K)}svh)`}else{R.twOff=innerHeight*.9;R.zoomLen=innerHeight*.9;tw.style.height=""}}
setZoom();addEventListener("resize",setZoom);
if(hero&&card)R.loops.push(()=>{const ih=innerHeight,iw=innerWidth;
 if(iw<=860){hero.style.clipPath="";hero.style.opacity="";hero.style.visibility="";if(hwrap)hwrap.style.opacity="";hcd.style.display="none";R.zoomP=1;R.zoomS=1;return}
 const Z=R.zoomLen||ih*.9;const p=R.motion?clamp(scrollY/Z,0,1):(scrollY>10?1:0);const T=card.getBoundingClientRect();const NB=72;
 const ins=[p>0?NB+(T.top-NB)*p:0,iw-T.right,ih-T.bottom,T.left].map((v,j)=>(Math.max(0,j?v*p:v)).toFixed(1)+"px");
 hcd.style.display="block";hcd.style.inset=ins.join(" ");hcd.style.opacity=Math.min(1,p*1.04).toFixed(3);
 hero.style.clipPath=`inset(${ins.join(" ")} round ${(p*2).toFixed(1)}px)`;
 if(hwrap)hwrap.style.opacity=clamp(1-p/.5,0,1).toFixed(3);R.zoomP=p;R.zoomS=p;
 const fo=clamp((p-.965)/.035,0,1);hero.style.opacity=(1-fo).toFixed(3);hero.style.visibility=fo>=1?"hidden":"visible"});

/* ---------- Titel bauen sich Buchstabe für Buchstabe auf ---------- */
function split(el){const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(w));return}const wd=document.createElement("span");wd.className="lw";[...w].forEach(ch=>{const l=document.createElement("span");l.className="lt";l.textContent=ch;wd.appendChild(l)});f.appendChild(wd)});c.replaceWith(f)}else if(c.nodeType===1&&c.tagName!=="I"&&c.tagName!=="BR"&&!c.classList.contains("lt"))walk(c)})};walk(el);
 const L=[...el.querySelectorAll(".lt")];L.forEach(l=>l.style.transitionDelay=(Math.random()*.62).toFixed(3)+"s");el.classList.add("lr");return L}
const play=el=>{el.classList.remove("lr-off");el.classList.add("lr-on")},reset=el=>{el.classList.remove("lr-on");el.classList.add("lr-off")};
const h1=document.getElementById("h1");
if(h1){split(h1);[...h1.querySelectorAll(".ln")].forEach((ln,li)=>ln.querySelectorAll(".lt").forEach(l=>l.style.transitionDelay=(li*.42+Math.random()*.5).toFixed(3)+"s"));
 reset(h1);const D0=R.motion?350:0,DUR=1550;R.heroIntro=R.motion?0:1;
 setTimeout(()=>{play(h1);if(!R.motion)return;const t0=performance.now();const st=()=>{const q=Math.min(1,(performance.now()-t0)/DUR);R.heroIntro=1-Math.pow(1-q,2.2);if(q<1)requestAnimationFrame(st)};requestAnimationFrame(st)},D0)}
const hs=[...document.querySelectorAll("main section h2")].filter(h=>!h.closest(".tsl,.tw-pin,#hzoom,.hero"));
hs.forEach(h=>{split(h);if(R.motion)reset(h)});
if(R.motion){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)play(e.target);else if(e.boundingClientRect.top>0)reset(e.target)}),{threshold:.35,rootMargin:"0px 0px -8% 0px"});hs.forEach(h=>io.observe(h))}
})();
