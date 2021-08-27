import { Fragment, useEffect, useState } from 'react';

import Ad from '../../components/ads/Ad';
import FilterMessage from '../../components/recipes/FilterMessage';
import Fuse from 'fuse.js';
import Image from 'next/image';
import Link from 'next/link';
import RecipeCard from '../../components/recipes/RecipeCard';
import chunkArrayWithAds from '../../utils/chunkArray';
import debounce from 'lodash.debounce';
import { getAds } from '../../lib/api/ads';
import { getRecipes } from '../../lib/api/recipes';

export default function RecipePage({ data }) {
  const { recipes, ads } = data;
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [maxCount, setMaxCount] = useState(27);

  const chunkSize = 9;
  let index = 1;

  const filteredRecipes = recipes.filter(({ node: recipe }) => {
    if (!searchTerm) {
      return recipe;
    } else {
      if (recipe.title.toLowerCase().includes(searchTerm)) {
        return recipe;
      }
    }
  });
  const updateCount = () => {
    const increase = 9;
    setMaxCount((prev) => prev + increase);
    console.log('Count updated =>', maxCount);
  };
  useEffect(() => {
    let filterTimeout;
    if (searchInput === '') {
      setSearchTerm(searchInput.toLowerCase());
      setMaxCount(27);
    } else {
      filterTimeout = setTimeout(() => {
        console.log('Timeout Triggered!');
        setSearchTerm(searchInput.toLowerCase());
        setMaxCount(27);
      }, 500);
    }

    return () => clearTimeout(filterTimeout);
  }, [searchInput]);

  return (
    <Fragment>
      <div className='row contain'>
        <div className='text-center'>
          <h1 className='mb-5 text-brand-red'>Recept</h1>
          <p>Utforska våra härliga recept.</p>
        </div>
      </div>
      <div className='text-center row'>Bild kommer här</div>
      <div className='flex flex-col items-center contain '>
        <input
          type='text'
          placeholder='Sök recept'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className='p-5 w-96'
        />
      </div>
      <FilterMessage
        totalCount={recipes.length}
        currentCount={filteredRecipes.length}
        searchTerm={searchInput}
      />
      <Ad ads={ads} position='top' />
      <div className='grid-cols-4 gap-3 lg:grid contain row auto-cols-auto'>
        {filteredRecipes.map(({ node: recipe }, i) => {
          if (i < maxCount) {
            if ((i + 1) % chunkSize === 0) {
              index = 1;
              return (
                <Fragment>
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    index={index}
                    last={true}
                  />
                  <div className='col-span-4 row'>
                    <Ad
                      ads={ads}
                      position='top'
                      triggerInView={updateCount}
                      triggerOnce={!searchTerm ? true : false}
                    />
                  </div>
                </Fragment>
              );
            } else {
              index += 1;
              return (
                <RecipeCard key={recipe.id} recipe={recipe} index={index} />
              );
            }
          }
        })}
      </div>
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const recipes = await getRecipes();
  const ads = await getAds();

  return {
    props: {
      data: {
        ads,
        recipes,
      },
    },
  };
};
