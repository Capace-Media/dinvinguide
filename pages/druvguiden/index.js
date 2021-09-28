import GuideLayout from '../../components/layout/GuideLayout';
import { getAds } from '../../lib/api/ads';
import Ad from '../../components/ads/Ad';
import GrapeList from '../../components/grapes/GrapeList';
import { fetchGrapes } from '../../lib/api/grapes';
import { NextSeo } from 'next-seo';

const DruvguidenPage = ({ ads, grapes }) => {
  return (
    <>
      <NextSeo title='Druvguiden' />
      <GuideLayout>
        <div className='contain-sm row'>
          <h1 className='text-center text-brand-red'>Druvguiden</h1>
          <p className='mt-5 text-center'>
            Utforska världens alla druvor i vår druvguide! Det är nästintill
            omöjligt att hitta en komplett druvguide. Vi har därför börjat bygga
            upp DinVinguides egen druvguide. Du kan med lätthet hitta de mest
            populära druvor som används i vintillverkning här. Vissa av druvorna
            har inte komplett information, och vissa druvor saknas fortfarande.
            Detta är en guide under utveckling!
          </p>
        </div>
        <Ad ads={ads} position='top' />
        <GrapeList grapes={grapes} />
      </GuideLayout>
    </>
  );
};

export default DruvguidenPage;

export const getStaticProps = async () => {
  const resolved = await Promise.all([getAds(), fetchGrapes()]);
  return {
    props: {
      ads: resolved[0],
      grapes: resolved[1],
    },
  };
};
