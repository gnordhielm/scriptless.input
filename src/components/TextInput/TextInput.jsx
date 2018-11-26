import React from 'react'
import PropTypes from 'prop-types'
import _noop from 'lodash/noop'
import { classNames } from '@leiops/helpers'
import Icon from '@leiops/icon'

import * as basicComponentProps from 'utils/basicComponentProps'
import * as basicTextAreaProps from 'utils/basicTextAreaProps'
import isDefined from 'utils/isDefined'
import withDebouncedOnChange from 'utils/withDebouncedOnChange'
import { baseClass } from 'settings'
import RawTextArea from 'components/RawTextArea'

const rootClassName = classNames(
  baseClass + "-container",
  "--text",
)

// TO DO - clearing should deliver focus to the child
const TextInput = ({
  className,
  clearable,
  disabled,
  minHeight,
  maxHeight,
  ...rest
}) => (
  <div
    className={classNames(
      rootClassName, 
      className,
      disabled && "--disabled",
      rest.readOnly && "--read-only",
      rest.autoSize && "--auto-size",
    )}
    style={{
      height: rest.autoSize ? 'min-content' : undefined,
      minHeight,
      maxHeight,
    }}
    title={
      (disabled && typeof disabled === 'string') ?
        disabled : undefined
    }
  >
    <RawTextArea
      { ...rest }
      disabled={!!disabled}
      className="_text-area"
    />
  </div>
)

TextInput.displayName = "TextInput"

TextInput.propTypes = {
  ...basicComponentProps.propTypes,
  ...basicTextAreaProps.propTypes,
  // delay repeated invocations of onChange
  debounce: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
}

TextInput.defaultProps = {
  ...basicComponentProps.defaultProps,
  ...basicTextAreaProps.defaultProps,
}

const WithDebounce = withDebouncedOnChange(TextInput)

export default WithDebounce