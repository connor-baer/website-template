import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import useWindowFocus from './useWindowFocus';

export default function useLivePreview(initialData, fetchData) {
  const [data, setData] = useState(initialData);
  const isWindowFocused = useWindowFocus();
  const router = useRouter();
  const { query = {} } = router;

  useEffect(() => {
    const isPreview = !!query.preview;

    if (isWindowFocused && isPreview) {
      fetchData({ query }).then(res => {
        if (!res.error) {
          setData(res);
        }
      });
    }
  }, [fetchData, isWindowFocused, query]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return data;
}
