import PropTypes from 'prop-types'
import _noop from 'lodash/noop'

export const propTypes = {
  renderValue: PropTypes.func,
  renderOption: PropTypes.func,
  options: PropTypes.array.isRequired,
  getGroupedOptions: PropTypes.func,
}

export const defaultProps = {
  renderValue: _ => _,
  renderOption: _ => _,
}