import Post from "./Post";

interface PostsProps {
  posts: any[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <>
      <div className="layout bg-white contain">
        <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          {posts &&
            posts.map((post: any, index: number) => {
              return (
                <li key={post?.id} className="relative">
                  {/* <span className=" absolute z-[8] top-[4px] left-[4px] bg-brand-primary text-white text-[13px] px-2 rounded-[10px]">
                      {index + 1}
                    </span> */}
                  <Post post={post} />
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Posts;
