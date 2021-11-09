import { Client } from './apollo';

const fetchInitialData = async (query) => {
  try {
    const response = await Client.query({ query });
    console.log(response);

    return;
  } catch (error) {
    console.log('ERROR =>', error);
    return;
  }
};
