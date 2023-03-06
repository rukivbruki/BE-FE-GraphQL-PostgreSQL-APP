import { PrismaClient } from '@prisma/client';

export interface Transaction {
  date: string;
  id?: string;
  accountId?: string;
  categoryId?: string;
  reference?: string | null;
  amount?: number;
  currency?: string;
  category?: { name: string };
  account?: { bank: string };
}

export interface PageInfo {
  hasNextPage: boolean;
  nextCursor: string | null | undefined;
}

export interface TransactionsResult {
  transactions: Transaction[] | Transaction;
  pageInfo: PageInfo;
}

export interface GetTransactionByIdArgs {
  id: string;
}

export interface GetTransactionsByFilterArgs {
  cursor: string;
  limit: number;
  bank: string;
  accountName: string;
  startDate: string;
  endDate: string;
}

export interface SearchTransactionsArgs {
  queries: string[];
  cursor: string;
  limit: number;
}

export interface Context {
  prisma: PrismaClient;
}
