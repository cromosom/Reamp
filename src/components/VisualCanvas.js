import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import store from '../store.js';

import visualize from '../logic/visualize.js';

@connect((store) => {
  return {
    trackId: store.trackId,
    audioNodes : store.contexts
  }
})

export default class VisualCanvas extends Component {

  componentDidUpdate () {
    visualize(this.props.trackId, this.props.audioNodes);
  }

  render () {

    return (
      <div id='canvas-wrap'>

      </div>
    )
  }

}
