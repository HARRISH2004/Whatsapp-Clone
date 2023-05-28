const socket = io();

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

// Get user media
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        // Display local video
        localVideo.srcObject = stream;

        // Send stream to other users
        socket.emit('new-stream', stream);
    })
    .catch(error => {
        console.error('Error accessing media devices:', error);
    });

// Receive stream from other users
socket.on('receive-stream', stream => {
    remoteVideo.srcObject = stream;
});
