import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import Icon from '@leiops/icon'

import { options, dividedOptions } from 'utils/storyProps'
import GenericInputWrapper from 'examples/GenericInputWrapper'
import DateInput from 'components/DateInput'

const baseProps = {
    Component: DateInput,
    reportChange: action('onChange'),
    emptyValue: undefined,
    startValue: undefined,
}


storiesOf('DateInput', module)
    .addDecorator(withKnobs)
    .add('basic', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{}}
        />
    ))
    .add('autoFocused', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                autoFocus: true,
            }}
        />
    ))
    .add('with on focus and blur', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                onFocus: action('onFocus'),
                onBlur: action('onBlur'),
            }}
        />
    ))
    .add('with renderFormat', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
              renderFormat: "[🤖] X"
            }}
        />
    ))
    .add('disabled, with message', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                disabled: "You do not have edit permissions.",
            }}
        />
    ))
    .add('read only', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={1547498988589}
            props={{
                readOnly: true
            }}
        />
    ))
    .add('with placeholder', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                placeholder: "Enter birthday..."
            }}
        />
    ))
    .add('clearable, with icon', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={1547498988589}
            props={{
                options,
                Icon: Icon.Movie,
                clearable: true,
            }}
        />
    ))
    .add('inline', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={1547498988589}
            props={{
                inline: true,
            }}
        />
    ))
    .add('auto sized, clearable, with min width', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue={1547498988589}
            props={{
                autoSize: true,
                minWidth: 35,
                clearable: true,
            }}
        />
    ))
