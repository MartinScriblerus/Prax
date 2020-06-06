// import React from 'react'
// import './App.css'

// const canvas = document.querySelector('canvas');
// const video = document.querySelector('video');

// let pc1;
// let pc2;
// const offerOptions = {
//   offerToReceiveAudio: 1,
//   offerToReceiveVideo: 1
// };

// let startTime;

// export default function RTC(){
// video.addEventListener('loadedmetadata', function() {
//   console.log(`Remote video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`);
// });

// video.onresize = () => {
//   console.log(`Remote video size changed to ${video.videoWidth}x${video.videoHeight}`);
//   // We'll use the first onsize callback as an indication that video has started
//   // playing out.
//   if (startTime) {
//     const elapsedTime = window.performance.now() - startTime;
//     console.log(`Setup time: ${elapsedTime.toFixed(3)}ms`);
//     startTime = null;
//   }
// };



// const stream = canvas.captureStream();
// console.log('Got stream from canvas');

// call();

// function call() {
//   console.log('Starting call');
//   startTime = window.performance.now();
//   const videoTracks = stream.getVideoTracks();
//   const audioTracks = stream.getAudioTracks();
//   if (videoTracks.length > 0) {
//     console.log(`Using video device: ${videoTracks[0].label}`);
//   }
//   if (audioTracks.length > 0) {
//     console.log(`Using audio device: ${audioTracks[0].label}`);
//   }
//   const servers = null;
//   pc1 = new RTCPeerConnection(servers);
//   console.log('Created local peer connection object pc1');
//   pc1.onicecandidate = e => onIceCandidate(pc1, e);
//   pc2 = new RTCPeerConnection(servers);
//   console.log('Created remote peer connection object pc2');
//   pc2.onicecandidate = e => onIceCandidate(pc2, e);
//   pc1.oniceconnectionstatechange = e => onIceStateChange(pc1, e);
//   pc2.oniceconnectionstatechange = e => onIceStateChange(pc2, e);
//   pc2.ontrack = gotRemoteStream;

//   stream.getTracks().forEach(
//       track => {
//         pc1.addTrack(
//             track,
//             stream
//         );
//       }
//   );
//   console.log('Added local stream to pc1');

//   console.log('pc1 createOffer start');
//   pc1.createOffer(onCreateOfferSuccess, onCreateSessionDescriptionError, offerOptions);
// }

// function onCreateSessionDescriptionError(error) {
//   console.log(`Failed to create session description: ${error.toString()}`);
// }

// function onCreateOfferSuccess(desc) {
//   console.log(`Offer from pc1\n${desc.sdp}`);
//   console.log('pc1 setLocalDescription start');
//   pc1.setLocalDescription(desc, () => onSetLocalSuccess(pc1), onSetSessionDescriptionError);
//   console.log('pc2 setRemoteDescription start');
//   pc2.setRemoteDescription(desc, () => onSetRemoteSuccess(pc2), onSetSessionDescriptionError);
//   console.log('pc2 createAnswer start');
//   // Since the 'remote' side has no media stream we need
//   // to pass in the right constraints in order for it to
//   // accept the incoming offer of audio and video.
//   pc2.createAnswer(onCreateAnswerSuccess, onCreateSessionDescriptionError);
// }

// function onSetLocalSuccess(pc) {
//   console.log(`${getName(pc)} setLocalDescription complete`);
// }

// function onSetRemoteSuccess(pc) {
//   console.log(`${getName(pc)} setRemoteDescription complete`);
// }

// function onSetSessionDescriptionError(error) {
//   console.log(`Failed to set session description: ${error.toString()}`);
// }

// function gotRemoteStream(e) {
//   if (video.srcObject !== e.streams[0]) {
//     video.srcObject = e.streams[0];
//     console.log('pc2 received remote stream');
//   }
// }

// function onCreateAnswerSuccess(desc) {
//   console.log(`Answer from pc2:\n${desc.sdp}`);
//   console.log('pc2 setLocalDescription start');
//   pc2.setLocalDescription(desc, () => onSetLocalSuccess(pc2), onSetSessionDescriptionError);
//   console.log('pc1 setRemoteDescription start');
//   pc1.setRemoteDescription(desc, () => onSetRemoteSuccess(pc1), onSetSessionDescriptionError);
// }

// function onIceCandidate(pc, event) {
//   getOtherPc(pc).addIceCandidate(event.candidate)
//       .then(
//           () => onAddIceCandidateSuccess(pc),
//           err => onAddIceCandidateError(pc, err)
//       );
//   console.log(`${getName(pc)} ICE candidate: ${event.candidate ? event.candidate.candidate : '(null)'}`);
// }

// function onAddIceCandidateSuccess(pc) {
//   console.log(`${getName(pc)} addIceCandidate success`);
// }

// function onAddIceCandidateError(pc, error) {
//   console.log(`${getName(pc)} failed to add ICE Candidate: ${error.toString()}`);
// }

// function onIceStateChange(pc, event) {
//   if (pc) {
//     console.log(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
//     console.log('ICE state change event: ', event);
//   }
// }

// function getName(pc) {
//   return (pc === pc1) ? 'pc1' : 'pc2';
// }

// function getOtherPc(pc) {
//   return (pc === pc1) ? pc2 : pc1;
// }



// return (

//   <div id="container">

//   <h1>
//       <a href="//webrtc.github.io/samples/" title="WebRTC samples homepage">WebRTC samples</a> <span>Stream from canvas to peer connection</span>
//   </h1>

//   <canvas></canvas>
//   <video playsinline autoplay></video>

//   <p>Click and drag on the canvas element (on the left) to move the teapot.</p>

//   <p>This demo requires Firefox 47 or Chrome 52 (or later).</p>

//   <p>The teapot is drawn on the canvas element using WebGL. A stream is captured from the canvas using its <code>captureStream()</code>
//       method and streamed via a peer connection to the video element on the right.</p>

//   <p>View the browser console to see logging.</p>

//   <p>Several variables are in global scope, so you can inspect them from the console: <code>canvas</code>,
//       <code>video</code>, <code>localPeerConnection</code>, <code>remotePeerConnection</code> and <code>stream</code>.
//   </p>

//   <p>For more demos and information about <code>captureStream()</code>, see <a
//           href="https://docs.google.com/document/d/1JmWfOtUP6ZqsYJ--U8y0OtHkBt-VyjX4N-JqIjb1t78"
//           title="Implementation overview doc">Media Capture from Canvas Implementation</a>.</p>

//   <p>For more information about RTCPeerConnection, see <a href="http://www.html5rocks.com/en/tutorials/webrtc/basics/"
//                                                           title="HTML5 Rocks article about WebRTC by Sam Dutton">Getting
//       Started With WebRTC</a>.</p>

//   <a href="https://github.com/webrtc/samples/tree/gh-pages/src/content/capture/canvas-pc"
//      title="View source for this page on GitHub" id="viewSource">View source on GitHub</a>

// </div>


// )



// }