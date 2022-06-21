import { Client } from '../apollo';
import { gql } from '@apollo/client';
export const DRINK_PATHS = gql`
  query fetchDrinkPaths {
    drinks(first: 60) {
      edges {
        node {
          uri
        }
      }
    }
  }
`;
export const DRINKTIPS_PATHS = gql`
  query fetchDrinktipsPaths {
    drinktips(first: 60) {
      edges {
        node {
          uri
        }
      }
    }
  }
`;
export const RECIPE_PATHS = gql`
  query fetchRecipePaths {
    recipes(first: 60) {
      edges {
        node {
          uri
        }
      }
    }
  }
`;
export const GRAPES_PATHS = gql`
  query fetchRecipePaths {
    grapes(first: 60) {
      edges {
        node {
          uri
        }
      }
    }
  }
`;
export const ARTICLE_PATHS = gql`
  query fetchRecipePaths {
    posts(first: 100) {
      edges {
        node {
          uri
        }
      }
    }
  }
`;

const fetchPaths = async (type) => {
  const queryMap = {
    drinks: DRINK_PATHS,
    drinktips: DRINKTIPS_PATHS,
    recipes: RECIPE_PATHS,
    grapes: GRAPES_PATHS,
    posts: ARTICLE_PATHS,
  };
  try {
    const response = await Client.query({ query: queryMap[type] });
    const edges = response.data[type].edges;
    const paths = edges.map(({ node }) => {
      return {
        params: {
          uri: node.uri.split('/').filter((n) => n),
        },
      };
    });
    return paths;
    l
  } catch (error) {
    console.log('FETCH PATHS', type, error);
  }
};

export default fetchPaths;
