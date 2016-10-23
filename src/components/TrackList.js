import React, { Component, PropTypes } from 'react';
import Track from './Track.js';
import { connect } from 'react-redux';
import { fetchData, createAudioContexts } from '../actions/actions.js';

@connect((store) => {
  return {
    tracks: store.data
  }
})

export default class TrackList extends Component {

  fetchData () {
    // const data = this.props.data;
    // let audioContexts = [];

    fetchData();

    // data.map(function (item) {
    //   let audioItem = document.getElementById('track-' + item.id);
    //   console.log(audioItem);
    //   // let audioContext = new AudioContext();
    //   // let audioSrc = audioContext.createMediaElementSource(audioItem);
    //
    //   // audioContexts.push(audioSrc)
    // });
    //
    // createAudioContexts(audioContexts);


  }

  render () {

    const data = this.props.tracks

    return (
      <div className="list-wrap">
        <ul className="playlist">
          {data.map( (item, index) => <Track key={index} trackId={index} data={item}></Track> )}
        </ul>
        <div className="wn-widgetlist__actions">
          <button className="wn-btn" onClick={() => this.fetchData() }>Get Data</button>
        </div>
      </div>
    )
  }

}
