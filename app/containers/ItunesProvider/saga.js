import { takeLatest, call, put, select } from 'redux-saga/effects';
import { translate } from '@app/components/IntlGlobalProvider';
import { itunesTypes, itunesCreators } from './reducer';
import { getSongs, getTrack } from '@services/itunesApi';
import { selectSongs } from './selectors';
import { isEmpty } from 'lodash';

const { REQUEST_GET_SONGS, REQUEST_GET_TRACK_BY_ID } = itunesTypes;
const {
  successGetSongs,
  errorGetSongs,
  successGetTrackById,
  errorGetTrackById,
  successFetchTrackById
} = itunesCreators;

export function* getSongsFromItunes(action) {
  const response = yield call(getSongs, action.searchText);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(errorGetSongs(data));
  }
}
export function* getTrackById(action) {
  const songs = yield select(selectSongs());
  const song = findSongInCache(songs, action.trackId);
  if (!isEmpty(song)) {
    const track = { results: song };
    yield put(successGetTrackById(track));
  } else {
    const response = yield call(getTrack, action.trackId);
    const { ok, data } = response;
    if (ok) {
      if (data.resultCount > 0) {
        yield put(successFetchTrackById(data));
      } else {
        yield put(errorGetTrackById({ message: translate('no_track_found') }));
      }
    } else {
      yield put(errorGetTrackById(data));
    }
  }
}

export default function* demoSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getSongsFromItunes);
  yield takeLatest(REQUEST_GET_TRACK_BY_ID, getTrackById);
}

const findSongInCache = (songs, param) => songs.filter(song => song.trackId == param);
