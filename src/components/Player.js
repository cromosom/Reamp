import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { skip, prev } from '../actions/actions.js';
import store from '../store.js';

@connect((store) => {
  return {
    track: store.trackId
  }
})

export default class Player extends Component {

  //playes selected audio node
  play() {
    console.log('play', this.props.track);

    this.state.audioNode.play();
  }

  //pauses selected audio node
  pause() {
    this.state.audioNode.pause();
  }

  //skips to next audio node
  skipNext() {
    this.state.audioNode.pause();
    skip(this.props.track);

    let id = this.props.track + 1;
    let audioNodeEl = document.getElementById('track-' + id);

    this.setState({
      audioNode: audioNodeEl
    });

    audioNodeEl.play();
  }

  //skips to previous audio node
  skipPrev() {
    this.state.audioNode.pause();
    prev(this.props.track);

    let id = this.props.track - 1;
    let audioNodeEl = document.getElementById('track-' + id);

    this.setState({
      audioNode: audioNodeEl
    });

    audioNodeEl.play();
  }

  //changes audio volume
  range(event) {
    this.state.audioNode.volume = event.target.value / 100;
  }

  render () {

    this.state = {
      audioNode: document.getElementById('track-' + this.props.track)
    }

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
