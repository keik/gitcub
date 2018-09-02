// @flow

import * as React from 'react'

import Footer from '../components/footer'
import Header from '../components/header'

export default function App({
  children,
  session
}: {
  children: React.Node,
  session: any
}) {
  return (
    <div>
      <Header session={session} />
      {children}
      <Footer />
    </div>
  )
}
