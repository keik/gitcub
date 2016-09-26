import React from 'react'
import ReactDOM from 'react-dom'

import App from '../share/repository'

ReactDOM.render(React.createElement(App, global.APP_PROPS), document.getElementById('app'))
