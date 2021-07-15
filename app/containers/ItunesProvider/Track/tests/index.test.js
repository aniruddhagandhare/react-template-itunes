/**
 *
 * Tests for Track
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { TrackTest as Track } from '../index';
import { testData } from '@app/utils/testData';

describe('<Track /> container tests', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Track track={{ ...testData }} match={{ params: { trackId: '' } }} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should dispatchGetTrackById saga after render', async () => {
    const requestGetTrackById = jest.fn();
    const track = { ...testData };
    const songs = [{ ...testData }];
    const { getAllByTestId } = renderProvider(
      <Track
        track={track}
        songs={songs}
        dispatchGetTrackById={requestGetTrackById}
        loading={false}
        error={false}
        match={{ params: { id: 852800336 } }}
      />
    );
    expect(getAllByTestId('track').length).toBe(1);
    expect(requestGetTrackById).toBeCalled();
  });
});
