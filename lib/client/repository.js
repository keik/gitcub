import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import RepositoryContainer from '../share/containers/repository'
import createRepositoryStore from '../share/stores/repository'

import 'time-elements'

ReactDOM.render(
  <Provider store={createRepositoryStore(global.APP_PROPS)}>
    <RepositoryContainer />
  </Provider>,
  global.document.getElementById('app'))
