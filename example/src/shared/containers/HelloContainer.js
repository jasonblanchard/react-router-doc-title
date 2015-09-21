import React from 'react';
import { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string,
};

export default class Hello extends React.Component {
  render() {
    return (
      <div>
        Hello, {this.props.params.name}!
      </div>
    );
  }
}

Hello.propTypes = propTypes;
