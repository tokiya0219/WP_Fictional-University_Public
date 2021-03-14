class Like {
    constructor() {
        const likeBox = document.querySelector('.like-box');
        if(likeBox) {
            this.events();
        }
    }

    events() {
        document.querySelector('.like-box').addEventListener('click', (e) => this.ourClickDispatcher(e))
    }

    ourClickDispatcher(e) {
        let currentLikeBox = e.target;
        while (!currentLikeBox.classList.contains("like-box")) {
            currentLikeBox = currentLikeBox.parentElement
        }
        if(currentLikeBox.getAttribute('data-exists') == "yes") {
            this.deleteLike(currentLikeBox);
        } else {
            this.createLike(currentLikeBox);
        }
    }

    async createLike(currentLikeBox) {
        try {
            const data = {'professorId': currentLikeBox.getAttribute('data-professor')};
            const response = await fetch(
                `${universityData.root_url}/wp-json/university/v1/manageLike`,
                {
                    headers: {
                        'X-WP-Nonce': universityData.nonce,
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                const results = await response.json();
                currentLikeBox.setAttribute('data-exists', 'yes');
                var likeCount = parseInt(currentLikeBox.querySelector(".like-count").innerHTML, 10);
                likeCount++;
                currentLikeBox.querySelector(".like-count").innerHTML = likeCount
                currentLikeBox.setAttribute("data-like", results);
                console.log(results);
        } catch(e) {
            console.log(`Error: ${e}`)
        }
    }
    async deleteLike(currentLikeBox) {
        var like = {'like': currentLikeBox.getAttribute('data-like')}
        try{
            const response = await fetch(`${universityData.root_url}/wp-json/university/v1/manageLike`,
            {
                headers: {
                    'X-WP-Nonce': universityData.nonce,
                    'Content-type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify(like)
            });
            const results = await response.json();
            currentLikeBox.setAttribute('data-exists', 'no');
            var likeCount = parseInt(currentLikeBox.querySelector(".like-count").innerHTML, 10);
            likeCount--;
            currentLikeBox.querySelector(".like-count").innerHTML = likeCount
            currentLikeBox.setAttribute("data-like", '');
            console.log(results);
        } catch(e) {
        console.log(`Error: ${e}`);
    }
    }
}

export default Like;