import { gql } from "@apollo/client";

export const FETCH_ALL_PRODUCTS = gql`
  query FetchAllProducts {
    fetchAllProducts {
      id
      title
      description
      price
      images {
        id
        imageId
        imageUrl
        productId
      }
    }
  }
`;

export const FETCH_SINGLE_PRODUCT = gql`
  query FetchSingleProduct($id: ID!) {
    fetchSingleProduct(id: $id) {
      id
      title
      description
      price
      images {
        id
        imageId
        imageUrl
        productId
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $title: String!
    $description: String!
    $price: String
    $images: [Upload!]
  ) {
    createProduct(
      title: $title
      description: $description
      price: $price
      images: $images
    ) {
      id
      title
      description
      price
      images {
        id
        imageId
        imageUrl
        productId
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $title: String
    $description: String
    $price: String
    $images: [Upload!]
  ) {
    updateProduct(
      id: $id
      title: $title
      description: $description
      price: $price
      images: $images
    ) {
      id
      title
      description
      price
      images {
        id
        imageId
        imageUrl
        productId
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
