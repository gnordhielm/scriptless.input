import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import Icon from '@leiops/icon'

import GenericInputWrapper from 'examples/GenericInputWrapper'
import NumberInput from 'components/NumberInput'

const baseProps = {
    Component: NumberInput,
    reportChange: action('onChange'),
    emptyValue: "",
    startValue: "",
}

storiesOf('NumberInput', module)
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
    .add('with on focus, on blur, and on enter', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={22}
            props={{
                onFocus: action('onFocus'),
                onBlur: action('onBlur'),
                  onEnter: action('onEnter'),
            }}
        />
    ))
    .add('with debounce', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                debounce: 500
            }}
        />
    ))
    .add('with step', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={150}
            props={{
                step: 50
            }}
        />
    ))
    .add('min and max value, with step', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={150}
            props={{
                step: 50,
                min: 150,
                max: 350,
            }}
        />
    ))
    .add('disabled', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={23}
            props={{
                disabled: true
            }}
        />
    ))
    .add('disabled, with message', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={23}
            props={{
                disabled: "You do not have edit permissions."
            }}
        />
    ))
    .add('read only', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={60065}
            props={{
                readOnly: true
            }}
        />
    ))
    .add('with placeholder', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                placeholder: "Enter number..."
            }}
        />
    ))
    .add('clearable', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={5}
            props={{
                clearable: true
            }}
        />
    ))
    .add('with icon', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={666}
            props={{
                Icon: Icon.Group
            }}
        />
    ))
    .add('clearable, with icon', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={69}
            props={{
                Icon: Icon.Group,
                clearable: true,
            }}
        />
    ))
    .add('inline', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={2048}
            props={{
                inline: true,
            }}
        />
    ))
    .add('inline, clearable', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={2048}
            props={{
                inline: true,
                clearable: true,
            }}
        />
    ))
    .add('auto sized, with min width', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={1000}
            props={{
                autoSize: true,
                minWidth: 75,
            }}
        />
    ))
    .add('auto sized, inline, with placeholder, with max width', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                placeholder: "Type away...",
                autoSize: true,
                inline: true,
                maxWidth: 50,
            }}
        />
    ))
    .add('inline, debounced, auto sized, with icon', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={12345}
            props={{
                autoSize: true,
                inline: true,
                debounce: 500,
                Icon: Icon.Group
            }}
        />
    ))