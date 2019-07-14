// @flow

import css from '@styled-system/css'
import { API_REPOS } from 'app-constants/api'
import axios from 'axios'
import * as React from 'react'

import Button from './common/atoms/Button'
import FormGroup from './common/blocks/FormGroup'
import P from './common/blocks/P'
import InnerContainer from './common/layouts/InnerContainer'

export class New extends React.Component<{||}> {
  onSubmit = (e: any) => {
    e.preventDefault()
    const names = Array.from(
      new Set(
        Array.prototype.map
          .call(e.target.elements, el => el.name)
          .filter(Boolean)
      )
    )
    const data = names.reduce((acc, name) => {
      acc[name] = e.target[name].value
      return acc
    }, {})

    let axiosMethod = null
    switch (e.target.method) {
      case 'get':
        axiosMethod = axios.get
        break
      case 'post':
        axiosMethod = axios.post
        break
      case 'put':
        axiosMethod = axios.put
        break
      case 'delete':
        axiosMethod = axios.delete
        break
      default:
        throw new Error('method not found')
    }

    axiosMethod(e.target.action, data)
      .then(() => {
        global.location.href = `/${data.owner}/${data.name}`
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <InnerContainer>
        <div
          css={css({ mt: 3, mb: 4, pb: 2, borderBottom: '1px solid #e5e5e5' })}
        >
          <h2 css={css({ mb: 0 })}>Create a new repository</h2>
          <P gray>
            A repository contains all the files for your project, including the
            revision history.
          </P>
        </div>
        <form
          action={`${API_REPOS.LOGIN_USERS}`}
          method="post"
          onSubmit={this.onSubmit}
        >
          <input type="hidden" name="authenticity_token" value="TRUE" />

          <div>
            <FormGroup style={{ display: 'inline-block' }}>
              <label htmlFor="owner">Owner</label>
              <input id="owner" name="owner" type="text" />
            </FormGroup>
            <span> / </span>
            <FormGroup inline>
              <label htmlFor="name">Repository name</label>
              <input id="name" name="name" type="text" />
            </FormGroup>
          </div>

          <FormGroup>
            <label htmlFor="description">Description (optional)</label>
            <input
              css={{ width: '100%' }}
              id="description"
              name="description"
              type="text"
            />
          </FormGroup>

          <hr />

          <FormGroup>
            <label>
              <input name="public" type="radio" value="true" />
              Public
            </label>
            <P gray>
              Anyone can see this repository. You choose who can commit.
            </P>
          </FormGroup>
          <FormGroup>
            <label>
              <input name="public" type="radio" value="false" />
              Private
            </label>
            <P gray>You choose who can see and commit to this repository.</P>
          </FormGroup>

          <hr />

          <Button primary>Create repository</Button>
        </form>
      </InnerContainer>
    )
  }
}

export default New
