// @flow

import axios from 'axios'
import debug from 'debug'
import React from 'react'

import Button from './common/atoms/Button'
import P from './common/blocks/P'
import InnerContainer from './common/layouts/InnerContainer'
import formStyles from '../styles/form.css'
import { API_REPOS } from '../../share/constants/api'

const d = debug('keik:gh:components:new')

export class New extends React.Component<{}> {
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
    d('render')
    return (
      <InnerContainer>
        <div
          style={{
            marginTop: '24px',
            marginBottom: '32px',
            paddingBottom: '8px',
            borderBottom: '1px solid #e5e5e5'
          }}
        >
          <h2 style={{ marginBottom: '0' }}>Create a new repository</h2>
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
            <div
              className={formStyles.formGroup}
              style={{ display: 'inline-block' }}
            >
              <label htmlFor="owner">Owner</label>
              <input
                className={formStyles.formControl}
                id="owner"
                name="owner"
                type="text"
              />
            </div>
            <span> / </span>
            <div
              className={formStyles.formGroup}
              style={{ display: 'inline-block' }}
            >
              <label htmlFor="name">Repository name</label>
              <input
                className={formStyles.formControl}
                id="name"
                name="name"
                type="text"
              />
            </div>
          </div>

          <div className={formStyles.formGroup}>
            <label htmlFor="description">Description (optional)</label>
            <input
              className={`${formStyles.formControl} ${formStyles.full}`}
              id="description"
              name="description"
              type="text"
            />
          </div>

          <hr />

          <div className={formStyles.inlineFormGroup}>
            <label>
              <input name="public" type="radio" value="true" />
              Public
            </label>
            <P gray>
              Anyone can see this repository. You choose who can commit.
            </P>
          </div>
          <div className={formStyles.inlineFormGroup}>
            <label>
              <input name="public" type="radio" value="false" />
              Private
            </label>
            <P gray>You choose who can see and commit to this repository.</P>
          </div>

          <hr />

          <Button primary>Create repository</Button>
        </form>
      </InnerContainer>
    )
  }
}

export default New
