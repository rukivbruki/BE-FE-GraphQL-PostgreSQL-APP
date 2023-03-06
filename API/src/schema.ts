import { gql } from "apollo-server-express";

export const schema = gql`
  type Transaction {
    id: ID!
    account: Account!
    category: Category!
    reference: String
    amount: Float!
    currency: String!
    date: String!
  }

  type Category {
    id: ID!
    name: String!
    color: String!
  }

  type Account {
    id: ID!
    name: String!
    bank: String!
  }

  type TransactionConnection {
    transactions: [Transaction!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    nextCursor: ID
  }

  type Query {
    getTransactionById(id: ID): Transaction
    getTransactionsByFilter(
      cursor: ID
      limit: Int!
      bank: String
      accountName: String
      startDate: String
      endDate: String
    ): TransactionConnection!
    searchTransactions(
      queries: [String]
      limit: Int!
      cursor: ID
    ): TransactionConnection!
  }
`;
