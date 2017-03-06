
var backendUrl = 'https://shielded-taiga-17184.herokuapp.com';
// call id #sendMessage and use addEventListener to do actions on click
document.querySelector('#sendMessage').addEventListener('click', sendMessage);
//use keypress function for text area whose id is message and it will perform th same function sendMessage
document.querySelector('#message').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
})

// make a function sendMessage which will send the message on click and fetch the messages from backend and save the token
function sendMessage() {
    // variable message will select the value inside the message area
    var message = document.querySelector('#message').value;
    //variable token will get and store the token
    var token = sessionStorage.getItem('token');
    //if  there is null in the message value then it will fetch the messages by using POSTS
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


getChirp();
function getChirp() {
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

