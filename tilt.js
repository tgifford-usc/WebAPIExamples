const headingReadout = document.getElementById('headingReadout');

// ask for permission to access device orientation, on devices that support this (ios)
if (DeviceMotionEvent.requestPermission) { DeviceMotionEvent.requestPermission(); }

// Function to handle device orientation
function updateHeading(event) {
    // Get the alpha value, which is the compass heading
    let heading = event.alpha;

    // Correct the heading to be between 0 and 360 degrees
    if (heading < 0) {
        heading += 360;
    }

    // Update the heading display
    document.getElementById('headingReadout').textContent = `Heading: ${Math.round(heading)}°`;
}

// Check if the browser supports device orientation events
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', updateHeading, true);
} else {
    alert('Device orientation not supported.');
}
