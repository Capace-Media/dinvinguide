import DebugValue from './DebugValue';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
const DebugListItem = ({ item, last, incrementNodes, type }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      incrementNodes();
    }
  }, [inView]);
  return (
    <li
      className='p-3 bg-white grid grid-cols-[2fr,1fr,140px]'
      key={item.postId}
      ref={last ? ref : null}
    >
      <p className='text-sm'>{item.title}</p>
      <div className='flex items-center space-x-5'>
        <DebugValue label='Bild' value={item.featuredImage} />
        <DebugValue
          label='*section*'
          value={
            (item.content && item.content.includes('*section*')) ||
            (item.acf_oldcontent &&
              item.acf_oldcontent.oldContentAcf &&
              item.acf_oldcontent.oldContentAcf.includes('*section*'))
              ? false
              : true
          }
        />
        <DebugValue
          label='*row*'
          value={
            (item.content && item.content.includes('*row*')) ||
            (item.acf_oldcontent &&
              item.acf_oldcontent.oldContentAcf &&
              item.acf_oldcontent.oldContentAcf.includes('*row*'))
              ? false
              : true
          }
        />
      </div>
      <div className='space-x-4'>
        <a
          href={`http://cms-dinvinguide.0.capacedev.se/wp-admin/post.php?post=${returnId(
            item
          )}&action=edit`}
          target='_blank'
        >
          Redigera
        </a>
        <Link href={item.uri}>
          <a>Visa</a>
        </Link>
      </div>
    </li>
  );
};

export default DebugListItem;

const returnId = (item) => {
  if (item.postId) {
    return item.postId;
  }
  if (item.pageId) {
    return item.pageId;
  }
  if (item.recipeId) {
    return item.recipeId;
  }
  if (item.grapeId) {
    return item.grapeId;
  }
  if (item.drinkId) {
    return item.drinkId;
  }
  if (item.drinktipId) {
    return item.drinktipId;
  }
};
