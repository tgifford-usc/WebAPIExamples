// setup the panels, and allow them to be shown or hidden
const tiltExampleButton = document.getElementById('tiltExampleButton');
const cameraExampleButton = document.getElementById('cameraExampleButton');
const homeButton = document.getElementById('homeButton');

const homeNav = document.getElementById('homeNav');
const buttonPanel = document.getElementById('buttonPanel');
const tiltExamplePanel = document.getElementById('tiltExamplePanel');
const cameraExamplePanel = document.getElementById('cameraExamplePanel');
const panels = [buttonPanel, tiltExamplePanel, cameraExamplePanel];

function showPanel(panelID) {
    panels.forEach((element) => {
        if (element.id === panelID) {
            element.setAttribute('style', 'display: flex;');
        } else {
            element.setAttribute('style', 'display: none;');
        }
    });
    if (panelID === 'buttonPanel') {
        homeNav.setAttribute('style', 'display: none;');
    } else {
        homeNav.setAttribute('style', 'display: flex;');
    }
}

tiltExampleButton.addEventListener('click', async (event) => { 
    setupTiltExample();
    showPanel('tiltExamplePanel');
});

cameraExampleButton.addEventListener('click', async (event) => { 
    setupCameraExample();
    showPanel('cameraExamplePanel'); 
});

homeButton.addEventListener('click', (event) => { 
    showPanel('buttonPanel');
});


// Code for tilt detection
function setupTiltExample() {
    // ask for permission to access device orientation, on devices that support this (ios)
    if (DeviceMotionEvent.requestPermission) { DeviceMotionEvent.requestPermission(); }
}

const headingReadout = document.getElementById('headingReadout');

// Function to handle device orientation
function updateHeading(event) {
    // Get the alpha value, which is the compass heading
    let heading = event.alpha;
    let sideTilt = event.beta;
    let forwardTilt = event.gamma;

    // Correct the heading to be between 0 and 360 degrees
    if (heading < 0) { heading += 360; }

    // Update the heading display
    document.getElementById('headingReadout').textContent = `Heading: ${Math.round(heading)}°`;
    document.getElementById('sideTiltReadout').textContent = `Sideways Tilt: ${Math.round(sideTilt)}°`;
    document.getElementById('forwardTiltReadout').textContent = `Forward Tilt: ${Math.round(forwardTilt)}°`;
}

// Check if the browser supports device orientation events
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', updateHeading, true);
} else {
    alert('Device orientation not supported.');
}

