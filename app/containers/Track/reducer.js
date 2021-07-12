/*
 *
 * Track reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import { translate } from '@app/components/IntlGlobalProvider';
import { get } from 'lodash';
export const initialState = {
  track: null,
  error: null
};

export const { Types: trackTypes, Creators: trackCreators } = createActions({
  requestGetTrackById: ['trackId'],
  successGetTrackById: ['track'],
  errorGetTrackById: ['error']
});

/* eslint-disable default-case, no-param-reassign */
export const trackReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case trackTypes.REQUEST_GET_TRACK_BY_ID:
        draft.track = null;
        break;
      case trackTypes.SUCCESS_GET_TRACK_BY_ID:
        draft.track = action.track.results[0];
        break;
      case trackTypes.ERROR_GET_TRACK_BY_ID:
        draft.error = get(action.error, 'message', translate('Something went wrong'));
        break;
    }
  });

export default trackReducer;
