import _isEqual from 'lodash/isEqual'

export default ({ 
    createText, 
    resolveCreateTextToOption, 
    options,
}) => {
    const toCreate = resolveCreateTextToOption(createText)
    for (let i in options)
        if (_isEqual(options[i], toCreate))
            return true

    return false
}