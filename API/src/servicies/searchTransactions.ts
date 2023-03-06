import { PrismaClient, Transaction } from '@prisma/client';

interface SearchResult {
  id: string;
}

export async function searchTransactions(
  queries: string[],
  cursor: string | null,
  limit: number,
  prisma: PrismaClient,
): Promise<Transaction[]> {
  try {
    const results: SearchResult[] = [];

    for (const query of queries) {
      const rows = await prisma.$queryRaw<SearchResult[]>`
                SELECT "id"
                FROM "Account"
                WHERE to_tsvector('english', "bank") @@ plainto_tsquery('english'
                    , ${query})
                   OR to_tsvector('english'
                    , "name") @@ plainto_tsquery('english'
                    , ${query})
                UNION
                SELECT "id"
                FROM "Category"
                WHERE to_tsvector('english', "color") @@ plainto_tsquery('english'
                    , ${query})
            `;
      results.push(...rows);
    }

    const uniqIdsSet = new Set<string>();

    results.forEach((result) => uniqIdsSet.add(result.id));
    const uniqIds = [...uniqIdsSet];

    const where = {
      OR: [
        {
          category: {
            id: {
              in: uniqIds,
            },
          },
        },
        {
          account: {
            id: {
              in: uniqIds,
            },
          },
        },
      ],
    };

    const cursorWhere = cursor ? { id: { lt: cursor } } : {};

    return prisma.transaction.findMany({
      where: { ...where, ...cursorWhere },
      include: {
        category: true,
        account: true,
      },
      orderBy: {
        date: 'desc',
      },
      take: limit,
    });
  } catch (err) {
    console.error(`Error fetching search transactions: ${err}`);
    return [];
  }
}
