/**
 *
 * Stories for TrackGrid
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import TrackGrid from '../index';

storiesOf('TrackGrid').add('simple', () => <TrackGrid id={text('id', 'TrackGrid')} />);
