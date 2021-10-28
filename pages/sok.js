import { DRINKS, DRINKTIPS } from '../lib/fragments/drinks';
import { Fragment, useEffect, useState } from 'react';

import { ARTICLES } from '../lib/fragments/articles';
import { NextSeo } from 'next-seo';
import { RECIPES } from '../lib/fragments/recipes';
import Results from '../components/search/Results';
import { getArticles } from '../lib/api/articles';
import { getDrinks } from '../lib/api/drinks';
import { getRecipes } from '../lib/api/recipes';
import wpFetch from '../lib/wpFetch';

const filterItemClasses = `w-full p-1 lg:p-2 mt-5 text-sm lg:text-base flex items-center justify-center border-2 first:border-l-2 border-l-0 border-brand-red font-semibold cursor-pointer`;
const activeFilterItemClass = `bg-brand-red text-white`;
export default function SearchPage({ data }) {
  const [type, setType] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const typeArray = [
    { text: 'Artiklar', value: 'articles' },
    { text: 'Recept', value: 'recipes' },
    { text: 'Drycker', value: 'drinks' },
    { text: 'Dryckestips', value: 'drinktips' },
  ];

  useEffect(() => {
    let filterTimeout;
    filterTimeout = setTimeout(() => {
      setSearchInput(inputValue.toLowerCase());
      // setMaxCount(27);
    }, 500);
    return () => clearTimeout(filterTimeout);
  }, [inputValue]);

  return (
    <Fragment>
      <NextSeo title='Sök på DinVinguide -' />
      <div className='text-center contain-sm row'>
        <h1 className='text-brand-red'>Sök på dinvinguide</h1>

        <input
          type='text'
          placeholder='Sök här...'
          className='w-full px-5 py-3 mt-5'
          onChange={(e) => setInputValue(e.target.value)}
        />
        <ul className='flex items-center justify-between'>
          <li
            className={`${filterItemClasses} ${
              type === '' && activeFilterItemClass
            } `}
            onClick={() => setType('')}
          >
            Allt
          </li>
          {typeArray.map((item) => (
            <li
              key={item.value}
              className={`${filterItemClasses} ${
                type === item.value && activeFilterItemClass
              }`}
              onClick={() => setType(item.value)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div className='space-y-10 contain-sm row'>
        {typeArray.map((item) => {
          if (searchInput) {
            if (type === item.value || type === '') {
              return (
                <Results
                  heading={item.text}
                  data={data[item.value]}
                  value={item.value}
                  search={searchInput}
                  currentFilter={type}
                />
              );
            }
          }
        })}
      </div>
    </Fragment>
  );
}
export const getStaticProps = async () => {
  const resolved = await Promise.all([
    wpFetch(ARTICLES, { batch: 100, type: 'posts' }),
    wpFetch(RECIPES, { batch: 100, type: 'recipes' }),
    wpFetch(DRINKS, { batch: 100, type: 'drinks' }),
    wpFetch(DRINKTIPS, { batch: 100, type: 'drinktips' }),
  ]);

  return {
    props: {
      data: {
        articles: resolved[0],
        recipes: resolved[1],
        drinks: resolved[2],
        drinktips: resolved[3],
      },
    },
  };
};
