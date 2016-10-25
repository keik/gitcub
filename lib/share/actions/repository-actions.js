export const FETCHING = 'FETCHING'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'
export const FETCH_ENTRIES_SUCCESS = 'FETCH_ENTRIES_SUCCESS'
export const FETCH_ENTRY_SUCCESS = 'FETCH_ENTRY_SUCCESS'

export const fetching = () => ({type: FETCHING})
export const fetchSuccess = (data) => ({type: FETCH_SUCCESS, ...data})
export const fetchFailure = (error) => ({type: FETCH_FAILURE, error})
export const fetchEntriesSuccess = (entries) => ({type: FETCH_ENTRIES_SUCCESS, entries})
export const fetchEntrySuccess = (entry) => ({type: FETCH_ENTRY_SUCCESS, entry})
