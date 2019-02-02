import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import GenericInputWrapper from 'examples/GenericInputWrapper'
import RadioInput from 'components/RadioInput'

const baseProps = {
    Component: RadioInput,
    reportChange: action('onChange'),
    emptyValue: false,
    startValue: false,
}

storiesOf('RadioInput', module)
    .add('basic', () => (
        <GenericInputWrapper 
            { ...baseProps }
            props={{
                options: [
                    'Foo',
                    'Bar',
                    'Baz',
                ]
            }}
        />
    ))
    // .add('auto focused', () => (
    //   <GenericInputWrapper 
    //       { ...baseProps }
    //       props={{
    //           autoFocus: true
    //       }}
    //   />
    // ))
    // .add('with on focus and blur', () => (
    //   <GenericInputWrapper 
    //       { ...baseProps }
    //       startValue={'Focus\nand blur\nme.'}
    //       props={{
    //           onFocus: action('onFocus'),
    //           onBlur: action('onBlur'),
    //       }}
    //   />
    // ))
    // .add('with on enter', () => (
    //   <GenericInputWrapper 
    //       { ...baseProps }
    //       startValue={"Press\nenter."}
    //       props={{
    //           onEnter: action('onEnter'),
    //       }}
    //   />
    // ))
    // .add('with debounce', () => (
    //   <GenericInputWrapper 
    //       { ...baseProps }
    //       props={{
    //           debounce: 500
    //       }}
    //   />
    // ))
    .add('disabled', () => (
      <GenericInputWrapper 
          { ...baseProps }
          startValue="I am disabled."
          props={{
              disabled: true,
              options: [
                  'Foo',
                  'Bar',
                  'Baz',
              ]
          }}
      />
    ))
    // .add('disabled, with message', () => (
    //   <GenericInputWrapper 
    //       { ...baseProps }
    //       startValue="I am disabled."
    //       props={{
    //           disabled: "You do not have edit permissions."
    //       }}
    //   />
    // ))
    // .add('read only', () => (
    //   <GenericInputWrapper 
    //       { ...baseProps }
    //       startValue="I am not editable."
    //       props={{
    //           readOnly: true
    //       }}
    //   />
    // ))
    // .add('with placeholder', () => (
    //   <GenericInputWrapper 
    //       { ...baseProps }
    //       props={{
    //           placeholder: "Enter text..."
    //       }}
    //   />
    // ))
    // .add('auto sized', () => (
    //     <GenericInputWrapper 
    //         { ...baseProps }
    //         startValue="Auto sized."
    //         props={{
    //             autoSize: true,
    //         }}
    //     />
    // ))
    // .add('auto sized, with min rows, with max rows', () => (
    //     <GenericInputWrapper 
    //         { ...baseProps }
    //         startValue="Auto sized."
    //         props={{
    //             autoSize: true,
    //             minRows: 2,
    //             maxRows: 6,
    //         }}
    //     />
    // ))