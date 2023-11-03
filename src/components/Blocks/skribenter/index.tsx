import React from "react";
import AuthorComponent from "./Author";

import Ads from "@/app/components/ads";

interface AuthorsComponentProps {
  data: any;
}

const AuthorsComponent: React.FC<AuthorsComponentProps> = ({ data }) => {
  return (
    <>
      {data?.skribenter &&
        data.skribenter.map((author: any, index: number) => (
          <>
            <section key={author.id}>
              <AuthorComponent author={author} index={index} />
            </section>
            {/* After every third AuthorComponent, insert YourNewComponent */}
            {(index + 1) % 3 === 0 && <Ads pageType="default" position="MID" />}
          </>
        ))}
      <Ads pageType="default" position="BOTTOM" />
    </>
  );
};

export default AuthorsComponent;
