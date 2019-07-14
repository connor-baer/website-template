import React from 'react';

import ColumnList from './ColumnList';

describe('ColumnList', () => {
  function renderColumnList(fn, props = {}) {
    return fn(<ColumnList {...props} />);
  }

  it('should render with default styles', () => {
    const columns = [
      { data: { ratio: 0.5 } },
      { data: { ratio: 0.25 } },
      { data: { ratio: 0.25 } }
    ];
    const { container } = renderColumnList(render, { columns });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should meet basic accessibility guidelines', async () => {
    const columns = [
      { data: { ratio: 0.5 } },
      { data: { ratio: 0.25 } },
      { data: { ratio: 0.25 } }
    ];
    const html = renderColumnList(renderToHtml, { columns });
    const result = await axe(html);
    expect(result).toHaveNoViolations();
  });
});
