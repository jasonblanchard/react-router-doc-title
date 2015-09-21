import React from 'react';
import { Component, PropTypes } from 'react';

const propTypes = {
  someValues: PropTypes.array,
};

export default class ExampleChild extends Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addSomeValue } = this.props;
    addSomeValue(this.state.value);
    this.setState({value: ''});
    React.findDOMNode(this.refs.value).focus();
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  render() {
    return (
      <div>
        I am a child component. I can access someValues: {this.props.someValues.join(', ')}
        <br />
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              id="value"
              ref="value"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <input
            type="submit"
            value="add value"
          />
        </form>
      </div>
    );
  }
}

ExampleChild.propTypes = propTypes;
