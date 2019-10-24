import React from "react"
import PropTypes from "prop-types"
import _noop from "lodash/noop"
import AutoSizeTextArea from "components/AutoSizeTextArea"
import { ENTER_KEY, defaultRows } from "settings"

const getHandleKeyPress = (onEnter, onChange, value) => {
  if (!onEnter)
    return () => {
      onChange(value + "\n")
    }
  else
    return event => {
      if (event.key === ENTER_KEY) {
        onChange(value + "\n")
        onEnter(event)
        event.stopPropagation()
        event.preventDefault()
      }
    }
}

const RawTextArea = React.forwardRef(
  (
    {
      autoComplete,
      autoFocus,
      autoSize,
      disabled,
      readOnly,
      onChange,
      value,
      onBlur,
      onFocus,
      onEnter,
      placeholder,
      className,
      minRows,
      maxRows
    },
    ref
  ) => {
    const Component = autoSize ? AutoSizeTextArea : "textarea"
    const restProps = {}
    if (autoSize) {
      restProps.minRows = minRows
      restProps.maxRows = maxRows
    }

    return (
      <Component
        autoCapitalize="sentences"
        className={className}
        autoComplete={autoComplete.toString()}
        autoFocus={autoFocus}
        disabled={disabled}
        onChange={event => {
          onChange(event.target.value)
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyPress={getHandleKeyPress(onEnter, onChange, value)}
        placeholder={placeholder}
        spellCheck="false"
        value={value}
        readOnly={readOnly}
        rows={autoSize ? undefined : defaultRows}
        {...restProps}
      />
    )
  }
)

RawTextArea.displayName = "RawTextArea"
RawTextArea.propTypes = {
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onEnter: PropTypes.func
}

RawTextArea.defaultProps = {
  autoSize: false,
  autoFocus: false,
  autoComplete: false,
  disabled: false,
  readOnly: false,
  onBlur: _noop,
  onFocus: _noop,
  onEnter: _noop
}

export default RawTextArea
