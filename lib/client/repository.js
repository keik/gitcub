import React from 'react'
import ReactDOM from 'react-dom'

import App from '../share/components/repository/index'

import 'time-elements'

ReactDOM.render(React.createElement(App, global.APP_PROPS), global.document.getElementById('app'))
