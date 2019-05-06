// @flow

import css from '@styled-system/css'
import * as React from 'react'

import Button from '../common/atoms/Button'
import Dropdown from '../common/blocks/Dropdown'
import Panel from '../common/blocks/Panel'
import InnerContainer from '../common/layouts/InnerContainer'
import SegmentedButtonsContainer from '../common/layouts/SegmentedButtonsContainer'

const RepositoryHeader = ({
  forkedCount,
  match: {
    params: { owner, repo }
  },
  staredCount,
  watchedCount
}: {|
  forkedCount: number,
  match: {
    params: {
      owner: string,
      repo: string
    }
  },
  staredCount: number,
  watchedCount: number
|}) => (
  <InnerContainer>
    <div
      css={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <h1
        css={css({
          display: 'inline-block',
          color: 'gray',
          fontSize: '18px'
        })}
      >
        <a href={`/${owner}`}>{owner}</a>
        <span
          css={({ theme }) => ({
            margin: `0 ${theme.space[1]}`
          })}
        >
          /
        </span>
        <a href={`/${owner}/${repo}`}>{repo}</a>
      </h1>
      <nav>
        <ul
          css={({ theme }) => ({
            listStyle: 'none',
            padding: 0,
            '> li': {
              display: 'inline-block',
              marginLeft: theme.space[3],
              'i:first-of-type': {
                marginRight: theme.space[1]
              }
            }
          })}
        >
          <li>
            <SegmentedButtonsContainer>
              <Dropdown
                toggler={
                  <Button small>
                    <i className="fa fa-eye" />
                    Watch
                    <i
                      className="fa fa-caret-down"
                      css={({ theme }) => ({
                        marginLeft: theme.space[1]
                      })}
                    />
                  </Button>
                }
                width={300}
              >
                <div>
                  <Panel.Header>Notifications</Panel.Header>
                  <Panel.Body noPadding>
                    <ul
                      css={({ theme }) => ({
                        listStyle: 'none',
                        padding: 0,
                        '> li': {
                          padding: theme.space[2],
                          ':not(:last-child)': {
                            borderBottom: '1px solid #eee'
                          },
                          '> a': {
                            color: 'inherit',
                            '> h2': {
                              margin: 0,
                              fontSize: '14px'
                            },
                            '> span': {
                              fontSize: '12px'
                            }
                          }
                        }
                      })}
                    >
                      <li>
                        <a href="#TODO">
                          <h2>Not watching</h2>
                          <span>
                            Be notified when participating or @mentioned.
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#TODO">
                          <h2>Watching</h2>
                          <span>Be notified of all conversations.</span>
                        </a>
                      </li>
                      <li>
                        <a href="#TODO">
                          <h2>Ignoring</h2>
                          <span>Never be notified.</span>
                        </a>
                      </li>
                    </ul>
                  </Panel.Body>
                </div>
              </Dropdown>
              <Button as="a" href="#" small transparent>
                {watchedCount}
              </Button>
            </SegmentedButtonsContainer>
          </li>
          <li>
            <SegmentedButtonsContainer>
              <Button small>
                <i className="fa fa-star" />
                Star
              </Button>
              <Button as="a" href="#" small transparent>
                {staredCount}
              </Button>
            </SegmentedButtonsContainer>
          </li>
          <li>
            <SegmentedButtonsContainer>
              <Button small>
                <i className="fa fa-code-fork" />
                Fork
              </Button>
              <Button as="a" href="#" small transparent>
                {forkedCount}
              </Button>
            </SegmentedButtonsContainer>
          </li>
        </ul>
      </nav>
    </div>
  </InnerContainer>
)

export default RepositoryHeader
