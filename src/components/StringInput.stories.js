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
    startValue: "",
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
        <GenericInputWrapper 
            { ...baseProps }
            startValue="Press enter."
            props={{
                onEnter: action('onEnter'),
            }}
        />
    ))
    .add('with debounce', () => (
        <GenericInputWrapper 
            { ...baseProps }
            Component={StringInput}
            props={{
                debounce: 500
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
    .add('disabled, with message', () => (
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
    .add('clearable, with icon', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="Clear me."
            props={{
                Icon: Icon.Search,
                clearable: true,
            }}
        />
    ))
    .add('inline', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="I'm inline."
            props={{
                inline: true,
            }}
        />
    ))
    .add('inline, clearable', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="Clear me."
            props={{
                inline: true,
                clearable: true,
            }}
        />
    ))
    .add('auto sized, with min width', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="Auto sized."
            props={{
                autoSize: true,
                minWidth: 75,
            }}
        />
    ))
    .add('auto sized, inline, with placeholder', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                placeholder: "Type away...",
                autoSize: true,
                inline: true,
            }}
        />
    ))
    .add('inline, debounced, auto sized, with icon', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="So much going on."
            props={{
                autoSize: true,
                inline: true,
                debounce: 500,
                Icon: Icon.User
            }}
        />
    ))