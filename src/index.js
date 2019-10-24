// DEV - maybe we should expect the dropdown library as a peer dependency?
import '@scriptless/dropdown/dist/style.css'
import 'styles/index.scss'

// TO DO - can this be automated in some way? just go through all components, strip the word input off where it appears, then export them?

import SelectOneInput from './components/SelectOneInput'
import SelectManyInput from './components/SelectManyInput'
import NumberInput from './components/NumberInput'
import StringInput from './components/StringInput'
import TextInput from './components/TextInput'
import DateInput from './components/DateInput'
import ChainedInput from './components/ChainedInput'
import ToggleInput from './components/ToggleInput'
import RadioInput from './components/RadioInput'

const Input = {
    SelectOne: SelectOneInput,
    SelectMany: SelectManyInput,
    String: StringInput,
    Text: TextInput,
    Date: DateInput,
    Number: NumberInput,
    Chained: ChainedInput,
    Toggle: ToggleInput,
    Radio: RadioInput,
}

export default Input