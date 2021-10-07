import { gql } from '@apollo/client';

export const OPTIONS_TV = gql`
  query getTvOptions {
    acfOptionsInstallningarTv {
      tvOptionsPage {
        vintvTitle
        vintvIngress
      }
    }
  }
`;
