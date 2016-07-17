import React, { Component, PropTypes } from 'react';
import Widget from './Track.js';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions.js';

@connect((store) => {
  return {
    tracks: store.data
  }
})

export default class TrackList extends Component {

  // componentWillMount () {
  //   getData()
  // }

  fetchData () {
    fetchData();
  }

  render () {

    const data = this.props.tracks

    return (
      <div className="list-wrap">
        <ul className="playlist">
          {data.map( (item, index) => <Widget key={index} trackId={index} data={item}></Widget> )}
        </ul>
        <div className="wn-widgetlist__actions">
          <button className="wn-btn" onClick={this.fetchData.bind(this)}>Get Data</button>
        </div>
      </div>
    )
  }

}
