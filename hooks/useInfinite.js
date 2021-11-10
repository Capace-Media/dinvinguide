import { useCallback, useState } from 'react';
const useInfinite = (key, initialArray, initialCursor) => {
  const [array, setArray] = useState(initialArray);
  const [cursor, setCursor] = useState(initialCursor);

  const loadMore = useCallback(async () => {
    try {
      const response = await fetch(`${key}/${cursor}`);
      const data = await response.json();
      setCursor(data.cursor);
      setArray((prev) => [...prev, ...data.array]);
    } catch (error) {
      console.log('ERROR =>', error);
    }
  }, [cursor, key]);
  const search = useCallback(async (input) => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({
          type: 'recipes',
          input,
          batch: 20,
        }),
      });
    } catch (error) {}
  }, []);

  return { array, loadMore };
};
export default useInfinite;
