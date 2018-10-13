import React from 'react'
import PropTypes from 'prop-types'
import autosize from 'autosize'
import getLineHeight from 'line-height'
import _noop from 'lodash/noop'
import { defaultRows } from 'settings'

const UPDATE = 'autosize:update'
const DESTROY = 'autosize:destroy'

class AutoSizeTextArea extends React.Component {

  state = {
    lineHeight: null
  }

  textarea = React.createRef()

  componentDidMount() {

    if (typeof this.props.maxRows === 'number')
      this.updateLineHeight()

    autosize(this.textarea.current)
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value || 
      this.props.minRows !== prevProps.minRows ||
      this.props.maxRows !== prevProps.maxRows
    )
      this.dispatchEvent(UPDATE)
  }

  componentWillUnmount() {
    this.dispatchEvent(DESTROY)
  }

  dispatchEvent = EVENT_TYPE => {
    const event = document.createEvent('Event')
    event.initEvent(EVENT_TYPE, true, false)
    this.textarea.current.dispatchEvent(event)
  }

  updateLineHeight = () => {
    this.setState({
      lineHeight: getLineHeight(this.textarea.current)
    })
  }

  getLocals = () => {
    const {
      props: { maxRows, minRows, style, ...props },
      state: { lineHeight },
    } = this

    const maxHeight = maxRows && lineHeight ? lineHeight * maxRows : null

    return {
      ...props,
      rows: minRows,
      style: maxHeight ? { ...style, maxHeight } : style,
    }
  }

  render() {
    const locals = this.getLocals()
    return (
      <textarea {...locals} ref={this.textarea} />
    )
  }

}

AutoSizeTextArea.propTypes = {
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  lineHeight: PropTypes.number,
}

AutoSizeTextArea.defaultProps = {
  minRows: defaultRows,
}

export default AutoSizeTextArea