import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";
import { FRONT } from "./fragments/Front";

export const getFrontPage = async () => {
  try {
    const res = await WP(`query getFrontPage {
            ${FRONT}
  
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
