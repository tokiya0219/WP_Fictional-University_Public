!function(e){function t(t){for(var s,r,o=t[0],l=t[1],c=t[2],d=0,h=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&h.push(a[r][0]),a[r]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);for(u&&u(t);h.length;)h.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],s=!0,o=1;o<n.length;o++){var l=n[o];0!==a[l]&&(s=!1)}s&&(i.splice(t--,1),e=r(r.s=n[0]))}return e}var s={},a={0:0},i=[];function r(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=s,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/wp-content/themes/fictional-university-theme/bundled-assets/";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var u=l;i.push([2,1]),n()}([,function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(1);var s=class{constructor(){this.menu=document.querySelector(".site-header__menu"),this.openButton=document.querySelector(".site-header__menu-trigger"),this.events()}events(){this.openButton.addEventListener("click",()=>this.openMenu())}openMenu(){this.openButton.classList.toggle("fa-bars"),this.openButton.classList.toggle("fa-window-close"),this.menu.classList.toggle("site-header__menu--active")}},a=n(0);var i=class{constructor(){if(document.querySelector(".hero-slider")){const e=document.querySelectorAll(".hero-slider__slide").length;let t="";for(let n=0;n<e;n++)t+=`<button class="slider__bullet glide__bullet" data-glide-dir="=${n}"></button>`;document.querySelector(".glide__bullets").insertAdjacentHTML("beforeend",t),new a.a(".hero-slider",{type:"carousel",perView:1,autoplay:3e3}).mount()}}};var r=class{constructor(){this.addSearchHTML(),this.resultsDiv=document.getElementById("search-overlay__results"),this.searchButton=document.querySelector(".search-trigger"),this.closeButton=document.querySelector(".search-overlay__close"),this.searchOverlay=document.querySelector(".search-overlay"),this.searchField=document.getElementById("search-term"),this.isTyping=!1,this.preValue,this.isSpinnerVisible=!1,this.isOverlayOpen=!1,this.typingTimer,this.events()}events(){this.searchButton.addEventListener("click",()=>this.openOverlay()),this.closeButton.addEventListener("click",()=>this.closeOverlay()),document.body.addEventListener("keyup",e=>this.keyPressDispatcher(e)),this.searchField.addEventListener("keyup",()=>this.typingLogic())}typingLogic(){this.searchField.value!=this.preValue&&(clearTimeout(this.typingTimer),this.searchField.value?(this.isSpinnerVisible||(this.resultsDiv.innerHTML='<div class="spinner-loader"></div>',this.isSpinnerVisible=!0),this.typingTimer=setTimeout(()=>this.getResults(),750),this.isSpinnerVisible=!1):this.resultsDiv.innerHTML=""),this.preValue=this.searchField.value}async getResults(){let e=this.searchField.value;try{const t=await fetch(`${universityData.root_url}/wp-json/university/v1/search?term=${e}`),n=await t.json();this.resultsDiv.innerHTML=`\n                <div class="row">\n                    <div class="one-third">\n                        <h2 class="search-overlay__section-title">General Information</h2>\n                        ${n.generalInfo.length?'<ul class="link-list min-list">':"<p>No general information matches that text</p>"}\n                        ${n.generalInfo.map(e=>`<li><a href="${e.permalink}">${e.title}</a> ${"post"==e.postType?"by "+e.authorName:""}  </li>`).join("")}\n                    ${n.generalInfo.length?"</ul>":""}\n                    </div>\n                    <div class="one-third">\n                        <h2 class="search-overlay__section-title">Programs</h2>\n                        ${n.programs.length?'<ul class="link-list min-list">':`<p>No programs matches that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}\n                        ${n.programs.map(e=>`<li><a href="${e.permalink}">${e.title}</a></li>`).join("")}\n                        ${n.programs.length?"</ul>":""}\n    \n                        <h2 class="search-overlay__section-title">Professors</h2>\n                        ${n.professors.length?'<ul class="professor-cards">':"<p>No professors matches that search.</p>"}\n                        ${n.professors.map(e=>`\n                            <li class="professor-card__list-item">\n                                <a class="professor-card" href="${e.permalink}">\n                                    <img src="${e.image}" alt="" class="professor-card__image">\n                                    <span class="professor-card__name">${e.title}</span>\n                                </a>\n                            </li>\n                        `).join("")}\n                        ${n.professors.length?"</ul>":""}\n    \n                    </div>\n                    <div class="one-third">\n                        <h2 class="search-overlay__section-title">Campuses</h2>\n                        ${n.campuses.length?'<ul class="link-list min-list">':`<p>No campuses match that search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`}\n                        ${n.campuses.map(e=>`<li><a href="${e.permalink}">${e.title}</a></li>`).join("")}\n                        ${n.campuses.length?"</ul>":""}\n                    \n                        <h2 class="search-overlay__section-title">Events</h2>\n                        ${n.events.length?"":`<p>No events match that search. <a href="${universityData.root_url}/events">View all events</a></p>`}\n                        ${n.events.map(e=>`\n                        <div class="event-summary">\n                            <a class="event-summary__date t-center" href="${e.permalink}">\n                                <span class="event-summary__month">\n                                    ${e.month}\n                                </span>\n                                <span class="event-summary__day">${e.day}</span>\n                            </a>\n                            <div class="event-summary__content">\n                                <h5 class="event-summary__title headline headline--tiny"><a href="${e.permalink}">${e.title}</a></h5>\n                                <p>\n                                    ${e.description}\n                                    <a href="${e.permalink}" class="nu gray">Learn more</a>\n                                </p>\n                            </div>\n                        </div>\n                        `).join("")}\n\n                    </div>\n                </div>\n            `}catch(e){this.resultsDiv.innerHTML="<p>Unexpected error; Please try again.<p>"}}keyPressDispatcher(e){"INPUT"===document.activeElement.tagName||"TEXTAREA"===document.activeElement.tagName?this.isTyping=!0:this.isTyping=!1,83!==e.keyCode||this.isOverlayOpen||this.isTyping?27==e.keyCode&&this.isOverlayOpen&&this.closeOverlay():this.openOverlay()}openOverlay(e){this.searchOverlay.classList.add("search-overlay--active"),document.body.classList.add("body-no-scroll"),this.searchField.value="",setTimeout(()=>{this.searchField.focus()},301),this.isOverlayOpen=!0,e.preventDefault(),e.stopPropagation()}closeOverlay(){this.searchOverlay.classList.remove("search-overlay--active"),document.body.classList.remove("body-no-scroll"),this.isOverlayOpen=!1}addSearchHTML(){document.body.innerHTML+='\n            <div class="search-overlay">\n                <div class="search-overlay__top">\n                    <div class="container">\n                        <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>\n                        <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">\n                        <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>\n                    </div>\n                </div>  \n                <div class="container">\n                    <div id="search-overlay__results"></div>\n                </div>\n            </div>\n        '}};var o=class{constructor(){this.submitNote=document.body.querySelector(".submit-note"),this.newNoteBody=document.body.querySelector(".new-note-body"),this.newNoteTitle=document.body.querySelector(".new-note-title"),document.querySelector("#my-notes")&&this.events()}events(){document.querySelector("#my-notes").addEventListener("click",e=>this.deleteNote(e)),document.querySelector("#my-notes").addEventListener("click",e=>this.editNote(e)),document.querySelector("#my-notes").addEventListener("click",e=>this.updateNote(e)),this.submitNote.addEventListener("click",e=>this.createNote(e))}async deleteNote(e){const t=e.target.parentNode;try{if(e.target.matches(".delete-note")){const e=await fetch(`${universityData.root_url}/wp-json/wp/v2/note/${t.dataset.id}`,{headers:{"X-WP-Nonce":universityData.nonce},method:"DELETE"}),n=await e.json();t.style.height=t.offsetHeight+"px",setTimeout((function(){t.classList.add("fade-out")}),20),setTimeout((function(){t.remove()}),401),n.userNoteCount<5&&document.querySelector(".note-limit-message").classList.remove("active")}}catch(e){console.log(e)}}async updateNote(e){const t=e.target.parentNode;var n=t.querySelector(".note-title-field"),s=t.querySelector(".note-body-field");const a={title:n.value,content:s.value};try{if(e.target.matches(".update-note")){const n=await fetch(`${universityData.root_url}/wp-json/wp/v2/note/${t.dataset.id}`,{headers:{"X-WP-Nonce":universityData.nonce,"Content-Type":"application/json;charset=utf-8"},method:"POST",data:a,body:JSON.stringify(a)});return this.makeNoteReadOnly(e),n.json()}}catch(e){console.log(e)}}async createNote(e){const t={title:this.newNoteTitle.value,content:this.newNoteBody.value,status:"publish"};try{const e=await fetch(universityData.root_url+"/wp-json/wp/v2/note/",{headers:{"X-WP-Nonce":universityData.nonce,"Content-Type":"application/json;charset=utf-8"},method:"POST",data:t,body:JSON.stringify()}),n=await e.json();let s;document.querySelector(".new-note-title").value="",document.querySelector(".new-note-body").value="",document.querySelector("#my-notes").insertAdjacentHTML("afterbegin",`\n                <li data-id="${n.id}">\n                    <input readonly class="note-title-field" value="${n.title.raw}">\n                    <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>\n                    <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>\n                    <textarea readonly class="note-body-field">${n.content.raw}</textarea>\n                <span class="update-note btn btn--blue btn-small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>\n                \n                </li>\n                `);let a=document.querySelector("#my-notes li");setTimeout((function(){s=a.offsetHeight+"px",a.style.height="0px"}),30),setTimeout((function(){a.classList.remove("fade-in-calc"),a.style.height=s}),50),setTimeout((function(){a.style.removeProperty("height")}),450)}catch(e){"SyntaxError: Unexpected token Y in JSON at position 0"==e&&document.querySelector(".note-limit-message").classList.add("active")}}editNote(e){var t=e.target.parentNode.querySelector(".note-title-field");e.target.matches(".edit-note")&&(t.getAttribute("readonly")?this.makeNoteEditable(e):this.makeNoteReadOnly(e))}makeNoteEditable(e){const t=e.target.parentNode;t.querySelector(".edit-note").innerHTML='\n        <i class="fa fa-times" aria-hidden="true"></i> Cancel\n        ';var n=t.querySelector(".note-title-field");n.removeAttribute("readonly"),n.classList.add("note-active-field");var s=t.querySelector(".note-body-field");s.removeAttribute("readonly"),s.classList.add("note-active-field"),t.querySelector(".update-note").classList.add("update-note--visible")}makeNoteReadOnly(e){const t=e.target.parentNode;t.querySelector(".edit-note").innerHTML='\n        <i class="fa fa-pencil" aria-hidden="true"></i> Edit\n        ';var n=t.querySelector(".note-title-field");n.setAttribute("readonly",!0),n.classList.remove("note-active-field");var s=t.querySelector(".note-body-field");s.setAttribute("readonly",!0),s.classList.remove("note-active-field"),t.querySelector(".update-note").classList.remove("update-note--visible")}};var l=class{constructor(){document.querySelector(".like-box")&&this.events()}events(){document.querySelector(".like-box").addEventListener("click",e=>this.ourClickDispatcher(e))}ourClickDispatcher(e){let t=e.target;for(;!t.classList.contains("like-box");)t=t.parentElement;"yes"==t.getAttribute("data-exists")?this.deleteLike(t):this.createLike(t)}async createLike(e){try{const n={professorId:e.getAttribute("data-professor")},s=await fetch(universityData.root_url+"/wp-json/university/v1/manageLike",{headers:{"X-WP-Nonce":universityData.nonce,"Content-Type":"application/json"},method:"POST",body:JSON.stringify(n)}),a=await s.json();e.setAttribute("data-exists","yes");var t=parseInt(e.querySelector(".like-count").innerHTML,10);t++,e.querySelector(".like-count").innerHTML=t,e.setAttribute("data-like",a),console.log(a)}catch(e){console.log("Error: "+e)}}async deleteLike(e){var t={like:e.getAttribute("data-like")};try{const s=await fetch(universityData.root_url+"/wp-json/university/v1/manageLike",{headers:{"X-WP-Nonce":universityData.nonce,"Content-type":"application/json"},method:"DELETE",body:JSON.stringify(t)}),a=await s.json();e.setAttribute("data-exists","no");var n=parseInt(e.querySelector(".like-count").innerHTML,10);n--,e.querySelector(".like-count").innerHTML=n,e.setAttribute("data-like",""),console.log(a)}catch(e){console.log("Error: "+e)}}};new s,new i,new r,new o,new l}]);