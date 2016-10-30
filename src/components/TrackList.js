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

  fetchData () {
    fetchData();
  }

  render () {

    const data = this.props.tracks
    let self = this;

    return (
      <div className="list-wrap">
        <ul className="playlist">
          {data.map( (item, index) => <Track key={index} trackId={index} data={item} onItemActive={self.props.onItemActive.bind(self)} active={index === self.props.activeItem}></Track> )}
        </ul>
        <div className="wn-widgetlist__actions">
          <button className="btn-secondary" onClick={() => this.fetchData() }>Get Playlist</button>
        </div>
      </div>
    )
  }

}
