var backendUrl = 'https://shielded-taiga-17184.herokuapp.com';
//Add event listener to #users:
document.querySelector('#users').addEventListener('click', function(e) {
    var userListItem = e.target;
    var userId = userListItem.getAttribute('data-id');

// - if e.target is a button and it was "Follow", then fetch GET /users/:id/follow - get the :id part from the e.target.dataset.id; also hide button and show Unfollow

    if(userListItem.innerText === 'Follow'){
        userListItem.classList.add('hidden');
        userListItem.nextElementSibling.classList.remove('hidden');
        followUser(userId);
    }
// - else if e.target is a button and it was "Unfollow", then fetch GET /users/:id/unfollow - get the :id part from the e.target.dataset.id; also hide button and show the Follow 

    else if(userListItem.innerText === 'Unfollow'){
        userListItem.classList.add('hidden');
        userListItem.previousElementSibling.classList.remove('hidden');
          unfollowUser(userId);
       }
    
});
//logot button
document.querySelector('#logout').addEventListener('click', function() {
    sessionStorage.clear();
    location.href = 'index.html?logout=yes';           //?
});

//call of function
getUsers();
// make a function getUsers and an fetch the data from backend to display the list of users by storing the token so that we can see the list when we reload page everytime
function getUsers() {
    var token = sessionStorage.getItem('token');
   fetch(backendUrl + '/users?token=' + token)   // concatinate the token so that ww can fetch the stored token to display                                                    the users
   .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        renderUsersList(response);   // generate renderUsersList
    })
}

function renderUsersList(users) {     //make a  function renderUsersList 
        console.log(users);
        users.forEach(function(user) {
        var amIFollowing = user.following;

        var userListItem = `<div data-id="${user.id}" class="list-group-item">${user.username}
        <span class="pull-right">
        <button data-id="${user.id}" class="button1 btn-floating btn btn-info list-group-item-action ${amIFollowing ? 'hidden' : ''}" type="button">Follow</button>
         <button data-id="${user.id}" class="button1 btn-floating btn btn-info list-group-item-action ${amIFollowing ? '' : 'hidden'}" type="button">Unfollow</button></span></div>`;

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

