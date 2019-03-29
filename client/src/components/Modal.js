import React from 'react'
import ReactDOM from 'react-dom'

const Modal = props => {
  return ReactDOM.createPortal(
    <div className='ui dimmer modals visible active'>
      <div className='ui standard modal visible active'>
        hello this is a modal working!
      </div>
    </div>,
    document.querySelector('#modal')
  )
}

export default Modal
