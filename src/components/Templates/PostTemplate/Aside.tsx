import AuthorPost from "@/components/Blocks/skribenter/Posts/post";
import { Biggermail, Facebook, Instagram } from "@/components/icons";
import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";

interface AsideProps {
  author?: any;
  related?: any;
}

const Aside = ({ author, related }: AsideProps) => {
  return (
    <aside className="md:col-span-2 lg:pl-10">
      <div className=" w-full bg-brand-primary p-4">
        <div className="relative w-full min-h-[500px]">
          {author?.acf_user?.bild?.mediaItemUrl && (
            <Image
              src={author.acf_user.bild.mediaItemUrl}
              alt={
                author?.acf_user?.bild?.altText
                  ? author.acf_user.bild.altText
                  : "Bild från dinvinguide"
              }
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(min-width: 1860px) 551px, (min-width: 1040px) calc(36.88vw - 128px), (min-width: 780px) calc(40vw - 131px), calc(100vw - 104px)"
            />
          )}
        </div>
        <div className="text-white text-center py-10">
          <p className=" font-sub text-[29px] pb-6">
            {author?.name || "Okänd författare"}
          </p>
          <div className="text-[16px] author_parse_one">
            {author?.acf_user?.kortBeskrivning
              ? handleParse(author.acf_user.kortBeskrivning)
              : "Ingen beskrivning tillgänglig."}
          </div>
          <div>
            <ul className="flex justify-center items-center gap-2 pt-6">
              <li>
                <a
                  className="min-h-[40px] min-w-[40px] flex justify-center items-end"
                  href={author?.acf_user?.facebook || "#"}
                  aria-label={`länk till ${
                    author?.name || "författarens"
                  } facebook`}
                >
                  <Facebook />
                </a>
              </li>
              <li>
                <a
                  className="min-h-[40px] min-w-[40px] flex justify-center items-end"
                  href={author?.acf_user?.instagram || "#"}
                  aria-label={`länk till ${
                    author?.name || "författarens"
                  } instagram`}
                >
                  <Instagram />
                </a>
              </li>
              <li>
                <a
                  className="min-h-[40px] min-w-[40px] flex justify-center items-end"
                  href={`mailto:${author?.acf_user?.email || ""}`}
                  aria-label={`länk till ${
                    author?.name || "författarens"
                  } email`}
                >
                  <Biggermail />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-10">
        <ul className="grid gap-6">
          {related && related.length > 0 ? (
            related.map((post: any) => (
              <li key={post?.id}>
                <AuthorPost post={post} />
              </li>
            ))
          ) : (
            <p>Inga relaterade inlägg tillgängliga.</p>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
