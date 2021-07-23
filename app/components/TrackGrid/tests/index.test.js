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
  let songs;
  beforeEach(() => {
    songs = [
      {
        artworkUrl: '',
        previewUrl: '',
        collectionName: '',
        trackName: '',
        artistName: '',
        trackPrice: 0,
        trackExplicitness: '',
        trackPrimaryGenreName: '',
        trackViewUrl: ''
      }
    ];
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TrackGrid songs={songs} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackGrid component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackGrid songs={songs} />);
    expect(getAllByTestId('track-grid').length).toBe(1);
  });
});
