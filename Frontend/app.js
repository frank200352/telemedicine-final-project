/* jshint esversion: 8 */
/*eslint no-undef: "error"*/
/*global require, exports*/


const form = document.getElementById('registrationForm');
const message = document.getElementById('message');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    // Here you would typically send the data to your server using AJAX/Fetch API
    // This is a simplified example
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            message.textContent = 'Registration successful!';
        } else {
            message.textContent = data.message || 'Registration failed.';
        }
    })
    .catch(error => {
        message.textContent = 'An error occurred.';
    });
});
