// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import AppFooter from './App/AppFooter'
import AppHeader from './App/AppHeader'
import type { ReducersStateT } from '../ducks'
import * as SessionAction from '../ducks/session'
import type { SessionT } from '../ducks/session'

const App = ({
  children,
  session
}: {
  children: React.Node,
  session: ?SessionT
}) => (
  <div>
    <AppHeader session={session} />
    {children}
    <AppFooter />
  </div>
)

export default App

export const AppContainer = withRouter(
  connect<_, _, *, _, *, _>(({ session }: ReducersStateT) => ({
    session
  }))(
    class $App extends React.Component<*, { isLoading: boolean }> {
      state = { isLoading: false }

      async componentDidMount() {
        const { dispatch } = this.props
        this.setState({ isLoading: true })
        dispatch(await SessionAction.getCurrentUser())
        this.setState({ isLoading: false })
      }

      render() {
        return this.state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <App {...this.props} />
        )
      }
    }
  )
)
