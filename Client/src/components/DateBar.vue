<template>
  <div>
    <label for="date" class="date-label">{{ label }}</label>
    <input
      id="date"
      type="date"
      class="date-input"
      v-model="selectedDate"
      @blur="sendDateData"
    />
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_TRANSACTIONS_BY_FILTER } from '@/graphql/queries';
import { fetchByFilter, fetchPage } from '@/utils';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    startDate: {
      type: [String, Object],
    },
    endDate: {
      type: [String, Object],
    },
    bankOption: {
      type: [String, Object],
    },
    accountOption: {
      type: [String, Object],
    },
    resetConfig: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const limit = ref(4);
    const transactions = ref([]);
    const hasNextPage = ref(true);
    const nextCursor = ref('');
    const selectedDate = ref(undefined);

    const { loading, error, refetch } = useQuery(GET_TRANSACTIONS_BY_FILTER, {
      limit: limit.value,
      cursor: null,
      bank: 'All results',
      accountName: 'All results',
      startDate: null,
      endDate: null,
    });

    watch(props.resetConfig, () => {
      props.resetConfig.isFilter && (selectedDate.value = null);
    });

    watch([() => props.startDate, () => props.endDate], async () => {
      const fetchByFilterParams = [
        props,
        refetch,
        nextCursor,
        transactions,
        hasNextPage,
      ];

      await fetchByFilter(fetchByFilterParams);

      emit('dateData', {
        transactions,
        loading,
        error,
        hasNextPage,
        fetchNextPage,
        label: props.label,
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

      emit('fetchMoreDateData', {
        transactions,
        hasNextPage,
      });
    }

    function sendDateData() {
      emit('dateData', {
        selectedDate,
        transactions,
        hasNextPage,
        loading,
        error,
        fetchNextPage,
      });
    }

    return {
      selectedDate,
      sendDateData,
    };
  },
});
</script>

<style>
.date-label {
  font-weight: bold;
  margin-right: 10px;
}

.date-input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>
