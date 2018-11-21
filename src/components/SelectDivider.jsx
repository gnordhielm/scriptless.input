import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@leiops/helpers'

const SelectDropdownDivider = ({ children }) => (
    <div className="select-divider">
        {children}
    </div>
)


SelectDropdownDivider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default SelectDropdownDivider