// @flow

import React from 'react'
import styled from 'react-emotion'

import Button from '../../common/atoms/Button'
import Modal from '../../common/Modal'
import { Tab, TabItems, TabItem, TabPanel } from '../../common/Tab'
import type { BranchObj, TagObj } from '../../../../types/nodegit'

export default class TreeSelector extends React.Component<{
  branches: Array<BranchObj>,
  params: {
    owner: string,
    repo: string,
    tree?: string,
    path?: string
  },
  tags: Array<TagObj>
}> {
  _branchMenuModal: ?Modal

  render() {
    const {
      branches,
      params: { owner, repo, tree = 'master' },
      tags
    } = this.props
    return (
      <>
        <Button
          small
          onClick={() => {
            this._branchMenuModal && this._branchMenuModal.open()
          }}
        >
          <i>Branch: </i>
          <span>{tree} </span>
          <i className="fa fa-caret-down" />
        </Button>
        <Modal width={300} ref={c => (this._branchMenuModal = c)}>
          <BranchMenuModalHeader>
            Switch branches/tags
            <button
              style={{
                float: 'right',
                border: 0,
                background: 'none',
                color: '#ccc',
                cursor: 'pointer'
              }}
              onClick={() => {
                this._branchMenuModal && this._branchMenuModal.close()
              }}
            >
              <i className="fa fa-close" />
            </button>
          </BranchMenuModalHeader>
          <div style={{ backgroundColor: '#f8f8f8' }}>
            <div style={{ padding: '10px 10px 0' }}>
              <input
                style={{
                  width: '100%',
                  padding: '6px',
                  lineHeight: '20px',
                  borderRadius: '3px',
                  border: '1px solid #ddd'
                }}
                placeholder="Find a tag..."
              />
            </div>
            <Tab>
              <TabItems>
                <TabItem target="branches" active>
                  Branches
                </TabItem>
                <TabItem target="tags">Tags</TabItem>
              </TabItems>
              <TabPanel name="branches">
                <BranchesUl>
                  {branches.map((branch, i) => (
                    <li key={i}>
                      <a href={`/${owner}/${repo}/tree/${branch.name}`}>
                        {branch.name}
                      </a>
                    </li>
                  ))}
                </BranchesUl>
              </TabPanel>
              <TabPanel name="tags">
                <BranchesUl>
                  {tags.map((tag, i) => (
                    <li key={i}>
                      <a href={`/${owner}/${repo}/tree/${tag.ref}`}>
                        {tag.ref}
                      </a>
                    </li>
                  ))}
                </BranchesUl>
              </TabPanel>
            </Tab>
          </div>
        </Modal>
      </>
    )
  }
}

const BranchMenuModalHeader = styled.div`
  padding: 8px 10px;
  line-height: 16px;
  background: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
  font-size: 12px;
  font-weight: 600;
  color: #333;
`

const BranchesUl = styled.div`
  background-color: #fff;
  list-style: none;
  padding: 0;
  margin: 0;
  > li {
    > a {
      display: block;
      padding: 8px 8px 8px 30px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        color: #fff;
        background-color: #4078c0;
      }
    }
  }
`
