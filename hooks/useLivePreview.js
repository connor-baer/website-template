import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { fetchNotionPage } from '../services/api';
import useWindowFocus from './useWindowFocus';

export default function useLivePreview(initialData) {
  const [data, setData] = useState(initialData);
  const isWindowFocused = useWindowFocus();
  const router = useRouter();
  const { query = {} } = router;

  useEffect(() => {
    const isPreview = !!query.preview;

    if (isWindowFocused && isPreview) {
      fetchNotionPage({ query }).then(res => setData(res));
    }
  }, [isWindowFocused, query]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return data;
}
