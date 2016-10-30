import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectTrack, fetchData, createAudioContexts } from '../actions/actions.js';

import TrackList from '../components/TrackList.js';
import Player from '../components/Player.js';
import VisualCanvas from '../components/VisualCanvas.js';

export default class Main extends Component {

  constructor (props) {
    super(props);
    this.state = {activeItem : 0};
  }

  onItemActive (index) {
    this.setState({activeItem: index});
  }

  render () {

    let self = this;

    return (
      <div>
        <TrackList onItemActive={self.onItemActive.bind(self)} activeItem={this.state.activeItem} />
        <Player />
        <VisualCanvas />
      </div>
    )

  }

}
