// Einmalige Migration: entfernt CSS-Regeln, deren Selektoren auf der Webflow-Startseite nie zutreffen können
const fs=require('fs'),postcss=require('postcss'),sp=require('postcss-selector-parser');
const [,,inCss,usedJson,outCss]=process.argv;
const U=JSON.parse(fs.readFileSync(usedJson,'utf8'));
const C=new Set(U.c),I=new Set(U.i),A=new Set(U.a),AN=new Set(U.a.map(x=>x.split('=')[0]));
['still','mopen','mlock','hide','hot','hit','f1','f2','nofit','on','done','in','pre','lr','lr-on','lr-off','vg-done','dg-done','solid','cur'].forEach(x=>C.add(x));
const ROOT_ALWAYS=new Set(['fluid','sl','dk']),ROOT_OK=new Set(['fluid','sl','dk','still','mlock','dg-pin-on']);
let dropped=0,kept=0;const deadLog=[];
function alive(sel){let ok=true;
 sp(root=>{root.each(s=>{ // one selector
  // walk compounds
  let compound=[];const nodes=[];s.each(n=>nodes.push(n));nodes.push({type:'combinator'});
  for(const n of nodes){if(n.type==='combinator'){
    const isRoot=compound.some(x=>x.type==='pseudo'&&x.value===':root'||x.type==='tag'&&x.value==='html');
    for(const x of compound){
     if(x.type==='class'){if(isRoot?!ROOT_OK.has(x.value):!(C.has(x.value)||x.value.startsWith('w-')))ok=false}
     else if(x.type==='id'){if(!I.has(x.value))ok=false}
     else if(x.type==='attribute'){const nm=x.attribute;if(nm.startsWith('data-')||nm.startsWith('aria-')||nm==='role'||nm==='type'||nm==='hidden'){if(!x.operator){if(!AN.has(nm)&&!(isRoot&&nm==='data-tone'))ok=false}else if(x.operator==='='){const v=String(x.value).replace(/^["']|["']$/g,'');if(!A.has(nm+'='+v)&&!(isRoot&&nm==='data-tone'))ok=false}}}
     else if(x.type==='pseudo'&&x.value===':not'&&isRoot){x.each(inner=>inner.each(y=>{if(y.type==='class'&&ROOT_ALWAYS.has(y.value))ok=false}))}
    }
    compound=[]}else compound.push(n)}
 })}).processSync(sel);return ok}
const root=postcss.parse(fs.readFileSync(inCss,'utf8'));
root.walkRules(rule=>{if(rule.parent&&rule.parent.type==='atrule'&&/keyframes/.test(rule.parent.name))return;
 const sels=rule.selectors;const keep=sels.filter(s=>{try{return alive(s)}catch(e){return true}});
 if(!keep.length){deadLog.push(rule.selector);rule.remove();dropped++}else{if(keep.length<sels.length)rule.selectors=keep;kept++}});
// leere @media entfernen, nicht genutzte keyframes entfernen
root.walkAtRules('media',a=>{if(!a.nodes||!a.nodes.length)a.remove()});
const css=root.toString();const used=new Set();root.walkDecls(/animation/,d=>d.value.split(/[\s,]+/).forEach(w=>used.add(w)));
root.walkAtRules(/keyframes$/,a=>{if(!used.has(a.params))a.remove()});
fs.writeFileSync(outCss,root.toString());fs.writeFileSync(outCss+'.dead.txt',deadLog.join('\n'));
console.log('kept',kept,'dropped',dropped,'bytes',root.toString().length);
