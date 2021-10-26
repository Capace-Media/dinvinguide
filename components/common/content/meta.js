import 'dayjs/locale/sv';

import dayjs from 'dayjs';

const Meta = ({ author, datePublished }) => {
  return (
    <>
      <div className='text-center contain-sm'>
        <strong className='text-xl font-semibold uppercase'>{author}</strong>
        <p className='mt-2'>
          {dayjs(datePublished).locale('sv').format('DD MMMM, YYYY')}
        </p>
      </div>
    </>
  );
};

export default Meta;
