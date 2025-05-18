const videoElement = document.getElementById
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element, then play

// async function is a function that returns a promise and can be awaited
async function selectMediaStream(){
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    // getDisplayMedia() is a method that prompts the user to select a media stream
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata =() =>{
      videoElement.play();
    }

  }catch(error){
    // catch error
    console.log('Error selecting media stream:', error);

  }
}
button.addEventListener('click',async ()=> {
  // Disble the button
  button.disabled =true ;
await videoElement.requestPictureInPicture();

});
// onlad event
selectMediaStream();