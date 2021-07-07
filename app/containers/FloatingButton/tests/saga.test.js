/**
 * Test floatingButton sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import floatingButtonSaga, { defaultFunction } from '../saga';
import { floatingButtonTypes } from '../reducer';

describe('FloatingButton saga tests', () => {
  const generator = floatingButtonSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(floatingButtonTypes.DEFAULT_ACTION, defaultFunction));
  });
});
