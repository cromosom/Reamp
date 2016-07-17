import React, { Component, PropTypes } from 'react';
import { selectTrack } from '../actions/actions.js';

export default class Track extends Component {

  select() {
    var trackId = this.props.trackId;

    selectTrack(trackId);
  }

  render () {

    const {name} = this.props.data

    return (
      <li onClick={this.select.bind(this)}>
        {name}
        <audio id={'track-' + this.props.trackId} controls>
          <source type="audio/mpeg" src={'assets/add/audio/' + name}></source>
        </audio>
      </li>
    )
  }

}
