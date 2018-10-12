import React from 'react'
import PropTypes from 'prop-types'

class GenericInputWrapper extends React.Component {
  
  state = {
    value: ""
  }

  handleChange = value => {
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
}

GenericInputWrapper.defaultProps = {
  childProps: {},
}

export default GenericInputWrapper