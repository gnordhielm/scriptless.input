import React from "react"
import PropTypes from "prop-types"
import _noop from "lodash/noop"
import { classNames } from "@leiops/helpers"
import Icon from "@leiops/icon"

import * as basicComponentProps from "utils/basicComponentProps"
import * as basicInputProps from "utils/basicInputProps"
import isDefined from "utils/isDefined"
import { baseClass } from "settings"
import RawInput from "components/RawInput"

// DEV - if I separate key functional styles from presentational ones, this baseClass thing becomes a non-issue. People can very easily overwrite existing styles without worrying about anything. The only concern might be making the class name more unique

const rootClassName = classNames(baseClass + "-container", "--string")

// TO DO - clearing should deliver focus to the child
const StringInput = ({
  className,
  clearable,
  Icon: CustomIcon,
  disabled,
  inline,
  minWidth,
  maxWidth,
  ...rest
}) => (
  <div
    className={classNames(
      rootClassName,
      className,
      disabled && "--disabled",
      rest.readOnly && "--read-only",
      inline && "--inline",
      ((clearable && rest.value) || isDefined(CustomIcon)) && "--with-icon",
      rest.autoSize && "--auto-size"
    )}
    style={{
      width: rest.autoSize ? "min-content" : undefined,
      minWidth,
      maxWidth
    }}
    title={disabled && typeof disabled === "string" ? disabled : undefined}
  >
    <RawInput {...rest} type="text" disabled={!!disabled} className="_input" />
    {clearable && rest.value ? (
      <Icon.Clear className="_icon --control" onClick={() => rest.onChange()} />
    ) : CustomIcon ? (
      <CustomIcon className="_icon" />
    ) : null}
  </div>
)

StringInput.displayName = "StringInput"

StringInput.propTypes = {
  ...basicComponentProps.propTypes,
  ...basicInputProps.propTypes,
  // delay repeated invocations of onChange
  debounce: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
}

StringInput.defaultProps = {
  ...basicComponentProps.defaultProps,
  ...basicInputProps.defaultProps
}

export default StringInput
