import addClass from './add-class';

describe('addClass', () => {
  it('should add the class name to the element', () => {
    const element = {};
    const className = 'foo';
    addClass(element, className);
    expect(element.className).toBe(className);
  });

  it('should concatenate the class name with existing class names', () => {
    const element = { className: 'bar' };
    const className = 'baz';
    addClass(element, className);
    expect(element.className).toBe('bar baz');
  });

  it('should do nothing if the element already has the class name', () => {
    const element = { className: 'baz' };
    const className = 'baz';
    addClass(element, className);
    expect(element.className).toBe('baz');
  });
});
