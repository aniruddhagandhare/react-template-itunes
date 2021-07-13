/*
 *
 * Demo reducer
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
  searchText: null
};

export const { Types: demoTypes, Creators: demoCreators } = createActions({
  requestGetSongs: ['searchText'],
  successGetSongs: ['data', 'loading'],
  errorGetSongs: ['error'],
  clearSongs: []
});

/* eslint-disable default-case, no-param-reassign */
export const demoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case demoTypes.REQUEST_GET_SONGS:
        draft.error = null;
        draft.searchText = action.searchText;
        draft.loading = true;
        draft.songs = null;
        break;
      case demoTypes.SUCCESS_GET_SONGS:
        draft.error = null;
        draft.loading = action.loading;
        draft.songs = action.data.results;
        break;
      case demoTypes.CLEAR_SONGS:
        return initialState;
      case demoTypes.ERROR_GET_SONGS:
        draft.loading = false;
        draft.error = get(action.error, 'message', translate('something went wrong!!!'));
        break;
    }
  });

export default demoReducer;
