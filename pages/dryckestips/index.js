import Ad from '../../components/ads/Ad';
import ClientAd from '../../components/ads/ClientAd';
import { DRINKTIPS } from '../../lib/fragments/drinks';
import DrinktipsList from '../../components/drinkTips/DrinktipsList';
import PageIntro from '../../components/common/content/PageIntro';
import SEO from '../../components/common/SEO';
import { getAds } from '../../lib/api/ads';
import { useState } from 'react';
import wpFetch from '../../lib/wpFetch';
const DryckesTipsPage = ({ drinks }) => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <>
      <SEO
        title='Dryckestips'
        description='Upptäck exklusiva dryckestips från DinVinguide.'
      />
      <PageIntro ad title='Exklusiva dryckestips' />

      <div className='text-center row contain'>
        <input
          type='text'
          value={searchInput}
          onChange={({ target }) => {
            setSearchInput(target.value);
          }}
          placeholder='Sök...'
          className='w-full px-5 py-3 lg:w-96'
        />
      </div>
      <DrinktipsList searchInput={searchInput} drinks={drinks} />
    </>
  );
};

export default DryckesTipsPage;

export const getStaticProps = async () => {
  const resolved = await Promise.all([
    wpFetch(DRINKTIPS, { batch: 200, type: 'drinktips' }),
  ]);
  const drinks = resolved[0].map(({ node: drink }) => drink);
  return {
    props: {
      drinks,
    },
    revalidate: 60,
  };
};
