import { fromJS } from 'immutable';
import { selectFloatingButtonDomain } from '../selectors';

describe('FloatingButton selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      floatingButton: fromJS({})
    };
  });

  it('should select the user state', () => {
    expect(selectFloatingButtonDomain(mockedState)).toEqual(mockedState.floatingButton.toJS());
  });
});
