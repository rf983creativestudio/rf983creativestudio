document.addEventListener("DOMContentLoaded",()=>{const menu=document.querySelector(".menu");const nav=document.querySelector(".nav");if(menu&&nav){menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.textContent=open?"×":"☰"});nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.textContent="☰"}))}document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());const filters=document.querySelectorAll("[data-filter]");const cards=document.querySelectorAll(".concept-card[data-category]");if(filters.length&&cards.length){filters.forEach(button=>button.addEventListener("click",()=>{const selected=button.dataset.filter;filters.forEach(item=>{const active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-pressed",String(active))});cards.forEach(card=>{card.hidden=selected!=="all"&&card.dataset.category!==selected})}))}const form=document.querySelector("[data-enquiry]");if(form){form.addEventListener("submit",async event=>{event.preventDefault();if(!form.reportValidity())return;const status=form.querySelector("[data-status]");const submit=form.querySelector("[data-submit]");if(status)status.textContent="Sending your enquiry…";if(submit){submit.disabled=true;submit.textContent="Sending…"}try{const payload=Object.fromEntries(new FormData(form).entries());const response=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)});const result=await response.json();if(!response.ok||!result.success)throw new Error(result.message||"The enquiry could not be sent.");if(status)status.textContent="Thank you — your project enquiry has been sent successfully. We’ll be in touch.";form.reset()}catch(error){if(status)status.textContent=error.message||"Something went wrong. Please try again in a moment."; }finally{if(submit){submit.disabled=false;submit.textContent="Send project enquiry ↗"}}})}});
/* RF983 Creative Playground 2.0 */
document.addEventListener("DOMContentLoaded",()=>{
 const canvas=document.querySelector("#pg-canvas");
 if(!canvas)return;
 const title=document.querySelector("#pg-title"),subtitle=document.querySelector("#pg-subtitle"),outTitle=document.querySelector("#pg-out-title"),outSubtitle=document.querySelector("#pg-out-subtitle"),status=document.querySelector("#pg-status");
 const bgInput=document.querySelector("#pg-bg-color"),accentInput=document.querySelector("#pg-accent-color");
 const palettes={
  gold:{bg:"#0b1026",accent:"#d4af37",light:"#ead8b6"},
  electric:{bg:"#17123b",accent:"#ff5ca8",light:"#b9fff4"},
  earth:{bg:"#243b32",accent:"#d58a54",light:"#e8d9b9"},
  sunset:{bg:"#3b1838",accent:"#ff795e",light:"#ffc96b"},
  ice:{bg:"#102c43",accent:"#62b9e8",light:"#d5f1f3"}
 };
 let palette="gold",type="editorial",texture="orbit",layout="editorial";
 const sync=()=>{outTitle.textContent=title.value.trim()||"Your idea here.";outSubtitle.textContent=subtitle.value.trim()||"Add a line to bring your idea to life.";};
 const hexOK=value=>/^#[0-9a-f]{6}$/i.test(value);
 const applyColours=()=>{const p=palettes[palette];canvas.style.setProperty("--bg",bgInput.value);canvas.style.setProperty("--accent",accentInput.value);canvas.style.setProperty("--light",p.light);};
 const setStatus=message=>{if(status)status.textContent=message;};
 const setPalette=name=>{
  if(!palettes[name])return;palette=name;
  document.querySelectorAll("[data-palette]").forEach(btn=>{const active=btn.dataset.palette===name;btn.classList.toggle("active",active);btn.setAttribute("aria-pressed",String(active));});
  bgInput.value=palettes[name].bg;accentInput.value=palettes[name].accent;applyColours();setStatus("Colour mood updated. Make it your own with the custom colour controls.");
 };
 title.addEventListener("input",sync);subtitle.addEventListener("input",sync);
 document.querySelectorAll("[data-palette]").forEach(btn=>btn.addEventListener("click",()=>setPalette(btn.dataset.palette)));
 document.querySelectorAll("[data-type]").forEach(btn=>btn.addEventListener("click",()=>{
  type=btn.dataset.type;document.querySelectorAll("[data-type]").forEach(b=>{const active=b===btn;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});
  canvas.classList.remove("pg-editorial","pg-modern","pg-expressive");canvas.classList.add("pg-"+type);
 }));
 document.querySelectorAll("[data-texture]").forEach(btn=>btn.addEventListener("click",()=>{
  texture=btn.dataset.texture;document.querySelectorAll("[data-texture]").forEach(b=>{const active=b===btn;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});
  canvas.dataset.texture=texture;
 }));
 document.querySelectorAll("[data-layout]").forEach(btn=>btn.addEventListener("click",()=>{
  layout=btn.dataset.layout;document.querySelectorAll("[data-layout]").forEach(b=>{const active=b===btn;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});
  canvas.classList.toggle("pg-layout-centered",layout==="centered");
 }));
 [bgInput,accentInput].forEach(input=>input.addEventListener("input",()=>{
  if(hexOK(input.value)){applyColours();setStatus("Custom colours applied to your live canvas.");}
 }));
 document.querySelector("#pg-copy").addEventListener("click",async()=>{
  const summary="RF983 CREATIVE DIRECTION\nHeadline: "+(title.value.trim()||"Your idea here.")+"\nSupporting line: "+(subtitle.value.trim()||"Not set")+"\nBackground: "+bgInput.value+"\nAccent: "+accentInput.value+"\nTypography: "+type+"\nLayout: "+layout+"\nTexture: "+texture;
  try{await navigator.clipboard.writeText(summary);setStatus("Copied! Your creative direction is ready to share.");}
  catch(e){setStatus("Clipboard access is unavailable here. Your settings remain visible above; copy them manually.");}
 });
 document.querySelector("#pg-reset").addEventListener("click",()=>{
  title.value="Ideas take shape.";subtitle.value="A space to explore what could be.";sync();setPalette("gold");
  type="editorial";document.querySelectorAll("[data-type]").forEach(b=>{const active=b.dataset.type===type;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});
  canvas.classList.remove("pg-modern","pg-expressive","pg-layout-centered");canvas.classList.add("pg-editorial");
  texture="orbit";document.querySelectorAll("[data-texture]").forEach(b=>{const active=b.dataset.texture===texture;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});canvas.dataset.texture=texture;
  layout="editorial";document.querySelectorAll("[data-layout]").forEach(b=>{const active=b.dataset.layout===layout;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});
  setStatus("Experiment reset to the RF983 signature direction.");
 });
 document.querySelector("#pg-export").addEventListener("click",async()=>{
  const button=document.querySelector("#pg-export");button.disabled=true;button.textContent="Preparing PNG…";
  try{
   if(document.fonts?.ready)await document.fonts.ready;
   const w=1200,h=1500,scale=1,cnv=document.createElement("canvas");cnv.width=w*scale;cnv.height=h*scale;
   const ctx=cnv.getContext("2d"),bg=bgInput.value,accent=accentInput.value,light=palettes[palette].light;
   ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
   const glow=ctx.createRadialGradient(930,390,30,930,390,640);glow.addColorStop(0,accent+"55");glow.addColorStop(1,bg+"00");ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
   ctx.strokeStyle=accent;ctx.lineWidth=2;
   if(texture==="grid"){for(let x=0;x<w;x+=48){ctx.globalAlpha=.13;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}for(let y=0;y<h;y+=48){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}}
   if(texture==="orbit"||texture==="grain"){ctx.globalAlpha=.45;[280,390,500].forEach((r,i)=>{ctx.beginPath();ctx.arc(930,430,r,0,Math.PI*2);ctx.stroke();});}
   if(texture==="grain"){let seed=19;ctx.fillStyle=light;ctx.globalAlpha=.14;for(let i=0;i<1600;i++){seed=(seed*9301+49297)%233280;const x=seed/233280*w;seed=(seed*9301+49297)%233280;const y=seed/233280*h;ctx.fillRect(x,y,2,2);}}
   ctx.globalAlpha=1;ctx.fillStyle=accent;ctx.font="italic 46px Georgia";ctx.fillText("RF983",88,115);
   ctx.fillStyle=accent;ctx.font="500 17px Arial";ctx.letterSpacing="5px";ctx.fillText("A CREATIVE STUDY",90,610);
   const heading=title.value.trim()||"Your idea here.",words=heading.split(/\s+/);let lines=[],line="";
   ctx.fillStyle=light;ctx.font=(type==="editorial"?"500 100px Georgia":type==="expressive"?"900 94px Arial":"700 88px Arial");
   const max=layout==="centered"?980:900;
   words.forEach(word=>{const test=line?line+" "+word:word;if(ctx.measureText(test).width>max&&line){lines.push(line);line=word;}else line=test;});if(line)lines.push(line);
   if(lines.length>4)lines=lines.slice(0,4);
   let y=layout==="centered"?760:790;ctx.textAlign=layout==="centered"?"center":"left";
   lines.forEach(text=>{ctx.fillText(text,layout==="centered"?w/2:90,y);y+=112;});
   ctx.fillStyle=light;ctx.globalAlpha=.85;ctx.font="26px Arial";ctx.textAlign=layout==="centered"?"center":"left";
   const support=subtitle.value.trim()||"Add a line to bring your idea to life.";const wrap=(str,maxWidth)=>{const arr=[];let l="";str.split(/\s+/).forEach(word=>{const test=l?l+" "+word:word;if(ctx.measureText(test).width>maxWidth&&l){arr.push(l);l=word;}else l=test;});if(l)arr.push(l);return arr.slice(0,3);};
   wrap(support,layout==="centered"?850:700).forEach((text,i)=>ctx.fillText(text,layout==="centered"?w/2:90,y+30+i*40));
   ctx.globalAlpha=1;ctx.strokeStyle=accent;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(90,1370);ctx.lineTo(1110,1370);ctx.stroke();
   ctx.fillStyle=light;ctx.font="16px Arial";ctx.textAlign="left";ctx.fillText("CREATIVITY. TECHNOLOGY. IMPACT.",90,1415);ctx.textAlign="right";ctx.fillText("RF983 / EXPERIMENT",1110,1415);
   const blob=await new Promise(resolve=>cnv.toBlob(resolve,"image/png"));
   if(blob){const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="rf983-creative-direction.png";a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);}
   else{const a=document.createElement("a");a.href=cnv.toDataURL("image/png");a.download="rf983-creative-direction.png";a.click();}
   setStatus("Your PNG export is ready. The design was generated in your browser.");
  }catch(error){setStatus("PNG export could not be created in this browser. Your live canvas is still available.");}
  finally{button.disabled=false;button.textContent="Export design as PNG ↓";}
 });
 sync();setPalette("gold");canvas.dataset.texture="orbit";
});
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


/* RF983 project enquiry completeness indicator */
document.addEventListener("DOMContentLoaded",()=>{
 const form=document.querySelector("[data-enquiry]");
 if(!form)return;
 const bar=form.querySelector("[data-progress-bar]"),label=form.querySelector("[data-progress-label]");
 const required=[...form.querySelectorAll("input[required],select[required],textarea[required]")];
 const update=()=>{
  const complete=required.filter(field=>field.type==="checkbox"?field.checked:field.value.trim()!=="").length;
  const percent=Math.round(complete/Math.max(required.length,1)*100);
  if(bar)bar.value=percent;if(label)label.textContent=percent+"% complete";
 };
 form.addEventListener("input",update);form.addEventListener("change",update);update();
});
