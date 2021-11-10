import { Client } from './apollo';

const fetchInitialData = async (query) => {
  try {
    const response = await Client.query({ query });

    return response.data;
  } catch (error) {
    console.log('ERROR =>', error);
    return;
  }
};
export default fetchInitialData;
