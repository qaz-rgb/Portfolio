document.getElementById('yes').addEventListener('click', function() {
    if (this.checked) {
        window.location.href = 'https://instagram.com/issueofinnocence'; // Add your Instagram profile here
    }
});

const checkbox = document.getElementById('no');

// Add event listener for mouseover (moves checkbox randomly)
checkbox.addEventListener('mouseover', function() {
    const randomX = Math.floor(Math.random() * 300) - 150;  // Random movement in X axis
    const randomY = Math.floor(Math.random() * 300) - 150;  // Random movement in Y axis
    
    // Move the checkbox randomly
    checkbox.parentElement.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

// Add event listener for click (redirect on successful click)
checkbox.addEventListener('click', function() {
    // Redirect if the checkbox is clicked
    window.location.href = 'https://i.pinimg.com/474x/5a/7c/b6/5a7cb657706582c49e27400d81c79e13.jpg';  // Change to the desired URL
});





