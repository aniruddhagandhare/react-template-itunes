// import produce from 'immer'
import { fromJS } from 'immutable';
import { demoReducer, demoTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('Demo reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(demoReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = fromJS(state.toJS()).set('somePayload', 'Mohammed Ali Chherawalla');
    expect(
      demoReducer(state, {
        type: demoTypes.DEFAULT_ACTION,
        somePayload: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
