import './index.css';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

import { ipcRenderer } from 'electron';
import { writeFile } from 'fs';

let mediaRecorder;
let recordedChunks = [];

// Buttons
const videoElement = document.querySelector('video');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoSelectBtn = document.getElementById('videoSelectBtn');
const selectMenu = document.getElementById('selectMenu');

// Start recording event listener
startBtn.onclick = () => {
  startRecording();
  startBtn.innerText = 'Recording';
};

// Stop recording event listener
stopBtn.onclick = () => {
  stopRecording();
  startBtn.innerText = 'Start';
};

// Video source selection event listener
videoSelectBtn.onclick = getVideoSources;

async function getVideoSources() {
  const inputSources = await ipcRenderer.invoke('getSources');
  
  inputSources.forEach(source => {
    const element = document.createElement("option");
    element.value = source.id;
    element.innerHTML = source.name;
    selectMenu.appendChild(element);
  });
}

async function startRecording() {
  const screenId = selectMenu.options[selectMenu.selectedIndex].value;
  
  // AUDIO WONT WORK ON MACOS
  const IS_MACOS = await ipcRenderer.invoke("getOperatingSystem") === 'darwin';
  console.log(await ipcRenderer.invoke('getOperatingSystem'));
  
  const audio = !IS_MACOS ? {
    mandatory: {
      chromeMediaSource: 'desktop'
    }
  } : false;

  const constraints = {
    audio,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: screenId
      }
    }
  };

  // Create a Stream
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  
  // Preview the source in a video element
  videoElement.srcObject = stream;
  await videoElement.play();
  
  // Initialize mediaRecorder
  mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });

  // Handle data available event
  mediaRecorder.ondataavailable = onDataAvailable;

  // Handle stop event
  mediaRecorder.onstop = onStopRecording;

  // Start recording
  mediaRecorder.start();
  console.log('Recording started...');
}

function onDataAvailable(e) {
  recordedChunks.push(e.data);
}

// Stop recording and save the video
async function stopRecording() {
  // Ensure the mediaRecorder is recording before trying to stop it
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    console.log('Stopping recording...');
    mediaRecorder.stop();
  } else {
    console.log('MediaRecorder is already inactive or not started');
  }

  // Clear video stream preview
  videoElement.srcObject = null;

  // Create Blob from recorded chunks
  const blob = new Blob(recordedChunks, {
    type: 'video/webm; codecs=vp9'
  });

  // Convert Blob to Buffer
  const buffer = Buffer.from(await blob.arrayBuffer());
  recordedChunks = [];

  // Show save dialog
  const { canceled, filePath } = await ipcRenderer.invoke('showSaveDialog');
  if (canceled) return;

  // Save file if path is provided
  if (filePath) {
    writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error('Error saving video:', err);
      } else {
        console.log('Video saved successfully!');
      }
    });
  }
}

// Called when recording stops (via mediaRecorder.stop)
function onStopRecording() {
  console.log('Recording stopped');
}
