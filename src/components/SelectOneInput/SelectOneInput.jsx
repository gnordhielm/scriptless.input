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
import isDefined from 'utils/isDefined'
import { KEY } from 'utils/constants'
import { baseClass } from 'settings'
import RawInput from 'components/RawInput'
import SelectOption from 'components/SelectOption'
import SelectDivider from 'utils/SelectDivider'

const rootClassName = classNames(
  baseClass + "-container",
  "--select-one",
)

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

  dropdown = React.createRef()

  state = {
    inputHasFocus: !!this.props.autoFocus,
    dropdownHasFocus: !!this.props.autoFocus,
    text: "",
    // DEV - it is a rule that this should NEVER be set to an index which does not correspond to an option value in the filtered array
    focusedOptionIndex: null,
  }

  // TO DO - optimize. The wastefulness of this. Good lord.
  getFilteredOptions = () => {

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

    if (!dividers.length)
      return toGroup

    const result = []

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

    return result
  }



  handleFocusInput = () => {
    this.setState(() => ({
      inputHasFocus: true
    }))
  }

  handleBlurInput = () => {
    this.setState(() => ({
      inputHasFocus: false
    }))
  }

  handleShowDropdown = () => {
    this.setState(() => ({
      dropdownHasFocus: true
    }))
  }

  handleHideDropdown = () => {

    if (this.state.inputHasFocus) return

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

  handleKeyDown = event => {

    const { key } = event

    if (key === KEY.ARROW_DOWN)
      this.handleNavigateDown()
    else if (key === KEY.ARROW_UP)
      this.handleNavigateUp()  
    else if (key === KEY.ENTER)
      this.handleChange(
        this.getFilteredOptions()[this.state.focusedOptionIndex]
      )
    else
      return

    event.preventDefault()
    event.stopPropagation()

  }

  handleNavigateDown = () => {
    const { focusedOptionIndex } = this.state
    const options = this.getFilteredOptions()
    if (!options.length) return

    if (focusedOptionIndex === null ||
      focusedOptionIndex === options.length - 1)
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
    const options = this.getFilteredOptions()
    if (!options.length) return

    if (focusedOptionIndex === null ||
      focusedOptionIndex === 0)
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
      options,
      renderValue,
      renderOption,
      value,
      onChange,
      optionTerm,
      filterOption,
      maxDropdownHeight,
      ...rest,
    } = this.props

    const filteredOptions = this.getFilteredOptions()
    const shouldRenderInput = value === undefined ||
      this.state.dropdownHasFocus

    const emptyMessage = !options.length ?
      `No ${pluralize(0, optionTerm, null, true)}.` :
      !filteredOptions.length ?
        `No matching ${pluralize(0, optionTerm, null, true)}.` :
        undefined

    return (
      <Dropdown
        ref={this.dropdown}
        hasFocus={this.state.dropdownHasFocus}
        onHide={this.handleHideDropdown}
        onShow={this.handleShowDropdown}
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
                autoFocus={this.state.dropdownHasFocus || rest.autoFocus}
                value={this.state.text}
                onChange={this.handleTextChange}
                type="text"
                disabled={!!disabled}
                className="__input"
                onFocus={this.handleFocusInput}
                onBlur={this.handleBlurInput}
                onKeyDown={this.handleKeyDown}
              /> : <div
                className="__input-value"
              >
                {renderValue(value)}
              </div>
            }
            {(clearable && value) ?
              <Icon.Clear
                className="__icon --control"
                onClick={() => onChange()}
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
        <Dropdown.Content 
          className="input-dropdown" 
          style={{
            maxHeight: maxDropdownHeight,
            overflow: "auto",
          }}
        >
          {emptyMessage &&
            <div className="__empty-message">
              {emptyMessage}
            </div>
          }
          {/* DEV - is it okay to use index as key here? What if the options change and the filter text doesn't? */}
          {filteredOptions.map((option, idx) => option instanceof SelectDivider ?
            <div className="__divider" key={option.value}>
              {option.value}
            </div> :
            <SelectOption 
              key={idx + this.state.text}
              onChoose={this.handleChange}
              value={option}
              hasFocus={this.state.focusedOptionIndex === idx}
            >
              {renderOption(option)}
            </SelectOption>
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

