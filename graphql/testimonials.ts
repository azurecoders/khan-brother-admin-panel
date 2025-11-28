import { gql } from "@apollo/client";

export const FETCH_ALL_TESTIMONIALS = gql`
  query FetchAllTestimonials {
    fetchAllTestimonials {
      id
      name
      designation
      message
    }
  }
`;

export const FETCH_SINGLE_TESTIMONIAL = gql`
  query FetchSingleTestimonial($id: ID!) {
    fetchSingleTestimonial(id: $id) {
      id
      name
      designation
      message
    }
  }
`;

export const CREATE_TESTIMONIAL = gql`
  mutation CreateTestimonial(
    $name: String!
    $designation: String!
    $message: String!
  ) {
    createTestimonial(
      name: $name
      designation: $designation
      message: $message
    ) {
      id
      name
      designation
      message
    }
  }
`;

export const UPDATE_TESTIMONIAL = gql`
  mutation UpdateTestimonial(
    $id: ID!
    $name: String
    $designation: String
    $message: String
  ) {
    updateTestimonial(
      id: $id
      name: $name
      designation: $designation
      message: $message
    ) {
      id
      name
      designation
      message
    }
  }
`;

export const DELETE_TESTIMONIAL = gql`
  mutation DeleteTestimonial($id: ID!) {
    deleteTestimonial(id: $id)
  }
`;
