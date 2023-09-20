import WP from "../wp";
import { FRONT } from "./fragments/Front";
import { POSTS } from "./fragments/Posts";

export const getFrontPage = async () => {
  try {
    const res = await WP(`query getFrontPage {
            ${FRONT}
            ${POSTS}
          }`);

    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
};
