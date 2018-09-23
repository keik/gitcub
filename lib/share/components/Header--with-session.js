// @flow

import * as React from 'react'
import styled from 'styled-components'

import InnerContainer from './common/layouts/InnerContainer'
import Logo from './common/atoms/Logo'
import Modal from './common/Modal'
import dropdownStyles from '../styles/dropdown.css'

export default class HeaderWithSession extends React.Component<{
  session: any
}> {
  _addModal: ?Modal
  _profileModal: ?Modal

  render() {
    const { session = {} } = this.props
    const { username: loginUser } = session
    return (
      <$Container>
        <InnerContainer>
          <div>
            <Logo href="/">GH</Logo>
          </div>
          <$HeaderForm>
            <label htmlFor="input-search-query">This repository</label>
            <input id="input-search-query" type="text" placeholder="Search" />
          </$HeaderForm>
          <$HeaderNav>
            <ul>
              <li>
                <a to="#">Pull requests</a>
              </li>
              <li>
                <a to="#">Issues</a>
              </li>
            </ul>
          </$HeaderNav>
          <$HeaderNav>
            <ul>
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
          </$HeaderNav>
        </InnerContainer>
      </$Container>
    )
  }
}

const $Container = styled.div`
  > div {
    display: flex;
    justify-content: space-between;
    > *:last-child {
      margin-left: auto;
    }
  }
  padding: 10px 0;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
  font-size: 13px;
  $:after {
    content: '';
    display: table;
    clear: both;
  }
  a {
    color: #333;
    &:hover {
      text-decoration: none;
      color: #4078c0;
    }
  }
`

const $HeaderForm = styled.form`
  display: flex;
  margin: 0 12px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  label {
    border-right: 1px solid #ddd;
    padding: 4px 8px;
    color: #767676;
    font-size: 12px;
  }
  input {
    border: none;
    min-height: 26px;
  }
`

const $HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: inline-block;
      font-weight: bold;
      + li {
        margin-left: 12px;
      }
    }
  }
`
