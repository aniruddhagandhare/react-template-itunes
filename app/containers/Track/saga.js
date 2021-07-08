import { takeLatest, put, call } from 'redux-saga/effects'
import { getTrack } from '@services/itunesApi';
import { trackTypes, trackCreators } from './reducer'

// Individual exports for testing
const { GET_TRACK_BY_ID } = trackTypes;
const { successGetTrackById, errorGetTrackById} = trackCreators;
export function *defaultFunction (action) {
  const response = yield call(getTrack, action.trackId)
  const { ok, data } = response;
  if(ok) {
    yield put(successGetTrackById(data))
  }
  else {
    yield put(errorGetTrackById(data))
  }
}

export default function* trackSaga() {
  yield takeLatest(GET_TRACK_BY_ID, defaultFunction)
}