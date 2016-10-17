import React, { Component } from 'react'

import styles from './modal.css'

export default class Modal extends Component {
  render = () => {
    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          hello
        </div>
        <div className={styles.backdrop}>
          backdrop
        </div>
      </div>
    )
  }
}
