import Ad from '../../components/ads/Ad';
import { DRINKTIPS } from '../../lib/fragments/drinks';
import DrinktipsList from '../../components/drinkTips/DrinktipsList';
import PageIntro from '../../components/common/content/PageIntro';
import { getAds } from '../../lib/api/ads';
import { useState } from 'react';
import wpFetch from '../../lib/wpFetch';
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
  const resolved = await Promise.all([
    getAds(),
    wpFetch(DRINKTIPS, { batch: 200, type: 'drinktips' }),
  ]);
  const drinks = resolved[1].map(({ node: drink }) => drink);
  return {
    props: {
      ads: resolved[0],
      drinks,
    },
  };
};
