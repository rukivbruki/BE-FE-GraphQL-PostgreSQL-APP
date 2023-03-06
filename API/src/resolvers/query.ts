import {
  getTransactionById,
  getTransactionsByFilter,
  searchTransactions,
} from '../servicies';
import { format } from 'date-fns';
import {
  Context,
  GetTransactionByIdArgs,
  GetTransactionsByFilterArgs,
  SearchTransactionsArgs,
  Transaction,
  TransactionsResult,
} from '../types';
import { Account, Category } from '@prisma/client';

export const Query = {
  async getTransactionById(
    parent: unknown,
    args: GetTransactionByIdArgs,
    { prisma }: Context,
  ) {
    const transaction = await getTransactionById(args.id, prisma);
    if (!transaction) {
      return null;
    }
    const formattedTransaction = {
      ...transaction,
      date: format(new Date(transaction.date), 'yyyy-MM-dd HH:mm:ss.SSS'),
    };

    console.log(formattedTransaction);
    return formattedTransaction;
  },
  async getTransactionsByFilter(
    parent: unknown,
    args: GetTransactionsByFilterArgs,
    { prisma }: Context,
  ): Promise<TransactionsResult> {
    let { cursor, limit, bank, accountName, startDate, endDate } = args;
    const transactions = await getTransactionsByFilter(
      {
        cursor,
        limit,
        bank,
        accountName,
        startDate,
        endDate,
      },
      prisma,
    );
    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      date: format(
        new Date((transaction as Transaction).date),
        'yyyy-MM-dd HH:mm:ss.SSS',
      ),
    }));
    const hasNextPage = formattedTransactions.length === limit;
    const nextCursor = hasNextPage
      ? (formattedTransactions[formattedTransactions.length - 1] as Transaction)
          .id
      : null;

    return {
      transactions: formattedTransactions,
      pageInfo: {
        hasNextPage,
        nextCursor,
      },
    };
  },
  async searchTransactions(
    parent: unknown,
    { queries, cursor, limit }: SearchTransactionsArgs,
    { prisma }: Context,
  ): Promise<TransactionsResult> {
    const transactions = await searchTransactions(
      queries,
      cursor,
      limit,
      prisma,
    );
    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      date: format(new Date(transaction.date), 'yyyy-MM-dd HH:mm:ss.SSS'),
    }));
    const hasNextPage = formattedTransactions.length === limit;
    const nextCursor = hasNextPage
      ? formattedTransactions[formattedTransactions.length - 1].id
      : null;
    return {
      transactions: formattedTransactions,
      pageInfo: {
        hasNextPage,
        nextCursor,
      },
    };
  },
};
