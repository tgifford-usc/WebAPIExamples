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


//-----  Code for tilt detection -----//
function setupTiltExample() {
    // ask for permission to access device orientation, on devices that support this (ios)
    if (DeviceOrientationEvent.requestPermission) { DeviceOrientationEvent.requestPermission(); }
}

// Function to handle device orientation
function updateOrientation(event) {    
    // Update the orientation display
    document.getElementById('alphaReadout').textContent = `z-axis rotation: ${Math.round(event.alpha)}°`;
    document.getElementById('betaReadout').textContent = `x-axis rotation: ${Math.round(event.beta)}°`;
    document.getElementById('gammaReadout').textContent = `y-axis rotation: ${Math.round(event.gamma)}°`;
}

// Check if the browser supports device orientation events
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', updateOrientation, true);
} else {
    alert('Device orientation not supported.');
}



//-----  Code for accessing the camera -----//
let width = 320;    // We will scale the photo width to this
let height = 0;     // This will be computed based on the input stream
let streaming = false;
let videoAspectRatio = 1.6;
let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let output = document.getElementById('photoFrame');
let photo = document.getElementById('photo');
let startbutton = document.getElementById('startbutton');


function clearphoto() {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
}

function takepicture() {
    const context = canvas.getContext("2d");
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        const data = canvas.toDataURL("image/png");
        photo.setAttribute("src", data);
    } else {
        clearphoto();
    }
}


async function setupCameraExample() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    video.play();
    video.addEventListener(
        "canplay",
        (ev) => {
            if (!streaming) {
                width = video.videoWidth;
                height = video.videoHeight;
                videoAspectRatio = video.videoWidth / video.videoHeight;
                resizeCameraExample();
                streaming = true;
            }
        },
        false,
    );
    
    clearphoto();
    window.addEventListener('resize', resizeCameraExample);

}


function resizeCameraExample() {
    // Find the usable width and height
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;

   

    let fitsHorizontally = (0.48 * h * videoAspectRatio < w);

    if (fitsHorizontally) {
        video.setAttribute("height", 0.48 * h);
        video.setAttribute("width", 0.48 * h * videoAspectRatio);
        canvas.setAttribute("height", 0.48 * h);
        canvas.setAttribute("width", 0.48 * h * videoAspectRatio);
    
        photo.setAttribute('style', `width: ${0.48 * h * videoAspectRatio}px; height: ${0.48 * h}px;`);
    } else {
    
        video.setAttribute("width", 0.95 * w);
        video.setAttribute("height", 0.95 * w / videoAspectRatio);
        canvas.setAttribute("width", 0.95 * w);
        canvas.setAttribute("height", 0.95 * w / videoAspectRatio);
        photo.setAttribute('style', `width: ${0.95 * w}px; height: ${0.95 * w / videoAspectRatio}px;`);

    }
}

  
startbutton.addEventListener(
    "click",
    (ev) => {
        takepicture();
        ev.preventDefault();
    },
    false,
);

