import React, { Component, PropTypes } from 'react';
import Track from './Track.js';
import { connect } from 'react-redux';
import { selectTrack, fetchData, createAudioContexts } from '../actions/actions.js';

@connect((store) => {
  return {
    tracks: store.data,
    audioNode: store.contexts
  }
})

export default class TrackList extends Component {

  constructor (props) {
    super(props);
    this.state = {activeItem : 0};
  }

  onItemActive (index) {
    this.setState({activeItem: index});
  }

  fetchData () {
    fetchData();
  }

  // componentDidMount () {
  //   this.fetchData()
  // }

  // componentDidUpdate () {
  //   let trackId = 0;
  //   let audioNode = this.props.audioNode[trackId];
  //
  //   selectTrack(trackId);
  //
  //   audioNode.src.connect(audioNode.context.destination);
  //
  //   let analyser = audioNode.context.createAnalyser();
  //   audioNode.src.connect(analyser);
  // }

  render () {

    const data = this.props.tracks
    let self = this;

    return (
      <div className="list-wrap">
        <ul className="playlist">
          {data.map( (item, index) => <Track key={index} trackId={index} data={item} onItemActive={self.onItemActive.bind(self)} active={index === self.state.activeItem}></Track> )}
        </ul>
        <div className="wn-widgetlist__actions">
          <button className="btn-secondary" onClick={() => this.fetchData() }>Get Playlist</button>
        </div>
      </div>
    )
  }

}
