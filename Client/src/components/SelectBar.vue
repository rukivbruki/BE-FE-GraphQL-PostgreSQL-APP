<template>
  <select id="bank-select" v-model="selectedOption" @change="sendSelectData">
    <option v-for="option in selectOptions" :key="option" :value="option">
      {{ option.bank || option.account }}
    </option>
  </select>
</template>

<script>
import {defineComponent, ref, watch} from 'vue';
import {useQuery} from '@vue/apollo-composable';
import {GET_TRANSACTIONS_BY_FILTER} from '@/graphql/queries';
import {fetchByFilter, fetchPage} from '@/utils';

export default defineComponent({
  props: {
    selectOptions: {
      type: Array,
      required: true,
    },
    bankOption: {
      type: [String, Object],
    },
    accountOption: {
      type: [String, Object],
    },
    startDate: {
      type: [String, Object],
    },
    endDate: {
      type: [String, Object],
    },
    resetConfig: {
      type: Object,
    },
  },

  setup(props, {emit}) {
    const limit = ref(4);
    const transactions = ref([]);
    const hasNextPage = ref(true);
    const nextCursor = ref('');
    const selectedOption = ref(props.selectOptions[0]);

    const {loading, error, refetch} = useQuery(GET_TRANSACTIONS_BY_FILTER, {
      limit: limit.value,
      cursor: null,
      bank: 'All results',
      accountName: 'All results',
      startDate: null,
      endDate: null,
    });

    watch(props.resetConfig, () => {
      props.resetConfig.isFilter &&
      (selectedOption.value = props.selectOptions[0]);
    });

    watch([() => props.bankOption, () => props.accountOption], async () => {

      const fetchByFilterParams = [
        props,
        refetch,
        nextCursor,
        transactions,
        hasNextPage,
      ];

      await fetchByFilter(fetchByFilterParams);

      emit('selectData', {
        transactions,
        loading,
        error,
        fetchNextPage,
        hasNextPage,
      });
    });

    async function fetchNextPage() {
      const fetchPageParams = [
        props,
        refetch,
        nextCursor,
        hasNextPage,
        transactions,
        limit,
      ];

      await fetchPage(fetchPageParams);

      emit('fetchMoreSelectData', {
        transactions,
        hasNextPage,
      });
    }

    async function sendSelectData() {
      emit('selectData', {
        transactions,
        loading,
        error,
        fetchNextPage,
        selectedOption,
        hasNextPage,
      });
    }

    return {
      selectedOption,
      sendSelectData,
    };
  },
});
</script>
