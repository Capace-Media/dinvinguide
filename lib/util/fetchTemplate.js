import { TEMPLATECHECK } from '../fragments/general';
import wpFetch from '../wpFetch';

const fetchTemplate = async (id) => {
  const res = await wpFetch(TEMPLATECHECK, { id: id });
  console.log(res);
  let data;
  if (res.page) {
    data = { template: res.page.template.templateName, contentType: 'page' };
  }
  if (res.post) {
    data = { template: res.post.template.templateName, contentType: 'post' };
  }
  if (res.grape && res.grape.grapeId) {
    data = { template: res.grape.template.templateName, contentType: 'grape' };
  }
  return data;
};

export default fetchTemplate;
