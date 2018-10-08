import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'

import StringInput from './StringInput'

storiesOf('StringInput', module)
    .addDecorator(withKnobs)
    .add('plain', () => (
        <StringInput
          value={text('Value', 'Lorem')}
          onChange={action('onChange')}
        />
    ))