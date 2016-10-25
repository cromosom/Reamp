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

  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate () {
    let trackId = 0;
    let audioNode = this.props.audioNode[trackId];

    selectTrack(trackId);

    audioNode.src.connect(audioNode.context.destination);

    let analyser = audioNode.context.createAnalyser();
    audioNode.src.connect(analyser);
  }

  render () {

    const data = this.props.tracks

    return (
      <div className="list-wrap">
        <ul className="playlist">
          {data.map( (item, index) => <Track key={index} trackId={index} data={item}></Track> )}
        </ul>
        <div className="wn-widgetlist__actions">
          <button className="btn-secondary" onClick={() => this.fetchData() }>Get Data</button>
        </div>
      </div>
    )
  }

}
