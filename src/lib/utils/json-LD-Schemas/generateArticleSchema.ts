type ArticleSchemaProps = {
  title?: string;
  description?: string;
  url?: string;
  images?: string[];
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  publisherName?: string;
  publisherLogo?: string;

  articleBody?: string;
};

const generateArticleSchema = ({
  title,
  description,
  url,
  images,
  datePublished,
  dateModified,
  authorName,
  publisherName,
  publisherLogo,
  articleBody,
}: ArticleSchemaProps): string | null => {
  if (!title || !description || !url || !datePublished || !authorName) {
    return null;
  }
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: images,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: {
        "@type": "ImageObject",
        url: publisherLogo,
      },
    },

    articleBody: articleBody,
  };

  // Remove undefined or null properties
  Object.keys(schema).forEach((key) => {
    if (schema[key] === undefined || schema[key] === null) {
      delete schema[key];
    }
  });

  return JSON.stringify(schema);
};

export default generateArticleSchema;
