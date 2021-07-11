import { takeLatest, call, put, select } from 'redux-saga/effects';
import { demoTypes, demoCreators } from './reducer';
import { getSongs, getTrack } from '@services/itunesApi';
import { selectSongs } from './selectors';
// Individual exports for testing
const { REQUEST_GET_SONGS, GET_TRACK_BY_ID } = demoTypes;
const { successGetSongs, errorGetSongs, successGetTrackById, errorGetTrackById, successFetchTrackById } = demoCreators;

export function* defaultFunction(action) {
  const response = yield call(getSongs, action.searchText);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(errorGetSongs(data));
  }
}
export function* getTrackByIdSaga(action) {
  const songs = yield select(selectSongs());
  const song = findSongInCache(songs, action.trackId);
  if (song.length > 0) {
    const track = { results: song };
    yield put(successGetTrackById(track));
  } else {
    const response = yield call(getTrack, action.trackId);
    const { ok, data } = response;
    if (ok) {
      if (data.resultCount > 0) {
        yield put(successFetchTrackById(data));
      } else {
        yield put(errorGetTrackById({ error: { message: 'No track found :(' } }));
      }
    } else {
      yield put(errorGetTrackById(data));
    }
  }
}

export default function* demoSaga() {
  yield takeLatest(REQUEST_GET_SONGS, defaultFunction);
  yield takeLatest(GET_TRACK_BY_ID, getTrackByIdSaga);
}

const findSongInCache = (songs, param) => songs.filter(song => song.trackId == param);
