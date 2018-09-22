// @flow

import React from 'react'

import HeaderWithSession from './Header--with-session'
import HeaderWithoutSession from './Header--without-session'

export default function Header({ session }: { session: any }) {
  return session != null ? (
    <HeaderWithSession session={session} />
  ) : (
    <HeaderWithoutSession />
  )
}
