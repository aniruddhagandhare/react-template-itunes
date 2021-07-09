import { get } from 'lodash'
import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the track state domain
 */

const selectTrackDomain = state => {
  return state.trackContainer || initialState
}

const makeSelectTrack = () =>
  createSelector(selectTrackDomain, substate => substate)

export const selectTrack = () => createSelector(selectTrackDomain, substate => get(substate, 'track', {}))

export default makeSelectTrack
export { selectTrackDomain }
