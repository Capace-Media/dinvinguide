import { Client } from './apollo';

const wpFetch = async (query = '', variables = {}) => {
  try {
    console.log('VARIABLES =>', variables);
    if (!query) {
      throw 'No query provided';
    }
    const response = await Client.query({ query, variables });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export default wpFetch;
