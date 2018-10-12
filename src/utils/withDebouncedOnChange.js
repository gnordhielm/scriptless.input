import React from 'react'
import PropTypes from 'prop-types'
import _debounce from 'lodash/debounce'

import getDisplayName from 'utils/getDisplayName'
import {
  defaultDebounce
} from 'settings'

const getDebounceBy = debounceBy => {

  const type = typeof debounceBy
  if (type === 'number')
    return debounceBy
  if (type === 'boolean')
    return defaultDebounce
  else
    return 0
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
    }, getDebounceBy(this.props.debounceBy))

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
        debounceBy,
        onChange,
        value,
        ...sanitizedProps
      } = this.props

      // if (this.debounceBy === null)
      //   return <WrappedComponent {...this.props} />

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
     * when present, delays onChange invocation
     * either by a specified number of milliseconds
     * or the default specified in the constants file
     */
    debounceBy: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]).isRequired,
  }

  return WithDebounce
}

export default withDebouncedOnChange
