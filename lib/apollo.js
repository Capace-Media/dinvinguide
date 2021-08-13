import { ApolloClient, InMemoryCache } from '@apollo/client';
const auth = Buffer.from(
  process.env.CMS_GRAPHQL_AUTH_USER + ':' + process.env.CMS_GRAPHQL_AUTH_PASS
).toString('base64');
export const Client = new ApolloClient({
  uri: process.env.CMS_GRAPHQL_URI,
  headers: {
    Authorization: `Basic ${auth}`,
  },
  cache: new InMemoryCache(),
});
