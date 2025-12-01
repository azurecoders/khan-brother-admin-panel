import { gql } from "@apollo/client";

export const FETCH_ALL_CATEGORIES = gql`
  query FetchAllCategories {
    fetchAllCategories {
      id
      name
    }
  }
`;

export const FETCH_SINGLE_CATEGORY = gql`
  query FetchSingleCategory($id: ID!) {
    fetchSingleCategory(id: $id) {
      id
      name
    }
  }
`;
