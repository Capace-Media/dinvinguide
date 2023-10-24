import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";
import { POSTS } from "./fragments/Posts";

export const getPosts = async () => {
  try {
    const res = await WP(`query getPosts {
         ${POSTS}
  
          }`);

    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
