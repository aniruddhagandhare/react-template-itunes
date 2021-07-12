import { fromJS } from 'immutable';
import { selectDemoDomain } from '../selectors';

describe('Demo selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      demo: fromJS({})
    };
  });

  it('should select the user state', () => {
    expect(selectDemoDomain(mockedState)).toEqual(mockedState.demo.toJS());
  });
});
