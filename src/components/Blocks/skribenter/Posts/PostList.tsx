"use client";

import PaginationControls from "@/components/Pagination/PaginationControls";
import { useRef } from "react";
import AuthorPost from "./post";

const PostList = ({
  params,
  posts,
  startCursor,
  endCursor,
  hasNextPage,
  hasPreviousPage,
  //data,
  postsCount,
  postsPerPage,
  search,
}: any) => {
  //const { posts, startCursor, endCursor, hasNextPage, hasPreviousPage } = data;
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
      <ul
        id="searchScroll"
        ref={postsRef}
        className="grid lg:grid-cols-4 md:grid-cols-2 gap-5"
      >
        {posts &&
          posts.map((post: any) => (
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
          first={postsPerPage}
          last={postsPerPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          postsCount={postsCount}
          scrollToPosts={scrollToPosts}
          search={search}
        />
      </div>
    </>
  );
};

export default PostList;
