const fs = require('fs');
let h = fs.readFileSync('public/index.html', 'utf8');
let steps = 0;
var dataKeys = ['m2_acc','m2_emps','m2_set','m2_att','m2_lvs','m2_pnd','m2_nots','m2_deds','m2_advs','m2_warns','m2_logs'];
function findEnd(s, start) {
  var c = 0;
  for (var i = start; i < s.length; i++) {
    if (s[i] === '{') c++;
    if (s[i] === '}') c--;
    if (c === 0) return i + 1;
  }
  return -1;
}

// Step 1: svLS - Firebase only, no localStorage
var i1 = h.indexOf('async function svLS(');
if (i1 !== -1) {
  var e1 = findEnd(h, h.indexOf('{', i1));
  var old1 = h.substring(i1, e1);
  if (old1.includes('localStorage')) {
    h = h.substring(0, i1) + "async function svLS(k,v){try{await firebase.database().ref('data/'+k).set(v)}catch(e){}}" + h.substring(e1);
    steps++;
    console.log('Step 1 OK: svLS = Firebase only');
  }
}

// Step 2: Remove localStorage from variable init
var c2 = 0;
dataKeys.forEach(function(key) {
  var p = new RegExp("JSON\\.parse\\(localStorage\\.getItem\\('" + key + "'\\)\\s*\\|\\|\\s*'([^']+)'\\)", 'g');
  h = h.replace(p, function(m, d) { c2++; return d; });
});
if (c2) { steps++; console.log('Step 2 OK: removed ' + c2 + ' localStorage reads'); }

// Step 3: syncAll -> loadAll (Firebase only)
var i3 = h.indexOf('async function syncAll(');
if (i3 !== -1) {
  var e3 = findEnd(h, h.indexOf('{', i3));
  var loadAll = "async function loadAll(){try{var d=await firebase.database().ref(\"data\").once(\"value\");var v=d.val();if(!v)return;"
  + "if(v.m2_acc)ACC=v.m2_acc;"
  + "if(v.m2_emps)EMPS=v.m2_emps;"
  + "if(v.m2_set)SET=v.m2_set;"
  + "if(v.m2_att)ATT=v.m2_att;"
  + "if(v.m2_lvs)LVS=v.m2_lvs;"
  + "if(v.m2_pnd)PND=v.m2_pnd;"
  + "if(v.m2_nots)NOTS=v.m2_nots;"
  + "if(v.m2_deds)DEDS=v.m2_deds;"
  + "if(v.m2_advs)ADVS=v.m2_advs;"
  + "if(v.m2_warns)WARNS=v.m2_warns;"
  + "if(v.m2_logs)LOGS=v.m2_logs;"
  + "}catch(e){}}";
  h = h.substring(0, i3) + loadAll + h.substring(e3);
  steps++;
  console.log('Step 3 OK: syncAll -> loadAll');
}

// Step 4: bootApp calls loadAll
if (h.includes('await syncAll()')) {
  h = h.replace('await syncAll()', 'await loadAll()');
  steps++;
  console.log('Step 4 OK: bootApp calls loadAll()');
}

// Step 5: Remove leftover localStorage.setItem for data keys
var b5 = h;
dataKeys.forEach(function(key) {
  h = h.replace(new RegExp(";?localStorage\\.setItem\\('" + key + "',JSON\\.stringify\\([^)]+\\)\\)", 'g'), '');
});
if (h !== b5) { steps++; console.log('Step 5 OK: cleaned leftover localStorage.setItem'); }

// Step 6: Remove leftover localStorage.getItem for data keys
var b6 = h;
dataKeys.forEach(function(key) {
  h = h.replace(new RegExp(";?localStorage\\.getItem\\('" + key + "'\\)", 'g'), '');
});
if (h !== b6) { steps++; console.log('Step 6 OK: cleaned leftover localStorage.getItem'); }

// Final check
console.log('\n--- Check ---');
dataKeys.forEach(function(key) {
  if (h.includes("localStorage") && h.includes("'" + key + "'")) {
    console.log('WARN: ' + key + ' may still use localStorage');
  }
});
console.log('No warnings = all clean');

fs.writeFileSync('public/index.html', h);
console.log('\nDONE: ' + steps + ' steps. Firebase ONLY - no more localStorage for data.');
