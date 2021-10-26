import { Client } from '../../../lib/apollo';
import { gql } from '@apollo/client';

const handler = async (_, res) => {
  //Currently acf does not support mutations.
  //Handle ads manually untill solution is found.
  res.status(500).json({ message: 'Currently not supported' });
};
export default handler;
