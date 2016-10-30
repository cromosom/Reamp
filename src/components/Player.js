import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrTrack, skip, prev } from '../actions/actions.js';
import store from '../store.js';

import visualize from '../logic/visualize.js';

@connect((store) => {
  return {
    trackId: store.trackId,
    audioNodes: store.contexts
  }
})

export default class Player extends Component {

  //playes selected audio node
  play(id) {
    id = typeof id == 'number' ? id : this.props.trackId;
    console.log('play', id);

    const nodes = this.props.audioNodes;

    nodes[id].src.connect(nodes[id].context.destination);
    let analyser = nodes[id].context.createAnalyser();
    nodes[id].src.connect(analyser);

    nodes[id].item.play();
    visualize(this.props.trackId, this.props.audioNodes);
  }

  //pauses selected audio node
  pause() {
    let id = this.props.trackId;

    this.props.audioNodes[id].item.pause();
  }

  //skips to next audio node
  skipNext() {
    let id = this.props.trackId;
    const nodes = this.props.audioNodes;

    if ( (id + 1) <= (nodes.length - 1) ) {

      nodes[id].item.pause();

      id = id + 1;
      setCurrTrack(id);

      this.play(id);
      this.props.onItemActive(id);
    }

  }

  //skips to previous audio node
  skipPrev() {
    let id = this.props.trackId;
    const nodes = this.props.audioNodes;

    if ( (id + 1) <= (nodes.length) && (id - 1) >= 0 ) {
      nodes[id].item.pause();

      id = id - 1;
      setCurrTrack(id);

      this.play(id);
      this.props.onItemActive(id);
    }

  }

  //changes audio volume
  range(event) {
    let id = this.props.trackId;

    this.props.audioNodes[id].item.volume = event.target.value / 100;
  }

  render () {

    const { trackId } = this.props.trackId;

    return (
      <div className='player'>
        <div className="controls">
          <input className="volume" type="range" onChange={this.range.bind(this)}></input>
          <button className="btn play" data-icon=">" onClick={this.play.bind(this)}></button>
          <button className="btn stop" data-icon="||" onClick={this.pause.bind(this)}></button>
          <button className="btn skip" data-icon="|>" onClick={this.skipNext.bind(this)}></button>
          <button className="btn skip-back" data-icon="<|" onClick={this.skipPrev.bind(this)}></button>

        </div>
      </div>
    )
  }

}
