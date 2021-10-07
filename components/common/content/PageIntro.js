import Ad from '../../ads/Ad';
import Intro from './Intro';
import ReactHtmlParser from 'react-html-parser';
const PageIntro = ({ title, text, ads }) => {
  return (
    <>
      {ads && (
        <div className='mb-10'>
          <Ad ads={ads} position='top' />
        </div>
      )}
      <div className='text-center contain-sm row'>
        <h1 className='mb-5  text-brand-red'>{title}</h1>
        <Intro content={text} />
      </div>
    </>
  );
};

export default PageIntro;
