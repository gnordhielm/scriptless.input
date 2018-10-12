import React from 'react'
import PropTypes from 'prop-types'
import _noop from 'lodash/noop'

const RawInput = ({
  autoComplete,
  autoFocus,
  isDisabled,
  isReadOnly,
  onChange,
  value,
  type,
  onBlur,
  onFocus,
  onKeyDown,
  placeholder,
}) => (
  <input
    className="__raw-input"
    type={type}
    autoComplete={autoComplete.toString()}
    autoFocus={autoFocus}
    disabled={isDisabled}
    onChange={event => {
      onChange(event.target.value)
    }}
    onBlur={onBlur}
    onFocus={onFocus}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    spellCheck="false"
    value={value}
    readOnly={isReadOnly}
  />
)

RawInput.displayName = "RawInput"
RawInput.propTypes = {
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any.isRequired,
  type: PropTypes.oneOf([
    "text",
    "number",
  ]),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
}
RawInput.defaultProps = {
  autoFocus: false,
  autoComplete: false,
  isDisabled: false,
  isReadOnly: false,
  type: "text",
  onBlur: _noop,
  onFocus: _noop,
  onKeyDown: _noop,
}

export default RawInput