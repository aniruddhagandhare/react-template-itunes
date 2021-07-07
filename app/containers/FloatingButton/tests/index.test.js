/**
 *
 * Tests for FloatingButton
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { FloatingButtonTest as FloatingButton } from '../index';

describe('<FloatingButton /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<FloatingButton />);
    expect(baseElement).toMatchSnapshot();
  });
});
