// @flow

import * as React from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'

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
