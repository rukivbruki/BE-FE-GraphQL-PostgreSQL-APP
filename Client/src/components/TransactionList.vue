<template>
  <div class="transaction-container">
    <div class="transaction-list" v-if="transactionsList.length">
      <div class="row header">
        <div class="cell">Date</div>
        <div class="cell">Amount</div>
        <div class="cell">Currency</div>
        <div class="cell">Reference</div>
        <div class="cell">Category</div>
      </div>
      <router-link
        v-for="transaction in transactionsList"
        :key="transaction.id"
        class="row"
        :to="{ name: 'TransactionDetails', params: { id: transaction.id } }"
        :transaction="transaction"
      >
        <div class="cell">{{ transaction.date.slice(0, 10) }}</div>
        <div class="cell">{{ transaction.amount }}</div>
        <div class="cell">{{ transaction.currency }}</div>
        <div class="cell">{{ transaction.reference }}</div>
        <div
          class="cell"
          :style="{ backgroundColor: '#' + transaction.category.color }"
        >
          {{ transaction.category.name }}
        </div>
      </router-link>
    </div>
    <div v-else>
      <p class="default-message">No transactions found</p>
    </div>
    <button v-show="hasPage" @click="fetchPage">Pagination</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import '../common-styles.css';

export default defineComponent({
  props: {
    hasPage: {
      type: Boolean,
      required: true,
    },
    transactionsList: {
      type: Array,
      required: true,
    },
    transaction: {
      type: Object,
      required: false,
    },
    fetchPage: {
      type: [Object, Function],
      required: false,
    },
  },

  setup() {},
});
</script>

<style scoped>
.transaction-container {
  font-family: var(--default-font-family);
  font-size: var(--default-font-size);
}
.transaction-list {
  margin-bottom: 20px;
}

.row {
  display: table-row;
  text-decoration: none;
  color: var(--default-color);
  font-size: 14px;
}

.row:not(.header):hover {
  background-color: var(--row-hover-background-color);
  cursor: pointer;
}

.header {
  font-weight: bold;
  background-color: var(--header-background-color);
  font-size: var(--default-font-size);
}

.cell {
  display: table-cell;
  width: var(--cell-width);
  padding: 8px;
  border: 1px solid #ccc;
}

.cell:nth-child(3),
.cell:nth-child(2) {
  width: var(--narrow-cell-width);
}

.cell:nth-child(4),
.cell:last-child {
  width: var(--wide-cell-width);
}

.default-message {
  font-size: var(--default-font-size);
}
</style>
