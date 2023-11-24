import Blocks from "../../Blocks/PostBlocks";
import Aside from "./Aside";

interface PostTemplateProps {
  post: any;
}

const PostTemplate = ({ post }: PostTemplateProps) => {
  return (
    <article className="md:grid md:grid-cols-5">
      <div className="md:col-span-3">
        <div className="h-[20vh] "></div>
        <Blocks blocks={post?.acf_posts?.sektioner} />
      </div>
      <Aside />
    </article>
  );
};

export default PostTemplate;
