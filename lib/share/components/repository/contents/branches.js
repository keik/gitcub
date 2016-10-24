import React, { Component, PropTypes } from 'react'

export default class Branches extends Component {
  static propTypes = {
    repo: PropTypes.string,
    branch: PropTypes.string,
    branches: PropTypes.array
  }

  static defaultProps = {
    repo: 'dummy_repo',
    branch: 'dummy_branch',
    branches: []
  }

  render = () => {
    return (
      <div>
        <div>
          <button>a</button>
          <button>b</button>
          <button>c</button>
          <button>d</button>
        </div>
        <div>
          <div>Default branch</div>
          <div>
            MASTER
          </div>
        </div>
        <div>
          <div>Your branches</div>
          <div>
            <ul>
              <li>
                GH_PAGES
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div>Stale branches</div>
          <div>
            <ul>
              <li>
                EXP
              </li>
              <li>
                GH_PAGES
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
