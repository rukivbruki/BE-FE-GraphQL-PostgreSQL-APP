<template>
  <input
    id="search"
    type="text"
    placeholder="Type to search..."
    v-model="searchQuery"
    @blur="sendSearchData"
  />
</template>
<script>
import { computed, defineComponent, ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { SEARCH_TRANSACTIONS } from '@/graphql/queries';

export default defineComponent({
  props: {
    propOption: {
      type: [String, Object],
    },
    searchData: {
      type: [String, Object],
    },
    resetConfig: {
      type: Object,
    },
  },

  setup(props, { emit }) {
    const limit = ref(4);
    const searchQuery = ref(props.searchData);
    const transactions = ref([]);
    const hasNextPage = ref(true);
    const nextCursor = ref('');

    const { loading, error, refetch, fetchMore } = useQuery(
      SEARCH_TRANSACTIONS,
      {
        limit: limit.value,
        cursor: null,
        queries: searchQuery.value.split(''),
      },
    );

    watch(props.resetConfig, () => {
      props.resetConfig.isSearch && (searchQuery.value = '');
    });

    watch([() => searchQuery.value], async () => {
      const refetchData = await refetch({
        queries: searchQuery.value.split(' '),
      });

      const refetchResolverData = computed(
        () => refetchData.data.searchTransactions,
      ).value;

      transactions.value = refetchResolverData.transactions;
      hasNextPage.value = refetchResolverData.pageInfo.hasNextPage;
      nextCursor.value = refetchResolverData.pageInfo.nextCursor;
    });

    async function fetchNextPage() {
      const { data } = await fetchMore({
        variables: {
          limit: limit.value,
          cursor: nextCursor.value,
          queries: searchQuery.value.split(' '),
        },
      });
      hasNextPage.value = data.searchTransactions.pageInfo.hasNextPage;
      nextCursor.value = data.searchTransactions.pageInfo.nextCursor;
      transactions.value = [
        ...transactions.value,
        ...data.searchTransactions.transactions,
      ];

      emit('fetchMoreSearchData', {
        transactions,
        hasNextPage,
      });
    }

    async function sendSearchData() {
      emit('searchData', {
        transactions,
        loading,
        error,
        fetchNextPage,
        hasNextPage,
        searchQuery,
      });
    }

    return { searchQuery, sendSearchData };
  },
});
</script>
