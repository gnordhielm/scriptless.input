import React from 'react'
import PropTypes from 'prop-types'
import _noop from 'lodash/noop'
import AutoSizeInput from 'components/AutoSizeInput'
import { ENTER_KEY } from 'settings'

const getHandleKeyPress = onEnter => {
  if (!onEnter) 
    return _noop
  else
    return event => {
      if (event.key === ENTER_KEY) 
      {
        onEnter(event)
        event.stopPropagation()
        event.preventDefault()
      }
    }
}

const RawInput = ({
  autoComplete,
  autoFocus,
  autoSize,
  disabled,
  readOnly,
  onChange,
  value,
  type,
  onBlur,
  onFocus,
  onEnter,
  placeholder,
  className,
  // TO DO - figure out where props are getting sanitized, is it here or in a parent component? I'm thinking parent, if type is going to be set by the parent, too
  debounce,
  ...rest,
}) => {

  const Component = autoSize ? AutoSizeInput : 'input'

  return (
    <Component
      { ...rest }
      className={className}
      type={type}
      autoComplete={autoComplete.toString()}
      autoFocus={autoFocus}
      disabled={disabled}
      onChange={event => {
        onChange(event.target.value)
      }}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyPress={getHandleKeyPress(onEnter)}
      placeholder={placeholder}
      spellCheck="false"
      value={value}
      readOnly={readOnly}
    />
  )
}

RawInput.displayName = "RawInput"
RawInput.propTypes = {
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onEnter: PropTypes.func,
}

RawInput.defaultProps = {
  autoSize: false,
  autoFocus: false,
  autoComplete: false,
  disabled: false,
  readOnly: false,
  onBlur: _noop,
  onFocus: _noop,
  onEnter: _noop,
}

export default RawInput