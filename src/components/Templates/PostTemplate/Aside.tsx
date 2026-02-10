import AuthorPost from "@/components/Blocks/skribenter/Posts/post";
import { Biggermail, Facebook, Instagram } from "@/components/icons";
import PostCard from "@/components/post-card";
import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";

interface AsideProps {
  author?: any;
  related?: any;
}

const Aside = ({ author, related }: AsideProps) => {
  return (
    <aside className="md:col-span-2 lg:pl-10">
      <div className="md:px-3">

        <div className="w-full bg-brand-primary p-5 ">
          <div className="w-full">
            {author?.acf_user?.bild?.mediaItemUrl && (
              <Image
                src={author.acf_user.bild.mediaItemUrl}
                alt={
                  author?.acf_user?.bild?.altText
                    ? author.acf_user.bild.altText
                    : "Bild från dinvinguide"
                }
                width={author.acf_user.bild?.mediaDetails?.width}
                height={author.acf_user.bild?.mediaDetails?.height}
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, (max-width: 1790px) 29vw, 551px"
              />
            )}
          </div>
          <div className="text-white text-center py-10">
            <p className=" font-sub text-[29px] pb-6">
              {author?.name || "Okänd författare"}
            </p>
            <div className="text-[16px] line-clamp-5">
              {author?.acf_user?.kortBeskrivning
                ? handleParse(author.acf_user.kortBeskrivning, "text-white")
                : "Ingen beskrivning tillgänglig."}
            </div>
            <div>
              <ul className="flex justify-center items-center gap-2 pt-6">
                <li>
                  <a
                    className="min-h-10 min-w-10 flex justify-center items-end"
                    href={author?.acf_user?.facebook || "#"}
                    aria-label={`länk till ${author?.name || "författarens"
                      } facebook`}
                  >
                    <Facebook />
                  </a>
                </li>
                <li>
                  <a
                    className="min-h-10 min-w-10 flex justify-center items-end"
                    href={author?.acf_user?.instagram || "#"}
                    aria-label={`länk till ${author?.name || "författarens"
                      } instagram`}
                  >
                    <Instagram />
                  </a>
                </li>
                <li>
                  <a
                    className="min-h-10 min-w-10 flex justify-center items-end"
                    href={`mailto:${author?.acf_user?.email || ""}`}
                    aria-label={`länk till ${author?.name || "författarens"
                      } email`}
                  >
                    <Biggermail />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2">
        <ul className="grid gap-2">
          {related && related.length > 0 ? (
            related.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : null}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
