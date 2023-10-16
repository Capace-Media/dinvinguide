import AuthorsComponent from "@/components/Blocks/skribenter";
import { getAuthors } from "@/lib/queries/getAuthors";

const getAuthorsData = async () => {
  const data = await getAuthors();

  return data;
};

const Authors = async () => {
  const data = await getAuthorsData();

  return (
    <>
      <AuthorsComponent data={data} />
    </>
  );
};

export default Authors;
