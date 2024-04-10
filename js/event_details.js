window.onload = function() {
    const eventId = JSON.parse(localStorage.getItem('events'))[0].id;
    console.log(eventId)
    fetch(`http://127.0.0.1:5000/api/v1/events/${eventId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const event = data;
            localStorage.setItem('event', JSON.stringify(event));
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};