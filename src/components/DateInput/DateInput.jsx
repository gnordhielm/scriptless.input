import React from 'react'
import PropTypes from 'prop-types'
import _noop from 'lodash/noop'
import {
  classNames,
  pluralize,
} from '@leiops/helpers'
import Icon from '@leiops/icon'
import Dropdown from '@scriptless/dropdown'
import moment from 'moment'

import * as basicComponentProps from 'utils/basicComponentProps'
import * as basicInputProps from 'utils/basicInputProps'
import isDefined from 'utils/isDefined'
import { KEY } from 'utils/constants'
import { baseClass } from 'settings'
import RawInput from 'components/RawInput'
import Calendar from 'components/Calendar'

const rootClassName = classNames(
  baseClass + "-container",
  "--date",
)

// TO DO - accept some kind of text input

class DateInput extends React.Component {  
  
  state = {
    inputHasFocus: !!this.props.autoFocus,
    dropdownHasFocus: null,
    text: "",
    focusedDay: null,
  }

  getFocusedDay = () => {
    return this.state.focusedDay === null ? 
      moment(this.props.value) :
      this.state.focusedDay
  }

  stepFocusedDay = ({
    step,
    stepBackward=false,
    snap=false,
  }) => {
    // TO DO - check against max and min

    const newFocusedDay = this.getFocusedDay()
      .clone()
      .add(stepBackward ? -1 : 1, step)

    if (snap && stepBackward)
      newFocusedDay.endOf(step)
    if (snap && !stepBackward)
      newFocusedDay.startOf(step)

    return newFocusedDay
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
      focusedDay: null,
    }))
  }

  handleTextChange = text => {
    this.setState(() => ({
      text,
      focusedDay: null,
    }))
  }

  handleChange = newValue => {
    if (isDefined(newValue))
      this.props.onChange(newValue.valueOf())
    else
      this.props.onChange(undefined)

    this.setState(() => ({
      dropdownHasFocus: false,
      inputHasFocus: false,
      text: "",
      focusedDay: null,
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
    let newFocusedDay

    if (key === KEY.ARROW_DOWN)
      newFocusedDay = this.stepFocusedDay({
        step: 'week',
      })
    else if (key === KEY.ARROW_UP)
      newFocusedDay = this.stepFocusedDay({
        step: 'week',
        stepBackward: true,
      })
    else if (key === KEY.ARROW_LEFT)
      newFocusedDay = this.stepFocusedDay({
        step: 'day',
        stepBackward: true,
      })
    else if (key === KEY.ARROW_RIGHT)
      newFocusedDay = this.stepFocusedDay({
        step: 'day',
      })
    else if (key === KEY.ENTER)
      this.handleChange(this.getFocusedDay())
    else
      return

    if (newFocusedDay)
    {
      this.setState(() => ({ focusedDay: newFocusedDay }))
      return
    }

    event.preventDefault()
    event.stopPropagation()

  }

  handlePageLeft = () => {
    this.setState(() => ({ 
      focusedDay: this.stepFocusedDay({
        step: 'month',
        stepBackward: true,
        snap: true,
      }) 
    }))
  }

  handlePageRight = () => {
    this.setState(() => ({ 
      focusedDay: this.stepFocusedDay({
        step: 'month',
        snap: true,
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
      renderFormat,
      value,
      onChange,
      maxDropdownHeight,
      ...rest,
    } = this.props

    const renderedValue = value ? moment(value).format(renderFormat) : ""

    const shouldRenderInput = value === undefined ||
      this.state.dropdownHasFocus
    
    const shouldRenderDropdown = this.state.dropdownHasFocus === null ?
      !!this.props.autoFocus : 
      this.state.dropdownHasFocus

    return (
      <Dropdown
        hasFocus={shouldRenderDropdown}
        onHide={this.handleHideDropdown}
        onShow={this.handleShowDropdown}
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
              {renderedValue}
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
              <Icon.Calendar
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
        <Calendar
          focusedDay={this.getFocusedDay()}
          onDayClick={this.handleChange}
          onPageLeft={this.handlePageLeft}
          onPageRight={this.handlePageRight}
        />
      </Dropdown.Content>
    </Dropdown>
    )
  }
}

DateInput.displayName = "DateInput"

DateInput.propTypes = {
...basicComponentProps.propTypes,
...basicInputProps.propTypes,
  renderFormat: PropTypes.string,
}

DateInput.defaultProps = {
  ...basicComponentProps.defaultProps,
  ...basicInputProps.defaultProps,
  renderFormat: "M/D/YY",
}

export default DateInput