import handleParse from "@/lib/utils/handleParse";
import Blocks from "../../Blocks/PostBlocks";
import Aside from "./Aside";

interface PostTemplateProps {
  post: any;
}

const PostTemplate = ({ post }: PostTemplateProps) => {
  return (
    <article className="md:grid md:grid-cols-5 gap-10 pt-[120px]">
      <div className="md:col-span-3">
        <div className="flex justify-between">
          <p>Hello</p>
          <p>world</p>
        </div>
        <Blocks blocks={post?.acf_posts?.sektioner} />
      </div>
      <Aside author={post?.author} related={post?.acf_posts?.lasMer} />
    </article>
  );
};

export default PostTemplate;
