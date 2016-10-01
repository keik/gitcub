import bodyParser from 'body-parser'
import Express from 'express'
import morgan from 'morgan'
import expressListRoutes from 'express-list-routes'

import routers from './routers'
import config from '../../config.json'

const app = new Express()

// add request parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// add request logger
app.use(morgan('combined'))

// add routers
Object.keys(routers).forEach(router => {
  app.use(routers[router])
  expressListRoutes(routers[router])
})

// add static directories
app.use(Express.static('bundle'))

// set global application config
app.set('config', config)

export default app
