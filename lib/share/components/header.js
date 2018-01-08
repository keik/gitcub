// @flow

import React from 'react'

import HeaderWithSession from './header.session.js'
import HeaderWithoutSession from './header.no-session.js'

export default function Header({ session }: { session: any }) {
  return session != null ? (
    <HeaderWithSession session={session} />
  ) : (
    <HeaderWithoutSession />
  )
}
