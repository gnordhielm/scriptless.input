import { configure } from '@storybook/react'
import '@storybook/addon-knobs/register'
import './storybook.css'
import '../src/styles/index.scss'
import '@scriptless/dropdown/dist/style.css'

const req = require.context('../src/components', true, /.stories.js$/)
const loadStories = () => {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)