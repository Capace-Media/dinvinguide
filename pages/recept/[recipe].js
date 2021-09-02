import { Fragment, useState } from 'react';
import { getRecipe, getRecipePaths, getRecipes } from '../../lib/api/recipes';

import Ad from '../../components/ads/Ad';
import BreadCrumbs from '../../components/common/BreadCrumbs/Breadcrumbs';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import ReactHtmlParser from 'react-html-parser';
import { getAds } from '../../lib/api/ads';

export default function RecipePage({ data }) {
  const { ads, recipe } = data;
  const [portions, setPortions] = useState(
    parseInt(recipe.acf_recipe.antalPortioner)
  );
  const availablePortions = [1, 2, 4, 6, 8];

  const renderAmount = (amount) => {
    const baseValue = (amount / recipe.acf_recipe.antalPortioner) * portions;

    if (baseValue % 1 === 0) {
      //If no decimals, return value
      return baseValue;
    } else {
      const floor = Math.floor(baseValue);
      //Handle decimals
      if (baseValue % 1 <= 0.1) {
        return floor !== 0 ? floor + ' ⅕' : '⅕';
      }
      if (baseValue % 1 <= 0.25) {
        return floor !== 0 ? floor + ' ¼' : '¼';
      }
      if (baseValue % 1 <= 0.375) {
        return floor !== 0 ? floor + ' ⅓' : '⅓';
      }
      if (baseValue % 1 <= 0.5) {
        return floor !== 0 ? floor + ' ½' : '½';
      }
      if (baseValue % 1 <= 0.67) {
        return floor !== 0 ? floor + ' ⅔' : '⅔';
      }
      if (baseValue % 1 <= 0.99) {
        return floor !== 0 ? floor + ' ¾' : '¾';
      }
    }
  };

  return (
    <Fragment>
      <NextSeo title={`${recipe.title} - Recept`} />
      <BreadCrumbs
        crumbs={[
          { text: 'Recept', href: '/recept' },
          { text: recipe.title, href: recipe.slug, current: true },
        ]}
      />
      <Ad ads={ads} position='top' />

      <div className='mx-auto max-w-7xl w-[90%] recipe-layout row'>
        <div
          style={{ gridArea: 'img' }}
          className='relative w-full lg:w-[550px] aspect-w-16 aspect-h-10 bg-brand-red'
        >
          {recipe.featuredImage && (
            <Image
              src={recipe.featuredImage.node.mediaItemUrl}
              layout='fill'
              objectFit='cover'
            />
          )}
        </div>
        <div
          style={{ gridArea: 'meta' }}
          className='my-10 text-center lg:p-10 lg:my-0 lg:text-left'
        >
          <p className='mb-3'>
            Recept av{' '}
            {recipe.acf_recipe.skrivetAv && recipe.acf_recipe.skrivetAv.name
              ? recipe.acf_recipe.skrivetAv.name
              : 'Redaktionen'}
          </p>
          <h1 className='mb-5 text-xl normal-case lg:text-3xl text-brand-red'>
            {recipe.title}
          </h1>

          <p>{recipe.acf_recipe.desc}</p>
        </div>
        <div
          style={{ gridArea: 'ingredients' }}
          className='bg-white lg:w-[550px]'
        >
          <div className='flex items-center justify-between p-5 border-b'>
            <h2 className='text-brand-red'>Ingredienser</h2>
            <div>
              <label htmlFor='portions'>Portioner:</label>{' '}
              <select
                name='portions'
                onChange={(e) => setPortions(e.target.value)}
              >
                {availablePortions.map((portion) => {
                  return (
                    <option
                      value={parseInt(portion)}
                      selected={parseInt(portion) === portions}
                    >
                      {portion}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <ul className='p-5 space-y-4'>
            {recipe.acf_recipe &&
              recipe.acf_recipe.receptdelar &&
              recipe.acf_recipe.receptdelar.map((part) => {
                return (
                  <li
                    className='pb-5 border-b-2 border-brand-bronze'
                    key={part.rubrik}
                  >
                    <strong>{part.rubrik}</strong>
                    <ul className='mt-3 space-y-2'>
                      {part.ingredienser.map((i) => (
                        <li key={i.namn} className='grid grid-cols-2'>
                          <span>{`${renderAmount(i.antal)} ${
                            i.enhet.name
                          }`}</span>
                          <span>{i.namn}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            <li>{ReactHtmlParser(recipe.acf_recipe.ingredienserOvrigt)}</li>
          </ul>
        </div>
        <div
          style={{ gridArea: 'instructions' }}
          className='mt-10 lg:p-10 rich-text lg:mt-0'
        >
          {ReactHtmlParser(recipe.acf_recipe.processen)}
        </div>
      </div>
    </Fragment>
  );
}
export const getStaticPaths = async () => {
  const paths = await getRecipePaths();

  return {
    paths: [
      {
        params: {
          recipe:
            'tartar-pa-betor-med-friterade-potatisnystan-och-vegansk-majonnas',
        },
      },
    ],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const resolved = await Promise.all([getRecipe(params.recipe), getAds()]);

  if (!resolved[0]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        recipe: resolved[0],
        ads: resolved[1],
      },
    },
  };
};
