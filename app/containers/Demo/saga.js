import { takeLatest, call, put } from 'redux-saga/effects';
import { demoTypes, demoCreators } from './reducer';
import { getSongs } from '@services/itunesApi';
// Individual exports for testing
const { GET_SONGS } = demoTypes;
const { successGetSongs, errorGetSongs } = demoCreators;
export function* defaultFunction(action) {
  if(action.searchText === '') {
    return;
  }
  const response = yield call(getSongs, action.searchText);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(errorGetSongs(data));
  }
}

export default function* demoSaga() {
  yield takeLatest(GET_SONGS, defaultFunction);
}
