import APIRouters from './api/v1'
import PagesRouters from './pages'
import SessionRouter from './session'

export default [...APIRouters, ...PagesRouters, SessionRouter]
