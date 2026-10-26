const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('dist/index.html','utf8');
const href=html.match(/id="calendar" href="([^"]+)"/)[1].replaceAll('&amp;','&');
const source=fs.readFileSync('dist/calendar.js','utf8');
for(const [name,userAgent,platform,maxTouchPoints] of [
 ['Desktop','Mozilla/5.0 (Windows NT 10.0; Win64; x64)','Win32',0],
 ['Android','Mozilla/5.0 (Linux; Android 15) Chrome/130 Mobile','Linux armv8l',5],
 ['iPhone','Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)','iPhone',5],
 ['iPadOS','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)','MacIntel',5]
]){
 const elements=new Map();
 for(const id of ['calendar','calendar-picker','calendar-google','calendar-web','calendar-help','calendar-close','calendar-apple'])elements.set(id,{href:id==='calendar'?href:'',listeners:{},classes:new Set(),addEventListener(type,fn){this.listeners[type]=fn},removeAttribute(key){delete this[key]},classList:{add(value){elements.get(id).classes.add(value)}},showModal(){this.open=true},close(){this.open=false}});
 vm.runInNewContext(source,{document:{getElementById:id=>elements.get(id)},navigator:{userAgent,platform,maxTouchPoints},URL,encodeURIComponent});
 const link=elements.get('calendar-google').href;
 if(name==='Android'){
  assert.match(link,/^intent:\/\//);assert.match(link,/package=com.android.chrome;/);
  const fallback=decodeURIComponent(link.match(/S.browser_fallback_url=([^;]+);/)[1]);
  assert.equal(new URL(fallback).searchParams.get('dates'),'20261226T113000Z/20261226T123000Z');
  assert.equal(new URL(fallback).searchParams.get('location'),'Milagris Cathedral');
 }else assert.equal(new URL(link).searchParams.get('dates'),'20261226T113000Z/20261226T123000Z');
 if(name==='iPhone'||name==='iPadOS')assert(elements.get('calendar-apple').classes.has('recommended'));
 let prevented=false;elements.get('calendar').listeners.click({preventDefault(){prevented=true}});assert(prevented);assert(elements.get('calendar-picker').open);
 console.log(`${name}: routing, event fields, and picker passed`);
}
const ics=fs.readFileSync('dist/neves-lavina-wedding.ics','utf8');
assert(ics.includes('\r\n'));assert(!ics.startsWith('\uFEFF'));
assert.match(ics,/DTSTART:20261226T113000Z/);assert.match(ics,/DTEND:20261226T123000Z/);
assert.equal((ics.match(/BEGIN:VEVENT/g)||[]).length,1);
for(const line of ics.split('\r\n'))assert(Buffer.byteLength(line)<=75,`Overlong iCalendar line: ${line}`);
const config=JSON.parse(fs.readFileSync('vercel.json','utf8').replace(/^\uFEFF/,''));
assert(config.headers.some(x=>x.source==='/neves-lavina-wedding.ics'&&x.headers.some(h=>h.key==='Content-Type'&&h.value.startsWith('text/calendar'))));
console.log('Calendar file: CRLF, folding, UTC times, one event, and Vercel MIME headers passed');
