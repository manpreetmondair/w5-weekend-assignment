document.querySelector('#signupButton').addEventListener('click', signup);

if (location.href.includes('logout')) {
    document.querySelector('#loggedout').innerHTML = '<div class="alert alert-warning text-center">Logged out successfully.</div>';
}

function signup() {
    var name = document.querySelector('#name').value;
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;
    var image = document.querySelector('#pic').value;

    fetch('https://shielded-taiga-17184.herokuapp.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            name: name,
            username: username,
            password: password,
            photo_url: image
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            // console.log(response);

            if (response.token) {
                // Saves any string into a named spot within your browser for the current domain.
                sessionStorage.setItem('token', response.token);
                location.href = 'users.html';
            }
            else {
                alert('There was an error. Check out your console.');
                console.log(response);
            }
        })
}

