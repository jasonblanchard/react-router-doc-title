var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html></head><body><div id="a11y-toolkit-announcer"></div></body></html>');
global.window = document.parentWindow;
