import React from 'react'
import ReactDOM from 'react-dom'

import App from '../share/app'

ReactDOM.render(React.createElement(App, global.APP_PROPS), document.getElementById('app'))
