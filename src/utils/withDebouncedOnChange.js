import React from 'react'
import PropTypes from 'prop-types'
import _debounce from 'lodash/debounce'

import { defaultDebounce } from 'settings'

const getDebounceBy = debounceBy => {
  const type = typeof debounceBy

  if (type === 'number')
    return debounceBy
  if (type ==='boolean')
    return defaultDebounce
  else
    return 0
}

function withDebouncedOnChange(WrappedComponent) {
  class WithDebounce extends React.Component {

    pendingOnChange = false

    debounceBy = getDebounceBy(this.props.debounceBy)

    parentOnChange = _debounce(value => {
        this.pendingOnChange = false
        this.props.onChange(value)
    }, this.debounceBy)
    
    triggerParentOnChange = value => {
        this.pendingOnChange = true
        this.parentOnChange(value)
    }

    flush = () => this.parentOnChange.flush()

    cancel = () => {
        this.pendingOnChange = false
        this.parentOnChange.cancel()
    }

    componentWillUnmount() { 
      this.flush() 
    }

    handleChange = value => {
          this.triggerParentOnChange(value)
    }

    forceParentOnChange = event => {
        if (!this.pendingOnChange) return
        this.cancel()
        this.props.onChange(event.target.value)
    }

    render() {
      return <WrappedComponent
        onChange={this.handleChange}
        {...this.props} 
      />
    }
  }

  WithDebounce.defaultProps = {
    debounce: false,
  }

  WithDebounce.propTypes = {
    /**
    * when present, delays onChange invocation
    * either by a specified number of milliseconds
    * or the default specified in the constants file
    */
    debounce: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
    ]),
  }

  return WithDebounce
}

export default withDebouncedOnChange