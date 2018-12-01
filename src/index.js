import 'styles/index.scss'

// TO DO - can this be automated in some way? just go through all components, strip the word input off where it appears, then export them?

export { default as SelectOneInput } from './components/SelectOneInput'

export { default as ChainedInput } from './components/ChainedInput'

export default {
    SelectOne: SelectOneInput,
    Chained: ChainedInput,
}