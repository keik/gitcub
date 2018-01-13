// @flow

export const FETCHING = 'FETCHING'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'

export const fetching = () => ({ type: FETCHING })
export const fetchSuccess = (data: any) => ({ type: FETCH_SUCCESS, data })
export const fetchFailure = (error: any) => ({ type: FETCH_FAILURE, error })
