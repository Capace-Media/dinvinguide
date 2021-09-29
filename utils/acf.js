import Fact from '../components/acf/Fact';
import Image from 'next/image';
import Img from '../components/acf/Img';
import Puff from '../components/acf/Puff';
import Quote from '../components/acf/Quote';
import Text from '../components/acf/Text';

export const renderSection = (section) => {
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
    case 'Post_AcfPosts_Sektioner_ExtraPuff':
      return section.extraPuff ? <Puff content={section} /> : null;
      break;
    case 'Post_AcfPosts_Sektioner_Mellanbild':
      return <Img content={section} />;
      break;
    case 'Post_AcfPosts_Sektioner_StorBild':
      return section ? <Img content={section} style='full' /> : null;
      // return <div className='bg-gray-300 aspect-w-16 aspect-h-9'></div>;
      break;
    case 'Post_AcfPosts_Sektioner_Faktalada':
      return section ? <Fact content={section} /> : null;
      break;
    default:
      return <div>{section.fieldGroupName}</div>;
      break;
  }
};
