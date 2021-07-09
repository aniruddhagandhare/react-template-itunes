/*
 *
 * Track reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  track: null,
  error: null
};

export const { Types: trackTypes, Creators: trackCreators } = createActions({
  getTrackById: ['trackId'],
  successGetTrackById: ['track'],
  errorGetTrackById: ['error']
});

/* eslint-disable default-case, no-param-reassign */
export const trackReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case trackTypes.GET_TRACK_BY_ID:
        draft.track = null;
        break;
      case trackTypes.SUCCESS_GET_TRACK_BY_ID:
        draft.track = action.track.results[0];
        break;
      case trackTypes.ERROR_GET_TRACK_BY_ID:
        console.log(action);
        draft.error = get(action.error, 'message', 'Something went wrong');
        break;
    }
  });

export default trackReducer;
