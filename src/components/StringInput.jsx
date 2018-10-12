import React from 'react'
import PropTypes from 'prop-types'
import _noop from 'lodash/noop'
import { classNames } from '@leiops/helpers'

import withDebouncedOnChange from 'utils/withDebouncedOnChange'
import { baseClass } from 'settings'
import RawInput from 'components/RawInput'

const rootClassName = classNames(
  baseClass + "-container",
  "--string",
)

const StringInput = ({
  onChange,
  value,
  ...rest
}) => (
  <div className={rootClassName}>
    <RawInput
      onChange={onChange}
      value={value}
      { ...rest }
    />
  </div>
)

StringInput.displayName = "StringInput"

StringInput.propTypes = {
    /**
    * focus the input as soon as it enters the DOM
    */
    autoFocus: PropTypes.bool,
//     /**
//     * provides a different set of styles ideal for
//     * use within lines of text (formerly called 'compact')
//     */
//     inline: PropTypes.bool,
//     /**
//     * stop the component from receiving user input, when passed a
//     * string, that string will be displayed on hover
//     */
//     disabled: PropTypes.oneOfType([
//         PropTypes.bool,
//         PropTypes.string
//     ]),
//     /**
//     * display the specified icon in the right side of the input
//     */
//     icon: PropTypes.oneOfType([
//         PropTypes.bool,
//         PropTypes.string
//     ]),
//     /**
//     * minimum width for inline inputs
//     */
//     minWidth: PropTypes.number,
//     /**
//     * invoke on input blur
//     */
//     onBlur: PropTypes.func,
//     /**
//     * invoke with the new value whenever the value changes
//     */
//     onChange: PropTypes.func.isRequired,
//     /**
//     * display a clear button when there is an input value,
//     * invoke when it's clicked
//     */
//     onClear: PropTypes.func,
//     /**
//     * invoke on enter press
//     */
//     onEnter: PropTypes.func,
//     /**
//     * an array of options the user can chose from
//     */
//     options: PropTypes.array,
//     /**
//     * display the plain value without edit capabilities
//     */
//     readOnly: PropTypes.bool,
//     /**
//     * text to display when the input value is empty
//     */
//     placeholder: PropTypes.string,
//     /**
//     * the value of the input
//     */
//     value: PropTypes.string.isRequired,
}

StringInput.defaultProps = {
  autoFocus: false,
//     inline: false,
//     disabled: false,
//     icon: '',
//     readOnly: false,
//     value: '',
//     onEnter: _noop,
//     onEnter: _noop,
//     minWidth: 15,
}

StringInput.Debounced = withDebouncedOnChange(StringInput)

export default StringInput
