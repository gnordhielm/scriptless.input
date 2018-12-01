import React from 'react'
import PropTypes from 'prop-types'
import _cloneDeep from 'lodash/cloneDeep'
import { Object } from 'es6-shim';

const initialState = {
    values: {},
    incompleteValues: {},
    renderToIndex: 0,
    hasFocus: false,
}

class ChainedInput extends React.Component {

    state = _cloneDeep(initialState)

    getHandleChange = index => {
        return newValue => {
            this.setState(prevState => ({
                values: {
                    ...prevState.values,
                    [index]: newValue,
                },
                renderToIndex: index + 1,
            }))
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

        // const hasCompleteValue = this.props.children.length === Object.values(this.state.values).filter(val => val).length

        // console.log('hasCompleteValue', hasCompleteValue);
        
        return (
            <div className="input-container --chained">
                {this.props.children.map((child, index) => {

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
    clearable: PropTypes.bool,

    inline: PropTypes.bool,
    
    children: PropTypes.arrayOf(PropTypes.func).isRequired,
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