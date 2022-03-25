import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs/promises';
dotenv.config();

const prebuild = async () => {
  try {
    const auth = Buffer.from(
      process.env.CMS_GRAPHQL_AUTH_USER +
        ':' +
        process.env.CMS_GRAPHQL_AUTH_PASS
    ).toString('base64');

    const response = await fetch(process.env.CMS_GRAPHQL_URI, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        query: `query MyQuery {
            globalGeneralSettings {
              acfGlobalSettings {
                bildReceptutforskaren {
                  mediaItemUrl
                }
                bildDryckesutforskaren {
                  mediaItemUrl
                }
              }
            }
          }`,
      }),
    });

    if (!response) {
      console.log('Something went wrong');
      throw 'Something went wrong';
    }
    const data = await response.json();
    const settings = data.data.globalGeneralSettings.acfGlobalSettings;
    await fs.writeFile('./data/explorerimages.json', JSON.stringify(settings));
    console.log('SETTINGS =>', settings);
  } catch (error) {
    console.error('PREBUILD ERROR', error);
  }
};

prebuild();
