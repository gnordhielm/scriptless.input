import React from 'react'
import PropTypes from 'prop-types'
import _defer from 'lodash/defer'
import _cloneDeep from 'lodash/cloneDeep'

const initialState = {
    values: {},
    incompleteValues: {},
    renderToIndex: 0,
    hasFocus: false,
}
// TO DO - it should be easier to change the child inputs at runtime - this means calling an onChange after each input is submitted

class ChainedInput extends React.Component {

    state = _cloneDeep(initialState)

    getHasCompleteValue = () => {
        return (Array.isArray(this.props.children) ? 
            this.props.children.length : 1
        ) === 
            Object
                .values(this.state.values)
                .filter(_ => _)
                .length
    }

    getHandleChange = index => {
        return newValue => {
            this.setState(prevState => ({
                values: {
                    ...prevState.values,
                    [index]: newValue,
                },
                renderToIndex: index + 1,
            }), () => {
                if (this.getHasCompleteValue())
                {
                    const value = []
                    Object
                        .keys(this.state.values)
                        .sort((a,b) => parseInt(a, 10) - parseInt(b, 10))
                        .forEach(key => {
                            value.push(this.state.values[key])
                        })

                    this.props.onChange(value)
                }
            })
        }
    }

    getHandleIncompleteChange = index => {

        return newValue => {
            this.setState(prevState => ({
                incompleteValues: {
                    ...prevState.incompleteValues,
                    [index]: newValue,
                },
            }))
        }
    }

    getHandleCompleteChange = index => {
        return () => {
            this.getHandleChange(index)(this.state.incompleteValues[index])
        }
    }

    handleFocus = () => {
        this.setState(() => ({
            hasFocus: true,
        }))
    }

    handleBlur = () => {
        this.setState(() => _cloneDeep(initialState))
    }

    render() {

        if (!this.state.hasFocus)
            return (
                <div 
                    className="input-container --chained --trigger"
                    onClick={this.handleFocus}
                    onFocus={this.handleFocus}
                    tabIndex={1}
                >
                    {this.props.renderTrigger()}
                </div>
            )

        const normalizedChildren = Array.isArray(this.props.children) ?
                this.props.children :
                [ this.props.children ]

        return (
            <div className="input-container --chained">
                {normalizedChildren.map((child, index) => {

                    if (index > this.state.renderToIndex)
                        return null

                    if (this.state.values[index])
                        return <div className="__value" key={index}>
                            {this.props.renderValue(this.state.values[index])}
                        </div>

                    return child({
                        key: index,
                        onCompleteChange: this.getHandleCompleteChange(index),
                        onIncompleteChange: this.getHandleIncompleteChange(index),
                        onChange: this.getHandleChange(index),
                        value: this.state.incompleteValues[index],
                        autoFocus: true,
                        onBlur: this.handleBlur,
                    })
                })}
                {/* {this.getHasCompleteValue() &&
                    <Icon.Clear />
                } */}
            </div>
        )
    }
}

ChainedInput.displayName = "ChainedInput"
ChainedInput.propTypes = {
    // TO DO
    // if a chained input is sequential, clearing a value up the chain will clear all subsequent values
    // sequential: PropTypes.bool,
    // can the composite value be cleared?
    // clearable: PropTypes.bool,

    // inline: PropTypes.bool,
    
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func),
    ]).isRequired,
    // a function for rendering the button which opens the input chain
    renderTrigger: PropTypes.func.isRequired,
    // control value renders per index
    renderValue: PropTypes.func,
    // once all values are submitted, this is called
    onChange: PropTypes.func.isRequired
}
ChainedInput.defaultProps = {
    // sequential: false,
    clearable: false,
    renderValue: _ => _,
}

export default ChainedInput