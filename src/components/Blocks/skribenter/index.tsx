import AuthorComponent from "./Author";

import Ads from "@/app/_components/ads";
import { getAuthors } from "@/lib/queries/getAuthors";

export default async function AuthorsComponent() {
  const data = await getAuthors();
  return (
    <div>
      {data?.skribenter &&
        data.skribenter.map((author: any, index: number) => (
          <section key={author.id}>
            <AuthorComponent author={author} index={index} />

            {/* After every third AuthorComponent, insert YourNewComponent */}
            {(index + 1) % 3 === 0 && <Ads pageType="default" position="MID" />}
          </section>
        ))}
      <Ads pageType="default" position="BOTTOM" />
    </div>
  );
}
