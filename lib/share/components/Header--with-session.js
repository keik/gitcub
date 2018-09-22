// @flow

import debug from 'debug'
import React from 'react'

import Modal from './common/Modal'
import styles from './header.session.css'
import dropdownStyles from '../styles/dropdown.css'

const d = debug('keik:gh:components:header.session')

export default class HeaderWithSession extends React.Component<{
  session: any
}> {
  _addModal: ?Modal
  _profileModal: ?Modal

  render() {
    d('render')
    const { session = {} } = this.props
    const { username: loginUser } = session
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.headerLogo}>
            <a className={styles.logo} href="/">
              GH
            </a>
          </div>
          <form className={styles.headerForm}>
            <label htmlFor="input-search-query">This repository</label>
            <input id="input-search-query" type="text" placeholder="Search" />
          </form>
          <nav className={styles.headerNavLeft}>
            <ul>
              <li>
                <a to="#">Pull requests</a>
              </li>
              <li>
                <a to="#">Issues</a>
              </li>
            </ul>
          </nav>
          <nav className={styles.headerNavRight}>
            <ul className={styles.otherClassName}>
              <li>
                <a href="#">
                  <i className="fa fa-bell" />
                </a>
              </li>
              <li className={dropdownStyles.dropdown}>
                <a
                  onClick={e => {
                    e.preventDefault()
                    this._addModal && this._addModal.open()
                  }}
                  href="#"
                >
                  <i className="fa fa-plus" />{' '}
                  <i className="fa fa-caret-down" />
                </a>
                <Modal width={180} ref={c => (this._addModal = c)}>
                  <nav className={dropdownStyles.container}>
                    <ul>
                      <li>
                        <a href="/new">New repository</a>
                      </li>
                    </ul>
                  </nav>
                </Modal>
              </li>
              <li className={dropdownStyles.dropdown}>
                <a
                  onClick={e => {
                    e.preventDefault()
                    this._profileModal && this._profileModal.open()
                  }}
                  href="#"
                >
                  <img
                    alt={loginUser}
                    style={{
                      verticalAlign: 'top',
                      width: 20,
                      height: 20,
                      backgroundColor: '#ccc'
                    }}
                  />{' '}
                  <i className="fa fa-caret-down" />
                </a>
                <Modal width={180} ref={c => (this._profileModal = c)}>
                  <nav className={dropdownStyles.container}>
                    <ul>
                      <li className={dropdownStyles.header}>
                        Signed in as {loginUser}
                      </li>
                      <li className={dropdownStyles.divider} />
                      <li>
                        <a href={`/${loginUser}`}>Your profile</a>
                      </li>
                      <li>
                        <a href={`/${loginUser}?tab=stars`}>Your stars</a>
                      </li>
                      <li>
                        <a href="/settings/profile">Setting</a>
                      </li>
                      <li>
                        <form action="/logout" method="post">
                          <button>Sign out</button>
                        </form>
                      </li>
                    </ul>
                  </nav>
                </Modal>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
