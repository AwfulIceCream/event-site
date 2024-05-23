window.onload = function() {
    fetch('http://127.0.0.1:5000/api/v1/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const events = data;
            localStorage.setItem('events', JSON.stringify(events));
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};
