import a11yToolkit from 'a11y-toolkit';
import React from 'react';

/**
 * Private methods
 */

// renderTree should be an array of components,
// the last of which is the deepst component to render for that route.
function _findDocTitle(routeTree, docTitleProp = 'docTitle') {
  const lastElement = routeTree[routeTree.length - 1];
  return lastElement[docTitleProp];
}

// Expects to get routeTree from this.state inside the onUpdate callback
function _findDocTitleFromState(state, docTitleProp) {
  return _findDocTitle(state.routes, docTitleProp);
}

function _getTitle(title, { siteName, delimiter = '-' }) {
  let fullTitle = '';

  if (siteName) {
    fullTitle = `${title} ${delimiter} ${siteName}`;
  } else {
    fullTitle = `${title}`;
  }

  return fullTitle;
}

function _updateTitle(title, {
  siteName,
  delimiter,
  shouldAnnounce = true,
  loadAlertPhrase = 'loaded',
  announceManner = 'assertive',
  announceFunc =  a11yToolkit.announce,
}) {
  document.title = _getTitle(title, { siteName, delimiter});

  if (shouldAnnounce) {
    announceFunc(`${title} ${loadAlertPhrase}`, announceManner);
  }

  return title;
}

/**
 * Exported public methods
 */

// Expects to get renderProps from renderProps in match() callback
function getDocTitleFromRenderProps(renderProps, config = {}) {
  const { docTitleProp, delimiter, siteName} = config;

  const title = _findDocTitle(renderProps.routes, docTitleProp);
  if (title) {
    return _getTitle(title, { siteName, delimiter });
  }
}

function transitionDocTitle(state, config) {
  const { docTitleProp } = config;

  const title = _findDocTitleFromState(state, docTitleProp);

  const lastTitle = document.title;
  if (title) {
    if (title !== lastTitle) {
      _updateTitle(title, config);
    }
  }
}

function transitionComputedDocTitle(title, config = {}) {
  _updateTitle(title, config);
}

const A11yAnnouncer = React.createClass({
  render: function render() {
    return React.createElement('div', {
      id: 'a11y-toolkit-announcer',
      'aria-live': 'polite',
      style: {
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      },
    });
  },
});

module.exports = {
  getDocTitleFromRenderProps: getDocTitleFromRenderProps,
  transitionDocTitle: transitionDocTitle,
  A11yAnnouncer: A11yAnnouncer,
  transitionComputedDocTitle: transitionComputedDocTitle,
};
