<template>
  <div class="transaction-container">
    <p v-if="loading" class="loading">Loading...</p>
    <p v-else-if="error" class="error">{{ error.message }}</p>
    <div class="transaction-detail">
      <h2>Transaction Detail</h2>
      <div class="transaction-info">
        <div class="transaction-property">
          <strong>Date:</strong> {{ transaction.date.slice(0, 10) }}
        </div>
        <div class="transaction-property">
          <strong>Amount:</strong> {{ transaction.amount }}
          {{ transaction.currency }}
        </div>
        <div class="transaction-property">
          <strong>Reference:</strong> {{ transaction.reference }}
        </div>
        <div class="transaction-property">
          <strong>Category:</strong> {{ transaction.category.name }}
        </div>
      </div>
      <router-link to="/" class="back-link"
        >Back to transactions list
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { GET_TRANSACTIONS_BY_ID } from '@/graphql/queries';

export default defineComponent({
  setup() {
    const router = useRouter();
    const limit = ref(4);
    const transaction = ref(null);
    const { result, loading, error } = useQuery(GET_TRANSACTIONS_BY_ID, {
      limit: limit.value,
      id: router.currentRoute.value.params.id,
    });

    watchEffect(() => {
      if (result) {
        transaction.value = result.value?.getTransactionById;
      }
    });

    return {
      transaction,
      loading,
      error,
    };
  },
});
</script>

<style scoped>
.transaction-container {
  display: flex;
  justify-content: center;
  font-family: var(--default-font-family);
  font-size: var(--default-font-size);
  color: var(--default-color);
}

.transaction-detail {
  width: 250px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  padding: 10px;
}

.transaction-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.transaction-property {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
}

.back-link {
  font-size: 12px;
  margin-top: 20px;
  color: #666;
}
</style>
