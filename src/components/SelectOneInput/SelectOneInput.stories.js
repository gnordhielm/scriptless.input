import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import Icon from '@leiops/icon'

import GenericInputWrapper from 'examples/GenericInputWrapper'
import SelectOneInput from 'components/SelectOneInput'
import SelectDivider from 'utils/SelectDivider'

const baseProps = {
    Component: SelectOneInput,
    reportChange: action('onChange'),
    emptyValue: undefined,
    startValue: undefined,
}

const options = [
  "foo",
  "bar",
  "baz",
  "qux",
  "quux",
]

const dividedOptions = [
    new SelectDivider("Fruits"),
    "Apple",
    "Orange",
    "Pear",
    "Watermelon",
    "Honeydew",
    "Cantaloupe",
    new SelectDivider("Vegetables"),
    "Carrot",
    "Broccoli",
    "Sweet Pea",
    "Parsnip",
    "Sunchoke",
]

storiesOf('SelectOneInput', module)
    .addDecorator(withKnobs)
    .add('basic', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
              options
            }}
        />
    ))
    .add('with no options', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
              options: []
            }}
        />
    ))
    .add('with overflowing options', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
              options: [
                  ...options,
                  "quuux",
                  "quuuux",
                  "quuuuux",
                  "quuuuuux",
                  "quuuuuuux",
                  "quuuuuuuux",
                  "quuuuuuuuux",
                  "quuuuuuuuuux",
                  "quuuuuuuuuuux",
                  "quuuuuuuuuuuux",
                  "quuuuuuuuuuuuux",
              ]
            }}
        />
    ))
    .add('with optionTerm', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
              options,
              optionTerm: "user",
            }}
        />
    ))
    .add('with dividers', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
              options: dividedOptions,
            }}
        />
    ))
    .add('with dividers and render divider', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
              options: dividedOptions,
              renderDivider: name => (
                  <div>
                    <span>Section: </span>
                    <em>{name}</em>
                  </div>
              )
            }}
        />
    ))
    .add('with onCreateOption', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
              options,
              onCreateOption: action('onCreateOption'),
            }}
        />
    ))


    .add('with renderOption and renderValue', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
              options
            }}
        />
    ))
    .add('auto focused', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                options,
                autoFocus: true
            }}
        />
    ))
    .add('with on focus and blur', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="Focus and blur me."
            props={{
                options,
                onFocus: action('onFocus'),
                onBlur: action('onBlur'),
            }}
        />
    ))
    .add('disabled, with message', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="I am disabled."
            props={{
                options,
                disabled: "You do not have edit permissions."
            }}
        />
    ))
    .add('read only', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="I am not editable."
            props={{
                options,
                readOnly: true
            }}
        />
    ))
    .add('with placeholder', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                options,
                placeholder: "Enter text..."
            }}
        />
    ))
    .add('clearable, with icon', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="Clear me."
            props={{
                options,
                Icon: Icon.User,
                clearable: true,
            }}
        />
    ))
    .add('inline', () => (
        <GenericInputWrapper 
            { ...baseProps }
            startValue="I'm inline."
            props={{
                options,
                inline: true,
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
    // .add('stress test', () => (
    //     <GenericInputWrapper 
    //         { ...baseProps }
    //         startValue="Auto sized."
    //         props={{
    //             autoSize: true,
    //             minWidth: 75,
    //         }}
    //     />
    // ))