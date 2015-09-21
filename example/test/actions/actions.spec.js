import expect from 'expect';
import { actionConstants, actions } from '../../src/shared/actions/actions';

describe('actions', () => {
  it('addSomeValue should create ADD_SOME_VALUE action', () => {
    expect(actions.addSomeValue('cats')).toEqual({
      type: actionConstants.ADD_SOME_VALUE,
      value: 'cats',
    });
  });
});
