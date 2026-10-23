/* Life-ish 1.0: presentation-only dashboard update. The game engine remains intact. */
(() => {
  'use strict';
  const app = document.getElementById('app');
  if (!app) return;
  const escapeHtml = s => String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const getCharacter = () => (typeof Engine !== 'undefined' && Engine.state && Engine.state.character) || null;
  const ageLabel = age => age === 1 ? 'year old' : 'years old';
  function chapter(age){
    const phases = ['A new beginning','First impressions','Finding your feet','Little discoveries','The curious years','Growing up','Learning the ropes','New horizons','A world of possibilities','Finding your voice','Big questions','Changes ahead','Almost a teenager','A new chapter','Finding yourself','Coming into your own','Trying everything','On the edge of adulthood','Turning the page','Finding your way'];
    if(age < phases.length) return phases[age];
    if(age < 25) return 'Early adulthood';
    if(age < 35) return 'Making your mark';
    if(age < 45) return 'Life in motion';
    if(age < 55) return 'A new perspective';
    if(age < 65) return 'The next chapter';
    if(age < 80) return 'Golden years';
    if(age < 95) return 'Living your legacy';
    return 'A remarkable journey';
  }
  function occupation(age){
    if(age < 4) return ['🧸','Toddler'];
    if(age < 13) return ['🧩','Child'];
    if(age < 18) return ['📚','Student'];
    return ['◇','Occupation not set'];
  }
  function financialStatus(amount){
    if(amount <= 0) return ['Broke','broke'];
    if(amount < 250) return ['Low funds','low'];
    if(amount < 2500) return ['Getting by','modest'];
    if(amount < 25000) return ['Comfortable','comfortable'];
    if(amount < 200000) return ['Well-off','welloff'];
    return ['Wealthy','wealthy'];
  }
  function patchProfile(shell, c){
    const h = shell.querySelector('.profile-identity h1');
    if(h && !h.querySelector('.profile-name-button')) {
      const name=h.textContent||'';
      h.innerHTML = `<button type="button" class="profile-name-button" data-action="dossier" title="View character information">${escapeHtml(name)}</button>`;
    }
    const badge=shell.querySelector('.profile-badges');
    if(badge){const [symbol,job]=occupation(c.age); badge.innerHTML=`<span class="occupation-icon" aria-hidden="true">${symbol}</span><span class="occupation-name">${escapeHtml(job)}</span>`;}
    const label=shell.querySelector('.balance-label');
    if(label){const [title,cls]=financialStatus(c.money);label.className='balance-label balance-status '+cls;label.textContent=title;}
  }
  function patchTimeline(shell,c){
    const label=shell.querySelector('.life-age-label');
    if(label)label.remove();
    const years=shell.querySelector('.life-age-years');
    if(years) years.textContent=ageLabel(c.age);
    const chapterName=shell.querySelector('.life-chapter-subtitle');
    if(chapterName)chapterName.textContent=chapter(c.age);
    shell.querySelector('.life-log-heading')?.remove();
    shell.querySelector('.timeline-footer-hint')?.remove();
    shell.querySelectorAll('.timeline-item').forEach(item=>{
      const node=item.querySelector('.event-age');
      if(node){const age=Number((node.textContent||'').replace(/[^0-9]/g,''));node.textContent=`${age} ${age === 1 ? 'year' : 'years'}`;}
      item.querySelector('.timeline-event h3')?.remove();
      item.querySelector('.entry-choice')?.remove();
      item.querySelector('.timeline-marker')?.remove();
    });
  }
  function patchDock(shell){
    const first=shell.querySelector('.bottom-dock .dock-item');
    if(first){
      first.dataset.action='planned';first.dataset.section='Career';first.setAttribute('aria-label','Career — coming soon');
      first.innerHTML='<svg class="icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/></svg><span>Career</span>';
    }
    const ageButton=shell.querySelector('.age-button');
    if(ageButton){ageButton.setAttribute('aria-label','Age up one year'); ageButton.innerHTML='<span class="age-art" aria-hidden="true"></span>';}
  }
  function patchStats(shell){
    shell.querySelector('.hud-stats-head')?.remove();
    const emoji={Health:'❤️',Happiness:'😊',Intelligence:'🧠',Reputation:'✨'};
    shell.querySelectorAll('.stat-row').forEach(row=>{
      const label=row.querySelector('.stat-label');
      if(label){let title=label.textContent.trim();label.innerHTML=`<span class="stat-emoji" aria-hidden="true">${emoji[title]||'◇'}</span><span>${escapeHtml(title)}</span>`;}
      const bar=row.querySelector('.progress-fill');
      const track=row.querySelector('.progress-track');
      const raw=track?.getAttribute('aria-valuenow');
      const val=Math.min(100,Math.max(0,Number(raw)||0));
      // 0 => red; 50 => yellow; 100 => green.
      const hue=Math.round(123*val/100);
      const pale=Math.min(92,hue+17);
      if(bar){bar.style.background=`linear-gradient(90deg,hsl(${hue} 77% 34%),hsl(${hue} 80% 48%) 55%,hsl(${pale} 84% 55%))`;bar.style.boxShadow=`0 0 12px hsla(${hue},84%,51%,.30)`;}
    });
  }
  function patchMenu(shell){
    const dialog=shell.querySelector('.menu-dialog');
    if(!dialog) return;
    dialog.innerHTML = `<div class="life-menu-head"><h2 id="menu-heading">Lives</h2><button type="button" class="dialog-close" data-action="close-modal" aria-label="Close menu"><svg width="21" height="21" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19"/></svg></button></div><div class="life-menu-section" aria-label="Lives"><button type="button" class="life-menu-link" data-action="restart"><span class="life-menu-icon">＋</span><span>Start a New Life</span><span class="life-menu-chevron">›</span></button><button type="button" class="life-menu-link" disabled aria-label="Save Life — coming soon"><span class="life-menu-icon">⇩</span><span>Save Life</span><small>Coming soon</small></button><button type="button" class="life-menu-link" disabled aria-label="Lives in Progress — coming soon"><span class="life-menu-icon">◷</span><span>Lives in Progress</span><small>Coming soon</small></button><button type="button" class="life-menu-link" disabled aria-label="Cemetery — coming soon"><span class="life-menu-icon">✧</span><span>Cemetery</span><small>Coming soon</small></button></div>`;
  }
  function update(){
    const shell=app.querySelector('.dashboard-shell');
    const c=getCharacter();
    if(shell){
      shell.querySelector('.top-edition')?.remove();
      if(c){patchProfile(shell,c);patchTimeline(shell,c);patchDock(shell);patchStats(shell);}
    }
    const dialog=app.querySelector('.menu-dialog');if(dialog)patchMenu(app);
  }
  // Original game renders into #app. This observer applies the presentation
  // on each render, without touching the state engine or stored save data.
  new MutationObserver(mutations=>{
    if(mutations.some(m=>m.target===app))update();
  }).observe(app,{childList:true});
  update();
  // Mirror creator's 3D tilt interaction on the game header wordmark.
  document.addEventListener('pointermove', ev=>{
    if(ev.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const brand=ev.target instanceof Element&&ev.target.closest('.dashboard-shell .brand');
    if(!brand)return;
    const r=brand.getBoundingClientRect();
    brand.style.setProperty('--tilt-y',`${((ev.clientX-r.left)/r.width-.5)*17}deg`);
    brand.style.setProperty('--tilt-x',`${(.5-(ev.clientY-r.top)/r.height)*12}deg`);
  });
  document.addEventListener('pointerout',ev=>{
    const brand=ev.target instanceof Element&&ev.target.closest('.dashboard-shell .brand');
    if(brand&&!(ev.relatedTarget instanceof Node&&brand.contains(ev.relatedTarget))){
      brand.style.removeProperty('--tilt-x');brand.style.removeProperty('--tilt-y');
    }
  });
})();