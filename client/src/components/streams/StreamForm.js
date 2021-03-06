import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamForm extends Component {
  renderError ({ error, touched }) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      )
    }
  }
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        <div>{this.renderError(meta)}</div>
      </div>
    )
  }

  onSubmit = formValues => {
    // formvalues will be values from input that gets passed down
    this.props.onSubmit(formValues)
  }

  render () {
    return (
      // handlesubmit comes from range of methods inside redux form props..already includes preventDefault. We pass in callback we want invoked after submission
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='ui form error'
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

const validate = formValues => {
  const errors = {}
  if (!formValues.title) {
    // runs if user did not enter title
    errors.title = 'You must enter a title'
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description'
  }
  return errors
}

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm)
