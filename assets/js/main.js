document.addEventListener("DOMContentLoaded",()=>{const menu=document.querySelector(".menu");const nav=document.querySelector(".nav");if(menu&&nav){menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.textContent=open?"×":"☰"});nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.textContent="☰"}))}document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());const filters=document.querySelectorAll("[data-filter]");const cards=document.querySelectorAll(".concept-card[data-category]");if(filters.length&&cards.length){filters.forEach(button=>button.addEventListener("click",()=>{const selected=button.dataset.filter;filters.forEach(item=>{const active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-pressed",String(active))});cards.forEach(card=>{card.hidden=selected!=="all"&&card.dataset.category!==selected})}))}const form=document.querySelector("[data-enquiry]");if(form){form.addEventListener("submit",async event=>{event.preventDefault();if(!form.reportValidity())return;const status=form.querySelector("[data-status]");const submit=form.querySelector("[data-submit]");if(status)status.textContent="Sending your enquiry…";if(submit){submit.disabled=true;submit.textContent="Sending…"}try{const payload=Object.fromEntries(new FormData(form).entries());const response=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});const result=await response.json();if(!response.ok||!result.success)throw new Error(result.message||"The enquiry could not be sent.");if(status)status.textContent="Thank you — your project enquiry has been sent successfully. We’ll be in touch.";form.reset()}catch(error){if(status)status.textContent=error.message||"Something went wrong. Please try again in a moment."; }finally{if(submit){submit.disabled=false;submit.textContent="Send project enquiry ↗"}}})}});
/* Creative Playground interactions */
const pgCanvas=document.querySelector("#pg-canvas");
if(pgCanvas){const title=document.querySelector("#pg-title"),subtitle=document.querySelector("#pg-subtitle"),outTitle=document.querySelector("#pg-out-title"),outSubtitle=document.querySelector("#pg-out-subtitle"),status=document.querySelector("#pg-status");const sync=()=>{outTitle.textContent=title.value.trim()||"Your idea here.";outSubtitle.textContent=subtitle.value.trim()||"Add a line to bring your idea to life.";};title.addEventListener("input",sync);subtitle.addEventListener("input",sync);document.querySelectorAll("[data-palette]").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll("[data-palette]").forEach(b=>{b.classList.toggle("active",b===btn);b.setAttribute("aria-pressed",String(b===btn));});pgCanvas.classList.remove("pg-gold","pg-electric","pg-earth","pg-sunset","pg-ice");pgCanvas.classList.add("pg-"+btn.dataset.palette);}));document.querySelectorAll("[data-type]").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll("[data-type]").forEach(b=>{b.classList.toggle("active",b===btn);b.setAttribute("aria-pressed",String(b===btn));});pgCanvas.classList.remove("pg-editorial","pg-modern","pg-expressive");pgCanvas.classList.add("pg-"+btn.dataset.type);}));document.querySelector("#pg-copy").addEventListener("click",async()=>{const palette=document.querySelector("[data-palette].active").textContent.trim(),type=document.querySelector("[data-type].active").textContent.trim(),summary="RF983 Creative Direction\nHeadline: "+(title.value.trim()||"Your idea here.")+"\nSupporting line: "+(subtitle.value.trim()||"Not set")+"\nColour mood: "+palette+"\nTypography: "+type;try{await navigator.clipboard.writeText(summary);status.textContent="Copied! Your creative direction is ready to share.";}catch(e){status.textContent=summary+" — Clipboard unavailable; copy the details manually.";}});}


/* RF983 studio motion system: progressive enhancement + reduced-motion support */
document.addEventListener("DOMContentLoaded",()=>{
 const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const targets=document.querySelectorAll(".hero-text,.hero-visual,.intro-grid,.section-head,.service-card,.process-step,.statement .shell,.faq-list details,.portfolio-card,.page-hero .shell,.content>.notice,.case-section>.shell,.concept-case-hero .concept-case-grid,.concept-case-app,.pg-layout,.pg-bottom .shell,.closing");
 if(reduceMotion||!("IntersectionObserver" in window)){targets.forEach(el=>el.classList.add("motion-visible"));}
 else{
  targets.forEach((el,index)=>{el.classList.add("motion-reveal");if(el.matches(".service-card,.process-step,.portfolio-card,.faq-list details,.concept-case-app"))el.style.setProperty("--motion-delay",(index%5)*65+"ms");});
  const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("motion-visible");obs.unobserve(entry.target);}});},{threshold:.12,rootMargin:"0px 0px -35px 0px"});
  targets.forEach(el=>observer.observe(el));
 }
 if(!reduceMotion&&window.matchMedia("(pointer:fine)").matches){
  document.querySelectorAll(".service-card,.portfolio-card,.concept-case-app").forEach(card=>card.addEventListener("pointermove",event=>{const rect=card.getBoundingClientRect();card.style.setProperty("--pointer-x",(event.clientX-rect.left)+"px");card.style.setProperty("--pointer-y",(event.clientY-rect.top)+"px");}));
 }
});


