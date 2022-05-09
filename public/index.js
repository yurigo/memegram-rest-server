console.log("javascript loaded");

var socket = io();

socket.on("posts", (data) => {
    // console.log(data)

    data.forEach(function (post) {
        addMeme(post);
    })
})

socket.on('new post', (data) => {
    addMeme(data);
})

// fetch("http://localhost:3000/posts" ,
//     {
//         headers: {
//             'Accept' : 'application/json',
//             'Content-Type' : 'application/json'
//         }
//     }
// )
// .then( res => res.json())
// .then( data => {
//     console.log(data)
//     data.forEach(function (post) {
//         addMeme(post);
//     })
// })
// .catch( err => console.error(err) )



var form = document.getElementById('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const idUser = form.elements.idUser.value;
    const image = form.elements.image.value;

    console.log(idUser , image);

    socket.emit("insert post" , {idUser, image})

    // fetch("/posts",
    // {
    //     headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //     },
    //     method: "POST",
    //     body: JSON.stringify({idUser , image})
    // })
    // .then(function(res){ return res.json() })
    // .then(function(data){
    //     addMeme(data);
    // })
    // .catch(function(res){ console.log(res) })

});






function addMeme(post){
    const memeImage = document.createElement('img');
    memeImage.src = `http://yurigo.dev/img/${post.image}`;
    memeImage.alt = post.image;
    memeImage.title = post.image;
    
    const divImage = document.createElement('div');
    divImage.appendChild(memeImage);
    divImage.dataset.id = post.id;
    divImage.dataset.idUser = post.idUser;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '❌';

    deleteButton.addEventListener('click', function(e){
        console.log(e.target.parentNode.dataset.id);
        console.log(e.target.parentNode.dataset.idUser);

        fetch("/posts/" + e.target.parentNode.dataset.id,
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "DELETE"
        })
        .then(function(res){ 
            console.log(res)
            if (res.ok) e.target.parentNode.remove();
        })
        .catch(function(res){ console.log(res) })
    });

    divImage.appendChild(deleteButton);

    document.querySelector('.memes').appendChild(divImage);


}