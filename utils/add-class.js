import { includes } from 'lodash/fp';

export default function addClass(element, className) {
  if (!element.className) {
    // eslint-disable-next-line no-param-reassign
    element.className = className;
    return element.className;
  }

  const classNames = element.className.split(' ');
  if (includes(className, classNames)) {
    return element.className;
  }

  classNames.push(className);
  // eslint-disable-next-line no-param-reassign
  element.className = classNames.join(' ');
  return element.className;
}
