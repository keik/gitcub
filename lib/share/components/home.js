import debug from 'debug'
import React, { Component } from 'react'
import { Link } from 'react-router'

import styles from './home.css'

const d = debug('keik:gh:components:home')

export default class App extends Component {
  render = () => {
    d('render')
    const { repositories=[] } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.news}>
          <ul className={styles.activities}>
            <li>ACTIVITY_1</li>
            <li>ACTIVITY_2</li>
            <li>ACTIVITY_3</li>
          </ul>
        </div>
        <div className={styles.side}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              Repositories
            </div>
            <ul>
              {repositories.map((repo, i) => (
                 <li key={i}>
                   <Link to={repo.full_name}>{repo.full_name}</Link>
                 </li>
               ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
