import React from 'react'
import PropTypes from 'prop-types'

import isDefined from 'utils/isDefined'

class GenericInputWrapper extends React.Component {
  
  state = {
    value: this.props.startValue,
  }

  handleChange = value => {
    if (!isDefined(value))
      value = this.props.emptyValue

    this.setState(() => ({ value }))
    this.props.reportChange(value)
  }

  render() {

    const {
      Component,
      props,
    } = this.props

    return (
      <div className="generic-input-wrapper">
        <Component
          { ...props }
          onChange={this.handleChange}
          value={this.state.value}
        />
      </div>
    )
  }
}

GenericInputWrapper.propTypes = {
  props: PropTypes.object,
  Component: PropTypes.func.isRequired,
  reportChange: PropTypes.func.isRequired,
  emptyValue: PropTypes.any,
}

GenericInputWrapper.defaultProps = {
  childProps: {},
}

export default GenericInputWrapper