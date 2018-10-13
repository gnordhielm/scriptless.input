import PropTypes from 'prop-types'

export const propTypes = {
  // focus the input as soon as it enters the DOM
  autoFocus: PropTypes.bool,
  // delay repeated invocations of onChange
  debounce: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  // stop the component from receiving user input, when passed a string, that string will be displayed on hover
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),

  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,

  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onEnter: PropTypes.func,

}

export const defaultProps = {
  autoSize: false,
  debounce: false,
  disabled: false,
  readOnly: false,
}