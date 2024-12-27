//files input
let imgUpload = document.getElementById("img_upload");
let videoUpload = document.getElementById("video_upload");
let audioUpload = document.getElementById("audio_upload");
// tags elements
let image = document.getElementById("img");
let video = document.getElementById("video");
let audio = document.getElementById("audio");

function upload(typeUpload, element) {
  typeUpload.onchange = function () {
    let file = new FileReader();
    file.readAsDataURL(typeUpload.files[0]);
    file.onload = function () {
      element.src = file.result;
      element.style.display = "block";
    };
  };
}
upload(imgUpload, image);
upload(videoUpload, video);
upload(audioUpload, audio);

//recorded audio
let micBtn = document.querySelector(".mic-toogle");
let playback = document.querySelector(".playback");
let canRecord = false;
let isRecording = false;
let recorder = null;
let chunks = [];

micBtn.addEventListener("click", ToogleMic);

function SetUpAudio() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then(SetUpStream)
      .catch((err) => {
        console.log(err);
      });
  }
}
SetUpAudio();

function SetUpStream(stream) {
  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };

  recorder.onstop = (e) => {
    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    chunks = [];
    const audioURL = window.URL.createObjectURL(blob);
    playback.src = audioURL;
    playback.style.display = "block";
  };
  canRecord = true;
}
function ToogleMic() {
  if (!canRecord) return;
  isRecording = !isRecording;
  if (isRecording) {
    recorder.start();
    micBtn.classList.add("is-recording");
  } else {
    recorder.stop();
    micBtn.classList.remove("is-recording");
  }
}
