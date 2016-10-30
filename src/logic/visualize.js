
/**
 * Visualiser
 * @param audioContext
 * @param audioSource
 * @param index of file
 */

export default function (trackId, audioNodes, canvas) {

    //setup frequency data
    var analyser = audioNodes[trackId].context.createAnalyser();
    audioNodes[trackId].src.connect(analyser);

    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 1;
    var biquadFilter = audioNodes[trackId].context.createBiquadFilter();
    var gainNode = audioNodes[trackId].context.createGain();

    // analyser.connect(biquadFilter);
    // biquadFilter.connect(gainNode);
    // gainNode.connect(audioNodes[trackId].context.destination);

    // biquadFilter.type = "lowpass";
    // biquadFilter.frequency.value = 500;
    // biquadFilter.gain.value = 25;

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    var canvasWrap = document.getElementById('canvas-wrap');
    var canvas = document.createElement('canvas');

    var height = canvas.height;
    var width = canvas.width;
    var context = canvas.getContext('2d');
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
        var sliceWidth = width * 6.0 / bufferLength;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {

          var v = dataArray[i] / 150;
          var y = v * height * 4;

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
