import { Client } from '../apollo';
import { gql } from '@apollo/client';

//Functions to retrieve posts from Custom Post Type "Drycker"

//Main function
//Allows filtering by "Dryckestyp", "Förpackning" and "Attribut" (in that order)
export const getDrinks = async (
  type = null,
  packaging = null,
  attribute = null
) => {
  //Retrieves base info required for listings and filtering
  const res = await Client.query({
    query: gql`
      query getAllDrinks {
        drinks(where: { offsetPagination: { size: 100, offset: 2 } }) {
          edges {
            node {
              title

              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    `,
  });
  //If no filters are set, return all
  if (!type && !packaging && !attribute) {
    return res.data.drinks.edges;
  }
  //If any of the filters are set, filter and return
  if (type || packaging || attribute) {
    return res.data.drinks.edges
      .filter(({ node: drink }) => {
        if (!type) {
          return drink;
        }
        return (
          drink.acf.attribut.dryckestyp &&
          drink.acf.attribut.dryckestyp === type
        );
      })
      .filter(({ node: drink }) => {
        if (!packaging) {
          return drink;
        }
        return (
          drink.acf.attribut.forpackning &&
          drink.acf.attribut.forpackning === packaging
        );
      })
      .filter(({ node: drink }) => {
        if (!attribute) {
          return drink;
        }
        if (
          drink.acf.attribut.egenskaper &&
          drink.acf.attribut.egenskaper.includes(attribute)
        ) {
          return drink;
        }
      });
  }
};
