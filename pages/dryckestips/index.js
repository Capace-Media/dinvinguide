import Ad from '../../components/ads/Ad';
import DrinktipsList from '../../components/drinkTips/DrinktipsList';
import PageIntro from '../../components/common/PageIntro';
import { fetchDrinkTips } from '../../lib/api/drinkTips/fetchDrinkTips';
import { getAds } from '../../lib/api/ads';
import { useState } from 'react';
const DryckesTipsPage = ({ ads, drinks }) => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <>
      <PageIntro title='Exklusiva dryckestips' />
      <Ad ads={ads} position='top' />
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
  const resolved = await Promise.all([getAds(), fetchDrinkTips()]);

  return {
    props: {
      ads: resolved[0],
      drinks: resolved[1],
    },
  };
};
