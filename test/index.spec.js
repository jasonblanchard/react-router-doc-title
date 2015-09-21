import expect from 'expect';
import { getDocTitleFromRenderProps } from '../index.js';

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
