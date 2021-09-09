import 'dayjs/locale/sv';

import {
  getCurrentToplistDrinks,
  getDrinks,
  getFallbackToplistDrinks,
} from './drinks';

import { Client } from '../apollo';
import { gql } from '@apollo/client';

export const getToplists = async () => {
  try {
    //Get active toplists to display
    const res = await Client.query({
      query: gql`
        query getAllToplists {
          pageBy(uri: "topplistor") {
            id
            acf_topplistor {
              aktivaTopplistor {
                ... on Toplist {
                  id
                  title
                  acf_toplists {
                    ekologiskt
                    maxAntal
                    dryckestyper {
                      name
                    }
                    forpackningar {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });
    let toplists = res.data.pageBy.acf_topplistor.aktivaTopplistor;
    console.log('TOPLISTS =>', toplists);

    //Get drinks after certain date, will later be split between
    const currentDrinks = await getCurrentToplistDrinks();
    const fallbackDrinks = await getFallbackToplistDrinks();
    let extendedToplists = [];
    // Populate each toplists with items

    for (let i = 0; i < toplists.length; i++) {
      const drinks = await getToplistItems(toplists[i], currentDrinks);
      const fallback = await getToplistItems(toplists[i], fallbackDrinks);
      const toplistObject = {
        toplist: toplists[i],
        currentDrinks: drinks,
        fallbackDrinks: fallback,
      };
      extendedToplists.push(toplistObject);
    }

    return extendedToplists;
  } catch (error) {
    // console.log('getToplists ERROR =>', error);
    return;
  }
};

export const getToplistItems = async (toplist, drinks, eco) => {
  try {
    //Retrieve all types to be included
    const toplistTypes = toplist.acf_toplists.dryckestyper.map((type) => {
      if (type && type.name) {
        return type.name;
      }
    });
    //Retrieve all packaging to be included
    const toplistPackaging = toplist.acf_toplists.forpackningar.map(
      (packaging) => {
        if (packaging && packaging.name) {
          return packaging.name;
        }
      }
    );

    //Filter drinkes to only return drinks that includes the types and packages
    const filteredAndSortedDrinks = drinks
      .filter(({ node: drink }) => {
        //Filter drink types
        if (!toplist.acf_toplists.ekologiskt) {
          //Check if drink has a type and package set
          if (drink.acf_drinks.dryckestyper && drink.acf_drinks.forpackningar) {
            //If drink has a type and package then check if the current toplist includes any of these types or packagetypes
            if (
              toplistTypes.includes(drink.acf_drinks.dryckestyper.name) &&
              toplistPackaging.includes(drink.acf_drinks.forpackningar.name)
            ) {
              return drink;
            }
          }
        } else {
          if (
            drink.acf_drinks.dryckestyper &&
            drink.acf_drinks.forpackningar &&
            drink.acf_drinks.ekologiskt
          ) {
            //If drink has a type and package then check if the current toplist includes any of these types or packagetypes
            if (
              toplistTypes.includes(drink.acf_drinks.dryckestyper.name) &&
              toplistPackaging.includes(drink.acf_drinks.forpackningar.name)
            ) {
              return drink;
            }
          }
        }
      })
      .sort((a, b) => {
        //Sort items by rating
        if (a.node.acf_drinks.betyg < b.node.acf_drinks.betyg) {
          return +1;
        } else if (a.node.acf_drinks.betyg > b.node.acf_drinks.betyg) {
          return -1;
        } else {
          return 0;
        }
      });

    return filteredAndSortedDrinks;
  } catch (error) {
    // console.log('getToplistItems ERROR =>', error);
    return;
  }
};
