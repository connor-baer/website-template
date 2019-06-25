import FontFaceObserver from 'fontfaceobserver';

import { loadFonts } from './fonts';

const mockLoad = jest.fn();
jest.mock('fontfaceobserver', () =>
  jest.fn().mockImplementation(() => ({ load: mockLoad }))
);

describe('Fonts', () => {
  describe('loadFonts', () => {
    const { sessionStorage } = global;

    beforeEach(() => {
      global.sessionStorage = sessionStorage;
      FontFaceObserver.mockClear();
      mockLoad.mockClear();
    });

    const fonts = [
      { name: 'aktiv-grotesk', config: { weight: 400 } },
      { name: 'aktiv-grotesk', config: { weight: 700 } }
    ];

    it('should load the fonts', async () => {
      await loadFonts(fonts);
      expect(FontFaceObserver).toHaveBeenCalledWith('aktiv-grotesk', {
        weight: 400
      });
      expect(FontFaceObserver).toHaveBeenCalledWith('aktiv-grotesk', {
        weight: 700
      });
      expect(FontFaceObserver).toHaveBeenCalledTimes(fonts.length);
      expect(mockLoad).toHaveBeenCalledTimes(fonts.length);
    });

    it('should add a class name to the document when the fonts have finished loading', async () => {
      await loadFonts(fonts);
      expect(document.documentElement.className).toBe('fonts-loaded');
    });

    it('should save to session storage when the fonts have finished loading', async () => {
      await loadFonts(fonts);
      expect(global.sessionStorage.fontsLoaded).toBeTruthy();
    });

    it('should not load the fonts again on repeat visits', async () => {
      global.sessionStorage.fontsLoaded = true;
      await loadFonts(fonts);
      expect(FontFaceObserver).toHaveBeenCalledTimes(0);
      expect(mockLoad).toHaveBeenCalledTimes(0);
      expect(document.documentElement.className).toBe('fonts-loaded');
    });
  });
});
