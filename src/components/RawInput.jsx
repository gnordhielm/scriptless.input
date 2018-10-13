import React from 'react'
import PropTypes from 'prop-types'
import _noop from 'lodash/noop'
import AutoSizeInput from 'components/AutoSizeInput'
import { ENTER_KEY } from 'settings'

const getWidth = container => {
  console.log('getWidth', container);
  setTimeout(() => {
    console.log('getWidth', container);

  })
  
}

const getHandleKeyPress = onEnter => {
  if (!onEnter) 
    return _noop
  else
    return event => {
      if (event.key === ENTER_KEY) 
      {
        onEnter()
        event.stopPropagation()
        event.preventDefault()
      }
    }
}

// DEV - must be function declaration to sustain ref
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
}) => {

  const Component = autoSize ? AutoSizeInput : 'input'

  return (
    <Component
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
  type: PropTypes.oneOf([
    "text",
    "number",
  ]),
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
  type: "text",
  onBlur: _noop,
  onFocus: _noop,
  onEnter: _noop,
}

export default RawInput