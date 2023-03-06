import { computed } from 'vue';

export async function fetchByFilter(fetchByFilterParams) {
  const [props, refetch, nextCursor, transactions, hasNextPage] =
    fetchByFilterParams;

  console.log(props.startDate, props.endDate);

  const refetchData = await refetch({
    cursor: null,
    bank: props.bankOption === 'All banks' ? null : props.bankOption,
    accountName:
      props.accountOption === 'All accounts' ? null : props.accountOption,
    startDate: props.startDate,
    endDate: props.endDate,
  });

  const refetchResolverData = computed(
    () => refetchData.data.getTransactionsByFilter,
  ).value;

  transactions.value = refetchResolverData.transactions;
  hasNextPage.value = refetchResolverData.pageInfo.hasNextPage;
  nextCursor.value = refetchResolverData.pageInfo.nextCursor;
}
