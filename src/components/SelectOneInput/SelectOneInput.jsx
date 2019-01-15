import React from 'react'
import PropTypes from 'prop-types'
import _noop from 'lodash/noop'
import {
  classNames,
  pluralize,
} from '@leiops/helpers'
import Icon from '@leiops/icon'
import Dropdown from '@scriptless/dropdown'

import * as basicComponentProps from 'utils/basicComponentProps'
import * as basicInputProps from 'utils/basicInputProps'
import * as selectInputProps from 'utils/selectInputProps'
import getIsCreateTextEqualToOption from 'utils/getIsCreateTextEqualToOption'
import isDefined from 'utils/isDefined'
import { KEY } from 'utils/constants'
import { baseClass } from 'settings'
import RawInput from 'components/RawInput'
import SelectOption from 'components/SelectOption'
import SelectDivider from 'utils/SelectDivider'
import SelectCreateOption from 'utils/SelectCreateOption'

const rootClassName = classNames(
  baseClass + "-container",
  "--select-one",
)

// TO DO - hitting enter when there is only one option should select it automatically

// TO DO - tabbing away should close the dropdown and fire onBlur

// TO DO - this doesn't know how to handle flipping back to the top or bottom on overflow, it needs to if I 'm going to fix the navigate up with keyboard bug
const getNextValidOptionIndex = ({
  startIndex, 
  step,
  options,
}) => {
  
  if (startIndex >= options.length)
    return null

  if (options[startIndex] instanceof SelectDivider)
    return getNextValidOptionIndex({
      startIndex: startIndex + step,
      step,
      options,
    })
    
  return startIndex

}

class SelectOneInput extends React.Component {

  state = {
    dropdownIsOpen: null,
    text: "",
    // DEV - it is a rule that this should NEVER be set to an index which does not correspond to an option value in the filtered array
    focusedOptionIndex: null,
  }

  getShouldOfferCreate = () => (
    this.props.onCreateOption && 
    !!this.state.text &&
    !getIsCreateTextEqualToOption({
      options: this.props.options,
      createText: this.state.text,
      resolveCreateTextToOption: this.props.resolveCreateTextToOption,
    })
  )

  // TO DO - optimize. The wastefulness of this. Good lord.
  getResolvedOptions = () => {

    const dividers = []
    const groups = {}
    let toGroup = []
    let lastGroup

    this.props.options.forEach((option, index) => {
      if (option instanceof SelectDivider)
      {
        if (index > 0)
        {
          groups[lastGroup] = toGroup
          toGroup = []
        }       

        dividers.push(option)
        lastGroup = option.value
      }
      else if (this.props.filterOption(option, this.state.text))
        toGroup.push(option)

    })

    let result = []

    if (!dividers.length)
      result = toGroup
    else
      dividers.forEach((divider, index) => {
        const groupedOptions = groups[divider.value] || []

        if (index === (dividers.length - 1) && toGroup.length)
        {
          result.push(divider)
          toGroup.forEach(option => {
            result.push(option)
          })
        }
        else if (groupedOptions.length)
        {
          result.push(divider)
          groupedOptions.forEach(option => {
            result.push(option)
          })
        }
      })

    if (this.getShouldOfferCreate())
      result.push(new SelectCreateOption(this.state.text))

    return result
  }

  handleShowDropdown = () => {

    if (this.props.disabled || this.props.readOnly) return

    this.props.onFocus()

    this.setState(() => ({
      dropdownIsOpen: true
    }))
  }

  handleHideDropdown = () => {
console.log('hide dropdown');

    this.props.onBlur()

    this.setState(() => ({
      dropdownIsOpen: false,
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
      dropdownIsOpen: false,
      text: "",
      focusedOptionIndex: null,
    }))
  }

  handleClear = () => {
    this.props.onChange()

    this.setState(() => ({
      dropdownIsOpen: true,
    }))
  }

  handleCreateOption = newOption => {
    this.props.onCreateOption(newOption)

    this.setState(() => ({
      dropdownIsOpen: false,
      text: "",
      focusedOptionIndex: null,
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

  renderOption = (option, index) => {
    // DEV - is it okay to use index as key here? What if the options change and the filter text doesn't?

    if (option instanceof SelectDivider)
      return (
        <div 
          className="__divider" 
          key={option.value}
        >{this.props.renderDivider(option.value)}</div>
      )

    if (option instanceof SelectCreateOption)
      return (
        <SelectOption 
          key={index + this.state.text}
          onChoose={this.handleCreateOption}
          value={this.props.resolveCreateTextToOption(option.value)}
          hasFocus={this.state.focusedOptionIndex === index}
        >Create "{option.value}"</SelectOption>
      )

    return (
      <SelectOption 
        key={index + this.state.text}
        onChoose={this.handleChange}
        value={option}
        hasFocus={this.state.focusedOptionIndex === index}
      >{this.props.renderOption(option)}</SelectOption>
    )

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
      renderDivider,
      value,
      onChange,
      optionTerm,
      filterOption,
      maxDropdownHeight,
      onCreateOption,
      resolveCreateTextToOption,
      onBlur,
      onFocus,
      ...rest,
    } = this.props

    const filteredOptions = this.getResolvedOptions()
    const shouldRenderInput = value === undefined ||
      this.state.dropdownIsOpen

    const shouldRenderDropdown = this.state.dropdownIsOpen === null ?
      !!this.props.autoFocus : 
      this.state.dropdownIsOpen

    const emptyMessage = !options.length ?
      `No ${pluralize(0, optionTerm, null, true)}.` :
      !filteredOptions.length ?
        `No matching ${pluralize(0, optionTerm, null, true)}.` :
        undefined

    return (
      <Dropdown
        hasFocus={shouldRenderDropdown}
        onHide={this.handleHideDropdown}
        onShow={this.handleShowDropdown}
        triggerShouldNotToggle
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
                autoFocus={this.state.dropdownIsOpen || rest.autoFocus}
                value={this.state.text}
                onChange={this.handleTextChange}
                type="text"
                disabled={!!disabled}
                className="_input"
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
            outline: "none",
          }}
        >
          {filteredOptions.map(this.renderOption)}
          {emptyMessage &&
            <div className="__empty-message">
              {emptyMessage}
            </div>
          }
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