/* RF983 immersive portfolio navigation */
document.addEventListener("DOMContentLoaded",()=>{
 const cards=[...document.querySelectorAll(".concept-card")];
 if(!cards.length||document.querySelector("#rf-project-preview"))return;
 const dialog=document.createElement("dialog");
 dialog.id="rf-project-preview";
 dialog.className="rf-preview";
 dialog.setAttribute("aria-labelledby","rf-preview-title");
 dialog.innerHTML='<div class="rf-preview-inner"><button class="rf-preview-close" type="button" aria-label="Close project preview">×</button><div class="rf-preview-art"></div><div class="rf-preview-copy"><p class="eyebrow">RF983 / CONCEPT PREVIEW <span class="rf-preview-count"></span></p><h2 id="rf-preview-title"></h2><p class="rf-preview-description"></p><div class="rf-preview-tags"></div><div class="rf-preview-actions"><button class="rf-preview-step rf-preview-prev" type="button">← Previous</button><button class="rf-preview-step rf-preview-next" type="button">Next →</button></div><a class="btn gold rf-preview-link" href="#">Explore full case study ↗</a><p class="rf-preview-note">Self-initiated concept study — not commissioned client work.</p></div></div>';
 document.body.append(dialog);
 const art=dialog.querySelector(".rf-preview-art"),title=dialog.querySelector("#rf-preview-title"),description=dialog.querySelector(".rf-preview-description"),tags=dialog.querySelector(".rf-preview-tags"),link=dialog.querySelector(".rf-preview-link"),count=dialog.querySelector(".rf-preview-count"),prev=dialog.querySelector(".rf-preview-prev"),next=dialog.querySelector(".rf-preview-next");
 let activeIndex=0,lastTrigger=null;
 function show(index){
  activeIndex=(index+cards.length)%cards.length;
  const card=cards[activeIndex],caseLink=card.querySelector(".case-link"),artwork=card.querySelector(".concept-art");
  art.replaceChildren(artwork?artwork.cloneNode(true):document.createElement("div"));
  title.textContent=card.querySelector("h3")?.textContent||"Project concept";
  description.textContent=card.querySelector(":scope > p")?.textContent||"Explore this creative direction.";
  tags.replaceChildren(...[...card.querySelectorAll(".tags span")].map(item=>{const tag=document.createElement("span");tag.textContent=item.textContent;return tag;}));
  count.textContent="· "+String(activeIndex+1).padStart(2,"0")+" / "+String(cards.length).padStart(2,"0");
  link.href=caseLink?.getAttribute("href")||"contact.html";
  link.textContent=caseLink?"Explore full case study ↗":"Discuss a project ↗";
  prev.disabled=activeIndex===0;next.disabled=activeIndex===cards.length-1;
  dialog.querySelector(".rf-preview-inner").classList.remove("rf-preview-changing");
  void dialog.offsetWidth;
  dialog.querySelector(".rf-preview-inner").classList.add("rf-preview-changing");
 }
 cards.forEach(card=>{
  const caseLink=card.querySelector(".case-link");
  const preview=document.createElement("button");
  preview.type="button";preview.className="rf-preview-trigger";preview.textContent="Quick preview ↗";
  preview.setAttribute("aria-label","Quick preview: "+(card.querySelector("h3")?.textContent||"project"));
  if(caseLink)caseLink.insertAdjacentElement("beforebegin",preview);else card.append(preview);
  preview.addEventListener("click",()=>{lastTrigger=preview;show(cards.indexOf(card));dialog.showModal();});
 });
 prev.addEventListener("click",()=>show(activeIndex-1));
 next.addEventListener("click",()=>show(activeIndex+1));
 dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
 dialog.addEventListener("close",()=>lastTrigger?.focus());
 dialog.addEventListener("keydown",event=>{
  if(event.key==="ArrowRight"&&!next.disabled){event.preventDefault();show(activeIndex+1);}
  if(event.key==="ArrowLeft"&&!prev.disabled){event.preventDefault();show(activeIndex-1);}
 });
 dialog.querySelector(".rf-preview-close").addEventListener("click",()=>dialog.close());
});
 
/* RF983 global interaction details */
document.addEventListener("DOMContentLoaded",()=>{
 if(!document.querySelector(".rf-scroll-progress")){
  const progress=document.createElement("div");progress.className="rf-scroll-progress";progress.setAttribute("aria-hidden","true");document.body.append(progress);
  const update=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform="scaleX("+(max>0?window.scrollY/max:0)+")";};
  window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);update();
 }
 if(!document.querySelector(".rf-back-top")){
  const top=document.createElement("button");top.className="rf-back-top";top.type="button";top.setAttribute("aria-label","Back to top");top.textContent="↑";document.body.append(top);
  const update=()=>top.classList.toggle("is-visible",window.scrollY>520);
  window.addEventListener("scroll",update,{passive:true});update();
  top.addEventListener("click",()=>window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));
 }
 const visual=document.querySelector(".hero-visual");
 if(visual&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&window.matchMedia("(pointer:fine)").matches){
  visual.addEventListener("pointermove",event=>{const r=visual.getBoundingClientRect();visual.style.setProperty("--hero-x",((event.clientX-r.left)/r.width-.5).toFixed(3));visual.style.setProperty("--hero-y",((event.clientY-r.top)/r.height-.5).toFixed(3));});
  visual.addEventListener("pointerleave",()=>{visual.style.setProperty("--hero-x","0");visual.style.setProperty("--hero-y","0");});
 }
});
