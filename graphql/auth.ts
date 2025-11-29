import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      token
      admin {
        id
        name
        email
        role
        isActive
        createdAt
        updatedAt
      }
    }
  }
`;

export const REGISTER_ADMIN = gql`
  mutation RegisterAdmin(
    $name: String!
    $email: String!
    $password: String!
    $role: String
  ) {
    registerAdmin(
      name: $name
      email: $email
      password: $password
      role: $role
    ) {
      id
      name
      email
      role
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const FETCH_ALL_ADMINS = gql`
  query FetchAllAdmins {
    fetchAllAdmins {
      id
      name
      email
      role
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const FETCH_CURRENT_ADMIN = gql`
  query FetchCurrentAdmin {
    fetchCurrentAdmin {
      id
      name
      email
      role
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_ADMIN = gql`
  mutation UpdateAdmin(
    $id: ID!
    $name: String
    $email: String
    $password: String
    $role: String
    $isActive: Boolean
  ) {
    updateAdmin(
      id: $id
      name: $name
      email: $email
      password: $password
      role: $role
      isActive: $isActive
    ) {
      id
      name
      email
      role
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_ADMIN = gql`
  mutation DeleteAdmin($id: ID!) {
    deleteAdmin(id: $id)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      id
      name
      email
    }
  }
`;
