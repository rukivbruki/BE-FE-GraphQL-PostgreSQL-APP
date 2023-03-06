import { PrismaClient } from '@prisma/client';
import { GetTransactionsByFilterArgs } from '../types';

type Transaction = {
  category: {
    name: string;
  };
  account: {
    bank: string;
  };
};

export async function getTransactionsByFilter(
  {
    cursor,
    limit,
    bank,
    accountName,
    startDate,
    endDate,
  }: GetTransactionsByFilterArgs,
  prisma: PrismaClient,
): Promise<Transaction[]> {
  try {
    const where: {
      AND: {
        account?: {
          bank?: string;
          name?: string;
        };
        date?: {
          gte?: Date;
          lte?: Date;
        };
      }[];
    } = {
      AND: [],
    };
    if (bank) {
      where.AND.push({
        account: {
          bank: bank,
        },
      });
    }
    if (accountName) {
      where.AND.push({
        account: {
          name: accountName,
        },
      });
    }
    if (startDate && endDate) {
      where.AND.push({
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      });
    }
    return await prisma.transaction.findMany({
      where: where,
      include: {
        category: true,
        account: true,
      },
      orderBy: {
        id: 'desc',
      },
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
    });
  } catch (err) {
    console.error(`Error fetching transactions by filter: ${err}`);
    return [];
  }
}
