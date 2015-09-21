import React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../actions/actions';
import ExampleChild from '../components/ExampleChild';

class ExampleContainer extends Component {

  render() {
    return (
      <div>
        <h2>Example Connected Component</h2>
        <ExampleChild {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    someValues: state.someValues,
  };
}

function mapDispatchToProps(dispatch) {
  const actionMapping = {
    addSomeValue: actions.addSomeValue,
  };

  return bindActionCreators(actionMapping, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleContainer);
