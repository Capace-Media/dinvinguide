import { useState } from 'react';
const useList = (initialData) => {
  const [array, setArray] = useState(initialData);

  const updateArray = (newArrayItems) => {
    const newArray = [...array, ...newArrayItems];
    setArray(newArray);
  };

  return { array, updateArray };
};

export default useList;
