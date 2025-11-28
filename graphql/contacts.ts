import { gql } from "@apollo/client";

export const FETCH_ALL_CONTACTS = gql`
  query FetchAllContacts {
    fetchAllContacts {
      id
      name
      email
      message
      phone
    }
  }
`;

export const FETCH_SINGLE_CONTACT = gql`
  query FetchSingleContact($id: ID!) {
    fetchSingleContact(id: $id) {
      id
      name
      email
      message
      phone
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id)
  }
`;
