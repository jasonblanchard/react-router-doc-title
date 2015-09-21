import expect from 'expect';
import { getDocTitleFromRenderProps, transitionComputedDocTitle } from '../index.js';

const mockRenderProps = {routes: [
  {
    docTitle: 'top-level component',
  },
  {
    docTitle: 'nested component',
  },
]};

describe('getDocTitleFromRenderProps', () => {
  describe('with default config', () => {
    it('gets the title from a render tree', () => {
      expect(getDocTitleFromRenderProps(mockRenderProps)).toEqual('nested component');
    });
  });

  describe('with a siteName config', () => {
    it('adds the site name with default delimiter', () => {
      expect(getDocTitleFromRenderProps(mockRenderProps, {siteName: 'My App'})).toEqual('nested component - My App');
    });
  });

  describe('with a custom delimiter', () => {
    it('uses the custom delimiter', () => {
      expect(getDocTitleFromRenderProps(mockRenderProps, {
        siteName: 'My App',
        delimiter: '|',
      })).toEqual('nested component | My App');
    });
  });

  describe('with a docTitleProp config', () => {
    it('finds the title with the custom docTitleProp', () => {
      const newMockRenderProps = {routes: [
        {
          pageTitle: 'top-level component',
        },
        {
          pageTitle: 'nested component',
        },
      ]};
      expect(getDocTitleFromRenderProps(newMockRenderProps, {docTitleProp: 'pageTitle'})).toEqual('nested component');
    });
  });
});

describe('transitionComputedDocTitle', () => {
  let announcedPhrase;
  let announcedManner;

  function announceFunc(phrase, mannor) {
    announcedPhrase = phrase;
    announcedManner = mannor;
  }

  describe('with defaults', () => {
    it('sets the page title and announces a transition', () => {
      transitionComputedDocTitle('page title', { announceFunc });
      expect(document.title).toEqual('page title');
      expect(announcedPhrase).toEqual('page title loaded');
      expect(announcedManner).toEqual('assertive');
    });
  });

  describe('with siteName config', () => {
    it('uses the site title in page title but not announce', () => {
      transitionComputedDocTitle('page title', { announceFunc, siteName: 'My App' });
      expect(document.title).toEqual('page title - My App');
      expect(announcedPhrase).toEqual('page title loaded');
      expect(announcedManner).toEqual('assertive');
    });
  });

  describe('with a delimiter config', () => {
    it('uses the delimiter', () => {
      transitionComputedDocTitle('page title', {
        announceFunc,
        siteName: 'My App',
        delimiter: '|',
      });
      expect(document.title).toEqual('page title | My App');
      expect(announcedPhrase).toEqual('page title loaded');
      expect(announcedManner).toEqual('assertive');
    });
  });

  describe('with a loadAlertPhrase config', () => {
    it('uses the delimiter', () => {
      transitionComputedDocTitle('page title', {
        announceFunc,
        siteName: 'My App',
        loadAlertPhrase: 'finished loading',
      });
      expect(document.title).toEqual('page title - My App');
      expect(announcedPhrase).toEqual('page title finished loading');
      expect(announcedManner).toEqual('assertive');
    });
  });

  describe('with an announceManner config', () => {
    it('uses the manner', () => {
      transitionComputedDocTitle('page title', {
        announceFunc,
        siteName: 'My App',
        announceManner: 'polite',
      });
      expect(document.title).toEqual('page title - My App');
      expect(announcedPhrase).toEqual('page title loaded');
      expect(announcedManner).toEqual('polite');
    });
  });

  describe('with an shouldAnnounce config', () => {
    it('uses the manner', () => {
      announcedPhrase = undefined;
      announcedManner = undefined;

      transitionComputedDocTitle('page title', {
        announceFunc,
        siteName: 'My App',
        shouldAnnounce: false,
      });
      expect(document.title).toEqual('page title - My App');
      expect(announcedPhrase).toEqual(undefined);
      expect(announcedManner).toEqual(undefined);
    });
  });
});
