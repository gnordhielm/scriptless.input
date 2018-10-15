import React from 'react'
import PropTypes from 'prop-types'
import _noop from 'lodash/noop'
import { classNames } from '@leiops/helpers'
import Icon from '@leiops/icon'

import * as basicComponentProps from 'utils/basicComponentProps'
import * as basicInputProps from 'utils/basicInputProps'
import isDefined from 'utils/isDefined'
import withDebouncedOnChange from 'utils/withDebouncedOnChange'
import { baseClass } from 'settings'
import RawInput from 'components/RawInput'

// DEV - if I separate key functional styles from presentational ones, this baseClass thing becomes a non-issue. People can very easily overwrite existing styles without worrying about anything. The only concern might be making the class name more unique

const rootClassName = classNames(
  baseClass + "-container",
  "--number",
)

// TO DO - find a way of taking advantage of this feature: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#Offering_suggested_values... or don't if it's a pain and not worth it

// TO DO - standardize what empty behaviors look like. In both string and number inputs, an empty string is considered empty. If that is the case, should I even bother parsing integers on the way back up? Or should the user have to do that.

// TO DO - 

// TO DO - clearing should deliver focus to the child
const NumberInput = ({
  className,
  clearable,
  Icon: CustomIcon,
  disabled,
  inline,
  minWidth,
  maxWidth,
  onChange,
  ...rest
}) => (
  <div 
    className={classNames(
      rootClassName, 
      className,
      disabled && "--disabled",
      rest.readOnly && "--read-only",
      inline && "--inline",
      ((clearable && rest.value) || isDefined(CustomIcon)) && "--with-icon",
      rest.autoSize && "--auto-size",
    )}
    style={{
      width: rest.autoSize ? 'min-content' : undefined,
      minWidth,
      maxWidth,
    }}
    title={
      (disabled && typeof disabled === 'string') ?
        disabled : undefined
    }
  >
    <RawInput
      { ...rest }
      onChange={value => {
        let parsed = parseFloat(value)
        if (isNaN(parsed)) 
          parsed = ""
        onChange(parsed)
      }}
      type="number"
      disabled={!!disabled}
      className="__input"
    />
    {(clearable && rest.value !== "") ?
      <Icon.Clear 
        className="__icon --control"
        onClick={() => onChange()}
      /> : CustomIcon ?
        <CustomIcon 
          className="__icon"
        /> : null
    }
  </div>
)

NumberInput.displayName = "NumberInput"

NumberInput.propTypes = {
  ...basicComponentProps.propTypes,
  ...basicInputProps.propTypes,
}

NumberInput.defaultProps = {
  ...basicComponentProps.defaultProps,
  ...basicInputProps.defaultProps,
}

const WithDebounce = withDebouncedOnChange(NumberInput)

export default WithDebounce
