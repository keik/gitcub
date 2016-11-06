import debug                from 'debug'
import React, { Component } from 'react'

import styles from './new.css'

const d = debug('keik:gh:components:new')

export default class New extends Component {
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
        <form action="/repositories" method="post">
          <label for="">Owner</label>
          <input name="owner" type="text" value=""/>

          <label for="">Repository name</label>
          <input name="name" type="text" value=""/>

          <label for="">Description (optional)</label>
          <input name="description" type="text" value=""/>

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
