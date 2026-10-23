/* ===== ROWAPA 2027 · Header: Punktemeer, Zeilenwechsel, Zoom in die Themenlinien, Farbfluss, Titelaufbau =====
   Einstellungen (Custom Attributes):
   - #hero  data-rotate="3.8"       Sekunden pro Headerzeile (oder Variable «Headerzeile Wechsel Sekunden»)
   - #themen data-zoom="0.72"        Länge des Zooms (oder Variable «Zoom Laenge Themen»; 1 = grosszügig, 0.72 = kompakt)
   - jeder Abschnitt data-tone="white|snow|sea|ink|deep|plum|serpent|cream"  Grundfarbe im Farbfluss */
(function(){const R=window.R,root=document.documentElement,{clamp,lerp,ease}=R;

/* ---------- Farbfluss: Abschnitt in der Bildmitte bestimmt die Grundfarbe, Übergänge werden gemischt ---------- */
const toned=[...document.querySelectorAll("[data-tone]")].filter(e=>e!==root);let tone="";
/* Grundfarben aus den CI-Variablen; Manganese Black ist die Masterfarbe, Tiefsee und Creme sind daraus abgeleitet */
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const COL={white:[255,255,255],snow:hx(R.c("var(--c-snow)","#E8E9E9")),sea:hx(R.c("var(--c-sea)","#A0C4DF")),ink:hx(R.c("var(--c-manganese)")),deep:hx(R.c("var(--c-tiefsee)","#111D2C")),plum:hx(R.c("var(--c-plum)","#AA1351")),serpent:hx(R.c("var(--c-serpent)","#486EA3")),cream:hx(R.c(R.MX("var(--c-manganese)",4,"#fff"),"#F7F7F5"))};
/* Übergang hell/dunkel nicht über Grau, sondern über einen Blauton aus Sea Cliff und Great Serpent */
const MID=hx(R.c(R.MX("var(--c-sea)",75,"var(--c-serpent)"),"#8AAED0")),lum=c=>.2126*c[0]+.7152*c[1]+.0722*c[2];
const mixFlow=(a,b,k)=>{if(Math.abs(lum(a)-lum(b))<110)return a.map((v,j)=>v+(b[j]-v)*k);const u=1-k;return a.map((v,j)=>{const M=2*MID[j]-(v+b[j])/2;return Math.max(0,Math.min(255,u*u*v+2*u*k*M+k*k*b[j]))})};
const sm=R.sm;const toneOf=s=>s.id==="themen"?"cream":(s.dataset.tone||"white");let lastCol="";
/* stetiger Verlauf über Farbstopps: jeder Abschnitt hat eine ruhige Fläche, dazwischen ein weicher Übergang.
   Kurze Abschnitte (z. B. das Logoband) haben keine eigene Farbe, sie stehen auf der Farbe des Abschnitts davor. */
R.loops.push(()=>{const ih=innerHeight,c=ih*.5;
 let t=toned.length?toned[0].dataset.tone:"white";for(const el of toned){const r=el.getBoundingClientRect();if(r.top<=c&&r.bottom>c){t=el.dataset.tone;break}}if(t!==tone){tone=t;root.dataset.tone=t}
 const S=toned.filter(s=>(s.tagName==="SECTION"||s.tagName==="FOOTER")&&s.id!=="hero"&&s.offsetParent!==null);
 const G=[];S.forEach(s=>{const r=s.getBoundingClientRect(),col=COL[toneOf(s)]||COL.white;const L=G[G.length-1];
  if(L&&(r.height<ih*.35||L.col===col)){L.bot=Math.max(L.bot,r.bottom)}else G.push({top:r.top,bot:r.bottom,col})});
 /* hell/dunkel wechselt zügiger (Text bleibt lesbar), ähnliche Töne fliessen langsam */
 const Zp=(a,b)=>Math.abs(lum(a)-lum(b))>110?ih*.2:ih*.45,st=[];G.forEach((g,i)=>{const h=g.bot-g.top;const wi=i?Math.min(Zp(G[i-1].col,g.col),h*.45,(G[i-1].bot-G[i-1].top)*.45):0,wo=G[i+1]?Math.min(Zp(g.col,G[i+1].col),h*.45,(G[i+1].bot-G[i+1].top)*.45):0;st.push([g.top+wi,g.col],[g.bot-wo,g.col])});
 /* am Seitenende muss der letzte Übergang abgeschlossen sein (Kontakt und Footer ganz in ihrer Farbe) */
 if(st.length>=4){const lim=document.scrollingElement.scrollHeight-scrollY-ih*.5-ih*.06,n=st.length;if(st[n-2][0]>lim){st[n-2][0]=lim;st[n-3][0]=Math.min(st[n-3][0],lim-ih*.55)}}
 let m=st.length?st[0][1]:COL.white;
 for(let i=0;i<st.length;i++){if(c<st[i][0]){if(i>0){const [y0,a]=st[i-1],[y1,b]=st[i];const k=sm(clamp((c-y0)/Math.max(1,y1-y0),0,1));m=mixFlow(a,b,k)}else m=st[0][1];break}m=st[i][1]}
 const col=`rgb(${m.map(Math.round).join(",")})`;if(col!==lastCol){lastCol=col;document.body.style.backgroundColor=col;root.style.setProperty("--flow",col)}});

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
const SEA={c1:R.c("var(--c-serpent)"),c2:"#FFFFFF",c3:R.c(R.MX("var(--c-plum)",85,"#fff"))};
horizon(hero,document.getElementById("cH"),Object.assign({nx:320,nz:200,size:54,alpha:1,amp:1.1,camY:4.6,look:-3.8},SEA));
horizon(document.getElementById("kontakt"),document.getElementById("cK"),Object.assign({nx:260,nz:150,size:50,alpha:.8,amp:1,camY:4.2,look:-3.4},SEA));

/* ---------- Zoom: der Header zieht sich in die Karte der ersten Themenlinie zusammen ---------- */
const themen=document.getElementById("themen"),tw=document.getElementById("tw"),card=document.getElementById("tslc");
const hwrap=hero&&hero.querySelector(".wrap");let hcd=hero&&hero.querySelector(".hcard");
if(hero&&!hcd){hcd=document.createElement("div");hcd.className="hcard";hcd.setAttribute("aria-hidden","true");hero.appendChild(hcd)}
function setZoom(){if(!tw)return;if(R.timed){R.zoomLen=0;tw.style.height="";return}const big=innerWidth>860;const K=R.cfg(themen,"data-zoom","zoom-laenge-themen",.72);
 if(big){R.twOff=innerHeight;R.zoomLen=innerHeight*.8*K;tw.style.height=`calc(100svh + ${Math.round(165*K)}svh)`}else{R.twOff=innerHeight*.9;R.zoomLen=innerHeight*.9;tw.style.height=""}}
setZoom();addEventListener("resize",setZoom);
if(hero&&card)R.loops.push(()=>{const ih=innerHeight,iw=innerWidth;
 if(iw<=860||R.timed){hero.style.clipPath="";hero.style.opacity="";hero.style.visibility="";if(hwrap)hwrap.style.opacity="";hcd.style.display="none";R.zoomP=1;R.zoomS=1;return}
 const Z=R.zoomLen||ih*.9;const p=R.motion?clamp(scrollY/Z,0,1):(scrollY>10?1:0);const T=card.getBoundingClientRect();const NB=72;
 const ins=[p>0?NB+(T.top-NB)*p:0,iw-T.right,ih-T.bottom,T.left].map((v,j)=>(Math.max(0,j?v*p:v)).toFixed(1)+"px");
 hcd.style.display="block";hcd.style.inset=ins.join(" ");hcd.style.opacity=Math.min(1,p*1.04).toFixed(3);
 hero.style.clipPath=`inset(${ins.join(" ")} round ${(p*2).toFixed(1)}px)`;
 if(hwrap)hwrap.style.opacity=clamp(1-p/.5,0,1).toFixed(3);R.zoomP=p;R.zoomS=p;
 const fo=clamp((p-.965)/.035,0,1);hero.style.opacity=(1-fo).toFixed(3);hero.style.visibility=fo>=1?"hidden":"visible"});

/* ---------- Header-Titel baut sich beim ersten Laden Wort für Wort auf (wie der Leitsatz bei «Was uns antreibt») ---------- */
(function(){const h1=document.getElementById("h1");if(!h1||!R.motion)return;const ws=[];
 h1.querySelectorAll(".ln .tx").forEach(tx=>{if(tx.querySelector(".hw"))return;const parts=tx.textContent.split(/(\s+)/);tx.textContent="";
  parts.forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){tx.appendChild(document.createTextNode(p));return}const w=document.createElement("span");w.className="hw";w.textContent=p;tx.appendChild(w);ws.push(w)})});
 ws.forEach((w,i)=>{w.style.transitionDelay=(.3+i*.26).toFixed(2)+"s"});h1.classList.add("hw-pre");
 requestAnimationFrame(()=>requestAnimationFrame(()=>h1.classList.add("hw-on")))})();
/* ---------- übrige Titel stehen ruhig (kein Buchstabenaufbau); der Header blendet sein Punktemeer ein ---------- */
R.heroIntro=R.motion?0:1;
if(R.motion)setTimeout(()=>{const t0=performance.now(),DUR=1550;const st=()=>{const q=Math.min(1,(performance.now()-t0)/DUR);R.heroIntro=1-Math.pow(1-q,2.2);if(q<1)requestAnimationFrame(st)};requestAnimationFrame(st)},350);
})();
