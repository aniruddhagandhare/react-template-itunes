import { fromJS } from 'immutable';
import { selectTrackDomain } from '../selectors';

describe('Track selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      track: fromJS({})
    };
  });

  it('should select the user state', () => {
    expect(selectTrackDomain(mockedState)).toEqual(mockedState.track.toJS());
  });
});
