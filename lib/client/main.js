import React from 'react'
import ReactDOM from 'react-dom'

import App from '../share/components/app'

ReactDOM.render(React.createElement(App, global.APP_PROPS), global.document.getElementById('app'))
