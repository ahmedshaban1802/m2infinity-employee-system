const fs=require('fs');
let t=fs.readFileSync('public/index.html','utf8'),n=0;
if(t.includes("function svLS(k,v){localStorage.setItem(k,JSON.stringify(v));try{firebase.database().ref")){
t=t.replace("function svLS(k,v){localStorage.setItem(k,JSON.stringify(v));try{firebase.database().ref","async function svLS(k,v){localStorage.setItem(k,JSON.stringify(v));try{await firebase.database().ref");n++}
if(t.includes('function doLogin(){')){
t=t.replace('function doLogin(){','async function doLogin(){',1);
let a=t.match(/err\.classList\.add\('on'\);return\}\n  const acc=ACC\.find/);
if(a)t=t.replace(a[0],"err.classList.add('on');return}\n  try{ACC=await ldFB('m2_acc',ACC)}catch(e){console.warn('err')}\n  const acc=ACC.find",1);
let b=t.match(/localStorage\.setItem\('m2_session',JSON\.stringify\(\{u:acc\.u,p:acc\.p\}\)\);/);
if(b)t=t.replace(b[0],"localStorage.setItem('m2_session',JSON.stringify({u:acc.u,p:acc.p}));\n  if(acc.r==='employee')localStorage.removeItem('m2_reg_submitted');",1);
n++}
if(t.includes('function accPend(idx,ok){')){
t=t.replace('function accPend(idx,ok){','async function accPend(idx,ok){',1);
if(t.includes("PND.splice(idx,1);svLS('m2_pnd',PND);svLS('m2_emps',EMPS);svLS('m2_acc',ACC);"))
t=t.replace("PND.splice(idx,1);svLS('m2_pnd',PND);svLS('m2_emps',EMPS);svLS('m2_acc',ACC);","PND.splice(idx,1);await Promise.all([svLS('m2_pnd',PND),svLS('m2_emps',EMPS),svLS('m2_acc',ACC)]);",1);
n++}
if(t.includes('function cfDel(){')){
t=t.replace('function cfDel(){','async function cfDel(){',1);
if(t.includes("WARNS=WARNS.filter(w=>w.eid!==id);"))
t=t.replace("WARNS=WARNS.filter(w=>w.eid!==id);","WARNS=WARNS.filter(w=>w.eid!==id);const delNm=document.getElementById('mDel').dataset.enm||'';NOTS=NOTS.filter(x=>!x.m||!x.m.includes(delNm));",1);
if(t.includes("svLS('m2_emps',EMPS);svLS('m2_att',ATT);svLS('m2_lvs',LVS);svLS('m2_deds',DEDS);svLS('m2_advs',ADVS);svLS('m2_acc',ACC);svLS('m2_warns',WARNS);"))
t=t.replace("svLS('m2_emps',EMPS);svLS('m2_att',ATT);svLS('m2_lvs',LVS);svLS('m2_deds',DEDS);svLS('m2_advs',ADVS);svLS('m2_acc',ACC);svLS('m2_warns',WARNS);","await Promise.all([svLS('m2_emps',EMPS),svLS('m2_att',ATT),svLS('m2_lvs',LVS),svLS('m2_deds',DEDS),svLS('m2_advs',ADVS),svLS('m2_acc',ACC),svLS('m2_warns',WARNS),svLS('m2_nots',NOTS)]);",1);
n++}
if(t.includes('function svWarn(){')){
t=t.replace('function svWarn(){','async function svWarn(){',1);
if(t.includes("svLS('m2_warns',WARNS);cM('mWarn');"))
t=t.replace("svLS('m2_warns',WARNS);cM('mWarn');","await svLS('m2_warns',WARNS);cM('mWarn');",1);
if(t.includes("svLS('m2_deds',DEDS);"))
t=t.replace("svLS('m2_deds',DEDS);","await svLS('m2_deds',DEDS);",1);
n++}
fs.writeFileSync('public/index.html',t,'utf8');
console.log('Fixes: '+n+'/5');
