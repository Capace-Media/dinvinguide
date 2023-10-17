"use client";
import PaginationControls from "@/components/Pagination/PaginationControls";
import { useRef } from "react";
import AuthorPost from "./post";

const PostList = ({
  posts,
  params,
  startCursor,
  endCursor,
  hasNextPage,
  hasPreviousPage,
  postsCount,
}: any) => {
  const postsRef = useRef<HTMLUListElement | null>(null);
  const scrollToPosts = () => {
    const offsetTop = postsRef.current ? postsRef.current.offsetTop : 0;
    const desiredOffset = offsetTop - 150;
    window.scrollTo({
      top: desiredOffset,
      behavior: "smooth",
    });
  };
  return (
    <>
      <ul ref={postsRef} className="lg:grid lg:grid-cols-4 lg:gap-5">
        {posts.map((post: any) => (
          <li key={post.node.id}>
            <AuthorPost post={post?.node} />
          </li>
        ))}
      </ul>
      <div>
        <PaginationControls
          params={params}
          startCursor={startCursor}
          endCursor={endCursor}
          first={8}
          last={8}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          postsCount={postsCount}
          scrollToPosts={scrollToPosts}
        />
      </div>
    </>
  );
};

export default PostList;
