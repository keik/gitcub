import React, { Component, PropTypes } from 'react'

import styles from './file-content.css'
import btnStyles from '../../../styles/btn.css'

export default class FileContent extends Component {
  static propTypes = {
    fileInfo: PropTypes.shape({
      lines: PropTypes.number.isRequired,
      bytes: PropTypes.number.isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
  }

  static defaultProps = {
    content: 'this is file content'
  }

  render = () => {
    const { fileInfo, content } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.commitTease}>
          commit tease
        </div>
        <div className={styles.file}>
          <div className={styles.fileHeader}>
            {fileInfo.lines} line | {fileInfo.bytes} bytes
            <div className={styles.fileActions}>
              <div className={btnStyles.group}>
                <a
                  className={btnStyles.smBtn}
                  href="#">Raw</a>
                <a
                  className={btnStyles.smBtn}
                  href="#">Raw</a>
                <a
                  className={btnStyles.smBtn}
                  href="#">Raw</a>
              </div>
              <form>
                <button>
                  <i className="fa fa-pencil" />
                </button>
              </form>
              <form>
                <button>
                  <i className="fa fa-trash" />
                </button>
              </form>
            </div>
          </div>
          <div
            className={styles.blobWrapper}
            dangerouslySetInnerHTML={{__html: content}}
          />
        </div>
      </div>
    )
  }
}
