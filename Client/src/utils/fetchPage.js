import { computed } from 'vue';

export async function fetchPage(fetchPageParams) {
  const [props, refetch, nextCursor, hasNextPage, transactions, limit] =
    fetchPageParams;

  const refetchData = await refetch({
    cursor: nextCursor.value,
    limit: limit.value,
    bank: props.bankOption === 'All banks' ? null : props.bankOption,
    accountName:
      props.accountOption === 'All accounts' ? null : props.accountOption,
    startDate: props.startDate,
    endDate: props.endDate,
  });

  const refetchResolverData = computed(
    () => refetchData.data.getTransactionsByFilter,
  ).value;

  transactions.value = [
    ...transactions.value,
    ...refetchResolverData.transactions,
  ];
  hasNextPage.value = refetchResolverData.pageInfo.hasNextPage;
  nextCursor.value = refetchResolverData.pageInfo.nextCursor;
}
