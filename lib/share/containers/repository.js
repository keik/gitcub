import { connect } from 'react-redux'

import Repository from '../components/repository'

const mapStateToProps = (state) => (state.repository)

export default connect(
  mapStateToProps
)(Repository)
