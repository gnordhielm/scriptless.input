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
  "--toggle",
)
const ToggleInput = ({
    className,
    disabled,
    readOnly,
    label,
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
        onClick={() => {
            onChange(!value)
        }}
    >
        <div className="__switch-container">
            <div className="__line"></div>
            <div className="__switch"></div>
        </div>
        {label && 
            <div className="__label">{label}</div>
        }
    </div>
)

ToggleInput.displayName = "ToggleInput"
ToggleInput.propTypes = {
    ...basicComponentProps.propTypes,
    label: PropTypes.string,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
}

ToggleInput.defaultProps = {
    readOnly: false,
    disabled: false,
}

export default ToggleInput