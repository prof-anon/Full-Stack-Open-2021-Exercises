import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

export const AUTHENTICATE_USER = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      expiresAt
    }
  }
`;
