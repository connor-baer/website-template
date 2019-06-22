import { includes } from 'lodash';
import FontFaceObserver from 'fontfaceobserver';

import isServer from '../utils/is-server';

export function addClassName(element, className) {
  if (!element.className) {
    // eslint-disable-next-line no-param-reassign
    element.className = className;
    return element.className;
  }

  const classNames = element.className.split(' ');
  if (includes(classNames, className)) {
    return element.className;
  }

  classNames.push(className);
  // eslint-disable-next-line no-param-reassign
  element.className = classNames.join(' ');
  return element.className;
}

export default function loadFonts(fonts, timeout = 5000) {
  if (isServer) {
    return;
  }

  // Optimization for repeat views
  if (sessionStorage.fontsLoaded) {
    addClassName(document.documentElement, 'fonts-loaded');
    return;
  }

  const fontPromises = fonts.map(({ name, config }) => {
    const font = new FontFaceObserver(name, config);
    return font.load(null, timeout);
  });

  Promise.all(fontPromises).then(() => {
    addClassName(document.documentElement, 'fonts-loaded');
    // Optimization for repeat views
    sessionStorage.fontsLoaded = true;
  });
}
