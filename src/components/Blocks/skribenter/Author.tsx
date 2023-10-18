import {
  FbPrimary,
  FbWhite,
  IgPrimary,
  IgWhite,
  MailPrimary,
  MailWhite,
} from "@/components/icons";
import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";

interface AuthorComponentProps {
  author: any;
  index: number;
}

const AuthorComponent = ({ author, index }: AuthorComponentProps) => {
  return (
    <div className="">
      <div
        className={`layout contain flex flex-col lg:grid lg:grid-cols-2 lg:flex-row-reverse lg:gap-24 gap-4 ${
          index % 2 === 0 ? "bg-[#F6F6F6]" : "bg-brand-primary text-white"
        }`}
      >
        <div className="w-full h-[50vh] lg:h-[45vh] relative">
          <Image
            src={author.acf_user.bild.mediaItemUrl}
            alt={
              author?.acf_user?.bild?.altText
                ? author.acf_user.bild.altText
                : author.acf_user.bild.title
            }
            fill
            style={{
              objectFit: "cover",
              objectPosition: "top",
            }}
            sizes="
            (min-width: 1880px) 761px,
            (min-width: 1040px) calc(45vw - 76px),
            (min-width: 780px) calc(100vw - 88px),
            calc(100vw - 32px)
          "
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p>Skribent</p>
            <h2 className="text-[28px] font-sub">{author?.name}</h2>
          </div>

          {handleParse(author?.description)}
          <div className="flex justify-between items-center">
            <Link
              className={`${index % 2 === 0 ? "btn" : "btn-white"}`}
              href={`/skribenter/${author?.slug}`}
            >
              Upptäck alla Artiklar
            </Link>

            {index % 2 === 0 ? (
              <div className="flex items-center gap-3">
                {author?.acf_user?.facebook && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    aria-label="gå till facebook"
                    className="h-10 w-6 flex justify-center items-center"
                    href={author.acf_user.facebook}
                  >
                    <FbPrimary />
                  </a>
                )}
                {author?.acf_user?.instagram && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    aria-label="gå till instagram"
                    className="h-10 w-6 flex justify-center items-center"
                    href={author.acf_user.instagram}
                  >
                    <IgPrimary />
                  </a>
                )}
                {author?.acf_user?.email && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    aria-label="skicka mail"
                    className="h-10 w-6 flex justify-center items-center"
                    href={`mailto:${author.acf_user.email}`}
                  >
                    <MailPrimary />
                  </a>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {author?.acf_user?.facebook && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    aria-label="gå till facebook"
                    className="h-10 w-6 flex justify-center items-center"
                    href={author.acf_user.facebook}
                  >
                    <FbWhite />
                  </a>
                )}
                {author?.acf_user?.instagram && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    aria-label="gå till instagram"
                    className="h-10 w-6 flex justify-center items-center"
                    href={author.acf_user.instagram}
                  >
                    <IgWhite />
                  </a>
                )}
                {author?.acf_user?.email && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    aria-label="skicka mail"
                    className="h-10 w-6 flex justify-center items-center"
                    href={`mailto:${author.acf_user.email}`}
                  >
                    <MailWhite />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorComponent;
