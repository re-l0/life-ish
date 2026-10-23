/* Life-ish 0.9: curated name pools and one-click character randomizer.
   Name choices represent common/recognizable names, not a precise ranking. */
(function(){
'use strict';
const POOLS={"United States":{"Male":["Liam","Noah","Oliver","Theodore","Henry","James","Elijah","Mateo","William","Lucas","Levi","Asher","Jackson","Sebastian","Ethan","Michael","Daniel","Alexander","Owen","Samuel","Jack","John","David","Joseph","Benjamin"],"Female":["Olivia","Charlotte","Emma","Amelia","Sophia","Mia","Isabella","Evelyn","Sofia","Eliana","Ava","Harper","Luna","Camila","Gianna","Elizabeth","Eleanor","Ella","Abigail","Emily","Scarlett","Grace","Lily","Aria","Chloe"],"surnames":["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin","Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson","Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores","Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts"]},"Canada":{"Male":["Noah","Theodore","Liam","Leo","William","Oliver","Lucas","James","Benjamin","Thomas","Jack","Henry","Ethan","Alexander","Logan","Jacob","Mason","Arthur","Félix","Émile","Gabriel","Nathan","Adam","Samuel","Hudson"],"Female":["Charlotte","Olivia","Emma","Sophia","Amelia","Sofia","Mia","Chloe","Lily","Ava","Alice","Éléonore","Léa","Rose","Juliette","Zoé","Florence","Emily","Isla","Grace","Ella","Nora","Mila","Elizabeth","Violet"],"surnames":["Smith","Brown","Tremblay","Martin","Roy","Gagnon","Lee","Wilson","Johnson","Taylor","White","Anderson","Thompson","Bouchard","Gauthier","Morin","Lavoie","Fortin","Gagné","Pelletier","Bélanger","Leblanc","Lévesque","Bergeron","Côté","Ouellet","Girard","Dubois","Fournier","Walker","Campbell","Young","Moore","Allen","Clark","Hill","Lewis","King","Wright","Scott","Mitchell","Roberts","Hall","Green","Baker","Singh","Patel","Nguyen","Chen","Wong"]},"Mexico":{"Male":["Santiago","Mateo","Sebastián","Leonardo","Matías","Emiliano","Diego","Miguel","Alejandro","Daniel","José","Luis","Juan","Carlos","Ángel","David","Gael","Francisco","Fernando","Rodrigo","Ricardo","Pablo","Eduardo","Andrés","Jesús"],"Female":["Sofía","Valentina","María","Ximena","Camila","Regina","Victoria","Renata","Natalia","Isabella","Guadalupe","Fernanda","Daniela","Ana","Mariana","Paola","Andrea","Alejandra","Jimena","Lucía","Emilia","Sara","Elena","Valeria","Gabriela"],"surnames":["Hernández","García","Martínez","López","González","Pérez","Rodríguez","Sánchez","Ramírez","Cruz","Flores","Gómez","Morales","Vázquez","Reyes","Jiménez","Torres","Díaz","Gutiérrez","Ruiz","Mendoza","Aguilar","Ortiz","Moreno","Castillo","Romero","Chávez","Ramos","Álvarez","Castro","Vargas","Medina","Rojas","Herrera","Silva","Rivera","Navarro","Molina","Salazar","Juárez","Delgado","Cárdenas","Guzmán","Valdez","Sandoval","Campos","Cervantes","Estrada","Robles","Fuentes"]}};
const CITIES={
"United States":["Chicago","Los Angeles","Miami","New York City","San Francisco"],
"Canada":["Montréal","Toronto","Vancouver"],
"Mexico":["Guadalajara","Mexico City","Monterrey"]
};
function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
function shuffle(array){
 const a=array.slice();
 for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
 return a;
}
// No city repeats within a complete 11-city cycle. Countries are interleaved
// where possible, and gender counts are balanced within each country.
let cityBag=[];
let lastLocation=null;
let lastFirst=null;
let lastSurname=null;
const gendersUsed=Object.fromEntries(Object.keys(POOLS).map(country=>[country,{Male:0,Female:0}]));
function nextLocation(){
 if(!cityBag.length) cityBag=shuffle(Object.entries(CITIES).flatMap(([country,cities])=>cities.map(city=>({country,city}))));
 const alternatives=cityBag.filter(p=>p.country!==lastLocation?.country && p.city!==lastLocation?.city);
 const cityAlternatives=cityBag.filter(p=>p.city!==lastLocation?.city);
 const pool=alternatives.length?alternatives:cityAlternatives.length?cityAlternatives:cityBag;
 // Favor countries with more cities still in the bag, so every country and
 // every city receives close to proportional exposure at any point in a cycle.
 const weights=pool.map(p=>cityBag.filter(x=>x.country===p.country).length);
 let n=Math.random()*weights.reduce((a,b)=>a+b,0), selected=pool[pool.length-1];
 for(let i=0;i<pool.length;i++){n-=weights[i];if(n<=0){selected=pool[i];break;}}
 cityBag.splice(cityBag.indexOf(selected),1);
 lastLocation=selected;
 return selected;
}
function chooseGender(country){
 const count=gendersUsed[country];
 let gender;
 if(count.Male<count.Female)gender='Male';
 else if(count.Female<count.Male)gender='Female';
 else gender=pick(['Male','Female']);
 count[gender]++;
 return gender;
}
function choosePlace(kind,value){
 const picker=document.querySelector('.creator-shell .place-picker[data-picker="'+kind+'"]');
 const choice=Array.from(picker?.querySelectorAll('.place-option')||[]).find(option=>option.dataset.value===value);
 if(!choice)throw new Error('Missing Life-ish '+kind+' option: '+value);
 choice.click();
}
function randomize(event){
 const form=document.getElementById('create-form');
 if(!form)return;
 const button=event.currentTarget;
 const {country,city}=nextLocation();
 const gender=chooseGender(country);
 const names=POOLS[country];
 const availableFirst=names[gender].filter(n=>n!==lastFirst);
 const availableLast=names.surnames.filter(n=>n!==lastSurname);
 const firstName=pick(availableFirst.length?availableFirst:names[gender]);
 const lastName=pick(availableLast.length?availableLast:names.surnames);
 lastFirst=firstName;lastSurname=lastName;
 const radio=form.querySelector('input[name="gender"][value="'+gender+'"]');
 if(radio){radio.checked=true;radio.dispatchEvent(new Event('change',{bubbles:true}));}
 choosePlace('country',country);
 choosePlace('city',city);
 for(const [key,value] of [['first',firstName],['last',lastName]]){
  const field=form.querySelector('[data-character-field="'+key+'"]');
  if(!field)continue;
  field.value=value;
  field.dispatchEvent(new Event('input',{bubbles:true}));
 }
 button.classList.remove('is-shuffling');
 void button.offsetWidth;
 button.classList.add('is-shuffling');
 button.focus({preventScroll:true});
}
function install(){
 const card=document.querySelector('.creator-shell .creator-card');
 if(!card||card.querySelector('.creator-shuffle'))return;
 const button=document.createElement('button');
 button.type='button';
 button.className='creator-shuffle';
 button.setAttribute('aria-label','Randomize gender, country, city and name');
 button.title='Randomize character';
 button.innerHTML='<span class="shuffle-glyph" aria-hidden="true">↻</span>';
 button.addEventListener('click',randomize);
 card.appendChild(button);
}
const app=document.getElementById('app');
if(app){install();new MutationObserver(install).observe(app,{childList:true});}
})();