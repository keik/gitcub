// @flow

import type { RepositoryT } from '@gitcub/types/gh'
import css from '@styled-system/css'
import * as React from 'react'
import { FaRegFolderOpen } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import List from '../components/common/blocks/List'
import Panel from '../components/common/blocks/Panel'
import InnerContainer from '../components/common/layouts/InnerContainer'
import rootReducer from '../ducks'
import * as RepositoriesAction from '../ducks/repositories'

const Home = ({
  repositories
}: {|
  repositories: $ReadOnlyArray<RepositoryT>
|}) => (
  <InnerContainer>
    <div
      css={css({
        display: 'flex',
        mt: 4
      })}
    >
      <div css={{ flexGrow: 1 }}>
        <List lined>
          <li>ACTIVITY_1</li>
          <li>ACTIVITY_2</li>
          <li>ACTIVITY_3</li>
        </List>
      </div>
      <div
        css={css({
          width: '320px',
          ml: 4
        })}
      >
        <Panel>
          <Panel.Header>Public Repositories</Panel.Header>
          <Panel.Body noPadding>
            <List lined withLRPadding>
              {repositories.map((repo, i) => (
                <li
                  css={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  key={i}
                >
                  <FaRegFolderOpen css={css({ mr: 1 })} />
                  <a href={`/${repo.full_name}`}>{repo.full_name}</a>
                </li>
              ))}
            </List>
          </Panel.Body>
        </Panel>
      </div>
    </div>
  </InnerContainer>
)

export default Home

export const HomeContainer = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    ;(async () => {
      dispatch(await RepositoriesAction.fetch())
    })()
  }, [dispatch])

  const repositories = useSelector(
    (state: $Call<typeof rootReducer>) => state.repositories
  )
  return <Home repositories={repositories} />
}
