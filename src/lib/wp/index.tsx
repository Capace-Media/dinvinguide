
const WP = async (query: string, tag?: string | null, variables?: any) => {
  try {
    const authString = `${process.env.CMS_GRAPHQL_AUTH_USER as string}:${process.env.APPLICATION_NEW_PASSWORD as string
      }`;
    const authHeader = `Basic ${btoa(authString)}`;
    const response = await fetch(process.env.CMS_GRAPHQL_URI as string, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      next: {
        tags: tag ? [tag as string] : ["collections"],
      },
      cache: "force-cache",
      body: JSON.stringify({
        query,
        variables: variables || null,
      }),
    });

    if (response.status === 500) {
      throw response.statusText;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ERROR WP ====>", error);
    return;
  }
};

export default WP;

export const WPServerSide = async (query: string, variables?: any) => {
  try {
    const authString = `${process.env.CMS_GRAPHQL_AUTH_USER as string}:${process.env.APPLICATION_NEW_PASSWORD as string
      }`;
    const authHeader = `Basic ${btoa(authString)}`;
    const response = await fetch(process.env.CMS_GRAPHQL_URI as string, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({
        query,
        variables: variables || null,
      }),
    });

    if (response.status === 500) {
      throw response.statusText;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ERROR WP ====>", error);
    return;
  }
};

// export const WPnext = async (query: string, variables?: any) => {
//   try {
//     const response = await fetch(`${process.env.CMS_GRAPHQL_URI}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${auth}`,
//         "Content-Type": "application/json",
//       },
//       next: { revalidate: 345600 },
//       body: JSON.stringify({
//         query,
//         variables: variables || null,
//       }),
//     });

//     if (response.status === 500) {
//       throw response.statusText;
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("ERROR WP ====>", error);
//     return;
//   }
// };

// export const WPAdd = async (query: string, variables?: any) => {
//   try {
//     const response = await fetch(`${process.env.CMS_GRAPHQL_URI}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${auth}`,
//         "Content-Type": "application/json",
//       },
//       next: { tags: ["ads"] },
//       body: JSON.stringify({
//         query,
//         variables: variables || null,
//       }),
//     });

//     if (response.status === 500) {
//       throw response.statusText;
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("ERROR WP ====>", error);
//     return;
//   }
// };

// export const WPWine = async (query: string, variables?: any) => {
//   try {
//     const response = await fetch(`${process.env.CMS_GRAPHQL_URI}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${auth}`,
//         "Content-Type": "application/json",
//       },
//       next: { tags: ["wine"] },
//       body: JSON.stringify({
//         query,
//         variables: variables || null,
//       }),
//     });

//     if (response.status === 500) {
//       throw response.statusText;
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("ERROR WP ====>", error);
//     return;
//   }
// };
