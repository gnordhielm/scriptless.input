export default (option, text) => {
    if (typeof option !== 'string')
        throw new Error(`filterOption expects a string, got ${typeof option}`)

    return option.toLowerCase().includes(text.toLowerCase())
}