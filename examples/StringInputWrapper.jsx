import React from 'react'
import PropTypes from 'prop-types'
import _omit from 'lodash/omit'

import StringInput from 'components/StringInput'

class StringInputWrapper extends React.Component {
  
  state = {
    value: ""
  }

  handleChange = value => {
    this.setState(() => ({ value }))
  }

  render() {

    // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
    // example wrapper but are not props on the SingleDatePicker itself and
    // thus, have to be _omitted.
    // const props = _omit(this.props, [
    //   'autoFocus',
    //   'autoFocusEndDate',
    //   'initialStartDate',
    //   'initialEndDate',
    //   'stateDateWrapper',
    // ])

    return (
      <div className="string-input-wrapper">
        <StringInput
          { ...this.props.stringInputProps }
          onChange={this.handleChange}
          value={this.state.value}
        />
      </div>
    )
  }
}

StringInputWrapper.propTypes = {
  // example props for the demo
  // autoFocus: false,
  // autoFocusEndDate: false,
  // initialStartDate: null,
  // initialEndDate: null,

  // // input related props
  // startDateId: START_DATE,
  // startDatePlaceholderText: 'Start Date',
  // endDateId: END_DATE,
  // endDatePlaceholderText: 'End Date',
  // disabled: false,
  // required: false,
  // screenReaderInputMessage: '',
  // showClearDates: false,
  // showDefaultInputIcon: false,
  // customInputIcon: null,
  // customArrowIcon: null,
  // customCloseIcon: null,
  // block: false,
  // small: false,
  // regular: false,

  // // calendar presentation and interaction related props
  // renderMonthText: null,
  // orientation: HORIZONTAL_ORIENTATION,
  // anchorDirection: ANCHOR_LEFT,
  // horizontalMargin: 0,
  // withPortal: false,
  // withFullScreenPortal: false,
  // initialVisibleMonth: null,
  // numberOfMonths: 2,
  // keepOpenOnDateSelect: false,
  // reopenPickerOnClearDates: false,
  // isRTL: false,

  // // navigation related props
  // navPrev: null,
  // navNext: null,
  // onPrevMonthClick() {},
  // onNextMonthClick() {},
  // onClose() {},

  // // day presentation and interaction related props
  // renderCalendarDay: undefined,
  // renderDayContents: null,
  // minimumNights: 1,
  // enableOutsideDays: false,
  // isDayBlocked: () => false,
  // isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  // isDayHighlighted: () => false,

  // // internationalization
  // displayFormat: () => moment.localeData().longDateFormat('L'),
  // monthFormat: 'MMMM YYYY',
  // phrases: DateRangePickerPhrases,

  // stateDateWrapper: date => date,
}

StringInputWrapper.defaultProps = {
  stringInputProps: {},
}

export default StringInputWrapper