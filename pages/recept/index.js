import { Fragment, useEffect, useState } from 'react';

import Ad from '../../components/ads/Ad';
import { Client } from '../../lib/apollo';
import FilterMessage from '../../components/recipes/FilterMessage';
import Fuse from 'fuse.js';
import Image from 'next/image';
import Link from 'next/link';
import List from '../../components/common/lists/List';
import { NextSeo } from 'next-seo';
import { PAGE_EXPLORER } from '../../lib/fragments/pages';
import PageIntro from '../../components/common/content/PageIntro';
import { RECIPES } from '../../lib/fragments/recipes';
import RecipeCard from '../../components/recipes/RecipeCard';
import chunkArrayWithAds from '../../utils/chunkArray';
import debounce from 'lodash.debounce';
import { getAds } from '../../lib/api/ads';
import { getRecipes } from '../../lib/api/recipes';
import { gql } from '@apollo/client';
import wpFetch from '../../lib/wpFetch';

export default function RecipePage({ data }) {
  const { recipes, ads, page } = data;
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [maxCount, setMaxCount] = useState(27);
  const recipeArray = recipes.map(({ node: recipe }) => recipe);

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
      <NextSeo title='Recept' />
      <Ad ads={ads} position='top' />

      <PageIntro title={page.title} text={page.acf_explorer.slogan} />

      {/* <div className='relative mb-10 text-center aspect-w-16 aspect-h-5'>
        <Image
          src={page.acf_explorer.bkgResults.mediaItemUrl}
          layout='fill'
          objectFit='cover'
        />
      </div> */}
      {/* <div className='flex flex-col items-center mb-5 contain '>
        <input
          type='text'
          placeholder='Sök recept'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className='w-full max-w-lg px-5 py-3 rounded-sm'
        />
      </div>

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
                      position='mid'
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
      </div> */}
      <List array={recipeArray} columns={4} ads={ads} />
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const resolved = await Promise.all([
    wpFetch(RECIPES, { batch: 200, type: 'recipes' }),
    getAds(),
    wpFetch(PAGE_EXPLORER, { id: 'recept' }),
  ]);

  return {
    props: {
      data: {
        ads: resolved[1],
        recipes: resolved[0],
        page: resolved[2].page,
      },
    },
  };
};
