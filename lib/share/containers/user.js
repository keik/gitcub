import { connect } from 'react-redux'

import User from '../components/user'

const mapStateToProps = (state) => (state.user)

export default connect(
  mapStateToProps
)(User)
