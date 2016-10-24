import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrTrack, skip, prev } from '../actions/actions.js';
import store from '../store.js';

@connect((store) => {
  return {
    track: store.trackId,
    audioNode: store.contexts
  }
})

export default class Player extends Component {

  //playes selected audio node
  play() {
    console.log('play', this.props.track);

    let id = this.props.track;

    this.props.audioNode[id].item.play();
  }

  //pauses selected audio node
  pause() {
    let id = this.props.track;

    this.props.audioNode[id].item.pause();
  }

  //skips to next audio node
  skipNext() {
    let id = this.props.track;

    this.props.audioNode[id].item.pause();
    id = id++;
    console.log(id);
    setCurrTrack(id);

    this.props.audioNode[id].item.play();
  }

  //skips to previous audio node
  skipPrev() {
    let id = this.props.track;

    this.props.audioNode[id].item.pause();
    setCurrTrack(id--);
    // console.log(id);

    this.props.audioNode[id].item.play();
  }

  //changes audio volume
  range(event) {
    let id = this.props.track;

    this.props.audioNode[id].item.volume = event.target.value / 100;
  }

  render () {

    const { trackId } = this.props.track;

    // this.state = {
    //   audioNode: document.getElementById('track-' + this.props.track)
    // }

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
