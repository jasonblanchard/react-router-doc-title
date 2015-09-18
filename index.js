var a11yToolkit = require('a11y-toolkit');
var React = require('react');

function getDocTitle(routeTree) {
  const lastElement = routeTree[routeTree.length - 1];
  return lastElement.docTitle;
}

function getDocTitleFromState(state) {
  return getDocTitle(state.routes);
}

function getDocTitleFromRenderProps(renderProps) {
  return getDocTitle(renderProps.routes);
}

function transitionTitle(state) {
  const title = getDocTitleFromState(state);
  const lastTitle = document.title;
  if (title) {
    if (title !== lastTitle) {
      document.title = title;
      a11yToolkit.announce(title + ' loaded', 'assertive');
    }
  }
}

var A11yAnnouncer = React.createClass({
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
  transitionTitle: transitionTitle,
  A11yAnnouncer: A11yAnnouncer,
};
