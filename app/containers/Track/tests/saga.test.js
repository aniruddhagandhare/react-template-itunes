/**
 * Test track sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import trackSaga, { defaultFunction } from '../saga';
import { trackTypes } from '../reducer';

describe('Track saga tests', () => {
  const generator = trackSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(trackTypes.DEFAULT_ACTION, defaultFunction));
  });
});
