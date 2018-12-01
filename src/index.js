import 'styles/index.scss'

// TO DO - can this be automated in some way? just go through all components, strip the word input off where it appears, then export them?

import SelectOneInput from './components/SelectOneInput'
import NumberInput from './components/NumberInput'
import StringInput from './components/StringInput'
import TextInput from './components/TextInput'
import ChainedInput from './components/ChainedInput'

const Input = {
    SelectOne: SelectOneInput,
    String: StringInput,
    Text: TextInput,
    Number: NumberInput,
    Chained: ChainedInput,
}

export default Input