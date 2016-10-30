export const FETCHING = 'FETCHING'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'

export const fetching = () => ({type: FETCHING})
export const fetchSuccess = (data) => ({type: FETCH_SUCCESS, data})
export const fetchFailure = (error) => ({type: FETCH_FAILURE, error})
