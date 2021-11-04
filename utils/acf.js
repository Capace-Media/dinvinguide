import Text from '../components/acf/Text';
import dynamic from 'next/dynamic';

const Quote = dynamic(() => import('../components/acf/Quote'));
const Drink = dynamic(() => import('../components/acf/Drink'));
const Fact = dynamic(() => import('../components/acf/Fact'));
const Img = dynamic(() => import('../components/acf/Img'));
const Puff = dynamic(() => import('../components/acf/Puff'));

export const renderSection = (section, handleGallery) => {
  switch (section.fieldGroupName) {
    case 'Post_AcfPosts_Sektioner_Brodtext':
      return <Text content={section} />;
      break;
    case 'Page_AcfPosts_Sektioner_Brodtext':
      return <Text content={section} />;
      break;
    case 'Post_AcfPosts_Sektioner_Citat':
      return <Quote content={section} />;
      break;
    case 'Page_AcfPosts_Sektioner_Citat':
      return <Quote content={section} />;
      break;
    case 'Post_AcfPosts_Sektioner_Dryck':
      return <Drink data={section} />;
      break;
    case 'Post_AcfPosts_Sektioner_ExtraPuff':
      return section.extraPuff ? <Puff content={section} /> : null;
      break;
    case 'Post_AcfPosts_Sektioner_Mellanbild':
      return <Img handleGallery={handleGallery} content={section} />;
      break;
    case 'Page_AcfPosts_Sektioner_Mellanbild':
      return <Img handleGallery={handleGallery} content={section} />;
      break;
    case 'Post_AcfPosts_Sektioner_StorBild':
      return section ? (
        <Img handleGallery={handleGallery} content={section} style='full' />
      ) : null;
      break;
    case 'Page_AcfPosts_Sektioner_StorBild':
      return section ? (
        <Img handleGallery={handleGallery} content={section} style='full' />
      ) : null;
      break;
    case 'Post_AcfPosts_Sektioner_Faktalada':
      return section ? <Fact content={section} /> : null;
      break;
    case 'Page_AcfPosts_Sektioner_Faktalada':
      return section ? <Fact content={section} /> : null;
      break;
    default:
      return <div>{section.fieldGroupName}</div>;
      break;
  }
};
