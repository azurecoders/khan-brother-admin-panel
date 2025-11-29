import { gql } from "@apollo/client";

export const FETCH_OVERVIEW_STATS = gql`
  query FetchOverviewStats {
    fetchOverviewStats {
      totalServices
      totalProducts
      totalProjects
      totalMessages
      totalTestimonials
    }
  }
`;
