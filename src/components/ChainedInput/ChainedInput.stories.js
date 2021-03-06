import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import Icon from '@leiops/icon'

import { options, dividedOptions } from 'utils/storyProps'
import GenericInputWrapper from 'examples/GenericInputWrapper'
import ChainedInput from 'components/ChainedInput'
import SelectOneInput from 'components/SelectOneInput'
import DateInput from 'components/DateInput'
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
    ({ onCompleteChange, onIncompleteChange, ...rest }) => (
        <DateInput
            Icon={Icon.Calendar}
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

const AdjacentChainedExample = () => {
    const [ values, setValues ] = useState([])
    return (
        <div style={{ display: 'flex' }}>
            <ChainedInput
                renderTrigger={() => "Trigger"}
                onChange={setValues}
            >
                {({ 
                    onCompleteChange,
                    onIncompleteChange,
                    ...rest 
                }) => (
                    <SelectOneInput
                        options={options}
                        { ...rest }
                    />
                )}
            </ChainedInput>
            <ChainedInput
                renderTrigger={() => "Trigger"}
                onChange={setValues}
            >
                {({ 
                    onCompleteChange,
                    onIncompleteChange,
                    ...rest 
                }) => (
                    <SelectOneInput
                        options={options}
                        { ...rest }
                    />
                )}
            </ChainedInput>
        </div>
    )
}

storiesOf('ChainedInput', module)
    .add('basic', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                renderTrigger: () => "Trigger"
            }}
        >{basicChildren}</GenericInputWrapper>
    ))
    .add('single child', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                renderTrigger: () => "Trigger"
            }}
        >{({ onCompleteChange, onIncompleteChange, ...rest }) => (
            <SelectOneInput
                Icon={Icon.User}
                options={options}
                { ...rest }
            />
        )}</GenericInputWrapper>
    ))
    .add('adjacent chained inputs', () => <AdjacentChainedExample />)
    // .add('inline', () => (
    //     <GenericInputWrapper 
    //         { ...baseProps }
    //         props={{
    //             renderTrigger: () => "Trigger",
    //             inline: true,
    //         }}
    //     >{basicChildren}</GenericInputWrapper>
    // ))