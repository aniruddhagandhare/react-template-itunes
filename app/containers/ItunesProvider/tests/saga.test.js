/**
 * Test demo sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put, call } from 'redux-saga/effects';
import demoSaga, { getSongsFromItunes, getTrackById } from '../saga';
import { itunesTypes } from '../reducer';
import { getSongs, getTrack } from '@app/services/itunesApi';
import { apiResponseGenerator } from '@app/utils/testUtils';

describe('ItunesProvider saga tests', () => {
  const generator = demoSaga();
  const searchText = 'drake';
  const trackId = 852800336;
  let getSongsGenerator = getSongsFromItunes({ searchText });
  let getTrackByIdGenerator = getTrackById({ trackId });
  it('should start task to watch for REQUEST_GET_SONGS action', async () => {
    expect(generator.next().value).toEqual(takeLatest(itunesTypes.REQUEST_GET_SONGS, getSongsFromItunes));
  });

  it('should ensure that ERROR_GET_SONGS is dispatched when api call fails', () => {
    const response = getSongsGenerator.next().value;
    expect(response).toEqual(call(getSongs, searchText));
    const errorResponse = {
      errorMessage: 'There was an error while fetching songs.'
    };
    expect(getSongsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: itunesTypes.ERROR_GET_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that SUCCESS_GET_SONGS is dispatched when api calls succeeds', () => {
    getSongsGenerator = getSongsFromItunes({ searchText });
    const response = getSongsGenerator.next().value;
    expect(response).toEqual(call(getSongs, searchText));

    const successResponse = {
      resultCount: 1,
      results: [{ artistName: searchText }]
    };
    expect(getSongsGenerator.next(apiResponseGenerator(true, successResponse)).value).toEqual(
      put({
        type: itunesTypes.SUCCESS_GET_SONGS,
        data: successResponse
      })
    );
  });

  it('should fetch track and dispatch SUCCESS_FETCH_TRACK after api call succeeds', () => {
    getTrackByIdGenerator = getTrackById({ trackId });
    const songs = getTrackByIdGenerator.next().value;
    const response = getTrackByIdGenerator.next([]).value;
    expect(response).toEqual(call(getTrack, trackId));
    const successResponse = {
      track: { results: [{ trackName: 'Turn down for what' }] }
    };
    expect(getTrackByIdGenerator.next(apiResponseGenerator(true, successResponse)).value).toEqual(
      put({
        type: itunesTypes.SUCCESS_FETCH_TRACK_BY_ID,
        track: successResponse
      })
    );
  });

  it('should dispatch ERROR_GET_TRACK_BY_ID', () => {
    getTrackByIdGenerator = getTrackById({ trackId });
    const track = getTrackByIdGenerator.next().value;
    const response = getTrackByIdGenerator.next([]).value;
    expect(response).toEqual(call(getTrack, trackId));
    const errorResponse = {
      errorMessage: 'No track Found :('
    };
    expect(getTrackByIdGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: itunesTypes.ERROR_GET_TRACK_BY_ID,
        error: errorResponse
      })
    );
  });
});
