interface GraphQLRequestProps {
  query: string;
  tag?: string[];
  variables?: Record<string, unknown>;
}

const env = {
  CMS_GRAPHQL_URI: process.env.CMS_GRAPHQL_URI as string,
  CMS_GRAPHQL_AUTH_USER: process.env.CMS_GRAPHQL_AUTH_USER as string,
  CMS_GRAPHQL_AUTH_PASSWORD: process.env.CMS_GRAPHQL_AUTH_PASS as string,
  APPLICATION_NEW_PASSWORD: process.env.APPLICATION_NEW_PASSWORD as string,
};

export async function gqlRequest<T>({
  query,
  variables,
  tag,
}: GraphQLRequestProps): Promise<{ data: T | null; error: string | null }> {
  try {
    // const authString = `${env.CMS_GRAPHQL_AUTH_USER}:${env.CMS_GRAPHQL_AUTH_PASSWORD}`;
    // const authHeader = `Basic ${btoa(authString)}`;

    const authString = `${env.CMS_GRAPHQL_AUTH_USER}:${env.APPLICATION_NEW_PASSWORD}`;
    const authHeader = `Basic ${btoa(authString)}`;
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({ query, variables }),
      cache: "force-cache",
      ...(tag && { next: { tags: tag } }),
    };

    const res = await fetch(env.CMS_GRAPHQL_URI, fetchOptions);

    if (!res.ok) {
      return {
        data: null,
        error: `HTTP error! status: ${res.status}`,
      };
    }

    const json = await res.json();

    if (json.errors) {
      return {
        data: null,
        error: json.errors[0].message,
      };
    }

    return {
      data: json.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
