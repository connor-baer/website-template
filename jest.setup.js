/* global expect */
import 'jest-dom/extend-expect';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { render, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createSerializer } from 'jest-emotion';
import { ThemeProvider } from 'emotion-theming';

import './__mocks__/nextRouter';
import createTheme from './styles/theme';

function renderWithTheme(renderFn) {
  return (component, ...rest) =>
    renderFn(
      <ThemeProvider theme={createTheme()}>{component}</ThemeProvider>,
      ...rest
    );
}

global.render = renderWithTheme(render);
global.renderToHtml = renderWithTheme(renderToStaticMarkup);
global.fireEvent = fireEvent;
global.axe = axe;

// eslint-disable-next-line no-underscore-dangle
global.__NEXT_DATA__ = {};
global.__DEV__ = false;
global.__PRODUCTION__ = false;
global.__TEST__ = true;

// Add custom matchers
expect.extend(toHaveNoViolations);

// Add a snapshot serializer to remove random hashes from Emotion class names.
expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `circuit-${index}`;
    }
  })
);
