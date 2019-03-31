import React, { Component } from 'react'
import flv from 'flv.js'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'

class StreamShow extends Component {
  constructor () {
    super()

    this.videoRef = React.createRef()
  }
  componentDidMount () {
    const { id } = this.props.match.params
    this.props.fetchStream(id)
    this.buildPlayer()
  }

  // when component first renders after cdm attempt to build player above. Then if player fetches stream successfully in the buildplayer() method and re-renders. CDU will be called and this.buildplayer() gets called again
  componentDidUpdate () {
    this.buildPlayer()
  }

  componentWillUnmount () {
    this.player.destroy()
  }

  buildPlayer () {
    // if player already set up or stream does not exist
    if (this.player || !this.props.stream) {
      return
    }
    const { id } = this.props.match.params
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    })
    this.player.attachMediaElement(this.videoRef.current)
    this.player.load()
  }

  render () {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    const { title, description } = this.props.stream

    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id]
})

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow)
