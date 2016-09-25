import React from 'react'
import ReactDOM from 'react-dom'

import Repository from '../share/repository'

ReactDOM.render(React.createElement(Repository, global.APP_PROPS), document.getElementById('app'))
