import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrTrack, createAudioData } from '../actions/actions.js';

@connect((store) => {
  return {
    audioNode: store.contexts,
    currTrack : store.trackId
  }
})

export default class Track extends Component {

  constructor (props) {
    super(props);
  }

  //selects clicked track
  select() {

    //pause curr track
    let audioNode = this.props.audioNode[this.props.currTrack];
    audioNode.item.pause();

    //set selected track
    const { trackId } = this.props;
    audioNode = this.props.audioNode[trackId]

    //dispatch
    setCurrTrack(trackId);

    //setup audio
    audioNode.src.connect(audioNode.context.destination);

    let analyser = audioNode.context.createAnalyser();
    audioNode.src.connect(analyser);

    //set ui
    this.props.onItemActive(this.props.trackId);
  }

  componentDidMount () {

    const { trackId } = this.props;

    //creates audio contexts
    let audioItem = document.getElementById('track-' + trackId);
    let audioContext = new AudioContext();
    let audioSrc = audioContext.createMediaElementSource(audioItem);

    let audioNode = {
      context : audioContext,
      src : audioSrc,
      item : audioItem
    }

    createAudioData(audioNode);

    //sets the track progress
    audioItem.addEventListener('timeupdate', () => {

      let progressBar = document.getElementById('progress-bar');
      let progress = audioItem.currentTime / audioItem.duration * 100;

      progressBar.value = progress;

    });

  }

  render () {

    const {name} = this.props.data;

    return (
      <li className={this.props.active ? 'is--active' : ''} onClick={ this.select.bind(this) }>
        {name}
        <audio id={'track-' + this.props.trackId} controls>
          <source type="audio/mpeg" src={'assets/add/audio/' + name}></source>
        </audio>
      </li>
    )
  }

}
