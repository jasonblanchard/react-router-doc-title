import a11yToolkit from 'a11y-toolkit';
import React from 'react';

// renderTree should be an array of components,
// the last of which is the deepst component to render for that route.
function _getDocTitle(routeTree, docTitleProp) {
  const lastElement = routeTree[routeTree.length - 1];
  return lastElement[docTitleProp];
}

// Expects to get routeTree from this.state inside the onUpdate callback
function _getDocTitleFromState(state, docTitleProp) {
  return _getDocTitle(state.routes, docTitleProp);
}

function _setTitle(title, { siteName, delimiter}) {
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
  delimiter = '-',
  shouldAnnounce = true,
  loadAlertPhrase = 'loaded',
  announceManner = 'assertive',
}) {
  if (siteName) {
    document.title = _setTitle(title, { siteName, delimiter});

    if (shouldAnnounce) {
      a11yToolkit.announce(`${title} ${loadAlertPhrase}`, announceManner);
    }
  }

  return title;
}

// Expects to get renderProps from renderProps in match() callback
function getDocTitleFromRenderProps(renderProps, config) {
  const { docTitleProp = 'docTitle', delimiter = '-', siteName} = config;
  const title = _getDocTitle(renderProps.routes, docTitleProp);
  return _setTitle(title, { siteName, delimiter });
}

function transitionDocTitle(state, config) {
  const { docTitleProp = 'docTitle' } = config;

  const title = _getDocTitleFromState(state, docTitleProp);
  const lastTitle = document.title;
  if (title) {
    if (title !== lastTitle) {
      _updateTitle(title, config);
    }
  }
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
  //transitionComputedDocTitle: transitionComputedDocTitle,
};
