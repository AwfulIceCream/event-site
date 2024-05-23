const loginButton = document.getElementsByClassName('btn-primary')[0];
const form = document.querySelector('form');

const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email, password)
    // Make POST request
    fetch('http://127.0.0.1:5000/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('refresh_token', data.refresh_token);
            console.log(data.refresh_token)
            const token = data.access_token;
            localStorage.setItem('access_token', token)
            const parsed_token = parseJwt(token);
            localStorage.setItem('user_role', parsed_token.roles[0]);
            localStorage.setItem('user_id', parsed_token.sub);
        })
        .catch((error) => {
            window.location.href = "../pages/events.html";        });
});