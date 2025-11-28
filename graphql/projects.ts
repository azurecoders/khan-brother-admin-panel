import { gql } from "@apollo/client";

export const FETCH_ALL_PROJECTS = gql`
  query FetchAllProjects {
    fetchAllProjects {
      id
      title
      description
      location
      imageUrl
      imageId
    }
  }
`;

export const FETCH_SINGLE_PROJECT = gql`
  query FetchSingleProject($id: ID!) {
    fetchSingleProject(id: $id) {
      id
      title
      description
      location
      imageUrl
      imageId
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $title: String!
    $description: String!
    $location: String!
    $image: Upload!
  ) {
    createProject(
      title: $title
      description: $description
      location: $location
      image: $image
    ) {
      id
      title
      description
      location
      imageUrl
      imageId
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $title: String
    $description: String
    $location: String
    $image: Upload
  ) {
    updateProject(
      id: $id
      title: $title
      description: $description
      location: $location
      image: $image
    ) {
      id
      title
      description
      location
      imageUrl
      imageId
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;
