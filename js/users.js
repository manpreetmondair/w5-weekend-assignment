// 1. GET /users
// 2. Add event listener to #users:
    // - if e.target is a button and it was "Follow", then fetch GET /users/:id/follow - get the :id part from the e.target.dataset.id; also hide button and show Unfollow
    // - else if e.target is a button and it was "Unfollow", then fetch GET /users/:id/unfollow - get the :id part from the e.target.dataset.id; also hide button and show the Follow
var backendUrl = 'https://shielded-taiga-17184.herokuapp.com';
document.querySelector('#users').addEventListener('click', function(e) {
    var userListItem = e.target;
    var userId = userListItem.getAttribute('data-id');

    if(userListItem.innerText === 'Follow'){
        userListItem.classList.add('hidden');
        userListItem.nextElementSibling.classList.remove('hidden');
        followUser(userId);
    }
    else if(userListItem.innerText === 'Unfollow'){
        userListItem.classList.add('hidden');
        userListItem.previousElementSibling.classList.remove('hidden');
          unfollowUser(userId);
       }
    
});
//logot button
document.querySelector('#logout').addEventListener('click', function() {
    sessionStorage.clear();
    location.href = 'signup.html?logout=yes';
});

document.querySelector('#sendMessage').addEventListener('click', sendMessage);
document.querySelector('#message').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
})

getUsers();
function getUsers() {
    var token = sessionStorage.getItem('token');
   fetch(backendUrl + '/users?token=' + token)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        renderUsersList(response);
    })
}

function renderUsersList(users) {
    console.log(users);

    users.forEach(function(user) {
        var amIFollowing = user.following;

        var userListItem = `<div data-id="${user.id}" class="list-group-item">${user.username}
       <button data-id="${user.id}" class="btn btn-info ${amIFollowing ? 'hidden' : ''}" type="button" style="margin-left: 150px;">Follow</button>
        <button data-id="${user.id}" class="btn btn-info ${amIFollowing ? '' : 'hidden'}" type="button">Unfollow</button></div>`;

        document.querySelector('#users').innerHTML += userListItem;
    });
}

function followUser(userId) {
    var token = sessionStorage.getItem('token');
      fetch(backendUrl + '/follow/' + userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: token
        })
    })
}
function unfollowUser(userId){
    var token = sessionStorage.getItem('token');
    fetch(backendUrl + '/unfollow/' + userId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
        })
}

function sendMessage() {
    var message = document.querySelector('#message').value;
    var token = sessionStorage.getItem('token');

    document.querySelector('#message').value = '';

    fetch(backendUrl + '/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            body: message,
            token: token
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            // console.log(response);

            var messageSent = document.querySelector('#messageSent');
            messageSent.classList.remove('hidden');
            messageSent.children[0].innerHTML = 'Message Sent: ' + response.body;

            setTimeout(function() {
                messageSent.classList.add('hidden');
            }, 3000);

        })
}