/**
 *
 * Tests for Demo
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { DemoTest as Demo } from '../index';

describe('<Demo /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Demo />);
    expect(baseElement).toMatchSnapshot();
  });
});
