// import produce from 'immer'
import { itunesReducer, itunesTypes, initialState } from '../reducer';
import { testData } from '@utils/testData';
import { translate } from '@app/components/IntlGlobalProvider';
/* eslint-disable default-case, no-param-reassign */
describe('Itunes reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesReducer(undefined, {})).toEqual(state);
  });

  it('should return the updated state when an action of type REQUEST_GET_SONGS is dispatched', () => {
    const searchText = 'drake';
    const error = null;
    const loading = true;
    const expectedResult = { ...state, searchText, error, loading };
    expect(
      itunesReducer(state, {
        type: itunesTypes.REQUEST_GET_SONGS,
        searchText: 'drake'
      })
    ).toEqual(expectedResult);
  });

  it('should return songs and set loading to false', () => {
    const songs = [testData];
    const loading = false;
    const error = null;
    const expectedResult = { ...state, songs, loading, error };
    expect(
      itunesReducer(state, {
        type: itunesTypes.SUCCESS_GET_SONGS,
        data: { results: [testData] }
      })
    ).toEqual(expectedResult);
  });

  it('should populate the error with the specific error message', () => {
    const error = translate('something_went_wrong');
    const expectedResult = { ...state, error };
    expect(
      itunesReducer(state, {
        type: itunesTypes.ERROR_GET_SONGS,
        error: translate('something_went_wrong')
      })
    ).toEqual(expectedResult);
  });

  it('should clear songs and return the initial state', () => {
    const expectedResult = initialState;
    expect(
      itunesReducer(state, {
        type: itunesTypes.CLEAR_SONGS
      })
    ).toEqual(expectedResult);
  });

  it('should return updated state with track details', () => {
    const loading = false;
    const error = null;
    const track = testData;
    const expectedResult = { ...state, loading, error, track };
    expect(
      itunesReducer(state, {
        type: itunesTypes.SUCCESS_GET_TRACK_BY_ID,
        track: { results: [testData] }
      })
    ).toEqual(expectedResult);
  });

  it('should return the updated state and append the fetched track to the track list', () => {
    const loading = false;
    const error = null;
    const songs = [testData];
    const track = testData;
    const expectedResult = { ...state, loading, error, songs, track };
    expect(
      itunesReducer(state, {
        type: itunesTypes.SUCCESS_FETCH_TRACK_BY_ID,
        track: { results: [testData] }
      })
    ).toEqual(expectedResult);
  });

  it('should populate the error with appropiate message if failed to fetch track', () => {
    const loading = false;
    const error = translate('no_track_found');
    const track = null;
    const expectedResult = { ...state, loading, error, track };
    expect(
      itunesReducer(state, {
        type: itunesTypes.ERROR_GET_TRACK_BY_ID,
        error: translate('no_track_found')
      })
    ).toEqual(expectedResult);
  });
});
