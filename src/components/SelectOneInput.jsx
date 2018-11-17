import React from 'react'
import PropTypes from 'prop-types'
import _noop from 'lodash/noop'
import { classNames } from '@leiops/helpers'
import Icon from '@leiops/icon'
import Dropdown from '@scriptless/dropdown'

import * as basicComponentProps from 'utils/basicComponentProps'
import * as basicInputProps from 'utils/basicInputProps'
import * as selectInputProps from 'utils/selectInputProps'
import isDefined from 'utils/isDefined'
import { baseClass } from 'settings'
import RawInput from 'components/RawInput'

const rootClassName = classNames(
  baseClass + "-container",
  "--select-one",
)

class SelectOneInput extends React.Component {

  dropdown = React.createRef()

  state = {
    inputHasFocus: this.props.autoFocus,
    text: ""
  }
  
  handleInputFocus = () => {
    this.setState(() => ({
      inputHasFocus: true
    }))
    
  }
  
  handleInputBlur = () => {
    this.setState(() => ({
      inputHasFocus: false
    }))
  }

  handleTextChange = text => {
    this.setState(() => ({ text }))
  }

  handleOptionClick = option => {
    this.props.onChange(option)
    if (this.dropdown.current)
      this.dropdown.current.hide()
  }

  render() {
    const {
      className,
      clearable,
      Icon: CustomIcon,
      disabled,
      inline,
      minWidth,
      maxWidth,
      options,
      renderValue,
      renderOption,
      value,
      onChange,
      ...rest,
    } = this.props

    const filteredOptions = options.slice()
    const shouldRenderInput = value === undefined || this.state.inputHasFocus
    // PICKUP - really this should be tied to whether or not the dropdown is open, which this component might want to manage

    return (
      <Dropdown 
        hasFocus={this.state.inputHasFocus || undefined}
        ref={this.dropdown}
      >
        <Dropdown.Trigger>
          <div
            className={classNames(
              rootClassName,
              className,
              disabled && "--disabled",
              rest.readOnly && "--read-only",
              inline && "--inline",
              ((clearable && rest.value) || isDefined(CustomIcon)) && 
                "--with-icon",
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
            {shouldRenderInput ?
              <RawInput
                {...rest}
                autoFocus={this.state.inputHasFocus || rest.autoFocus}
                value={this.state.text}
                onChange={this.handleTextChange}
                type="text"
                disabled={!!disabled}
                className="__input"
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
              /> :
              <div 
                className="__input-value"
                onFocus={this.handleInputFocus}
                tabIndex="1"
              >
                {renderValue(value)}
              </div>
            }
            {(clearable && rest.value) ?
              <Icon.Clear
                className="__icon --control"
                onClick={() => rest.onChange()}
              /> : CustomIcon ?
                <CustomIcon
                  className="__icon"
                /> : 
                <Icon.DropDown 
                  className="__icon"
                />
            }
          </div>
        </Dropdown.Trigger>
        <Dropdown.Content className="input-dropdown">
            {filteredOptions.map((option, idx) => 
              <div 
                className="__option" 
                onClick={() => {
                  this.handleOptionClick(option)
                }}
                key={idx}
              >
                {renderOption(option)}
              </div>
            )}
        </Dropdown.Content>
      </Dropdown>
    )
  }
}

SelectOneInput.displayName = "SelectOneInput"

SelectOneInput.propTypes = {
  ...basicComponentProps.propTypes,
  ...basicInputProps.propTypes,
  ...selectInputProps.propTypes,
}

SelectOneInput.defaultProps = {
  ...basicComponentProps.defaultProps,
  ...basicInputProps.defaultProps,
  ...selectInputProps.defaultProps,
}

export default SelectOneInput

