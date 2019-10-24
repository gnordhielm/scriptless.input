import React from 'react'
import PropTypes from 'prop-types'
import Icon from '@leiops/icon'
import { getCalendarMonthWeeks } from '@leiops/helpers'
import moment from 'moment'

const Calendar = ({
    focusedDay,
    onPageLeft,
    onPageRight,
    onDayClick,
}) => {
    
    return (
        <div className="calendar">
            <div className="__header">
                <Icon.ChevronLeft 
                    className="__page-button" 
                    onClick={onPageLeft} 
                />
                <div className="__title">{focusedDay.format("MMMM YYYY")}</div>
                <Icon.ChevronRight 
                    className="__page-button" 
                    onClick={onPageRight} 
                />
            </div>

            <div className="__days">
                <span className="__day">Sun</span>
                <span className="__day">Mon</span>
                <span className="__day">Tue</span>
                <span className="__day">Wed</span>
                <span className="__day">Thu</span>
                <span className="__day">Fri</span>
                <span className="__day">Sat</span>
            </div>

            <div className="__body">
                {getCalendarMonthWeeks(focusedDay, { allowOutside: true })
                    .map((week, i) => (
                        <div className="__week" key={i}>
                            {week.map((day, j) =>
                                day && day.month() === focusedDay.month() ?
                                    <div
                                        className={`__day ${
                                            day.isSame(
                                                focusedDay, 'day'
                                            ) ? '--active' : ''
                                            }`}
                                        onClick={() => {
                                            onDayClick(day)
                                        }}
                                        key={j}
                                    >{day.format("D")}</div> :
                                    <div
                                        className="__day --disabled"
                                        key={j}
                                    >{day && day.format("D")}</div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}

Calendar.displayName = "Calendar"
Calendar.propTypes = {
    focusedDay: PropTypes.instanceOf(moment).isRequired,
    onPageLeft: PropTypes.func.isRequired,
    onPageRight: PropTypes.func.isRequired,
    onDayClick: PropTypes.func.isRequired,
}

export default Calendar