import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import Icon from '@leiops/icon'

import { options, dividedOptions } from 'utils/storyProps'
import GenericInputWrapper from 'examples/GenericInputWrapper'
import ChainedInput from 'components/ChainedInput'
import SelectOneInput from 'components/SelectOneInput'
import StringInput from 'components/StringInput'
import NumberInput from 'components/NumberInput'

const baseProps = {
    Component: ChainedInput,
    reportChange: action('onChange'),
    emptyValue: undefined,
    startValue: undefined,
}

const basicChildren = [
    ({ onCompleteChange, onIncompleteChange, ...rest }) => (
        <SelectOneInput
            Icon={Icon.User}
            options={options}
            { ...rest }
        />
    ),
    ({ onChange, onCompleteChange, onIncompleteChange, ...rest }) => (
        <StringInput
            onEnter={onCompleteChange}
            onChange={onIncompleteChange}
            { ...rest }
        />
    ),
    ({ onChange, onCompleteChange, onIncompleteChange, ...rest }) => (
        <NumberInput
            onEnter={onCompleteChange}
            onChange={onIncompleteChange}
            { ...rest }
        />
    )
]

storiesOf('ChainedInput', module)
    .add('basic', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                renderTrigger: () => "Trigger"
            }}
        >{basicChildren}</GenericInputWrapper>
    ))
    // .add('inline', () => (
    //     <GenericInputWrapper 
    //         { ...baseProps }
    //         props={{
    //             renderTrigger: () => "Trigger",
    //             inline: true,
    //         }}
    //     >{basicChildren}</GenericInputWrapper>
    // ))