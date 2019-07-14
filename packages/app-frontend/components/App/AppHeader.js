// @flow

import css from '@styled-system/css'
import * as React from 'react'
import { connect } from 'react-redux'

import rootReducer from '../../ducks'
import type { SessionT } from '../../ducks/session'
import Logo from '../common/atoms/Logo'
import Dropdown from '../common/blocks/Dropdown'
import InnerContainer from '../common/layouts/InnerContainer'

const headerNavStyles = {
  display: 'flex',
  alignItems: 'center',
  '> ul': {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    '> li': {
      display: 'inline-block',
      fontWeight: 'bold',
      '+ li': {
        marginLeft: 12
      }
    }
  }
}

const AppHeader = ({ session }: {| session: ?SessionT |}) =>
  session == null ? (
    <AppHeaderWithoutSession />
  ) : (
    <AppHeaderWithSession session={session} />
  )
export default AppHeader

export const AppHeaderWithoutSession = () => (
  <div
    css={css({
      py: 3,
      backgroundColor: '#24292e',
      fontSize: '13px',
      a: {
        color: '#fff',
        '&:hover': {
          textDecoration: 'none',
          color: 'rgba(255, 255, 255, 0.75)'
        }
      }
    })}
  >
    <InnerContainer
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '> *:last-child': {
          marginLeft: 'auto'
        }
      }}
    >
      <Logo href="/">GitCub</Logo>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          '> *:not(:last-child)': { marginRight: '16px' }
        }}
      >
        <form
          css={{
            display: 'flex',
            backgroundColor: 'hsla(0, 0%, 100%, 0.125)',
            borderRadius: '3px',
            input: {
              border: 'none',
              minHeight: '26px'
            }
          }}
        >
          <label>
            <input
              css={{
                padding: '8px',
                background: 'none'
              }}
              placeholder="Search"
            />
          </label>
        </form>
        <a
          css={{
            padding: '4px 8px',
            backgroundColor: 'transparent',
            fontSize: '16px',
            lineHeight: '24px'
          }}
          href="/login"
        >
          Sign in
        </a>
        <a
          css={{
            padding: '4px 8px',
            backgroundColor: 'transparent',
            border: '1px solid #e1e4e8',
            borderRadius: '3px',
            fontSize: '16px',
            lineHeight: '24px'
          }}
          href="/join"
        >
          Sign up
        </a>
      </div>
    </InnerContainer>
  </div>
)

export const AppHeaderWithSession = ({ session }: {| session: SessionT |}) => (
  <div
    css={css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '> *:last-child': {
        marginLeft: 'auto'
      },
      p: 2,
      backgroundColor: '#24292e',
      borderBottom: '1px solid #e5e5e5',
      fontSize: '13px',
      a: {
        color: '#fff',
        '&:hover': {
          textDecoration: 'none',
          color: 'rgba(255, 255, 255, 0.75)'
        }
      }
    })}
  >
    <Logo href="/">GitCub</Logo>
    <form
      css={css({
        display: 'flex',
        alignItems: 'center',
        mx: 2,
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '3px',
        label: {
          borderRight: '1px solid #ddd',
          py: 1,
          px: 2,
          color: '#767676',
          fontSize: '12px'
        },
        input: {
          border: 'none',
          minHeight: '26px'
        }
      })}
    >
      <label htmlFor="input-search-query">This repository</label>
      <input id="input-search-query" type="text" placeholder="Search" />
    </form>
    <nav css={headerNavStyles}>
      <ul>
        <li>
          <a to="#">Pull requests</a>
        </li>
        <li>
          <a to="#">Issues</a>
        </li>
      </ul>
    </nav>
    <nav css={headerNavStyles}>
      <ul>
        <li>
          <a href="#">
            <i className="fa fa-bell" />
          </a>
        </li>
        <li>
          <Dropdown
            toggler={
              <a>
                <i className="fa fa-plus" /> <i className="fa fa-caret-down" />
              </a>
            }
          >
            <ul>
              <li>
                <a href="/new">New repository</a>
              </li>
            </ul>
          </Dropdown>
        </li>
        <li>
          <Dropdown
            position="right"
            toggler={
              <a>
                <img
                  alt={session.login}
                  style={{
                    verticalAlign: 'top',
                    width: 20,
                    height: 20,
                    backgroundColor: '#ccc'
                  }}
                />{' '}
                <i className="fa fa-caret-down" />
              </a>
            }
          >
            <ul
              css={{
                background: '#ffffff',
                a: {
                  color: 'initial',
                  '&:hover': {
                    color: 'initial'
                  }
                }
              }}
            >
              <li>
                <span>Signed in as {session.login}</span>
              </li>
              <li className="Dropdown__divider" />
              <li>
                <a href={`/${session.login}`}>Your profile</a>
              </li>
              <li>
                <a href={`/${session.login}?tab=stars`}>Your stars</a>
              </li>
              <li>
                <a href="/settings/profile">Setting</a>
              </li>
              <li>
                <a href="/logout">Sign out</a>
              </li>
            </ul>
          </Dropdown>
        </li>
      </ul>
    </nav>
  </div>
)

export const AppHeaderContainer = connect<_, _, *, _, *, _>(
  ({ session }: $Call<typeof rootReducer>) => ({
    session
  })
)(AppHeader)
