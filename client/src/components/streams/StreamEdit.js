import _ from 'lodash'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'

class StreamEdit extends Component {
  componentDidMount () {
    this.props.fetchStream(this.props.match.params.id)
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues)
  }

  render () {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* Lodash to only select specific props I want passed from the stream as opposed to everything */}
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  // ownProps is a reference to props above and the id key comes from props to find the right key
  stream: state.streams[ownProps.match.params.id]
})

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit)
