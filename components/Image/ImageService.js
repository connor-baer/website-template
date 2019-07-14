import { parse, format } from 'url';
import { isNil, omitBy } from 'lodash/fp';

// eslint-disable-next-line import/prefer-default-export
export function getSrc(src, { width: w, height: h, format: fm }) {
  if (!src) {
    return undefined;
  }

  const { query = {}, search, ...rest } = parse(src, true);
  const params = { w, h, fm, url: query.url };
  const truthyParams = omitBy(isNil, params);

  return format({ ...rest, query: truthyParams });
}
