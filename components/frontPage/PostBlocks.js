import Image from "next/image";
import Link from "next/link";
export default function PostBlocks({ items }) {
  const containerClasses = `group h-56   relative flex items-start justify-center bg-black p-5 overflow-hidden `;
  const contentClasses = `relative z-20 border-l-4 border-brand-bronze px-2 w-full`;
  const titleClasses = `text-lg uppercase font-semibold`;
  const subTitleClasses = ``;
  const imageClasses = `transition-all transform opacity-70 group-hover:scale-105 notranslate`;
  const renderBlock = (item, index) => {
    if (index === 0) {
      return (
        <Link key={item.uri + index} href={item.uri}>
          <a className="relative block p-5 overflow-hidden bg-black group h-96 lg:col-span-2 lg:row-span-2 lg:h-full">
            {item.image && (
              <Image
                src={item.image}
                layout="fill"
                objectFit="cover"
                className={`${imageClasses}`}
                alt={item.title}
                translate="no"
              />
            )}

            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 1) {
      return (
        <Link key={item.uri + index} href={item.uri}>
          <a
            className={`${containerClasses} lg:h-full lg:col-span-1 lg:row-span-2 `}
          >
            {item.image && (
              <Image
                src={item.image}
                layout="fill"
                objectFit="cover"
                className={`${imageClasses}`}
                alt={item.title}
                translate="no"
              />
            )}

            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 4) {
      return (
        <Link key={item.uri + index} href={item.uri}>
          <a
            className={`${containerClasses} lg:h-full lg:col-span-1 lg:row-span-2 `}
          >
            {item.image && (
              <Image
                src={item.image}
                layout="fill"
                objectFit="cover"
                className={`${imageClasses}`}
                alt={item.title}
                translate="no"
              />
            )}

            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 6) {
      return (
        <Link key={item.uri + index} href={item.uri}>
          <a
            className={`lg:col-span-2 lg:row-span-2 ${containerClasses} lg:h-full`}
          >
            {item.image && (
              <Image
                src={item.image}
                layout="fill"
                objectFit="cover"
                className={`${imageClasses}`}
                alt={item.title}
                translate="no"
              />
            )}

            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 8) {
      return (
        <Link key={item.uri + index} href={item.uri}>
          <a
            className={`lg:col-span-2 lg:row-span-2 ${containerClasses} lg:h-full`}
          >
            {item.image && (
              <Image
                src={item.image}
                layout="fill"
                objectFit="cover"
                className={`${imageClasses}`}
                alt={item.title}
                translate="no"
              />
            )}

            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 9) {
      return (
        <Link key={item.uri + index} href={item.uri}>
          <a
            className={`lg:col-span-1 lg:row-span-2 ${containerClasses} lg:h-full`}
          >
            {item.image && (
              <Image
                src={item.image}
                layout="fill"
                objectFit="cover"
                className={`${imageClasses}`}
                alt={item.title}
                translate="no"
              />
            )}

            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 12) {
      return (
        <Link key={item.uri + index} href={item.uri}>
          <a
            className={`lg:col-span-1 lg:row-span-2 ${containerClasses} lg:h-full`}
          >
            {item.image && (
              <Image
                src={item.image}
                layout="fill"
                objectFit="cover"
                className={`${imageClasses}`}
                alt={item.title}
                translate="no"
              />
            )}

            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 14) {
      return (
        <Link key={item.uri + index} href={item.uri}>
          <a
            className={`lg:col-span-2 lg:row-span-2 ${containerClasses} lg:h-full`}
          >
            {item.image && (
              <Image
                src={item.image}
                layout="fill"
                objectFit="cover"
                className={`${imageClasses}`}
                alt={item.title}
                translate="no"
              />
            )}

            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }

    return (
      <Link key={item.uri + index} href={item.uri}>
        <a className={`h-56 lg:row-span-1 lg:col-span-1 ${containerClasses}`}>
          {item.image && (
            <Image
              src={item.image}
              layout="fill"
              objectFit="cover"
              className={`${imageClasses}`}
              alt={item.title}
              translate="no"
            />
          )}

          <div className={`${contentClasses}`}>
            <h2 className={`${titleClasses}`}>{item.title}</h2>
            {item.subTitle && (
              <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
            )}
          </div>
        </a>
      </Link>
    );
  };
  return (
    <div className="grid grid-cols-1 gap-2 text-white grid-cols contain lg:grid-cols-4">
      {items.map((item, index) => renderBlock(item, index))}
    </div>
  );
}
