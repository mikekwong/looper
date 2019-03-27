import React from 'react'
import { Router, Route } from 'react-router-dom'
import StreamCreate from './streams/StreamCreate'
import StreamEdit from './streams/StreamEdit'
import StreamDelete from './streams/StreamDelete'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import Header from './Header'
import history from '../history'

const App = () => {
  return (
    <div className='ui container'>
      {/* when we pass a prop called history, Browser router will refer to its own default implementation of history
      instead we will use Router as it will take a custom history compared to BrowserRouter
      We control our own history to enable programmatic navigation in the createStream thunk */}
      <Router history={history}>
        <div>
          <Header />
          <Route exact path='/' component={StreamList} />
          <Route exact path='/streams/new' component={StreamCreate} />
          <Route exact path='/streams/edit' component={StreamEdit} />
          <Route exact path='/streams/delete' component={StreamDelete} />
          <Route exact path='/streams/show' component={StreamShow} />
        </div>
      </Router>
    </div>
  )
}

export default App
