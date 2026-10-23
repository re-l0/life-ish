/* Life-ish 1.2: editable creator attributes, money starts, bank and dashboard refinements. */
(() => {
'use strict';
const app=document.getElementById('app');
if(!app || typeof Engine==='undefined')return;
const keys=['health','happiness','intelligence','looks'];
const names=['Health','Happiness','Intelligence','Looks'];
const faces=[['💀','🤒','🤕','💪','❤️','🦾'],['😭','😢','😐','🙂','😄','🤩'],['🪨','😵‍💫','🤔','📚','🧠','🧠'],['👹','😬','🙂','😎','✨','🔥']];
const zodiac={Aries:'♈',Taurus:'♉',Gemini:'♊',Cancer:'♋',Leo:'♌',Virgo:'♍',Libra:'♎',Scorpio:'♏',Sagittarius:'♐',Capricorn:'♑',Aquarius:'♒',Pisces:'♓'};
const baseline={health:86,happiness:74,intelligence:56,looks:50};
const clamp=v=>Math.max(0,Math.min(100,Math.round(Number(v)||0)));
const hue=v=>v<=50?v*1.02:v<=80?51+(v-50)*1.94:109+(v-80)*1.35;
const step=v=>v===100?5:v>=81?4:v>=61?3:v>=41?2:v>=21?1:0;
const fmt=n=>Engine.money(Number(n)||0);
const closeSvg='×';
let edited={...baseline},draft={...baseline},editor=null,bank=null,focusFrom=null;
const baseStart=Engine.start;
Engine.start=function(input){
  const form=document.getElementById('create-form');
  const million=form&&form.dataset.startMode==='million';
  const ok=baseStart(input);
  if(ok&&Engine.state.character){
    const c=Engine.state.character;
    keys.forEach(k=>c.stats[k]=clamp(edited[k]));
    c.startingMoney=million?1000000:0;
    c.money=c.startingMoney;
    try{localStorage.setItem('mortal-life-mvp-v1',JSON.stringify(Engine.state));}catch(e){}
  }
  return ok;
};
function creator(){
  const form=app.querySelector('.creator-shell #create-form');
  if(!form||form.querySelector('.life-edit-buttons'))return;
  edited={...baseline};
  const controls=document.createElement('div');
  controls.className='life-edit-buttons';
  controls.innerHTML='<button type="button" class="life-edit-option" disabled aria-label="Edit your appearance — coming soon"><span>🎭</span><span>Edit your appearance<small>Coming soon</small></span></button><button type="button" class="life-edit-option" data-life-click="edit"><span>🎚️</span><span>Edit your attributes</span><b aria-hidden="true">›</b></button>';
  form.querySelector('.birth-row')?.insertAdjacentElement('afterend',controls);
  const normal=form.querySelector('.create-button');
  if(!normal)return;
  normal.dataset.lifeMoney='normal';
  const rich=document.createElement('button');
  rich.type='submit';rich.className='primary-button create-button life-rich-button';
  rich.dataset.action='begin-life';rich.dataset.lifeMoney='million';
  rich.innerHTML='<span>Begin life with $1,000,000</span><span class="button-icon" aria-hidden="true">↗</span>';
  normal.insertAdjacentElement('afterend',rich);
  const refresh=()=>rich.classList.toggle('is-ready',!!form.querySelector('[data-character-field="first"]')?.value.trim()&&!!form.querySelector('[data-character-field="last"]')?.value.trim());
  form.addEventListener('input',refresh);refresh();
}
function makeSlider(k,i){
 const v=clamp(draft[k]),h=hue(v);
 return '<div class="life-slider-row" data-life-stat="'+k+'"><label for="life-slider-'+k+'"><span class="life-slider-face">'+faces[i][step(v)]+'</span><span>'+names[i]+'</span><output class="'+(v===100?'life-perfect':'')+'" style="--h:'+h+'">'+v+'</output></label><input id="life-slider-'+k+'" type="range" min="0" max="100" value="'+v+'" style="--fill:'+v+'%;--tint:hsl('+h+' 90% 50%)" aria-label="'+names[i]+'"></div>';
}
function newDialog(html,type){
 const el=document.createElement('div');el.className='life-special-overlay';el.dataset.dialog=type;el.innerHTML=html;
 document.body.appendChild(el);document.body.classList.add('life-special-open');
 el.querySelector('.life-special-close')?.focus({preventScroll:true});
 return el;
}
function closeDialog(type,save){
 const el=type==='editor'?editor:bank;if(!el)return;
 if(type==='editor'){if(save)edited={...draft};editor=null;}else bank=null;
 el.remove();document.body.classList.remove('life-special-open');
 focusFrom?.focus?.({preventScroll:true});focusFrom=null;
}
function edit(){
 if(editor)return;draft={...edited};focusFrom=document.activeElement;
 editor=newDialog('<section class="life-special-dialog" role="dialog" aria-modal="true" aria-labelledby="life-editor-title"><div class="life-special-head"><h2 id="life-editor-title">Edit your attributes</h2><button type="button" class="life-special-close" data-life-click="editor-close" aria-label="Close">×</button></div><div class="life-slider-list">'+keys.map(makeSlider).join('')+'</div><button type="button" class="life-special-save" data-life-click="editor-save">Save attributes <span>✓</span></button></section>','editor');
}
function ledger(){
 const history=Engine.state.history||[];let earned=0,spent=0;
 history.forEach(x=>{let d=Number(x.effects?.money)||0;if(d>0)earned+=d;else spent-=d;});
 return {earned,spent};
}
function showBank(){
 const c=Engine.state.character;if(bank||!c)return;
 focusFrom=document.activeElement;
 const t=ledger();const start=Number(c.startingMoney)||0;
 bank=newDialog('<section class="life-special-dialog life-bank-dialog" role="dialog" aria-modal="true" aria-labelledby="life-bank-title"><div class="life-special-head"><h2 id="life-bank-title">Bank balance</h2><button type="button" class="life-special-close" data-life-click="bank-close" aria-label="Close">×</button></div><div class="life-bank-total"><span>💸</span><strong>'+fmt(c.money)+'</strong><small>Current balance</small></div><div class="life-bank-rows"><div><span>Starting funds</span><b>'+fmt(start)+'</b></div><div><span>Total earned</span><b class="plus">+'+fmt(t.earned)+'</b></div><div><span>Total spent</span><b class="minus">−'+fmt(t.spent)+'</b></div><div><span>Net change</span><b>'+fmt(t.earned-t.spent)+'</b></div></div><p class="life-bank-note">Totals include money earned and spent in life events.</p></section>','bank');
}
function statInput(input){
 const row=input.closest('.life-slider-row'),k=row?.dataset.lifeStat,i=keys.indexOf(k);
 if(i<0)return;
 const v=clamp(input.value);draft[k]=v;
 row.querySelector('.life-slider-face').textContent=faces[i][step(v)];
 const out=row.querySelector('output');out.textContent=v;out.classList.toggle('life-perfect',v===100);out.style.setProperty('--h',hue(v));
 input.style.setProperty('--fill',v+'%');input.style.setProperty('--tint','hsl('+hue(v)+' 90% 50%)');
}
function dashboard(){
 const shell=app.querySelector('.dashboard-shell'),c=Engine.state.character;
 if(!shell||!c)return;
 const name=shell.querySelector('.profile-name-button');
 if(name){name.dataset.gender=c.gender;name.setAttribute('aria-label','View '+Engine.fullName(c)+' information');}
 const portrait=shell.querySelector('.profile-person .avatar-wrap');
 if(portrait){portrait.classList.add('life-avatar-button');portrait.tabIndex=0;portrait.setAttribute('role','button');portrait.setAttribute('aria-label','View character information');}
 const balance=shell.querySelector('.balance-box');
 if(balance){balance.dataset.lifeClick='bank-open';balance.tabIndex=0;balance.setAttribute('role','button');balance.setAttribute('aria-label','View bank balance details');}
 const status=balance?.querySelector('.balance-label');
 if(status&&c.money>=1000000){status.textContent=c.money>=2000000?'Millionaire':'Millionaire?';status.className='balance-label balance-status life-money-status';}
 const intro=shell.querySelector('.timeline-item .timeline-story');
 if(intro&&!intro.querySelector('.life-zodiac')){
  const sign=Engine.zodiac(c.birthday), symbol=zodiac[sign];
  if(symbol){const needle="I'm a "+sign+".";if(intro.innerHTML.includes(needle))intro.innerHTML=intro.innerHTML.replace(needle,"I'm a "+sign+' <span class="life-zodiac" aria-label="'+sign+' zodiac symbol">'+symbol+'</span>.');}
 }
}
function menus(){
 const dialog=app.querySelector('.menu-dialog');
 if(dialog)dialog.querySelectorAll('.life-menu-link .life-menu-icon').forEach((el,i)=>el.textContent=['🌱','⬇️','👥','🪦'][i]||'');
 const planned=app.querySelector('.confirm-dialog #planned-heading');
 if(planned){
   planned.textContent=planned.textContent.replace(/^Career are/,'Careers are');
   const box=planned.closest('.confirm-dialog');
   box?.querySelector('.dialog-breadcrumb')?.remove();
   box?.querySelector('p')?.remove();
   const back=box?.querySelector('button.primary-button[data-action="close-modal"]');
   if(back)back.innerHTML='Back to life <span aria-hidden="true">→</span>';
 }
}
function update(){creator();dashboard();menus();}
new MutationObserver(changes=>{if(changes.some(x=>x.target===app))update();}).observe(app,{childList:true});
document.addEventListener('click',event=>{
 const el=event.target;if(!(el instanceof Element))return;
 const begin=el.closest('#create-form [data-action="begin-life"]');
 if(begin)begin.closest('form').dataset.startMode=begin.dataset.lifeMoney==='million'?'million':'normal';
 const act=el.closest('[data-life-click]');
 if(act){
   const what=act.dataset.lifeClick;
   if(what==='edit'||what==='editor-close'||what==='editor-save'||what==='bank-open'||what==='bank-close'){
     event.preventDefault();event.stopPropagation();
     if(what==='edit')edit();
     else if(what==='editor-close')closeDialog('editor',false);
     else if(what==='editor-save')closeDialog('editor',true);
     else if(what==='bank-open')showBank();
     else closeDialog('bank');
     return;
   }
 }
 if(el===editor)closeDialog('editor');if(el===bank)closeDialog('bank');
 if(el.closest('.dashboard-shell .life-avatar-button')){
   event.stopPropagation();
   app.querySelector('.profile-name-button')?.click();
 }
},true);
document.addEventListener('input',event=>{
 if(event.target instanceof HTMLInputElement && event.target.matches('.life-slider-row input[type="range"]'))statInput(event.target);
});
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&(editor||bank)){
   event.stopImmediatePropagation();
   if(editor)closeDialog('editor');else closeDialog('bank');
 }
 if((event.key==='Enter'||event.key===' ')&&event.target instanceof Element&&event.target.matches('.dashboard-shell .balance-box,.dashboard-shell .life-avatar-button')){
   event.preventDefault();event.target.click();
 }
},true);
update();
})();