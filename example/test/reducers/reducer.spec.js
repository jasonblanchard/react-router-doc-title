import expect from 'expect';
import app from '../../src/shared/reducers/reducer';
import { actionConstants } from '../../src/shared/actions/actions';

describe('App reducer', () => {
  it('should handle initial state', () => {
    expect(app(undefined, {})).toEqual({
      someValues: [],
    });
  });

  it('should handle ADD_SOME_VALUE', () => {
    expect(
      app(undefined, {
        type: actionConstants.ADD_SOME_VALUE,
        value: 'cats',
      })
    ).toEqual({
      someValues: ['cats'],
    });
  });
});
