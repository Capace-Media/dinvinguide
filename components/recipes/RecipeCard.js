import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const RecipeCard = React.memo(({ recipe, index, last }) => {
  return (
    <Link href={recipe.uri}>
      <a
        className={`relative block bg-black h-56 mb-5 lg:mb-0 lg:h-72 overflow-hidden group ${
          index === 2 || index === 6 || last ? 'col-span-2' : null
        }`}
      >
        {recipe.featuredImage && (
          <Image
            src={recipe.featuredImage.node.mediaItemUrl}
            layout='fill'
            objectFit='cover'
            className='transition-all transform opacity-70 group-hover:scale-110'
          />
        )}
        <div className='box-border absolute top-0 left-0 p-3'>
          <div className='box-border pl-3 text-white border-l-4 border-brand-bronze'>
            <h2 className='text-base'>{recipe.title}</h2>
          </div>
        </div>
      </a>
    </Link>
  );
});
export default RecipeCard;
