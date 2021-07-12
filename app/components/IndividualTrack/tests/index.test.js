/**
 *
 * Tests for Track
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import Track from '../index';

describe('<Track />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Track />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Track component', () => {
    const { getAllByTestId } = renderWithIntl(<Track />);
    expect(getAllByTestId('track').length).toBe(1);
  });
});
