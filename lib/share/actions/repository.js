export const SHOW_CONTENT = 'SHOW_CONTENT'
export const RECEIVE_PROPS = 'RECEIVE_PROPS'

export function showContent(content) {
  return {type: SHOW_CONTENT, content}
}

export function fetchRepositoryPropsIfNeeded(user, repo) {
  console.log('fetchRepositoryPropsIfNeeded')
  return function(dispatch, getState) {
    if (_shouldFetchRepositoryProps(getState()))
      return dispatch(_fetchRepositoryProps(user, repo))
  }
}

export function _receiveProps(props) {
  console.log('_receiveProps')
  return {
    type: RECEIVE_PROPS,
    props,
  }
}

function _fetchRepositoryProps(user, repo) {
  console.log('_fetchRepositoryProps')
  return function(dispatch, getState) {
    return fetch(`http://localhost:3000/api/v1/users/${user}/repositories/${repo}//entries`)
      .then(res => res.json())
      .then(json => dispatch(_receiveProps(json)))
  }
}

function _shouldFetchRepositoryProps(state) {
  console.log('_shouldFetchRepositoryProps')
  return !!state.initialEntries
}
