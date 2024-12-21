
let imgUpload=document.getElementById('img_upload');
let videoUpload=document.getElementById('video_upload');
let audioUpload=document.getElementById('audio_upload');


let image=document.getElementById("img");
let video=document.getElementById("video");
let audio=document.getElementById("audio");



function upload(typeUpload,element){
   typeUpload.onchange=function(){
    let file=new FileReader();
    file.readAsDataURL(typeUpload.files[0]);
    file.onload=function(){
        element.src=file.result;
        element.style.display='block';
    }
   }
}


upload(imgUpload,image);
upload(videoUpload,video);
upload(audioUpload,audio);

// imgUpload.onchange=function(){
//     let file=new FileReader();
//     console.log(imgUpload.files[0])
//     file.readAsDataURL(imgUpload.files[0]);
//     file.onload=function(){
//         image.src=file.result;
//         image.style.display='block';
//     }
    
// }

