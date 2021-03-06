import React from 'react'
import PropTypes from 'prop-types'

import isDefined from 'utils/isDefined'

class GenericInputWrapper extends React.Component {
  
  state = {
    value: this.props.value || this.props.startValue,
  }

  handleChange = value => {
    if (!isDefined(value))
      value = this.props.emptyValue

    this.setState(() => ({ value }))
    this.props.reportChange(value)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value)
      this.setState(() => ({
        value: this.props.value
      }))
  }

  render() {

    const {
      Component,
      props={},
      value,
      children
    } = this.props

    if (props.onCreateOption)
      props.onCreateOption = (newValue) => {
        this.handleChange(newValue)
      }

    return (
      <div className="generic-input-wrapper">
        <Component
          { ...props }
          onChange={this.handleChange}
          value={this.state.value}
        >{children}</Component>
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