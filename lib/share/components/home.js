// @flow

import React from 'react'

import styles from './home.css'
import panelStyles from '../styles/panel.css'

export default function App({ repositories }: { repositories: Array<*> }) {
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
        <div className={panelStyles.panel}>
          <div className={panelStyles.defaultPanelHeader}>
            Public Repositories
          </div>
          <ul className={styles.repositories}>
            {repositories.map((repo, i) => (
              <li key={i}>
                <i className="fa fa-folder-open-o" />&nbsp;
                <a href={`/${repo.full_name}`}>{repo.full_name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
