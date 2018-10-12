const moveCaretToEnd = event => {
  event.persist()
  // const stash = event.target.value
  // event.target.value = ''
  // event.target.value = stash
  const el = event.target
  element.scrollLeft = element.scrollWidth
  if (typeof element.selectionStart === "number") {
      element.selectionStart = element.selectionEnd = element.value.length
  } else if (typeof element.createTextRange !== "undefined") {
      element.focus()
      var range = element.createTextRange()
      range.collapse(false)
      range.select()
  }
}

export default moveCaretToEnd