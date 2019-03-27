import { connect } from 'react-redux'
import { fetchStreams } from '../../actions'
import React, { Component } from 'react'

class StreamList extends Component {
  componentDidMount () {
    this.props.fetchStreams()
  }

  render () {
    return <div>StreamList</div>
  }
}

export default connect(
  null,
  { fetchStreams }
)(StreamList)
