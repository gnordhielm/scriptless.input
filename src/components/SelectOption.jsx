import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '@leiops/helpers'

class SelectDropdownOption extends React.Component {

    elementRef = React.createRef()

    handleClick = () => {
        this.props.onChoose(this.props.value)
    }

    render() {

        const {
            children,
            hasFocus,
        } = this.props

        // DEV - I do notice this blocking my scrolling sometimes, it isn't perfect

        if (hasFocus && this.elementRef.current)
            this.elementRef.current.scrollIntoView({ block: 'nearest' })

        return (
            <div
                ref={this.elementRef}
                className={classNames(
                    "select-option",
                    hasFocus && "--has-focus",
                )}
                onClick={this.handleClick}
            >
                {children}
            </div>
        )
    }
}


SelectDropdownOption.propTypes = {
    value: PropTypes.any.isRequired,
    children: PropTypes.node.isRequired,
    onChoose: PropTypes.func.isRequired,
    hasFocus: PropTypes.bool.isRequired,
}

export default SelectDropdownOption