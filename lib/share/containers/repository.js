import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RepositoryApp from '../components/repository'
import * as RepositoryActions from '../actions/repository'

const mapStateToProps = (state) => (state)

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(RepositoryActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryApp)
