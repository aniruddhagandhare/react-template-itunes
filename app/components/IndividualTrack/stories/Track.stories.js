/**
 *
 * Stories for Track
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Track from '../index';

storiesOf('Track').add('simple', () => <Track id={text('id', 'Track')} />);
