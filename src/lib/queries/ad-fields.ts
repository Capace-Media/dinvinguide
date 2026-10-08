// Shared selection for an `Ad` node. `desktopField` is the ACF image the slot
// reads for its desktop creative (e.g. `toppbanner`), aliased to `desktop` so
// every slot has the same shape.
const AD_IMAGE = `
  mediaItemUrl
  id
  altText
  mediaDetails {
    width
    height
  }
`;

export const adFields = (desktopField: string) => `
  ... on Ad {
    id
    title
    acf_ads {
      link
      desktop: ${desktopField} {
        ${AD_IMAGE}
      }
      mobile: mobilbanner {
        ${AD_IMAGE}
      }
    }
  }
`;
