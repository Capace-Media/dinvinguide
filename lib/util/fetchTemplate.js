import { PAGE_TEMPLATECHECK } from '../fragments/pages';
import wpFetch from '../wpFetch';

const fetchTemplate = async (id) => {
  const res = await wpFetch(PAGE_TEMPLATECHECK, { id: id });
  return res.page.template.templateName;
};

export default fetchTemplate;
