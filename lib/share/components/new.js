import axios                from 'axios'
import debug                from 'debug'
import React, { Component } from 'react'

import styles        from './new.css'
import { API_REPOS } from '../../share/constants/api'

const d = debug('keik:gh:components:new')

export default class New extends Component {

  onSubmit = (e) => {
    e.preventDefault()
    const names = Array.from(new Set(Array.prototype.map.call(e.target.elements, (el) => el.name).filter(Boolean)))
    const data = names.reduce((acc, name) => {
      acc[name] = e.target[name].value
      return acc
    }, {})
    axios[e.target.method](e.target.action, data)
      .then((res) => {
        global.location.href = `/${data.owner}/${data.name}`
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render = () => {
    d('render')
    return (
      <div className={styles.container}>
        <h2>
          Create a new repository
        </h2>
        <span>
          A repository contains all the files for your project, including the revision history.
        </span>
        <form
          action={`${API_REPOS.LOGIN_USERS}`}
          method="post"
          onSubmit={this.onSubmit}
        >
          <input type="hidden" name="authenticity_token" value="TRUE" />

          <label for="">Owner</label>
          <input name="owner" type="text" />

          <label for="">Repository name</label>
          <input name="name" type="text" />

          <label for="">Description (optional)</label>
          <input name="description" type="text" />

          <hr/>

          <input name="public" type="radio" value="true"/>
          <label>
            Public
            <p>
              Anyone can see this repository. You choose who can commit.
            </p>
          </label>
          <input name="public" type="radio" value="false"/>
          <label>
            Private
            <p>
              You choose who can see and commit to this repository.
            </p>
          </label>

          <hr/>

          <button>
            Create repository
          </button>
        </form>

      </div>
    )
  }
}
