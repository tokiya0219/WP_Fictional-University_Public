class Search {
    constructor() {
        this.addSearchHTML();
        this.resultsDiv = document.getElementById('search-overlay__results');
        this.searchButton = document.querySelector('.search-trigger');
        this.closeButton = document.querySelector('.search-overlay__close');
        this.searchOverlay = document.querySelector('.search-overlay');
        this.searchField = document.getElementById('search-term');

        this.isTyping = false;
        this.preValue;
        this.isSpinnerVisible = false;
        this.isOverlayOpen = false;
        this.typingTimer;
        this.events();
    }

    events() {
        this.searchButton.addEventListener('click', () => this.openOverlay());
        this.closeButton.addEventListener('click', () => this.closeOverlay());
        document.body.addEventListener('keyup', (e) => this.keyPressDispatcher(e));
        this.searchField.addEventListener('keyup', () => this.typingLogic());
    }
    // Actions
    typingLogic() {
        if(this.searchField.value != this.preValue) {
            clearTimeout(this.typingTimer);
            if(this.searchField.value) {
                if(!this.isSpinnerVisible) {
                    this.resultsDiv.innerHTML = `<div class="spinner-loader"></div>`;
                    this.isSpinnerVisible = true;
                }
                this.typingTimer = setTimeout(() => this.getResults(), 750);
                this.isSpinnerVisible = false;

            } else {
                this.resultsDiv.innerHTML = '';
            }
        }
        this.preValue = this.searchField.value;
    }

    async getResults() {
        let searchTerm = this.searchField.value;
        try{
            const res = await fetch(`${universityData.root_url}/wp-json/university/v1/search?term=${searchTerm}`);
            const results = await res.json()
            this.resultsDiv.innerHTML = `
                <div class="row">
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">General Information</h2>
                        ${results.generalInfo.length ? '<ul class="link-list min-list">' : '<p>No general information matches that text</p>'}
                        ${results.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a> ${item.postType == 'post' ? `by ${item.authorName}` : ''}  </li>`).join('')}
                    ${results.generalInfo.length ? '</ul>' : ''}
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Programs</h2>
                        ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs matches that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}
                        ${results.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join('')}
                        ${results.programs.length ? '</ul>' : ''}
    
                        <h2 class="search-overlay__section-title">Professors</h2>
                        ${results.professors.length ? '<ul class="professor-cards">' : `<p>No professors matches that search.</p>`}
                        ${results.professors.map(item => `
                            <li class="professor-card__list-item">
                                <a class="professor-card" href="${item.permalink}">
                                    <img src="${item.image}" alt="" class="professor-card__image">
                                    <span class="professor-card__name">${item.title}</span>
                                </a>
                            </li>
                        `).join('')}
                        ${results.professors.length ? '</ul>' : ''}
    
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Campuses</h2>
                        ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses match that search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`}
                        ${results.campuses.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join('')}
                        ${results.campuses.length ? '</ul>' : ''}
                    
                        <h2 class="search-overlay__section-title">Events</h2>
                        ${results.events.length ? '' : `<p>No events match that search. <a href="${universityData.root_url}/events">View all events</a></p>`}
                        ${results.events.map(item => `
                        <div class="event-summary">
                            <a class="event-summary__date t-center" href="${item.permalink}">
                                <span class="event-summary__month">
                                    ${item.month}
                                </span>
                                <span class="event-summary__day">${item.day}</span>
                            </a>
                            <div class="event-summary__content">
                                <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                                <p>
                                    ${item.description}
                                    <a href="${item.permalink}" class="nu gray">Learn more</a>
                                </p>
                            </div>
                        </div>
                        `).join('')}

                    </div>
                </div>
            `
        } catch(err) {
            this.resultsDiv.innerHTML = '<p>Unexpected error; Please try again.<p>'
        }
        // for WP vanillaAPI
        // let searchTerm = this.searchField.value;
        // let urls = [`${universityData.root_url}/wp-json/wp/v2/posts?search=${searchTerm}`,
        //     `${universityData.root_url}/wp-json/wp/v2/pages?search=${searchTerm}`];
        //     var combinedResults = [];
        //     const requests = urls.map(url => fetch(url)
        //     .then(res => res.json())
        //     .catch(err => this.resultsDiv.innerHTML = '<p>Unexpected error; Please try again.<p>'));
        //     Promise.all(requests).then(items => {
        //         combinedResults = items.flat();
        //         this.resultsDiv.innerHTML = `
        //         <h2 class="search-overlay__section-title">General Information</h2>
        //         ${combinedResults.length ? '<ul class="link-list min-list">' : '<p>No general information matches that search.</p>'}
        //         ${combinedResults.map(item => `<li><a href="${item.link}">${item.title.rendered} (${item.type})</a> ${item.type == 'post' ? `by ${item.authorName}` : ''}</li>`).join('')}
        //         ${combinedResults.length ? '</ul>' : ''}
        //         `;
        //     });
    }

    keyPressDispatcher(e) {
        document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA" ? this.isTyping = true : this.isTyping = false;
        if(e.keyCode === 83 && !this.isOverlayOpen && !this.isTyping) {
            this.openOverlay();
        } else if (e.keyCode == 27 && this.isOverlayOpen) {
            this.closeOverlay();
        }
    }

    openOverlay(event) {
        this.searchOverlay.classList.add("search-overlay--active");
        document.body.classList.add('body-no-scroll');
        this.searchField.value = '';
        setTimeout(() => {
            this.searchField.focus();
        }, 301);
        this.isOverlayOpen = true;
        event.preventDefault();
        event.stopPropagation();
        // return false;
    }

    closeOverlay() {
        this.searchOverlay.classList.remove("search-overlay--active");
        document.body.classList.remove('body-no-scroll');
        this.isOverlayOpen = false;
    }
    
    addSearchHTML() {
        document.body.innerHTML += `
            <div class="search-overlay">
                <div class="search-overlay__top">
                    <div class="container">
                        <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
                        <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
                        <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
                    </div>
                </div>  
                <div class="container">
                    <div id="search-overlay__results"></div>
                </div>
            </div>
        `;
      }
}

export default Search;