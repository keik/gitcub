// @flow

const initialState = {
  name: 'DUMMY'
}

export default function user(
  state: { name: string } = initialState,
  action: any
) {
  switch (action.type) {
    default:
      return state
  }
}
