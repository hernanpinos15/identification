

class Camara {

  constructor(videoNode) {
    this.videoNode = videoNode;
    console.log('Camara init');
  }

  encender() {

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { width: 400, height: 400 }
  }).then( stream => {

      this.videoNode.srcObject = stream;
      this.stream = stream;

  });

  }

  apagar(){

  }
}