import React from 'react'
import PropTypes from 'prop-types'
import _debounce from 'lodash/debounce'

import getDisplayName from 'utils/getDisplayName'
import {
  defaultDebounce
} from 'settings'

// TO DO - let users specify their own default debounce in an adapter file

const getDebounce = debounce => { 

  const type = typeof debounce
  if (type === 'number')
    return debounce
  else if (type === 'boolean')
    return defaultDebounce
  else
    return null
}

function withDebouncedOnChange(WrappedComponent) {
  class WithDebounce extends React.Component {

    state = {
      value: this.props.value,
      hasPendingOnChange: false,
    }

    parentOnChange = _debounce(() => {
      this.setState(() => ({
        hasPendingOnChange: false
      }))
      this.props.onChange(this.state.value)
    }, getDebounce(this.props.debounce))

    triggerParentOnChange = () => {
      this.setState(() => ({
        hasPendingOnChange: true
      }))
      this.parentOnChange()
    }

    flush = () => this.parentOnChange.flush()

    cancel = () => {
      this.setState(() => ({
        hasPendingOnChange: false
      }))
      this.parentOnChange.cancel()
    }

    componentWillUnmount() {
      this.flush()
    }

    handleChange = value => {
      this.setState(() => ({
        value
      }))
      this.triggerParentOnChange()
    }

    forceParentOnChange = event => {
      if (!this.pendingOnChange) return
      this.cancel()
      this.props.onChange(event.target.value)
    }

    render() {

      const {
        debounce,
        onChange,
        value,
        ...sanitizedProps
      } = this.props

      if (getDebounce(this.props.debounce) === null)
        return <WrappedComponent 
          onChange={onChange}
          value={value}
          { ...sanitizedProps}
        />

      return <WrappedComponent
        onChange={this.handleChange}
        value={this.state.value}
        { ...sanitizedProps}
      />
    }
  }

  WithDebounce.displayName = `WithDebounce(${getDisplayName(WrappedComponent)})`

  WithDebounce.defaultProps = {}

  WithDebounce.propTypes = {
    /**
     * delays onChange invocation by a specified number of milliseconds
     */
    debounce: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
    ]),
  }

  return WithDebounce
}

export default withDebouncedOnChange
