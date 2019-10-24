import React from 'react'
import PropTypes from 'prop-types'

import _noop from 'lodash/noop'
import { classNames } from '@leiops/helpers'
import Icon from '@leiops/icon'

import * as basicComponentProps from 'utils/basicComponentProps'
import isDefined from 'utils/isDefined'
import { baseClass } from 'settings'

const rootClassName = classNames(
  baseClass + "-container",
  "--radio",
)
const RadioInput = ({
    className,
    disabled,
    readOnly,
    options,
    value,
    onChange,
}) => (
    <div
        className={classNames(
            rootClassName, 
            className,
            disabled && "--disabled",
            readOnly && "--read-only",
            value && "--active",
        )}
        title={
            (disabled && typeof disabled === 'string') ?
            disabled : undefined
        }
    >
        {options.map((option, index) => (
            <div 
                key={option + index}
                className={classNames(
                    "__option",
                    option === value && "--active"
                )}
                onClick={() => {
                    if (disabled) return
                    onChange(option)
                }}
            >
                <div className="__button-container">
                    <div className="__button-content" />
                </div>
                <div className="__label">
                    {option}
                </div>
            </div>
        ))
        }
    </div>
)

RadioInput.displayName = "RadioInput"
RadioInput.propTypes = {
    ...basicComponentProps.propTypes,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
}

RadioInput.defaultProps = {
    readOnly: false,
    disabled: false,
}

export default RadioInput