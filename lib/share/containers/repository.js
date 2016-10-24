import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Repository from '../components/repository'

const mapStateToProps = (state) => (state.repository)

export default connect(
  mapStateToProps
)(Repository)
