import Text from '../acf/Text';
export const renderSection = (section) => {
  console.log(section);
  switch (section.fieldGroupName) {
    case 'Post_AcfPosts_Sektioner_Brodtext':
      return <Text content={section.text} />;
    default:
      return <div>{section.fieldGroupName}</div>;
      break;
  }
};
