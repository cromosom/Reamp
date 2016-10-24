import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectTrack, createAudioContexts } from '../actions/actions.js';

@connect((store) => {
  return {
    audioNode: store.contexts
  }
})

export default class Track extends Component {

  select() {
    let trackId = this.props.trackId;
    let audioNode = this.props.audioNode[trackId]

    selectTrack(trackId);

    audioNode.src.connect(audioNode.context.destination);

    let analyser = audioNode.context.createAnalyser();
    audioNode.src.connect(analyser);

  }

  componentDidMount () {

    const { trackId } = this.props;

    let audioItem = document.getElementById('track-' + trackId);
    console.log(audioItem);
    let audioContext = new AudioContext();
    let audioSrc = audioContext.createMediaElementSource(audioItem);

    let audioNode = {
      context : audioContext,
      src : audioSrc,
      item : audioItem
    }

    createAudioContexts(audioNode);

  }

  render () {

    const {name} = this.props.data

    return (
      <li onClick={ () => this.select() }>
        {name}
        <audio id={'track-' + this.props.trackId} controls>
          <source type="audio/mpeg" src={'assets/add/audio/' + name}></source>
        </audio>
      </li>
    )
  }

}
