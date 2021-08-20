import { Client } from '../apollo';
import { gql } from '@apollo/client';

export const getFrontPageData = async () => {
  const first = [];
  const second = [];
  const res = await Client.query({
    query: gql`
      query getFrontPageData {
        episodes(first: 1) {
          edges {
            node {
              acf_episode {
                thumbnail
              }
              title
              uri
            }
          }
        }
        posts(first: 20) {
          edges {
            node {
              title
              slug
              uri
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
              author {
                node {
                  name
                  nicename
                }
              }
            }
          }
        }
        acfOptionsFramsidan {
          acf_frontPage {
            forstaBild {
              mediaItemUrl
            }
            inlagg2 {
              ... on Page {
                title
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
                slug
                uri
                author {
                  node {
                    name
                    nicename
                  }
                }
              }
            }
            inlagg3 {
              ... on Post {
                title
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
                slug
                uri
                author {
                  node {
                    name
                    nicename
                  }
                }
              }
            }
            inlagg4 {
              ... on Post {
                title
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
                slug
                uri
                author {
                  node {
                    name
                    nicename
                  }
                }
              }
            }
            inlagg5 {
              ... on Post {
                title
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
                slug
                uri
                author {
                  node {
                    name
                    nicename
                  }
                }
              }
            }
            inlagg6 {
              ... on Post {
                title
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
                slug
                uri
                author {
                  node {
                    name
                    nicename
                  }
                }
              }
            }
            inlagg7 {
              ... on Post {
                title
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
                slug
                uri
                author {
                  node {
                    name
                    nicename
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  //Add each post to item Array in specific format
  const posts = res.data.posts.edges;
  await posts.map(({ node: post }, index) => {
    const postObject = {
      image: post.featuredImage.node.mediaItemUrl,
      title: post.title,
      subTitle: post.author.node.name,
      authorSlug: post.author.node.nicename,
      slug: post.slug,
      uri: post.uri,
      type: 'article',
    };
    if (index < 8) {
      first.push(postObject);
    } else {
      second.push(postObject);
    }
  });

  const frontPage = res.data.acfOptionsFramsidan.acf_frontPage;

  //Add first special item block to beginning of array
  first.splice(0, 0, {
    image: frontPage.forstaBild.mediaItemUrl,
    type: 'welcome',
  });

  //Handle remaining chosen first to their specific index in array
  console.log(frontPage.inlagg2);
  first.splice(2, 0, {
    image: frontPage.inlagg2.featuredImage.node.mediaItemUrl,
    title: frontPage.inlagg2.title,
    slug: frontPage.inlagg2.slug,
    uri: frontPage.inlagg2.uri,
    type: 'featured-page',
  });
  console.log(frontPage.inlagg3);
  first.splice(3, 0, {
    image: frontPage.inlagg3.featuredImage.node.mediaItemUrl,
    title: frontPage.inlagg3.title,
    subTitle: frontPage.inlagg3.author.node.name,
    authorSlug: frontPage.inlagg3.author.node.nicename,
    slug: frontPage.inlagg3.slug,
    uri: frontPage.inlagg3.uri,
    type: 'featured-article',
  });
  first.splice(4, 0, {
    image: frontPage.inlagg4.featuredImage.node.mediaItemUrl,
    title: frontPage.inlagg4.title,
    subTitle: frontPage.inlagg4.author.node.name,
    authorSlug: frontPage.inlagg4.author.node.nicename,
    slug: frontPage.inlagg4.slug,
    uri: frontPage.inlagg4.uri,
    type: 'featured-article',
  });
  first.splice(5, 0, {
    image: frontPage.inlagg5.featuredImage.node.mediaItemUrl,
    title: frontPage.inlagg5.title,
    subTitle: frontPage.inlagg5.author.node.name,
    authorSlug: frontPage.inlagg5.author.node.nicename,
    slug: frontPage.inlagg5.slug,
    uri: frontPage.inlagg5.uri,
    type: 'featured-article',
  });
  first.splice(6, 0, {
    image: frontPage.inlagg6.featuredImage.node.mediaItemUrl,
    title: frontPage.inlagg6.title,
    subTitle: frontPage.inlagg6.author.node.name,
    authorSlug: frontPage.inlagg6.author.node.nicename,
    slug: frontPage.inlagg6.slug,
    uri: frontPage.inlagg6.uri,
    type: 'featured-article',
  });
  first.splice(7, 0, {
    image: frontPage.inlagg7.featuredImage.node.mediaItemUrl,
    title: frontPage.inlagg7.title,
    subTitle: frontPage.inlagg7.author.node.name,
    authorSlug: frontPage.inlagg7.author.node.nicename,
    slug: frontPage.inlagg7.slug,
    uri: frontPage.inlagg7.uri,
    type: 'featured-article',
  });

  //Add latest TV Episode
  const episode = res.data.episodes.edges[0].node;
  console.log('EPISODE =>', episode);
  first.splice(8, 0, {
    image: episode.acf_episode.thumbnail,
    title: episode.title,
    subTitle: '',
    slug: 'vin-tv',
    type: 'tv-episode',
  });

  return { first, second };
};
