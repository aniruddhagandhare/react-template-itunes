/*
 *
 * ItunesReducer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import { get } from 'lodash';
import { translate } from '@app/components/IntlGlobalProvider';

export const initialState = {
  songs: [],
  error: null,
  loading: false,
  searchText: null,
  track: null
};
export const { Types: itunesTypes, Creators: itunesCreators } = createActions({
  requestGetSongs: ['searchText'],
  successGetSongs: ['data', 'loading'],
  errorGetSongs: ['error'],
  clearSongs: [],
  requestGetTrackById: ['trackId'],
  successGetTrackById: ['track'],
  successFetchTrackById: ['track'],
  errorGetTrackById: ['error']
});

/* eslint-disable default-case, no-param-reassign */
export const itunesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case itunesTypes.REQUEST_GET_SONGS:
        draft.error = null;
        draft.searchText = action.searchText;
        draft.loading = true;
        break;
      case itunesTypes.SUCCESS_GET_SONGS:
        draft.error = null;
        draft.loading = false;
        draft.songs = action.data.results;
        break;
      case itunesTypes.ERROR_GET_SONGS:
        draft.loading = false;
        draft.error = get(action.error, 'message', translate('something_went_wrong'));
        break;
      case itunesTypes.CLEAR_SONGS:
        return initialState;
      // track reducer
      case itunesTypes.SUCCESS_GET_TRACK_BY_ID:
        draft.error = null;
        draft.loading = false;
        draft.track = action.track.results[0];
        break;
      case itunesTypes.SUCCESS_FETCH_TRACK_BY_ID:
        draft.error = null;
        draft.loading = false;
        const track = action.track.results[0];
        draft.songs = [...state.songs, track];
        draft.track = track;
        break;
      case itunesTypes.ERROR_GET_TRACK_BY_ID:
        draft.track = null;
        draft.loading = false;
        draft.error = get(action.error, 'message', translate('something_went_wrong'));
        break;
    }
  });

export default itunesReducer;
