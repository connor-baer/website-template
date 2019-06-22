import isSlowConnection from './is-slow-connection';

describe('Check if user has slow connection', () => {
  const originalGlobal = global.navigator;

  beforeEach(() => {
    global.navigator = {};
  });

  afterAll(() => {
    global.navigator = originalGlobal;
  });

  it('should be false if connection is not undefined', () => {
    const actual = isSlowConnection();
    const expected = false;

    expect(actual).toEqual(expected);
  });

  it('should be false if fast network detected', () => {
    global.navigator.connection = {
      effectiveType: '3g'
    };

    const actual = isSlowConnection();
    const expected = false;

    expect(actual).toEqual(expected);
  });

  it('should be true if saveData is available and enabled', () => {
    global.navigator.connection = {
      saveData: true
    };

    const actual = isSlowConnection();
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('should be true if slow network detected', () => {
    global.navigator.connection = {
      effectiveType: 'slow-2g'
    };

    const actual = isSlowConnection();
    const expected = true;

    expect(actual).toEqual(expected);
  });
});
