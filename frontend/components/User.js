// @flow

import Box from 'gh-ui/Box'
import * as React from 'react'
import { GoLink, GoLocation, GoMail, GoOrganization } from 'react-icons/go'
import { connect } from 'react-redux'

import InnerContainer from './common/layouts/InnerContainer'

const User = () => (
  <InnerContainer>
    <Box css={{ display: 'flex' }} mt="3">
      <Box mr="3" width="1/4">
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
            <Box fontSize="4">%NAME%</Box>
            <Box color="gray" fontSize="3">
              %ID%
            </Box>
          </h1>
          <Box>
            <Box mt="3">%BIO%</Box>
            <Box
              as="ul"
              p="0"
              mt="3"
              css={({ theme: { space } }) => ({
                display: 'flex',
                flexDirection: 'column',
                listStyle: 'none',
                '> li': {
                  marginBottom: space[1]
                }
              })}
            >
              <li>
                <GoOrganization />
                %ORGANZATION%
              </li>
              <li>
                <GoLocation />
                %LOCATION%
              </li>
              <li>
                <GoMail />
                %EMAIL%
              </li>
              <li>
                <GoLink />
                %LINK%
              </li>
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
      <Box width="3/4">
        <Box borderBottom="gray">
          <Box
            as="ul"
            p="0"
            css={({ theme: { space } }) => ({
              display: 'flex',
              listStyle: 'none',
              '> li': {
                marginRight: space[3],
                '> a': {
                  display: 'block',
                  padding: `${space[2]}px ${space[1]}px`
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
