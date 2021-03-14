class MyNotes {
    constructor() {
        this.submitNote = document.body.querySelector('.submit-note');
        this.newNoteBody = document.body.querySelector('.new-note-body');
        this.newNoteTitle = document.body.querySelector('.new-note-title');
        if(document.querySelector('#my-notes')) {
        this.events();
        }
    }
    events() {
        document.querySelector('#my-notes').addEventListener('click', (e) => this.deleteNote(e));
        document.querySelector('#my-notes').addEventListener('click', (e) => this.editNote(e));
        document.querySelector('#my-notes').addEventListener('click', (e) => this.updateNote(e));
        this.submitNote.addEventListener('click', (e) => this.createNote(e));
    }

    async deleteNote(e) {
        const thisNote = e.target.parentNode;
        try {
            // e.target.classlist.contains('.delete-note') also work!
            if (e.target.matches('.delete-note')) {
            const deleteResponse = await fetch(
                `${universityData.root_url}/wp-json/wp/v2/note/${thisNote.dataset.id}`,
                {
                    headers: {
                    'X-WP-Nonce' : universityData.nonce
                    },
                    method: 'DELETE' 
                }
            );
            const results = await deleteResponse.json();
            thisNote.style.height = `${thisNote.offsetHeight}px`
            setTimeout(function () {
              thisNote.classList.add("fade-out");
            }, 20)
            setTimeout(function () {
              thisNote.remove();
            }, 401)
            if (results.userNoteCount < 5){
                document.querySelector('.note-limit-message').classList.remove("active");
              }
            }
            // return 
        } catch (err) {
            console.log(err);
        }
    }
    async updateNote(e) {
        const thisNote = e.target.parentNode;
        var noteTitleField = thisNote.querySelector('.note-title-field');
        var noteBodyField = thisNote.querySelector('.note-body-field');
        const ourUpdatePost = {
            'title' : noteTitleField.value,
            'content': noteBodyField.value
        }
        try {
            if (e.target.matches('.update-note')) {
                const updateResponse = await fetch(
                    `${universityData.root_url}/wp-json/wp/v2/note/${thisNote.dataset.id}`,
                    {
                        headers: {
                        'X-WP-Nonce' : universityData.nonce,
                        'Content-Type': 'application/json;charset=utf-8'
                        },
                        method: 'POST',
                        data: ourUpdatePost,
                        body: JSON.stringify(ourUpdatePost)
                    }
                );
                this.makeNoteReadOnly(e);
                return updateResponse.json();
            }
        } catch (err) {
            console.log(err);
        }
    }

    async createNote(e) {
        const ourNewPost = {
            'title' : this.newNoteTitle.value,
            'content': this.newNoteBody.value,
            'status': 'publish'
        }
        try {
            const createResponse = await fetch(
                `${universityData.root_url}/wp-json/wp/v2/note/`,
                {
                    headers: {
                    'X-WP-Nonce' : universityData.nonce,
                    'Content-Type': 'application/json;charset=utf-8'
                    },
                    method: 'POST',
                    data: ourNewPost,
                    body: JSON.stringify()
                }
            );
            
            const results = await createResponse.json();
            document.querySelector(".new-note-title").value = "";
            document.querySelector(".new-note-body").value = "";
            document.querySelector("#my-notes").insertAdjacentHTML(
                "afterbegin",
                `
                <li data-id="${results.id}">
                    <input readonly class="note-title-field" value="${results.title.raw}">
                    <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
                    <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
                    <textarea readonly class="note-body-field">${results.content.raw}</textarea>
                <span class="update-note btn btn--blue btn-small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>
                
                </li>
                `
            );
            let finalHeight; // browser needs a specific height to transition to, you can't transition to 'auto' height
            let newlyCreated = document.querySelector("#my-notes li");
    
            // give the browser 30 milliseconds to have the invisible element added to the DOM before moving on
            setTimeout(function () {
            finalHeight = `${newlyCreated.offsetHeight}px`
            newlyCreated.style.height = "0px"
            }, 30)
    
            // give the browser another 20 milliseconds to count the height of the invisible element before moving on
            setTimeout(function () {
            newlyCreated.classList.remove("fade-in-calc")
            newlyCreated.style.height = finalHeight
            }, 50)
    
            // wait the duration of the CSS transition before removing the hardcoded calculated height from the element so that our design is responsive once again
            setTimeout(function () {
            newlyCreated.style.removeProperty("height")
            }, 450)
        } catch (err) {
            if (err == "SyntaxError: Unexpected token Y in JSON at position 0") {
            document.querySelector(".note-limit-message").classList.add("active");
            }
        }
    }

    editNote(e) {
        const thisNote = e.target.parentNode;
        var noteTitleField = thisNote.querySelector('.note-title-field');
        if (e.target.matches('.edit-note')) {
            if(!noteTitleField.getAttribute('readonly')) {
                this.makeNoteReadOnly(e);
            } else {
                this.makeNoteEditable(e);
            }
        }
    }

    makeNoteEditable(e) {
        const thisNote = e.target.parentNode;
        var editNote = thisNote.querySelector('.edit-note');
        editNote.innerHTML =`
        <i class="fa fa-times" aria-hidden="true"></i> Cancel
        `;
        var noteTitleField = thisNote.querySelector('.note-title-field');
        noteTitleField.removeAttribute("readonly");
        noteTitleField.classList.add('note-active-field');
        var noteBodyField = thisNote.querySelector('.note-body-field');
        noteBodyField.removeAttribute("readonly");
        noteBodyField.classList.add('note-active-field');
        var updateNote = thisNote.querySelector('.update-note');
        updateNote.classList.add('update-note--visible');
    }

    makeNoteReadOnly(e) {
        const thisNote = e.target.parentNode;
        var editNote = thisNote.querySelector('.edit-note');
        editNote.innerHTML =`
        <i class="fa fa-pencil" aria-hidden="true"></i> Edit
        `;
        var noteTitleField = thisNote.querySelector('.note-title-field');
        noteTitleField.setAttribute('readonly', true);
        noteTitleField.classList.remove('note-active-field');
        var noteBodyField = thisNote.querySelector('.note-body-field');
        noteBodyField.setAttribute('readonly', true);
        noteBodyField.classList.remove('note-active-field');
        var updateNote = thisNote.querySelector('.update-note');
        updateNote.classList.remove('update-note--visible');
    }
}

export default MyNotes;