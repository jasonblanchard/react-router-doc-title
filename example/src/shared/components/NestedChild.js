import React from 'react';
import { transitionComputedDocTitle } from 'react-router-doc-title';
import siteTitleConfig from '../../config/siteTitle';

export default class NestedChild extends React.Component {

  componentDidMount() {
    transitionComputedDocTitle('computed title', siteTitleConfig);
  }

  render() {
    return (
      <div>
        <h2>Some Specific Settings</h2>
        I am a nested component!
      </div>
    );
  }
}
