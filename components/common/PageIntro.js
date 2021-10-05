import Ad from '../ads/Ad';
import ReactHtmlParser from 'react-html-parser';
const PageIntro = ({ title, text, ads }) => {
  return (
    <>
      <div className='text-center contain-sm row rich-text'>
        <h1 className='text-brand-red'>{title}</h1>
        {ReactHtmlParser(text)}
      </div>
      {ads && (
        <div className='mb-10'>
          <Ad ads={ads} position='top' />
        </div>
      )}
    </>
  );
};

export default PageIntro;
