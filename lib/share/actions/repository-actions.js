export const FETCHING = 'FETCHING'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'
export const FETCH_BRANCHES_SUCCESS = 'FETCH_BRANCHES_SUCCESS'
export const FETCH_COMMITS_SUCCESS = 'FETCH_COMMITS_SUCCESS'
export const FETCH_ENTRIES_SUCCESS = 'FETCH_ENTRIES_SUCCESS'
export const FETCH_ENTRY_SUCCESS = 'FETCH_ENTRY_SUCCESS'
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS'

export const fetching = () => ({type: FETCHING})
export const fetchSuccess = (data) => ({type: FETCH_SUCCESS, data})
export const fetchFailure = (error) => ({type: FETCH_FAILURE, error})
export const fetchBranchesSuccess = (branches) => ({type: FETCH_BRANCHES_SUCCESS, branches})
export const fetchCommitsSuccess = (commits) => ({type: FETCH_COMMITS_SUCCESS, commits})
export const fetchEntriesSuccess = (entries) => ({type: FETCH_ENTRIES_SUCCESS, entries})
export const fetchTagsSuccess = (tags) => ({type: FETCH_TAGS_SUCCESS, tags})
export const fetchEntrySuccess = (entry) => ({type: FETCH_ENTRY_SUCCESS, entry})
