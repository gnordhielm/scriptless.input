import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'

import GenericInputWrapper from 'examples/GenericInputWrapper'
import StringInput from 'components/StringInput'

const baseProps = {
    Component: StringInput,
    reportChange: action('onChange'),
}

storiesOf('StringInput', module)
    .addDecorator(withKnobs)
    .add('basic', () => (
        <GenericInputWrapper 
            { ...baseProps }
        />
    ))
    .add('auto focused', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                autoFocus: true
            }}
        />
    ))
    .add('with debounce', () => (
        <GenericInputWrapper 
            { ...baseProps }
            Component={StringInput.Debounced}
            props={{
                debounceBy: 500
            }}
        />
    ))
    .add('disabled', () => (
        <div>TO DO</div>
    ))
    .add('read only', () => (
        <div>TO DO</div>
    ))
    .add('with on clear', () => (
        <div>TO DO</div>
    ))
    .add('with placeholder', () => (
        <div>TO DO</div>
    ))
    .add('with icon', () => (
        <div>TO DO</div>
    ))
    .add('inline', () => (
        <div>TO DO</div>
    ))
    .add('inline with min width', () => (
        <div>TO DO</div>
    ))