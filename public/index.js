// index.js

document.getElementById('packet-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the default form submission

    // Get values from the form
    const ip = document.getElementById('ip').value;
    const port = document.getElementById('port').value;
    const protocol = document.getElementById('protocol').value;

    // Send the data to the server
    fetch('http://localhost:3000/test-traffic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ip, port, protocol })  // Send data as JSON
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerHTML = data.message;  // Display server response
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerHTML = 'An error occurred.';
    });
});
