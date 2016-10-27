import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import store from '../store.js';

@connect((store) => {
  return {
    trackId: store.trackId,
    audioNodes: store.contexts
  }
})

/**
 * Visualiser
 * @param audioContext
 * @param audioSource
 * @param index of file
 */

export function visualize () {
    console.log('test');
    let nodes = this.props.audioNodes;

    //setup frequency data
    var analyser = audioNodes[trackId].context.createAnalyser();
    audioNodes[trackId].src.connect(analyser);

    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 1;
    var biquadFilter = audioNodes[trackId].context.createBiquadFilter();
    var gainNode = audioNodes[trackId].context.createGain();

    analyser.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    gainNode.connect(audioNodes[trackId].context.destination);

    biquadFilter.type = "lowpass";
    biquadFilter.frequency.value = 500;
    biquadFilter.gain.value = 25;

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    // $('.main').append(
    //   $('<canvas />', {
    //     'id' : 'canvas-wave-' + index
    //   })
    // );

    var canvas = document.getElementById('canvas-wave-' + trackId);
    var height = canvas.height;
    var width = canvas.width;
    var context = canvas.getContext('2d');
    canvas = audioNodes[trackId].context.canvas;

    if ( index === 0 ) {
      canvas.className = 'active';
    }

    const dpr = window.devicePixelRatio

    // scale and fit to screen
    canvas.style.position = 'absolute';
    canvas.style.top = '50%';
    canvas.style.left = '50%';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //render visualisation
    function renderFrame() {

        // update data in frequencyData
        analyser.getByteTimeDomainData(dataArray);
        audioNodes[trackId].context.clearRect(0, 0, canvas.width, canvas.height);
        audioNodes[trackId].context.fillRect(0, 0, window.innerWidth, window.innerHeight);
        audioNodes[trackId].context.save()
        audioNodes[trackId].context.fillStyle = 'rgba(255, 255, 255, 1)';

        audioNodes[trackId].context.lineWidth = 2;
        audioNodes[trackId].context.lineJoin = 'round';
        audioNodes[trackId].context.strokeStyle = 'rgba(200, 200, 200, 1)';

        audioNodes[trackId].context.beginPath();
        var sliceWidth = width * 6.0 / bufferLength;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {

          var v = dataArray[i] / 150;
          var y = v * height * 4;

          if(i === 0) {
            audioNodes[trackId].context.moveTo(x, y / 2);
          } else {
            audioNodes[trackId].context.lineTo(x, y / 2);
          }

          x += sliceWidth;
        }

        audioNodes[trackId].context.lineTo(canvas.width, canvas.height/3 * 2);
        audioNodes[trackId].context.stroke();
        //context.restore()

      requestAnimationFrame(renderFrame);
    }

    renderFrame();

}
