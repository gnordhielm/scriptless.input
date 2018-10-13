import React from 'react'
import PropTypes from 'prop-types'
import _noop from 'lodash/noop'
import { classNames } from '@leiops/helpers'
import Icon from '@leiops/icon'

import isDefined from 'utils/isDefined'
import withDebouncedOnChange from 'utils/withDebouncedOnChange'
import { baseClass } from 'settings'
import RawInput from 'components/RawInput'

// DEV - if I separate key functional styles from presentational ones, this baseClass thing becomes a non-issue. People can very easily overwrite existing styles without worrying about anything. The only concern might be making the class name more unique

const rootClassName = classNames(
  baseClass + "-container",
  "--string",
)

// TO DO - clearing should deliver focus to the child
const StringInput = ({
  className,
  clearable,
  Icon: CustomIcon,
  disabled,
  inline,
  minWidth,
  ...rest
}) => (
  <div 
    className={classNames(
      rootClassName, 
      className,
      isDefined(disabled) && "--disabled",
      rest.readOnly && "--read-only",
      inline && "--inline",
      ((clearable && rest.value) || isDefined(CustomIcon)) && "--with-icon",
      rest.autoSize && "--auto-size",
    )}
    style={{
      width: rest.autoSize ? 'min-content' : undefined,
      minWidth,
    }}
    title={
      (disabled && typeof disabled === 'string') ?
        disabled : undefined
    }
  >
    <RawInput
      { ...rest }
      disabled={isDefined(disabled)}
      className="__input"
    />
    {(clearable && rest.value) ?
      <Icon.Clear 
        className="__icon --control"
        onClick={() => rest.onChange()}
      /> : CustomIcon ?
        <CustomIcon 
          className="__icon"
        /> : null
    }
  </div>
)

StringInput.displayName = "StringInput"

const basicComponentProps = {
  // provice a css class
  className: PropTypes.string,
}

const basicInputProps = {
    // focus the input as soon as it enters the DOM
   autoFocus: PropTypes.bool,
   // stop the component from receiving user input, when passed a string, that string will be displayed on hover
   disabled: PropTypes.oneOfType([
       PropTypes.bool,
       PropTypes.string
   ]),
   // will provide a clear button, which will trigger an onchange with undefined when clicked
   clearable: PropTypes.bool,
}

StringInput.propTypes = {
  ...basicComponentProps,
  ...basicInputProps,

  // a component to render as an icon, must have the class __icon
  Icon: PropTypes.func,


//     /**
//     * provides a different set of styles ideal for
//     * use within lines of text (formerly called 'compact')
//     */
//     inline: PropTypes.bool,
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
  clearable: false,
  autoSize: false,
}

const WithDebounce = withDebouncedOnChange(StringInput)

export default WithDebounce
