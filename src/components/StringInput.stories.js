import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import Icon from '@leiops/icon'

import GenericInputWrapper from 'examples/GenericInputWrapper'
import StringInput from 'components/StringInput'

const baseProps = {
    Component: StringInput,
    reportChange: action('onChange'),
    emptyValue: "",
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
    .add('with on focus and blur', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="Focus and blur me."
            props={{
                onFocus: action('onFocus'),
                onBlur: action('onBlur'),
            }}
        />
    ))
    .add('with on enter', () => (
        <div>TO DO</div>
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
        <GenericInputWrapper 
            { ...baseProps }
            startValue="I am disabled."
            props={{
                disabled: true
            }}
        />
    ))
    .add('disabled with message', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="I am disabled."
            props={{
                disabled: "You do not have edit permissions."
            }}
        />
    ))
    .add('read only', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="I am not editable."
            props={{
                readOnly: true
            }}
        />
    ))
    .add('with placeholder', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                placeholder: "Enter text..."
            }}
        />
    ))
    .add('clearable', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="Clear me."
            props={{
                clearable: true
            }}
        />
    ))
    .add('with icon', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="I have an icon."
            props={{
                Icon: Icon.Search
            }}
        />
    ))
    .add('clearable with icon', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="Clear me."
            props={{
                Icon: Icon.Search,
                clearable: true,
            }}
        />
    ))
    .add('auto sized', () => (
        <div>TO DO</div>
    ))
    .add('auto sized with min width', () => (
        <div>TO DO</div>
    ))