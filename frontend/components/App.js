// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import AppFooter from './App/AppFooter'
import AppHeader from './App/AppHeader'
import rootReducer from '../ducks'
import * as SessionAction from '../ducks/session'
import type { SessionT } from '../ducks/session'

const App = ({
  children,
  session
}: {|
  children: React.Node,
  session: ?SessionT
|}) => (
  <div>
    <AppHeader session={session} />
    {children}
    <AppFooter />
  </div>
)

export default App

export const AppContainer = withRouter(
  connect<_, _, *, _, *, _>(({ session }: $Call<typeof rootReducer>) => ({
    session
  }))(({ dispatch, ...props }) => {
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
      ;(async () => {
        setIsLoading(true)
        dispatch(await SessionAction.getCurrentUser())
        setIsLoading(false)
      })()
    }, [])
    return isLoading ? <div>Loading...</div> : <App {...props} />
  })
)
