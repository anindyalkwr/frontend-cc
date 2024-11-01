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
        <div class="face front">Front</div>
        <div class="face back">Back</div>
        <div class="face right">Right</div>
        <div class="face left">Left</div>
        <div class="face top">Top</div>
        <div class="face bottom">Bottom</div>
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
    if (mode === 'rectangle') {
        apiEndpoint = '/api/rectangle';
    } else if (mode === 'cube') {
        apiEndpoint = '/api/cube';
    }

    fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: parseFloat(value) })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = `Result: ${data.result}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error calculating area';
    });
}
