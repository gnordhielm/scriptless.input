// var GHOST_ELEMENT_ID = '__autosizeInputGhost'

// var characterEntities = {
//   ' ': 'nbsp',
//   '<': 'lt',
//   '>': 'gt'
// }
// function mapSpecialCharacterToCharacterEntity (specialCharacter) {
//   return '&' + characterEntities[specialCharacter] + ';'
// }
// function escapeSpecialCharacters (string) {
//   return string.replace(/\s|<|>/g, mapSpecialCharacterToCharacterEntity)
// }

// // Create `ghostElement`, with inline styles to hide it and ensure that the text is all
// // on a single line.
// function createGhostElement () {
//   var ghostElement = document.createElement('div')
//   ghostElement.id = GHOST_ELEMENT_ID
//   ghostElement.style.cssText =
//     'display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;'
//   document.body.appendChild(ghostElement)
//   return ghostElement
// }

// module.exports = function (element, options) {
//   var elementStyle = window.getComputedStyle(element)
//   // prettier-ignore
//   var elementCssText = 'box-sizing:' + elementStyle.boxSizing +
//                       ';border-left:' + elementStyle.borderLeftWidth + ' solid red' +
//                       ';border-right:' + elementStyle.borderRightWidth + ' solid red' +
//                       ';font-family:' + elementStyle.fontFamily +
//                       ';font-feature-settings:' + elementStyle.fontFeatureSettings +
//                       ';font-kerning:' + elementStyle.fontKerning +
//                       ';font-size:' + elementStyle.fontSize +
//                       ';font-stretch:' + elementStyle.fontStretch +
//                       ';font-style:' + elementStyle.fontStyle +
//                       ';font-variant:' + elementStyle.fontVariant +
//                       ';font-variant-caps:' + elementStyle.fontVariantCaps +
//                       ';font-variant-ligatures:' + elementStyle.fontVariantLigatures +
//                       ';font-variant-numeric:' + elementStyle.fontVariantNumeric +
//                       ';font-weight:' + elementStyle.fontWeight +
//                       ';letter-spacing:' + elementStyle.letterSpacing +
//                       ';margin-left:' + elementStyle.marginLeft +
//                       ';margin-right:' + elementStyle.marginRight +
//                       ';padding-left:' + elementStyle.paddingLeft +
//                       ';padding-right:' + elementStyle.paddingRight +
//                       ';text-indent:' + elementStyle.textIndent +
//                       ';text-transform:' + elementStyle.textTransform

//   // Assigns an appropriate width to the given `element` based on its contents.
//   function setWidth () {
//     var string = element.value || element.getAttribute('placeholder') || ''
//     // Check if the `ghostElement` exists. If no, create it.
//     var ghostElement =
//       document.getElementById(GHOST_ELEMENT_ID) || createGhostElement()
//     // Copy all width-affecting styles to the `ghostElement`.
//     ghostElement.style.cssText += elementCssText
//     ghostElement.innerHTML = escapeSpecialCharacters(string)
//     // Copy the width of `ghostElement` to `element`.
//     var width = window.getComputedStyle(ghostElement).width
//     element.style.width = width
//     return width
//   }

//   element.addEventListener('input', setWidth)

//   var width = setWidth()

//   // Set `min-width` only if `options.minWidth` was set, and only if the initial
//   // width is non-zero.
//   if (options && options.minWidth && width !== '0px') {
//     element.style.minWidth = width
//   }

//   // Return a function for unbinding the event listener and removing the `ghostElement`.
//   return function () {
//     element.removeEventListener('input', setWidth)
//     var ghostElement = document.getElementById(GHOST_ELEMENT_ID)
//     if (ghostElement) {
//       ghostElement.parentNode.removeChild(ghostElement)
//     }
//   }
// }

import React from 'react'
import PropTypes from 'prop-types'

const sizerStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	visibility: 'hidden',
	height: 0,
	overflow: 'scroll',
	whiteSpace: 'pre',
}

const INPUT_PROPS_BLACKLIST = [
	'extraWidth',
	'injectStyles',
	'inputClassName',
	'inputRef',
	'inputStyle',
	'minWidth',
	'onAutosize',
	'placeholderIsMinWidth',
]

const cleanInputProps = (inputProps) => {
	INPUT_PROPS_BLACKLIST.forEach(field => delete inputProps[field])
	return inputProps
}

const copyStyles = (styles, node) => {
	node.style.fontSize = styles.fontSize
	node.style.fontFamily = styles.fontFamily
	node.style.fontWeight = styles.fontWeight
	node.style.fontStyle = styles.fontStyle
	node.style.letterSpacing = styles.letterSpacing
	node.style.textTransform = styles.textTransform
}

class AutoSizeContainer extends React.Component {
  
  state = {
    inputWidth: this.props.minWidth,
    inputId: this.props.id,
  }

  componentDidMount () {
		this.mounted = true
		this.copyInputStyles()
		this.updateInputWidth()
  }
  
