import { takeLatest } from 'redux-saga/effects';
import { floatingButtonTypes } from './reducer';
// Individual exports for testing
const { DEFAULT_ACTION } = floatingButtonTypes;

export function* defaultFunction(/* action */) {
  // console.log('Do something here')
}

export default function* floatingButtonSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultFunction);
}
