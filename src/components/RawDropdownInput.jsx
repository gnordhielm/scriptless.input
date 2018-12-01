import React from 'react'
import PropTypes from 'prop-types'
import _noop from 'lodash/noop'
import Icon from '@leiops/icon'
import Dropdown from '@scriptless/dropdown'

import * as basicComponentProps from 'utils/basicComponentProps'
import * as basicInputProps from 'utils/basicInputProps'
import * as selectInputProps from 'utils/selectInputProps'
import RawInput from 'components/RawInput'

// TO DO - tabbing away should close the dropdown and fire onBlur

class RawDropdownInput extends React.Component {

  dropdown = React.createRef()

  state = {
    inputHasFocus: !!this.props.autoFocus,
    dropdownHasFocus: !!this.props.autoFocus,
    text: "",
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
    }))
  }

  handleShowDropdown = () => {

    if (this.props.disabled || this.props.readOnly) return

    this.props.onFocus()

    this.setState(() => ({
      dropdownHasFocus: true
    }))
  }

  handleHideDropdown = () => {

    if (this.state.inputHasFocus) return

    this.props.onBlur()

    this.setState(() => ({
      dropdownHasFocus: false,
      text: "",
    }))
  }

  handleTextChange = text => {
    this.setState(() => ({
      text,
    }))
  }

  handleChange = newValue => {
    this.props.onChange(newValue)

    this.setState(() => ({
      dropdownHasFocus: false,
      inputHasFocus: false,
      text: "",
    }))
  }

  handleClear = () => {
    this.props.onClear()

    this.setState(() => ({
      dropdownHasFocus: true,
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
      renderDivider,
      value,
      onChange,
      maxDropdownHeight,
      children,
      style,
      ...rest,
    } = this.props

    const shouldRenderInput = value === undefined ||
      this.state.dropdownHasFocus
    const shouldRenderDropdown = this.state.dropdownHasFocus

    return (
      <Dropdown
        style={style}
        className={className}
        ref={this.dropdown}
        hasFocus={shouldRenderDropdown}
        onHide={this.handleHideDropdown}
        onShow={this.handleShowDropdown}
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
          }}
        >
            {children({
                onHide: this.handleHideDropdown,
                onShow: this.handleShowDropdown,
            })}
        </Dropdown.Content>
      </Dropdown>
    )
  }
}

RawDropdownInput.displayName = "RawDropdownInput"

RawDropdownInput.propTypes = {
    // children: PropTypes.func,
  ...basicComponentProps.propTypes,
  ...basicInputProps.propTypes,
  ...selectInputProps.propTypes,
}

RawDropdownInput.defaultProps = {
  ...basicComponentProps.defaultProps,
  ...basicInputProps.defaultProps,
  ...selectInputProps.defaultProps,
}

export default RawDropdownInput

