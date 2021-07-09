import { takeLatest, call, put } from 'redux-saga/effects';
import { demoTypes, demoCreators } from './reducer';
import { getSongs } from '@services/itunesApi';
// Individual exports for testing
const { GET_SONGS } = demoTypes;
const { successGetSongs, errorGetSongs } = demoCreators;
export function* defaultFunction(action) {
<<<<<<< HEAD
  if(action.searchText === '') {
=======
  if (action.searchText === '') {
>>>>>>> a5aa772108b0ef7087abbd569df4421e93c4a14f
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
