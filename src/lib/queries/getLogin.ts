import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

export const getLogin = async (username: string, password: string) => {
  try {
    const res = await WP(
      `mutation LoginMutation($username: String, $password: String, $clientMutationId: String = "uniqueId") {
      login(
        input: {password: $password, clientMutationId: $clientMutationId, username: $username}
      ) {
        refreshToken
        authToken
        user {
          id
          username
          name
          nicename
          email
        }
      }
    }
    `,
      { username, password }
    );

    const users = res.data.user;
    return users;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
