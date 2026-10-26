const $=s=>document.querySelector(s);
// Quiet floating light on the stationery, followed by section reveals.
function addMotes(container,count){const layer=document.createElement('div');layer.className='motes';layer.setAttribute('aria-hidden','true');for(let i=0;i<count;i++){const mote=document.createElement('i');mote.style.setProperty('--x',`${(i*37+11)%100}%`);mote.style.setProperty('--duration',`${12+i%7}s`);mote.style.setProperty('--delay',`${-i*1.7}s`);layer.append(mote)}container.append(layer)}
addMotes($('#envelope'),24);addMotes($('.hero'),16);
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.12});document.querySelectorAll('.scripture>*,.save-date>h2,.save-date>.eyebrow,.save-date>p,.countdown-heading,.countdown,.celebration>h2,.celebration>.eyebrow,.celebration>.section-description,.timeline article,.venues>.section-intro,.venue,.closing>*').forEach(el=>{el.classList.add('reveal-on-scroll');observer.observe(el)})}
const openButton=$('#open-invitation');
openButton.addEventListener('click',()=>{
  openButton.disabled=true;
  window.scrollTo(0,0);
  document.body.classList.add('unsealing');
  $('#envelope').classList.add('opening');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(()=>{document.body.classList.remove('sealed');document.body.classList.add('invitation-open');},reduced?0:2700);
  setTimeout(()=>{$('#envelope').hidden=true;document.body.classList.remove('unsealing');$('.wordmark').focus({preventScroll:true});},reduced?0:4100);
},{once:true});
const weddingDate=new Date('2026-12-26T17:00:00+05:30');function tick(){const seconds=Math.max(0,Math.floor((weddingDate-Date.now())/1000));const values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];$('#countdown').innerHTML=values.map((v,i)=>`<div><b>${String(v).padStart(2,'0')}</b><span>${['Days','Hours','Minutes','Seconds'][i]}</span></div>`).join('')}tick();setInterval(tick,1000);

