import PropTypes from 'prop-types'
import _noop from 'lodash/noop'

import filterOption from 'utils/filterOption'

export const propTypes = {
  renderValue: PropTypes.func,
  renderOption: PropTypes.func,
  options: PropTypes.array.isRequired,
  getGroupedOptions: PropTypes.func,
  optionTerm: PropTypes.string,  
  filterOption: PropTypes.func,
  maxDropdownHeight: PropTypes.number,
}

export const defaultProps = {
  renderValue: _ => _,
  renderOption: _ => _,
  optionTerm: "option",
  filterOption: filterOption,
  maxDropdownHeight: 200,
}