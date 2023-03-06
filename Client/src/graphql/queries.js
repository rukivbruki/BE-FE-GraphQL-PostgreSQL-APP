import gql from 'graphql-tag';

export const GET_TRANSACTIONS_BY_ID = gql`
  query GetTransactionsByFilter($id: ID!) {
    getTransactionById(id: $id) {
      account {
        bank
        name
      }
      amount
      category {
        name
      }
      currency
      date
      reference
    }
  }
`;

export const GET_TRANSACTIONS_BY_FILTER = gql`
  query GetTransactionsByFilter(
    $limit: Int!
    $cursor: ID
    $bank: String
    $accountName: String
    $startDate: String
    $endDate: String
  ) {
    getTransactionsByFilter(
      limit: $limit
      cursor: $cursor
      bank: $bank
      accountName: $accountName
      startDate: $startDate
      endDate: $endDate
    ) {
      pageInfo {
        hasNextPage
        nextCursor
      }
      transactions {
        amount
        category {
          color
          name
        }
        currency
        date
        reference
        id
      }
    }
  }
`;

export const SEARCH_TRANSACTIONS = gql`
  query SearchTransactions($limit: Int!, $queries: [String], $cursor: ID) {
    searchTransactions(limit: $limit, queries: $queries, cursor: $cursor) {
      transactions {
        amount
        category {
          color
          name
        }
        currency
        date
        reference
        id
      }
      pageInfo {
        nextCursor
        hasNextPage
      }
    }
  }
`;
