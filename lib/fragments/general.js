import { gql } from '@apollo/client';

export const TEMPLATECHECK = gql`
  query checkPageTemplate($id: ID!) {
    page(idType: URI, id: $id) {
      uri
      template {
        templateName
      }
    }
    grape(idType: URI, id: $id) {
      uri
      template {
        templateName
      }
      grapeId
    }
    post(id: $id, idType: URI) {
      uri
      template {
        templateName
      }
    }
  }
`;
