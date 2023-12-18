const auth = Buffer.from(
  process.env.CMS_GRAPHQL_AUTH_USER + ":" + process.env.CMS_GRAPHQL_AUTH_PASS
).toString("base64");

const WP = async (query: string, variables?: any) => {
  try {
    const response = await fetch(`${process.env.CMS_GRAPHQL_URI}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
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
    const response = await fetch(`${process.env.CMS_GRAPHQL_URI}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
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

export const WPnext = async (query: string, variables?: any) => {
  try {
    const response = await fetch(`${process.env.CMS_GRAPHQL_URI}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 2500 },
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
