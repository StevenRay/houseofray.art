const viewer=document.querySelector('.event-lightbox');
const thumbnails=[...document.querySelectorAll('[data-photo-index]')];
if(viewer&&thumbnails.length){
 let current=0;
 const image=viewer.querySelector('img'),counter=viewer.querySelector('[aria-live]'),caption=viewer.querySelector('.event-lightbox-caption');
 const previous=viewer.querySelector('[data-previous]'),next=viewer.querySelector('[data-next]');
 function show(index){current=index;const source=thumbnails[index];image.src=source.dataset.src;image.alt=source.dataset.alt;counter.textContent=`${index+1} / ${thumbnails.length}`;caption.textContent=source.dataset.caption;previous.disabled=index===0;next.disabled=index===thumbnails.length-1;}
 thumbnails.forEach((button,index)=>button.addEventListener('click',()=>{show(index);viewer.showModal();}));
 previous.addEventListener('click',()=>{if(current>0)show(current-1)});next.addEventListener('click',()=>{if(current<thumbnails.length-1)show(current+1)});
 viewer.querySelector('.event-close').addEventListener('click',()=>viewer.close());
 viewer.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'&&current>0){event.preventDefault();show(current-1)}if(event.key==='ArrowRight'&&current<thumbnails.length-1){event.preventDefault();show(current+1)}});
 viewer.addEventListener('click',event=>{if(event.target===viewer){const box=viewer.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)viewer.close()}});
 viewer.addEventListener('close',()=>thumbnails[current].focus());
}
