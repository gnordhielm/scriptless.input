import React from 'react'
import PropTypes from 'prop-types'
import _noop from 'lodash/noop'
import { classNames } from '@leiops/helpers'
import Icon from '@leiops/icon'
import Dropdown from '@leiops/dropdown'

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
      ...rest,
    } = this.props
    return (
      <Dropdown.Portal>
        <Dropdown.Trigger>
          hi
          {/* <div
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
            <RawInput
              {...rest}
              type="text"
              disabled={!!disabled}
              className="__input"
            />
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
          </div> */}
        </Dropdown.Trigger>
        <Dropdown.Content>
          HI
        </Dropdown.Content>
      </Dropdown.Portal>
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

