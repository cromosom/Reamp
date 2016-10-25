import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectTrack, createAudioContexts } from '../actions/actions.js';
import classnames from 'classnames';

@connect((store) => {
  return {
    audioNode: store.contexts
  }
})

export default class Track extends Component {

  constructor (props) {
    super(props);
  }

  select() {
    let trackId = this.props.trackId;
    let audioNode = this.props.audioNode[trackId]

    selectTrack(trackId);

    audioNode.src.connect(audioNode.context.destination);

    let analyser = audioNode.context.createAnalyser();
    audioNode.src.connect(analyser);

    this.props.onItemActive(this.props.trackId);
  }

  componentDidMount () {

    const { trackId } = this.props;

    let audioItem = document.getElementById('track-' + trackId);
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

    const {name} = this.props.data;

    return (
      <li className={this.props.active ? 'is--active' : ''} onClick={ () => this.select() }>
        {name}
        <audio id={'track-' + this.props.trackId} controls>
          <source type="audio/mpeg" src={'assets/add/audio/' + name}></source>
        </audio>
      </li>
    )
  }

}
