/**
 * Test demo sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import demoSaga, { defaultFunction } from '../saga';
import { demoTypes } from '../reducer';

describe('Demo saga tests', () => {
  const generator = demoSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(demoTypes.DEFAULT_ACTION, defaultFunction));
  });
});
