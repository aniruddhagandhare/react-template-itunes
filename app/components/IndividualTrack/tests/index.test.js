/**
 *
 * Tests for Track
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Track from '../index';
import { testData } from '@utils/testData';

describe('<Track />', () => {
  let track = {};
  beforeEach(() => {
    track = testData;
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Track track={track} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Track component', () => {
    const { getAllByTestId } = renderWithIntl(<Track track={track} />);
    expect(getAllByTestId('track').length).toBe(1);
  });
});
