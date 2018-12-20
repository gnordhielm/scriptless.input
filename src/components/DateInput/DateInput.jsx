import React from 'react'
import _noop from 'lodash/noop'
import {
  classNames,
  pluralize,
} from '@leiops/helpers'
import Icon from '@leiops/icon'
import Dropdown from '@scriptless/dropdown'

import * as basicComponentProps from 'utils/basicComponentProps'
import * as basicInputProps from 'utils/basicInputProps'
import isDefined from 'utils/isDefined'
import { KEY } from 'utils/constants'
import { baseClass } from 'settings'
import RawInput from 'components/RawInput'

const rootClassName = classNames(
  baseClass + "-container",
  "--date",
)

class DateInput extends React.Component {  
  
  state = {
    inputHasFocus: !!this.props.autoFocus,
    dropdownHasFocus: null,
    text: "",
    // DEV - it is a rule that this should NEVER be set to an index which does not correspond to an option value in the filtered array
    focusedOptionIndex: null,
  }

  handleFocusInput = () => {

    if (this.props.disabled || this.props.readOnly) return

    this.setState(() => ({
      inputHasFocus: true
    }))
  }

  handleBlurInput = () => {
    this.setState(() => ({
      inputHasFocus: false
    }), this.handleHideDropdown)
  }

  handleShowDropdown = () => {

    if (this.props.disabled || this.props.readOnly) return

    this.props.onFocus()

    this.setState(() => ({
      dropdownHasFocus: true
    }))
  }

  handleHideDropdown = () => {

    if (this.state.inputHasFocus || this.state.dropdownHasFocus) return

    this.props.onBlur()

    this.setState(() => ({
      dropdownHasFocus: false,
      text: "",
      focusedOptionIndex: null,
    }))
  }

  handleTextChange = text => {
    this.setState(() => ({
      text,
      focusedOptionIndex: null,
    }))
  }

  handleChange = newValue => {
    this.props.onChange(newValue)

    this.setState(() => ({
      dropdownHasFocus: false,
      inputHasFocus: false,
      text: "",
      focusedOptionIndex: null,
    }))
  }

  handleClear = () => {
    this.props.onChange()

    this.setState(() => ({
      dropdownHasFocus: true,
    }))
  }

  handleKeyDown = event => {

    const { key } = event

    if (key === KEY.ARROW_DOWN)
      this.handleNavigateDown()
    else if (key === KEY.ARROW_UP)
      this.handleNavigateUp()  
    else if (key === KEY.ENTER)
    {

      if (typeof this.state.focusedOptionIndex !== 'number')
        return

      const value = this.getResolvedOptions()[this.state.focusedOptionIndex]
      if (value instanceof SelectCreateOption)
        this.handleCreateOption(
          this.props.resolveCreateTextToOption(value.value)
        )
      else
        this.handleChange(value)
    }
    else
      return

    event.preventDefault()
    event.stopPropagation()

  }

  handleNavigateDown = () => {
    const { focusedOptionIndex } = this.state
    const options = this.getResolvedOptions()
    if (!options.length) return

    if (focusedOptionIndex === null ||
      focusedOptionIndex >= options.length - 1)
        this.setState(() => ({ 
          focusedOptionIndex: getNextValidOptionIndex({
            startIndex: 0,
            step: 1,
            options,
          }) 
        }))
    else
      this.setState(() => ({ 
        focusedOptionIndex: getNextValidOptionIndex({
          startIndex: focusedOptionIndex + 1,
          step: 1,
          options,
        }) 
      }))

  }

  handleNavigateUp = () => {
    const { focusedOptionIndex } = this.state
    const options = this.getResolvedOptions()
    if (!options.length) return

    if (focusedOptionIndex === null ||
      focusedOptionIndex <= 0)
        this.setState(() => ({ 
          focusedOptionIndex: getNextValidOptionIndex({
            startIndex: options.length - 1,
            step: -1,
            options,
          }) 
        }))
    else
      this.setState(() => ({ 
        focusedOptionIndex: getNextValidOptionIndex({
          startIndex: focusedOptionIndex - 1,
          step: -1,
          options,
        }) 
      }))

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
      renderValue,
      value,
      onChange,
      maxDropdownHeight,
      ...rest,
    } = this.props

    const shouldRenderInput = value === undefined ||
      this.state.dropdownHasFocus
    
    const shouldRenderDropdown = this.state.dropdownHasFocus === null ?
      !!this.props.autoFocus : 
      this.state.dropdownHasFocus

    return (
      <Dropdown
        hasFocus={shouldRenderDropdown}
        onHide={() => {
          this.setState(() => ({
            dropdownHasFocus: false
          }), this.handleHideDropdown)
        }}
        onShow={() => {
          this.setState(() => ({
            dropdownHasFocus: true
          }), this.handleShowDropdown)
        }}
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
        <Dropdown.Trigger className="input-trigger">
          {shouldRenderInput ?
            <RawInput
              {...rest}
              autoFocus={this.state.dropdownHasFocus || rest.autoFocus}
              value={this.state.text}
              onChange={this.handleTextChange}
              type="text"
              disabled={!!disabled}
              className="_input"
              onFocus={this.handleFocusInput}
              onBlur={this.handleBlurInput}
              onKeyDown={this.handleKeyDown}
            /> : <div
            className="_input-value"
            >
              {renderValue(value)}
            </div>
        }
        {!shouldRenderDropdown && (
          (clearable && value) ?
            <Icon.Clear
              className="_icon --control"
              onClick={this.handleClear}
            /> : CustomIcon ?
              <CustomIcon
                className="_icon"
              /> :
              <Icon.DropDown
                className="_icon"
              />
        )}
      </Dropdown.Trigger>
      <Dropdown.Content 
        className="input-dropdown" 
        style={{
          maxHeight: maxDropdownHeight,
          overflow: "auto",
        }}
      >
      </Dropdown.Content>
    </Dropdown>
    )
  }
}

DateInput.displayName = "DateInput"

DateInput.propTypes = {
...basicComponentProps.propTypes,
...basicInputProps.propTypes,
}

DateInput.defaultProps = {
...basicComponentProps.defaultProps,
...basicInputProps.defaultProps,
}

export default DateInput