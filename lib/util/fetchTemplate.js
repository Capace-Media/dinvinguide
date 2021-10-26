import { TEMPLATECHECK } from '../fragments/general';
import wpFetch from '../wpFetch';

const fetchTemplate = async (id) => {
  const res = await wpFetch(TEMPLATECHECK, { id: id });
  console.log(res);
  let data;
  if (id.includes('drycker/')) {
    data = { template: 'Default', contentType: 'drink' };
    return data;
  }
  if (id.includes('druvor/')) {
    data = { template: res.grape.template.templateName, contentType: 'grape' };
    return data;
  }
  if (id.includes('recept/')) {
    data = { template: 'Recipe', contentType: 'recipe' };
    return data;
  }

  if (res.page) {
    data = { template: res.page.template.templateName, contentType: 'page' };
  }
  if (res.post) {
    data = { template: res.post.template.templateName, contentType: 'post' };
  }
  return data;
};

export default fetchTemplate;
