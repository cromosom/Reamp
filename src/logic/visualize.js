
/**
 * Visualiser
 * @param audioContext
 * @param audioSource
 * @param index of file
 */

export default function (trackId, audioNodes) {

    //setup frequency data
    let analyser = audioNodes[trackId].context.createAnalyser();
    audioNodes[trackId].src.connect(analyser);

    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 1;
    let biquadFilter = audioNodes[trackId].context.createBiquadFilter();
    let gainNode = audioNodes[trackId].context.createGain();

    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    let canvasWrap = document.getElementById('canvas-wrap');
    let canvas = document.createElement('canvas');

    let height = canvas.height;
    let width = canvas.width;
    let context = canvas.getContext('2d');
    canvas = context.canvas;

    const dpr = window.devicePixelRatio

    // scale and fit to screen
    canvas.style.position = 'absolute';
    canvas.style.top = '50%';
    canvas.style.left = '50%';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    while (canvasWrap.firstChild) {
      canvasWrap.removeChild(canvasWrap.firstChild);
    }

    canvasWrap.appendChild(canvas);

    //render visualisation
    function renderFrame() {

        // update data in frequencyData
        analyser.getByteTimeDomainData(dataArray);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
        context.save()
        context.fillStyle = 'rgba(255, 255, 255, 1)';

        context.lineWidth = 2;
        context.lineJoin = 'round';
        context.strokeStyle = 'rgba(200, 200, 200, 1)';

        context.beginPath();
        let sliceWidth = width * 6.0 / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {

          let v = dataArray[i] / 150;
          let y = v * height * 4;

          if(i === 0) {
            context.moveTo(x, y / 2);
          } else {
            context.lineTo(x, y / 2);
          }

          x += sliceWidth;
        }

        context.lineTo(canvas.width, canvas.height/3 * 2);
        context.stroke();
        //context.restore()

      requestAnimationFrame(renderFrame);
    }

    renderFrame();

}
