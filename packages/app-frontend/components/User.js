// @flow

import type { UserT } from '@gitcub/types/gh'
import Box from '@gitcub/ui/Box'
import css from '@styled-system/css'
import * as React from 'react'
import { GoLink, GoLocation, GoMail, GoOrganization } from 'react-icons/go'
import { connect } from 'react-redux'
import type { Match } from 'react-router-dom'
import type { Dispatch } from 'redux'

import rootReducer from '../ducks'
import * as UsersAction from '../ducks/users'
import InnerContainer from './common/layouts/InnerContainer'

const User = ({ children, user }: {| children: React.Node, user: UserT |}) => (
  <InnerContainer>
    <Box css={{ display: 'flex' }} mt="3">
      <Box mr="3" width={1 / 4}>
        <Box border="gray" borderRadius="3">
          <img
            alt="avator"
            css={{
              display: 'block',
              width: '240px',
              height: '240px',
              backgroundColor: '#ccc'
            }}
          />
        </Box>
        <Box>
          <h1>
            <Box fontSize="4">{user.name}</Box>
            <Box color="gray" fontSize="3">
              {user.login}
            </Box>
          </h1>
          <Box>
            <Box mt="3">{user.bio}</Box>
            <Box
              as="ul"
              p="0"
              mt="3"
              css={css({
                display: 'flex',
                flexDirection: 'column',
                listStyle: 'none',
                '> li': {
                  mb: 1
                }
              })}
            >
              {user.company && (
                <li>
                  <GoOrganization />
                  {user.company}
                </li>
              )}
              {user.location && (
                <li>
                  <GoLocation />
                  {user.location}
                </li>
              )}
              {user.email && (
                <li>
                  <GoMail />
                  {user.email}
                </li>
              )}
              {user.blog && (
                <li>
                  <GoLink />
                  {user.blog}
                </li>
              )}
            </Box>
            <button>Edit</button>
          </Box>
          <hr />
          <Box>
            <h2 css={{ fontSize: '16px' }}>Organizations</h2>
            <Box
              as="ul"
              p="0"
              css={{
                display: 'flex',
                listStyle: 'none'
              }}
            >
              {Array.from(Array(3).keys()).map((_, i) => (
                <Box as="li" key={i} mr="1">
                  <Box
                    as="img"
                    alt="ORG"
                    borderRadius={3}
                    height="36px"
                    width="36px"
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width={3 / 4}>
        <Box borderBottom="gray">
          <Box
            as="ul"
            p="0"
            css={css({
              display: 'flex',
              listStyle: 'none',
              '> li': {
                mr: 3,
                '> a': {
                  display: 'block',
                  py: 2,
                  px: 1
                }
              }
            })}
          >
            <li>
              <a href="#">Overview</a>
            </li>
            <li>
              <a href="#">Repositories</a>
            </li>
            <li>
              <a href="#">Stars</a>
            </li>
            <li>
              <a href="#">Followers</a>
            </li>
            <li>
              <a href="#">Following</a>
            </li>
          </Box>
        </Box>
        <Box>
          {children}
          <h2>Pinned repositories</h2>
          <Box
            as="ul"
            p="0"
            css={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              listStyle: 'none'
            }}
          >
            {Array.from(Array(5).keys()).map((_, i) => (
              <Box as="li" key={i} width="50%" mb="3">
                <Box
                  border="gray"
                  borderRadius="3"
                  ml={i % 2 !== 0 && 2}
                  mr={i % 2 === 0 && 2}
                  p="3"
                >
                  <h3>%REPO_NAME%</h3>
                  <p>%REPO_DESCRIPTION%</p>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box>
          <h2>N contributions in the last year</h2>
          <Box>GRAPH</Box>
        </Box>
      </Box>
    </Box>
  </InnerContainer>
)

export default User

export const UserContainer = connect<_, _, *, _, *, _>(
  ({ users }: $Call<typeof rootReducer>) => ({
    users
  })
)(
  class $UserContainer extends React.Component<{|
    children: React.Node,
    dispatch: Dispatch<*>,
    match: $Shape<Match<{ username: string }>>,
    users: $PropertyType<$Call<typeof rootReducer>, 'users'>
  |}> {
    async componentDidMount() {
      const { dispatch, match } = this.props
      dispatch(await UsersAction.getUser(match.params.username))
    }

    render() {
      const { children, match, users } = this.props

      const user = users[match.params.username]

      return user == null ? 'Loading...' : <User user={user}>{children}</User>
    }
  }
)
