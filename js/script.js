window.onload = function () {
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('closeModal');
    const box = document.getElementById('box');
    const photosArr = [];
    let commentsArr = [];

    fetch('js/comments.json')
        .then((res) => res.json())
        .then((comments) => {
            commentsArr.push(comments);
            commentsArr = commentsArr[0];
        })
        .catch((err) => console.log(err));

    function enableShowModalButtons () {
        const btns = document.getElementsByClassName('btn');

        for (i = 0; i < btns.length; i++) {
            const btnEl = btns[i];

            btnEl.onclick = function () {
                const photoID = parseInt(btnEl.attributes['data-id'].value);

                const photo = photosArr.filter(item => item.id === photoID)[0];

                console.log(photo);

                showModal(photo);
            };
        }
    }

    function addPhoto (id, src, title) {
        const photo = document.createElement('div');
        photo.setAttribute('class', 'photo');

        const button = document.createElement('button');
        button.setAttribute('data-id', id);
        button.setAttribute('class', 'btn');

        const img = document.createElement('img');
        img.setAttribute('src', src);

        const p = document.createElement('p');
        p.innerText = title;

        button.appendChild(img);

        photo.appendChild(button);
        photo.appendChild(p);

        box.appendChild(photo);
    }

    fetch('js/photos.json')
        .then((res) => res.json())
        .then((photos) => {
            for(i = 0; i < photos.length; i++) {
                if (i > 30) {
                    break;   
                }

                const photo = photos[i];
                photosArr.push(photo);

                addPhoto(photo.id, photo.thumbnailUrl, photo.title);

                enableShowModalButtons(photo);
            }
        })
        .catch((err) => console.log(err));

    closeButton.onclick = function () {
        hideModal();
    }

    const modalImage = document.getElementById('modalImage');
    const modalList = document.getElementById('modalList');

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function clearComments () {
        removeAllChildNodes(modalList);
    }

    function addComment(comment) {
        const newEl = document.createElement('li');
        const newList = document.createElement('ul');
    
        const name = document.createElement('li');
        const email = document.createElement('li');
        const body = document.createElement('li');

        name.innerText = 'name: ' + comment.name;
        email.innerText = 'email: ' + comment.email;
        body.innerText = 'body: ' + comment.body;

        newList.appendChild(name);
        newList.appendChild(email);
        newList.appendChild(body);

        newEl.appendChild(newList);

        modalList.appendChild(newEl);
    }

    function showModal (photo) {
        modalImage.setAttribute('src', photo.url);

        const comments = commentsArr.filter(item => {
            return item.postId === photo.id
        });

        clearComments();

        for (i = 0; i < comments.length; i++) {
            addComment(comments[i]);
        }

        modal.style.display = 'block';
    }

    function hideModal () {
        modal.style.display = 'none';
    }
}

