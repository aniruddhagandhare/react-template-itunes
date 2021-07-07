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
  searchText: ''
};

export const { Types: demoTypes, Creators: demoCreators } = createActions({
  getSongs: ['searchText'],
  successGetSongs: ['data'],
  errorGetSongs: ['error']
});

/* eslint-disable default-case, no-param-reassign */
export const demoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case demoTypes.GET_SONGS:
        draft.error = '';
        draft.searchText = action.searchText;
        if (action.searchText === '') {
          draft.loading = false;
          draft.songs = [];
        } else {
          draft.loading = true;
        }
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
    }
  });

export default demoReducer;
