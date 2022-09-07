import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!) {
    addPost(postText: $postText) {
      _id
      postText
      createdAt
      username
      commentCount
      comments {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentBody: String!) {
    addComment(postId: $postId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_KROSSIE = gql`
  mutation addKrossie($id: ID!) {
    addKrossie(krossieId: $id) {
      _id
      username
      krossieCount
      krossies {
        _id
        username
      }
    }
  }
`;

export const REMOVE_KROSSIE = gql`
  mutation removeKrossie($id: ID!) {
    removeKrossie(id: $id) {
      _id
      username
      krossies {
        _id
        username
      }
    }
  }
`;
