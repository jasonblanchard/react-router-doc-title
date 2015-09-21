import React from 'react';
import { PropTypes } from 'react';
import { Link } from 'react-router';
import { A11yAnnouncer } from 'react-router-doc-title';

const propTypes = {
  children: PropTypes.node,
};

export default class RootContainer extends React.Component {
  render() {
    return (
      <div>
        <A11yAnnouncer />

        <h1><Link to="/">App</Link></h1>

        <nav>
          <ul>
            <li><Link to="/about" activeClassName="active">About</Link></li>
            <li><Link to="/hello/world" activeClassName="active">Hello</Link></li>
            <li><Link to="/settings" activeClassName="active">Settings</Link></li>
          </ul>
        </nav>

        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

RootContainer.propTypes = propTypes;
