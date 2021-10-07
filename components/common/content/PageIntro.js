import Ad from '../../ads/Ad';
import BreadCrumbs from '../BreadCrumbs/Breadcrumbs';
import Intro from './Intro';

const PageIntro = ({ title, text, ads, crumbs }) => {
  return (
    <>
      {ads && (
        <div className='mb-10'>
          <Ad ads={ads} position='top' />
        </div>
      )}
      {crumbs && <BreadCrumbs crumbs={crumbs} />}
      <div className='text-center contain-sm row'>
        <h1 className='mb-5 text-brand-red'>{title}</h1>
        {text && <Intro content={text} />}
      </div>
    </>
  );
};

export default PageIntro;
