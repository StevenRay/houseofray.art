const track=document.querySelector('.hero-track');
const background=document.querySelector('.floral-layer');
const portrait=document.querySelector('.portrait-layer');
const title=document.querySelector('.hero-type');
const motionButton=document.querySelector('.motion-toggle');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;
let queued=false;
function render(){
 queued=false;
 const range=Math.max(1,track.offsetHeight-innerHeight);
 const distance=Math.max(0,Math.min(range,-track.getBoundingClientRect().top));
 const progress=paused?0:distance/range;
 const mobile=innerWidth<=600;
 background.style.transform=`translate3d(0,${-progress*35}px,0)`;
 portrait.style.transform=`translate3d(-50%,${-progress*(mobile?85:150)}px,0)`;
 title.style.transform=`translate3d(0,${-progress*65}px,0)`;
}
function queue(){if(!queued){queued=true;requestAnimationFrame(render);}}
function syncMotion(){document.body.classList.toggle('motion-paused',paused);motionButton.setAttribute('aria-pressed',String(paused));motionButton.textContent=paused?'Enable motion':'Pause motion';queue();}
motionButton.addEventListener('click',()=>{paused=!paused;syncMotion();});
reduced.addEventListener('change',()=>{paused=reduced.matches;syncMotion();});
addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});
syncMotion();
document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.dialog).showModal()));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});});
