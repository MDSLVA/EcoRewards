const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    profile: UserProfile
    posts: [Post]
    donationsReceived: [Donation]
  }

  type UserProfile {
    name: String
    bio: String
    image: String
  }

  type Post {
    _id: ID!
    author: User
    content: String!
    timestamp: String!
    comments: [Comment]
    donations: [Donation]
    
  }

  type Comment {
    _id: ID!
    post: Post!
    author: User!
    content: String!
    timestamp: String!
  }

  type Donation {
    _id: ID!
    post: Post!
    donor: User!
    receiver: User!
    amount: Float!
    timestamp: String!
  }

  type Query {
    me: User
    getUser(id: ID!): User
    getAllPosts: [Post]
    getUserPosts(userId: ID!): [Post]
    getUserProfile(userId: ID!): User
  }

  type Mutation {
    login(input: LoginInput!): Auth
    addUser(input: UserInput!): Auth
    createPost(content: String!): Post
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
