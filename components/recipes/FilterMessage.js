import React from 'react';

const FilterMessage = React.memo(({ totalCount, currentCount, searchTerm }) => {
  return (
    <div className='text-center contain row'>
      Visar {!searchTerm ? totalCount : currentCount} av {totalCount} recept.
    </div>
  );
});
export default FilterMessage;