	componentDidUpdate (prevProps, prevState) {
		if (prevState.inputWidth !== this.state.inputWidth) {
			if (typeof this.props.onAutosize === 'function') {
				this.props.onAutosize(this.state.inputWidth)
			}
		}
		this.updateInputWidth()
  }
  
	componentWillUnmount () {
		this.mounted = false
  }
  
	inputRef = (el) => {
		this.input = el
		if (typeof this.props.inputRef === 'function') {
			this.props.inputRef(el)
		}
  }
  
	placeHolderSizerRef = (el) => {
		this.placeHolderSizer = el
  }
  
	sizerRef = (el) => {
		this.sizer = el
  }
  
	copyInputStyles () {
		if (!this.mounted || !window.getComputedStyle) {
			return
		}
		const inputStyles = this.input && window.getComputedStyle(this.input)
		if (!inputStyles) {
			return
		}
		copyStyles(inputStyles, this.sizer)
		if (this.placeHolderSizer) {
			copyStyles(inputStyles, this.placeHolderSizer)
		}
  }
  
	updateInputWidth () {
		if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
			return
		}
		let newInputWidth
		if (this.props.placeholder && (!this.props.value || (this.props.value && this.props.placeholderIsMinWidth))) {
			newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2
		} else {
			newInputWidth = this.sizer.scrollWidth + 2
		}
		// add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
		const extraWidth = (this.props.type === 'number' && this.props.extraWidth === undefined)
			? 16 : parseInt(this.props.extraWidth) || 0
		newInputWidth += extraWidth
		if (newInputWidth < this.props.minWidth) {
			newInputWidth = this.props.minWidth
		}
		if (newInputWidth !== this.state.inputWidth) {
			this.setState({
				inputWidth: newInputWidth,
			})
		}
	}
	getInput () {
		return this.input
	}
	focus () {
		this.input.focus()
	}
	blur () {
		this.input.blur()
	}
	select () {
		this.input.select()
	}
	renderStyles () {
		// this method injects styles to hide IE's clear indicator, which messes
		// with input size detection. the stylesheet is only injected when the
		// browser is IE, and can also be disabled by the `injectStyles` prop.
		const { injectStyles } = this.props
		return isIE && injectStyles ? (
			<style dangerouslySetInnerHTML={{
				__html: `input#${this.state.inputId}::-ms-clear {display: none;}`,
			}} />
		) : null
	}
	render () {
		const sizerValue = [this.props.defaultValue, this.props.value, ''].reduce((previousValue, currentValue) => {
			if (previousValue !== null && previousValue !== undefined) {
				return previousValue
			}
			return currentValue
		})

		const wrapperStyle = { ...this.props.style }
		if (!wrapperStyle.display) wrapperStyle.display = 'inline-block'

		const inputStyle = {
			boxSizing: 'content-box',
			width: `${this.state.inputWidth}px`,
			...this.props.inputStyle,
		}

		const { ...inputProps } = this.props
		cleanInputProps(inputProps)
		inputProps.className = this.props.inputClassName
		inputProps.id = this.state.inputId
		inputProps.style = inputStyle

		return (
			<div className={this.props.className} style={wrapperStyle}>
				{this.renderStyles()}
				<input {...inputProps} ref={this.inputRef} />
				<div ref={this.sizerRef} style={sizerStyle}>{sizerValue}</div>
				{this.props.placeholder
					? <div ref={this.placeHolderSizerRef} style={sizerStyle}>{this.props.placeholder}</div>
					: null
				}
			</div>
		)
	}
}

AutoSizeContainer.propTypes = {
  className: PropTypes.string,               
  // className for the outer element
  defaultValue: PropTypes.any,               
  // default field value
	extraWidth: PropTypes.oneOfType([          
    // additional width for input element
		PropTypes.number,
		PropTypes.string,
	]),
  id: PropTypes.string,                      
  // id to use for the input, can be set for consistent snapshots
  injectStyles: PropTypes.bool,              
  // inject the custom stylesheet to hide clear UI, defaults to true
  inputClassName: PropTypes.string,          
  // className for the input element
  inputRef: PropTypes.func,                  
  // ref callback for the input element
  inputStyle: PropTypes.object,              
  // css styles for the input element
	minWidth: PropTypes.oneOfType([            
    // minimum width for input element
		PropTypes.number,
		PropTypes.string,
	]),
  onAutosize: PropTypes.func,                
  // onAutosize handler: function(newWidth) {}
  onChange: PropTypes.func,                  
  // onChange handler: function(event) {}
  placeholder: PropTypes.string,             
  // placeholder text
  placeholderIsMinWidth: PropTypes.bool,     
  // don't collapse size to less than the placeholder
  style: PropTypes.object,                   
  // css styles for the outer element
  value: PropTypes.any,                      
  // field value
}
AutoSizeContainer.defaultProps = {
	minWidth: 1,
	injectStyles: true,
}

export default AutoSizeContainer