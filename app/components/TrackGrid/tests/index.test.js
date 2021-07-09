/**
 *
 * Tests for TrackGrid
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import TrackGrid from '../index';

describe('<TrackGrid />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TrackGrid />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackGrid component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackGrid />);
    expect(getAllByTestId('track-grid').length).toBe(1);
  });
});
