
var backendUrl = 'https://shielded-taiga-17184.herokuapp.com';
document.querySelector('#sendMessage').addEventListener('click', sendMessage);
document.querySelector('#message').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
})

function renderMessagesList(messages) {
    console.log(messages);

    messages = messages.reverse();

    messages.forEach(createMessage);
}

function createMessage(message) {
    var messageListItem = `<li data-id="${message.id}" class="list-group-item">${message.body}</li>`;
    var currentMessagesHTML = document.querySelector('#messages').innerHTML;

    document.querySelector('#messages').innerHTML = messageListItem + currentMessagesHTML;
}

function sendMessage() {
    var message = document.querySelector('#message').value;
    var token = sessionStorage.getItem('token');

    document.querySelector('#message').value = '';
    fetch(backendUrl + '/posts', {
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
postChirp();
function postChirp() {
    var token = sessionStorage.getItem('token');
   fetch(backendUrl + '/posts?token=' + token)
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

        var userListItem = `<div data-id="${user.id}" class="list-group-item">${user.body}`;
        document.querySelector('#messages').innerHTML += userListItem ;
    });
}

