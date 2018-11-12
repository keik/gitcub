// @flow

import styled from 'react-emotion'

const Panel = styled.div`
  position: relative;
  border: 1px solid #d8d8d8;
  border-radius: 3px;
  margin-bottom: 24px;
  > * {
    padding: 12px;
  }
`

Panel.Header = styled.div`
  background-color: ${({ info }) => (info ? '#f2f9fc' : '#f7f7f7')};
  border-bottom: 1px solid;
  border-color: ${({ info }) => (info ? '#c9e6f2' : '#d8d8d8')};
`

Panel.Body = styled.div`
  > table {
    width: 100%;
    border-collapse: collapse;
    line-height: 20px;
    > tbody {
      > tr {
        &:first-child td {
          border: none;
        }
        > td {
          padding: 6px 3px;
          border-top: 1px solid #eee;
          color: #888;
        }
      }
    }
  }
`

export default Panel
