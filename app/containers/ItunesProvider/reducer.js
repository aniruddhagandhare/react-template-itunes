/*
 *
 * Demo reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import { get } from 'lodash';

export const initialState = {
  songs: [],
  error: '',
  loading: false,
  searchText: '',
  track: null
};

export const { Types: demoTypes, Creators: demoCreators } = createActions({
  requestGetSongs: ['searchText'],
  successGetSongs: ['data', 'loading'],
  errorGetSongs: ['error'],
  getTrackById: ['trackId'],
  successGetTrackById: ['track'],
  successFetchTrackById: ['track'],
  errorGetTrackById: ['error'],
  clearSongs: []
});

/* eslint-disable default-case, no-param-reassign */
export const demoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case demoTypes.REQUEST_GET_SONGS:
        draft.error = '';
        draft.searchText = action.searchText;
        draft.loading = true;
        break;
      case demoTypes.SUCCESS_GET_SONGS:
        draft.error = '';
        draft.loading = false;
        draft.songs = action.data.results;
        break;
      case demoTypes.ERROR_GET_SONGS:
        draft.loading = false;
        draft.error = get(action.error, 'message', 'something went wrong!!!');
        break;
      case demoTypes.CLEAR_SONGS:
        return initialState;
      // track reducer
      case demoTypes.GET_TRACK_BY_ID:
        draft.loading = true;
        break;
      case demoTypes.SUCCESS_GET_TRACK_BY_ID:
        draft.error = '';
        draft.loading = false;
        draft.track = action.track.results[0];
        break;
      case demoTypes.SUCCESS_FETCH_TRACK_BY_ID:
        draft.error = '';
        draft.loading = false;
        const track = action.track.results[0];
        draft.songs = [...state.songs, track];
        draft.track = track;
        break;
      case demoTypes.ERROR_GET_TRACK_BY_ID:
        draft.track = null;
        draft.loading = false;
        draft.error = get(action.error, 'message', 'Something went wrong');
        break;
    }
  });

export default demoReducer;
