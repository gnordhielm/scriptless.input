import React from 'react'
// import PropTypes from 'prop-types'
// import AutosizeInput from 'react-input-autosize'
// import _noop from 'lodash/noop'
import withDebouncedOnChange from 'utils/withDebouncedOnChange'

// class StringInput extends React.Component {

//     state = {
//         value: this.props.value || ''
//     }

//     setInputRef = el => { this.inputElement = el }

//     static getDerivedStateFromProps = () => {
//         return null
//     }

//     UNSAFE_componentWillReceiveProps({ value, autoFocus }) {
        
//         // if (this.inputElement &&
//         //     autoFocus && 
//         //     autoFocus !== this.props.autoFocus)
//         //     this.inputElement.focus()

//         // if (this.pendingOnChange) return
//         // if (typeof value !== 'undefined' && this.state.value !== value) {
//         //     this.setState(() => ({ value }))
//         // }

//     }

//     handleChange = event => {
//         event.persist()

//         const newValue = event.target.value
//         this.setState(() => ({ value: newValue }), () => {
//             this.triggerParentOnChange(newValue)
//         })
//     }

//     onClear = () => {
//         // const newValue = ''
//         // this.setState(() => ({ value: newValue }), () => {
//         //     this.flush()
//         //     if (this.props.onClear) {
//         //         this.props.onClear(newValue)
//         //     } else {
//         //         this.triggerParentOnChange(newValue)
//         //     }
//         // })
//     }

//     checkEnterPress = event => {
//         if (event.key !== 'Enter') return

//         event.persist()
//         this.props.onChange(event.target.value)
//         this.props.onEnter(event)
//     }


//     handleBlur = event => {
//         this.props.onChange(event.target.value)
//         const { onBlur } = this.props
//         if (onBlur) onBlur(event)
//     }

//     // Utility

//     moveCaretToEnd = evt => {
//         evt.persist()
//         // const stash = evt.target.value
//         // evt.target.value = ''
//         // evt.target.value = stash
//         const el = evt.target
//         el.scrollLeft = el.scrollWidth
//         if (typeof el.selectionStart === "number") {
//             el.selectionStart = el.selectionEnd = el.value.length
//         } else if (typeof el.createTextRange !== "undefined") {
//             el.focus()
//             var range = el.createTextRange()
//             range.collapse(false)
//             range.select()
//         }
//     }

//     // Rendering

//     renderIcon = () => {
//         const { onClear, icon, loading } = this.props
//         if (loading) {
//             return <i className="icon loading" />
//         } else if (this.state.value && onClear) {
//             return <i
//                 className="icon remove av action"
//                 onClick={this.onClear}
//             />
//         } else if (icon && typeof icon === 'string') {
//             return <i className={`icon ${icon}`} />
//         } else if (icon) {
//             return <i className="icon search" />
//         }
//     }

//     renderDisabled = disabled => {

//         if (!disabled) return

//         return (<div className="disabled-overlay">
//             {typeof disabled === 'string' &&
//                 <p>{disabled}</p>}
//         </div>)
//     }

//     render() {

//         if (this.props.inline) return (
//             <div className="av string input inline">
//                 {this.renderDisabled(this.props.disabled)}
//                 <AutosizeInput
//                     autoComplete="false"
//                     autoFocus={this.props.autoFocus}
//                     className="exempt"
//                     disabled={this.props.disabled}
// 					minWidth={this.props.minWidth}
//                     onChange={this.handleChange}
//                     onBlur={this.handleBlur}
//                     onFocus={this.moveCaretToEnd}
//                     onKeyDown={this.checkEnterPress}
//                     placeholder={this.props.placeholder}
// 					ref={this.getInputRef}
//                     spellCheck="false"
//                     type="text"
//                     value={this.state.value || ""}
//                 />
//             </div>
//         )

//         return (
//             <div className="av string input">
//                 {this.renderDisabled(this.props.disabled)}
//                 <input
//                     autoComplete="false"
//                     autoFocus={this.props.autoFocus}
//                     className="exempt"
//                     disabled={this.props.disabled}
//                     onChange={this.handleChange}
//                     onBlur={this.handleBlur}
//                     onFocus={this.moveCaretToEnd}
//                     onKeyDown={this.checkEnterPress}
//                     placeholder={this.props.placeholder}
//                     spellCheck="false"
//                     type="text"
//                     value={this.state.value || ""}
//                     readOnly={this.props.readOnly}
//                     ref={this.setInputRef}
//                 />
//                 {this.renderIcon()}
//             </div>

//         )
//     }

// }

// StringInput.propTypes = {
//     /**
//     * focus the input as soon as it enters the DOM
//     */
//     autoFocus: PropTypes.bool,
//     /**
//     * provides a different set of styles ideal for
//     * use within lines of text (formerly called 'compact')
//     */
//     inline: PropTypes.bool,
//     /**
//     * stop the component from receiving user input, when passed a
//     * string, that string will be displayed on hover
//     */
//     disabled: PropTypes.oneOfType([
//         PropTypes.bool,
//         PropTypes.string
//     ]),
//     /**
//     * display the specified icon in the right side of the input
//     */
//     icon: PropTypes.oneOfType([
//         PropTypes.bool,
//         PropTypes.string
//     ]),
//     /**
//     * display a loading animation (overwrites the icon)
//     */
//     loading: PropTypes.bool,
//     /**
//     * minimum width for inline inputs
//     */
//     minWidth: PropTypes.number,
//     /**
//     * invoke on input blur
//     */
//     onBlur: PropTypes.func,
//     /**
//     * invoke with the new value whenever the value changes
//     */
//     onChange: PropTypes.func.isRequired,
//     /**
//     * display a clear button when there is an input value,
//     * invoke when it's clicked
//     */
//     onClear: PropTypes.func,
//     /**
//     * invoke on enter press
//     */
//     onEnter: PropTypes.func,
//     /**
//     * an array of options the user can chose from
//     */
//     options: PropTypes.array,
//     /**
//     * display the plain value without edit capabilities
//     */
//     readOnly: PropTypes.bool,
//     /**
//     * text to display when the input value is empty
//     */
//     placeholder: PropTypes.string,
//     /**
//     * the value of the input
//     */
//     value: PropTypes.string.isRequired
// }

// // TO DO - a bunch of these can easily be made into a parent class.

// StringInput.defaultProps = {
//     inline: false,
//     disabled: false,
//     icon: '',
//     readOnly: false,
//     value: '',
//     onEnter: _noop,
//     onEnter: _noop,
//     minWidth: 15,
// }

const StringInput = () => "StringInput"

export default withDebouncedOnChange(StringInput)
