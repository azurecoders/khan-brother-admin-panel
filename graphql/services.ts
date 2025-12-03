// graphql/services.ts
import { gql } from "@apollo/client";

export const FETCH_ALL_SERVICES = gql`
  query FetchAllServices {
    fetchAllServices {
      id
      name
      description
      category
      icon
      subServices {
        id
        name
      }
    }
  }
`;

export const CREATE_SERVICE = gql`
  mutation CreateService(
    $name: String!
    $description: String!
    $category: String!
    $icon: Upload
    $iconUrl: String
    $subServices: [String!]
  ) {
    createService(
      name: $name
      description: $description
      category: $category
      icon: $icon
      iconUrl: $iconUrl
      subServices: $subServices
    ) {
      id
      name
      description
      category
      icon
      subServices {
        id
        name
      }
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $id: ID!
    $name: String
    $description: String
    $category: String
    $icon: Upload
    $iconUrl: String
    $subServices: [String!]
  ) {
    updateService(
      id: $id
      name: $name
      description: $description
      category: $category
      icon: $icon
      iconUrl: $iconUrl
      subServices: $subServices
    ) {
      id
      name
      description
      category
      icon
      subServices {
        id
        name
      }
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id) {
      id
    }
  }
`;
