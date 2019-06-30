import { useEffect } from 'react';

export default function useMedia(expression, callback) {
  useEffect(() => {
    const query = window.matchMedia(expression);

    if (query.matches) {
      callback(true);
    }

    const handleChange = () => {
      callback(query.matches);
    };

    query.addListener(handleChange);

    return () => {
      query.removeListener(handleChange);
    };
  }, [expression, callback]);
}
