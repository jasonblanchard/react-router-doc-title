'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _a11yToolkit = require('a11y-toolkit');

var _a11yToolkit2 = _interopRequireDefault(_a11yToolkit);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// renderTree should be an array of components,
// the last of which is the deepst component to render for that route.
function _getDocTitle(routeTree, docTitleProp) {
  var lastElement = routeTree[routeTree.length - 1];
  return lastElement[docTitleProp];
}

// Expects to get routeTree from this.state inside the onUpdate callback
function _getDocTitleFromState(state, docTitleProp) {
  return _getDocTitle(state.routes, docTitleProp);
}

// Expects to get renderProps from renderProps in match() callback
function getDocTitleFromRenderProps(renderProps) {
  return _getDocTitle(renderProps.routes);
}

function transitionDocTitle(state) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var siteName = _ref.siteName;
  var _ref$docTitleProp = _ref.docTitleProp;
  var docTitleProp = _ref$docTitleProp === undefined ? 'docTitle' : _ref$docTitleProp;
  var _ref$delimiter = _ref.delimiter;
  var delimiter = _ref$delimiter === undefined ? '-' : _ref$delimiter;
  var _ref$shouldAnnounce = _ref.shouldAnnounce;
  var shouldAnnounce = _ref$shouldAnnounce === undefined ? true : _ref$shouldAnnounce;
  var _ref$loadAlertPhrase = _ref.loadAlertPhrase;
  var loadAlertPhrase = _ref$loadAlertPhrase === undefined ? 'loaded' : _ref$loadAlertPhrase;
  var _ref$announceManner = _ref.announceManner;
  var announceManner = _ref$announceManner === undefined ? 'assertive' : _ref$announceManner;

  var title = _getDocTitleFromState(state, docTitleProp);
  var lastTitle = document.title;
  if (title) {
    if (title !== lastTitle) {
      if (siteName) {
        document.title = title + ' ' + delimiter + ' ' + siteName;
      } else {
        document.title = '' + title;
      }

      if (shouldAnnounce) {
        _a11yToolkit2['default'].announce(title + ' ' + loadAlertPhrase, announceManner);
      }
    }
  }
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
  A11yAnnouncer: A11yAnnouncer
};
