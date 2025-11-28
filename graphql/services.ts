import { gql } from "@apollo/client";

export const FETCH_ALL_SERVICES = gql`
  query FetchAllServices {
    fetchAllServices {
      id
      name
      description
      icon
      subServices {
        id
        name
        serviceId
      }
    }
  }
`;

export const CREATE_SERVICE = gql`
  mutation CreateService(
    $name: String!
    $description: String!
    $icon: Upload!
    $subServices: [String!]
  ) {
    createService(
      name: $name
      description: $description
      icon: $icon
      subServices: $subServices
    ) {
      id
      name
      description
      icon
      subServices {
        id
        name
        serviceId
      }
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $id: ID!
    $name: String
    $description: String
    $icon: Upload
    $subServices: [String!]
  ) {
    updateService(
      id: $id
      name: $name
      description: $description
      icon: $icon
      subServices: $subServices
    ) {
      id
      name
      description
      icon
      subServices {
        id
        name
        serviceId
      }
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id)
  }
`;
