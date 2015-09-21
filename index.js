'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _a11yToolkit = require('a11y-toolkit');

var _a11yToolkit2 = _interopRequireDefault(_a11yToolkit);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/**
 * Private methods
 */

// renderTree should be an array of components,
// the last of which is the deepst component to render for that route.
function _findDocTitle(routeTree) {
  var docTitleProp = arguments.length <= 1 || arguments[1] === undefined ? 'docTitle' : arguments[1];

  var lastElement = routeTree[routeTree.length - 1];
  return lastElement[docTitleProp];
}

// Expects to get routeTree from this.state inside the onUpdate callback
function _findDocTitleFromState(state, docTitleProp) {
  return _findDocTitle(state.routes, docTitleProp);
}

function _getTitle(title, _ref) {
  var siteName = _ref.siteName;
  var _ref$delimiter = _ref.delimiter;
  var delimiter = _ref$delimiter === undefined ? '-' : _ref$delimiter;

  var fullTitle = '';

  if (siteName) {
    fullTitle = title + ' ' + delimiter + ' ' + siteName;
  } else {
    fullTitle = '' + title;
  }
  return fullTitle;
}

function _updateTitle(title, _ref2) {
  var siteName = _ref2.siteName;
  var delimiter = _ref2.delimiter;
  var _ref2$shouldAnnounce = _ref2.shouldAnnounce;
  var shouldAnnounce = _ref2$shouldAnnounce === undefined ? true : _ref2$shouldAnnounce;
  var _ref2$loadAlertPhrase = _ref2.loadAlertPhrase;
  var loadAlertPhrase = _ref2$loadAlertPhrase === undefined ? 'loaded' : _ref2$loadAlertPhrase;
  var _ref2$announceManner = _ref2.announceManner;
  var announceManner = _ref2$announceManner === undefined ? 'assertive' : _ref2$announceManner;

  document.title = _getTitle(title, { siteName: siteName, delimiter: delimiter });

  if (shouldAnnounce) {
    _a11yToolkit2['default'].announce(title + ' ' + loadAlertPhrase, announceManner);
  }

  return title;
}

/**
 * Exported public methods
 */

// Expects to get renderProps from renderProps in match() callback
function getDocTitleFromRenderProps(renderProps) {
  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var docTitleProp = config.docTitleProp;
  var delimiter = config.delimiter;
  var siteName = config.siteName;

  var title = _findDocTitle(renderProps.routes, docTitleProp);
  if (title) {
    return _getTitle(title, { siteName: siteName, delimiter: delimiter });
  }
}

function transitionDocTitle(state, config) {
  var docTitleProp = config.docTitleProp;

  var title = _findDocTitleFromState(state, docTitleProp);

  var lastTitle = document.title;
  if (title) {
    if (title !== lastTitle) {
      _updateTitle(title, config);
    }
  }
}

function transitionComputedDocTitle(title, config) {
  _updateTitle(title, config);
}

var A11yAnnouncer = _react2['default'].createClass({
  displayName: 'A11yAnnouncer',

  render: function render() {
    return _react2['default'].createElement('div', {
      id: 'a11y-toolkit-announcer',
      'aria-live': 'polite',
      style: {
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }
    });
  }
});

module.exports = {
  getDocTitleFromRenderProps: getDocTitleFromRenderProps,
  transitionDocTitle: transitionDocTitle,
  A11yAnnouncer: A11yAnnouncer,
  transitionComputedDocTitle: transitionComputedDocTitle
};
