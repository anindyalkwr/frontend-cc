let mode = '';

function showRectangle() {
    document.getElementById('title').innerText = 'Calculate Area of a Rectangle';
    document.getElementById('input').placeholder = 'Enter length';
    const animation = document.getElementById('animation');

    // Apply rectangle animation
    animation.innerHTML = '';
    animation.className = 'animation rectangle-animation';
    
    mode = 'rectangle';
}

function showCube() {
    document.getElementById('title').innerText = 'Calculate Area of a Cube';
    document.getElementById('input').placeholder = 'Enter side length';
    const animation = document.getElementById('animation');

    // Apply cube animation
    animation.className = 'animation cube';
    animation.innerHTML = `
        <div class="face front"></div>
        <div class="face back"></div>
        <div class="face right"></div>
        <div class="face left"></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
    `;
    
    mode = 'cube';
}

function calculate() {
    const value = document.getElementById('input').value;
    if (!value) {
        document.getElementById('result').innerText = 'Please enter a value';
        return;
    }

    let apiEndpoint = '';
    const corsProxy = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy URL

    if (mode === 'rectangle') {
        apiEndpoint = corsProxy + 'http://54.90.207.8:8080/function/persegi';
    } else if (mode === 'cube') {
        apiEndpoint = corsProxy + 'http://3.80.42.104:8080/function/kubus';
    }

    fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sisi: parseFloat(value) })
    })
    .then(response => response.text()) // Use text() to inspect and modify response
    .then(data => {
        try {
            // Convert Python-style JSON to JavaScript-compatible JSON by replacing single quotes
            const validJsonString = data.replace(/'/g, '"');
            const jsonData = JSON.parse(validJsonString);
            document.getElementById('result').innerText = `Result: ${jsonData.area}`;
        } catch (error) {
            // If JSON parsing fails, output the raw data to inspect the issue
            console.error('Parsing error:', error, 'Raw response data:', data);
            document.getElementById('result').innerText = `Unexpected response: ${data}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error calculating area';
    });
}


