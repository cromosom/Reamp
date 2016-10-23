import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import store from '../store.js';

@connect((store) => {
  return {
    track: store.trackId
  }
})

export default class VisualCanvas extends Component {

  render () {

    return (
      <div>
        <canvas id={ 'canvas-wave-' + this.props.track }></canvas>
      </div>
    )
  }

}
