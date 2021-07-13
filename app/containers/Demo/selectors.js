import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { get } from 'lodash';

/**
 * Direct selector to the demo state domain
 */

const selectDemoDomain = state => {
  return state.demoContainer || initialState;
};

const makeSelectDemo = () =>
  createSelector(
    selectDemoDomain,
    substate => substate
  );

export const selectSongs = () =>
  createSelector(
    selectDemoDomain,
    substate => {
      return get(substate, 'songs');
    }
  );

export const selectLoading = () =>
  createSelector(
    selectDemoDomain,
    substate => get(substate, 'loading')
  );

export const selectError = () =>
  createSelector(
    selectDemoDomain,
    substate => get(substate, 'error')
  );

export const selectSearchText = () =>
  createSelector(
    selectDemoDomain,
    substate => get(substate, 'searchText')
  );

export default makeSelectDemo;
export { selectDemoDomain };
