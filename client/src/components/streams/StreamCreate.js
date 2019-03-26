import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamCreate extends Component {
  renderInput ({ input, label }) {
    return (
      <div className='field'>
        <label>{label}</label>
        <input {...input} />
      </div>
    )
  }

  onSubmit (formValues) {
    // formvalues will be values from input that gets passed down
    console.log(formValues)
  }

  render () {
    console.log(this.props)
    return (
      // handlesubmit comes from range of methods inside redux form props..already includes preventDefault. We pass in callback we want invoked after submission
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='ui form'
      >
        {/* name = name of property field will manage */}
        <Field name='title' component={this.renderInput} label='Enter Title' />
        <Field
          name='description'
          component={this.renderInput}
          label='Enter Description'
        />
        <button className='ui button primary'>Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'streamCreate'
})(StreamCreate)
