import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { get } from 'lodash';

/**
 * Direct selector to the demo state domain
 */

const selectItunesDomain = state => state.itunesReducer || initialState;

const makeSelectItunes = () =>
  createSelector(
    selectItunesDomain,
    substate => substate
  );

export const selectSongs = () =>
  createSelector(
    selectItunesDomain,
    substate => get(substate, 'songs')
  );

export const selectLoading = () =>
  createSelector(
    selectItunesDomain,
    substate => get(substate, 'loading')
  );

export const selectError = () =>
  createSelector(
    selectItunesDomain,
    substate => get(substate, 'error')
  );

export const selectSearchText = () =>
  createSelector(
    selectItunesDomain,
    substate => get(substate, 'searchText')
  );

export const selectTrack = () =>
  createSelector(
    selectItunesDomain,
    substate => get(substate, 'track')
  );

export default makeSelectItunes;
export { selectItunesDomain };
