import PropTypes from 'prop-types'

export const propTypes = {
  // focus the input as soon as it enters the DOM
  autoFocus: PropTypes.bool,
  // will provide a clear button, which will trigger an onchange with undefined when clicked
  clearable: PropTypes.bool,
  // stop the component from receiving user input, when passed a string, that string will be displayed on hover
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  // a component to render as an icon, must have the class _icon
  Icon: PropTypes.func,

  readOnly: PropTypes.bool,
  inline: PropTypes.bool,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  placeholder: PropTypes.string,

  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onEnter: PropTypes.func,

}

export const defaultProps = {
  autoSize: false,
  clearable: false,
  debounce: false,
  disabled: false,
  readOnly: false,
  inline: false,

  onFocus: () => undefined,
  onBlur: () => undefined,
}