import bodyParser from 'body-parser'
import Express from 'express'
import morgan from 'morgan'
import routers from './routers'

const app = new Express()

// add request parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// add request logger
app.use(morgan('combined'))

// add routers
Object.keys(routers).forEach(router => app.use(routers[router]))

// add static directories
app.use(Express.static('build/assets'))

export default app
