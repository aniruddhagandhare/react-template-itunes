/*
 *
 * FloatingButton reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';

export const initialState = fromJS({});

export const { Types: floatingButtonTypes, Creators: floatingButtonCreators } = createActions({
  defaultAction: ['somePayload']
});

/* eslint-disable default-case, no-param-reassign */
export const floatingButtonReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case floatingButtonTypes.DEFAULT_ACTION:
        return state.set('somePayload', action.somePayload);
      default:
        return state;
    }
  });

export default floatingButtonReducer;
