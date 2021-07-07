import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the floatingButton state domain
 */

const selectFloatingButtonDomain = state => (state.floatingButton || initialState).toJS();

const makeSelectFloatingButton = () =>
  createSelector(
    selectFloatingButtonDomain,
    substate => substate
  );

export default makeSelectFloatingButton;
export { selectFloatingButtonDomain };
