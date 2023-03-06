import { PrismaClient } from '@prisma/client';

export async function getTransactionById(id: string, prisma: PrismaClient) {
  try {
    const transactionId = id.toString();

    return await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        account: true,
        category: true,
      },
    });
  } catch (error) {
    console.error(`Failed to fetch transaction by ID: ${id}`, error);
    throw error;
  }
}
