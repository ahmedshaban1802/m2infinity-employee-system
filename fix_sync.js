const fs = require('fs');
let h = fs.readFileSync('public/index.html', 'utf8');

var s1 = h.match(/async function syncAll\(\)\{[\s\S]*?\}/);
if (!s1) { console.log('ERROR: syncAll not found'); process.exit(1); }

var loadAll = "async function loadAll(){try{var d=await firebase.database().ref(\"data\").once(\"value\");var v=d.val();if(!v)return;"
+ "if(v.m2_acc){ACC=v.m2_acc;localStorage.setItem('m2_acc',JSON.stringify(ACC))}"
+ "if(v.m2_emps){EMPS=v.m2_emps;localStorage.setItem('m2_emps',JSON.stringify(EMPS))}"
+ "if(v.m2_set){SET=v.m2_set;localStorage.setItem('m2_set',JSON.stringify(SET))}"
+ "if(v.m2_att){ATT=v.m2_att;localStorage.setItem('m2_att',JSON.stringify(ATT))}"
+ "if(v.m2_lvs){LVS=v.m2_lvs;localStorage.setItem('m2_lvs',JSON.stringify(LVS))}"
+ "if(v.m2_pnd){PND=v.m2_pnd;localStorage.setItem('m2_pnd',JSON.stringify(PND))}"
+ "if(v.m2_nots){NOTS=v.m2_nots;localStorage.setItem('m2_nots',JSON.stringify(NOTS))}"
+ "if(v.m2_deds){DEDS=v.m2_deds;localStorage.setItem('m2_deds',JSON.stringify(DEDS))}"
+ "if(v.m2_advs){ADVS=v.m2_advs;localStorage.setItem('m2_advs',JSON.stringify(ADVS))}"
+ "if(v.m2_warns){WARNS=v.m2_warns;localStorage.setItem('m2_warns',JSON.stringify(WARNS))}"
+ "if(v.m2_logs){LOGS=v.m2_logs;localStorage.setItem('m2_logs',JSON.stringify(LOGS))}"
+ "}catch(e){}}";

h = h.replace(s1[0], loadAll);
h = h.replace('await syncAll()', 'await loadAll()');
console.log('Step 1: syncAll -> loadAll');

var r1 = h.match(/if\(v\.m2_pnd\)\{PND=v\.m2_pnd;if\(typeof upPBdg[^}]+\}/);
if (r1) {
  h = h.replace(r1[0], "if(v.m2_pnd){PND=v.m2_pnd;localStorage.setItem('m2_pnd',JSON.stringify(PND));if(typeof upPBdg==='function')upPBdg()}");
  console.log('Step 2: PND sync + localStorage');
}

var r2 = h.match(/if\(v\.m2_nots\)\{NOTS=v\.m2_nots;if\(typeof upNBdg[^}]+\}/);
if (r2) {
  h = h.replace(r2[0], "if(v.m2_nots){NOTS=v.m2_nots;localStorage.setItem('m2_nots',JSON.stringify(NOTS));if(typeof upNBdg==='function')upNBdg()}");
  console.log('Step 3: NOTS sync + localStorage');
}

var pairs = [
  ['m2_emps','EMPS'],['m2_acc','ACC'],['m2_att','ATT'],['m2_lvs','LVS'],
  ['m2_deds','DEDS'],['m2_advs','ADVS'],['m2_warns','WARNS'],['m2_logs','LOGS']
];
pairs.forEach(function(p) {
  var old = 'if(v.'+p[0]+')'+p[1]+'=v.'+p[0];
  var rep = "if(v."+p[0]+"){"+p[1]+"=v."+p[0]+";localStorage.setItem('"+p[0]+"',JSON.stringify("+p[1]+"))}";
  if (h.includes(old)) {
    h = h.replace(old, rep);
    console.log('Step 4: '+p[0]+' sync + localStorage');
  }
});

fs.writeFileSync('public/index.html', h);
console.log('DONE - All changes saved');
