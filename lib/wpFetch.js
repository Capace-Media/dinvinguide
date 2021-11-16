import { Client } from './apollo';

const wpFetch = async (query = '', variables = {}) => {
  let { batch, type, limit, id } = variables;

  if (!id && type) {
    //Fetch multiple items
    try {
      let hasNextPage = true;
      let array = [];

      if (!batch && limit) {
        batch = limit;
      }
      if (batch && !limit) {
        limit = 999999;
      }

      variables = {
        ...variables,
        batch: batch,
        cursor: '',
      };

      while (hasNextPage && array.length < limit) {
        const response = await Client.query({ query, variables });
        array = [...array, ...response.data[type].edges];
        hasNextPage = response.data[type].pageInfo.hasNextPage;
        variables.cursor = response.data[type].pageInfo.endCursor;
      }

      return array;
    } catch (error) {
      console.log('WP FETCH =>', error);
      return;
    }
  } else {
    //Fetch single item
    try {
      if (!query) {
        throw 'No query provided';
      }

      const response = await Client.query({ query, variables });

      return response.data;
    } catch (error) {
      console.log(error);
      return;
    }
  }
};

export default wpFetch;
