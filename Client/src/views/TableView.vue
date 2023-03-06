<template>
  <div class="container">
    <p v-if="loading" class="loading">Loading...</p>
    <p v-else-if="error" class="error">{{ error.message }}</p>
    <div v-else class="filter-container">
      <div class="value-search-wrapper">
        <div class="search-container">
          <label for="search" class="search-label">Search transaction:</label>
          <searchBar
            id="search"
            class="search-component"
            :search-data="searchData"
            :reset-config="resetConfigProp"
            @searchData="onSearchData"
            @fetchMoreSearchData="onFetchMoreSearchData"
          />
        </div>
        <div class="select-container">
          <label for="bank-select" class="select-label">Bank:</label>
          <SelectBar
            id="bank-select"
            class="select-component"
            :select-options="bankOptions"
            :bank-option="bankPropOption"
            :account-option="accountPropOption"
            :start-date="startDateProp"
            :end-date="endDateProp"
            :reset-config="resetConfigProp"
            @selectData="onSelectData"
            @fetchMoreSelectData="onFetchMoreSelectData"
          />
        </div>
        <div class="select-container">
          <label for="account-select" class="select-label">Account:</label>
          <SelectBar
            id="account-select"
            class="select-component"
            :select-options="accountOptions"
            :bank-option="bankPropOption"
            :account-option="accountPropOption"
            :start-date="startDateProp"
            :end-date="endDateProp"
            :reset-config="resetConfigProp"
            @selectData="onSelectData"
            @fetchMoreSelectData="onFetchMoreSelectData"
          />
        </div>
      </div>
      <div class="date-search-wrapper">
        <div class="date-container">
          <DateBar
            class=""
            :label="'Start date:'"
            :start-date="startDateProp"
            :end-date="endDateProp"
            :bank-option="bankPropOption"
            :account-option="accountPropOption"
            :reset-config="resetConfigProp"
            @dateData="(data) => onDateData(data, 'startDate')"
            @fetchMoreDateData="onFetchMoreDateData"
          />
        </div>
        <div class="date-container">
          <DateBar
            :label="'End date:'"
            :start-date="startDateProp"
            :end-date="endDateProp"
            :bank-option="bankPropOption"
            :account-option="accountPropOption"
            :reset-config="resetConfigProp"
            @dateData="(data) => onDateData(data, 'endDate')"
            @fetchMoreDateData="onFetchMoreDateData"
          />
        </div>
      </div>
      <TransactionList
        :has-page="hasNextPage"
        :transactions-list="transactions"
        :fetch-page="fetchNextPage"
      />
    </div>
  </div>
</template>
<script>
import { computed, defineComponent, reactive, ref } from 'vue';
import SelectBar from '../components/SelectBar.vue';
import SearchBar from '@/components/SearchBar.vue';
import TransactionList from '@/components/TransactionList.vue';
import DateBar from '@/components/DateBar.vue';
import { accountOptions, bankOptions } from '@/utils';
import '../common-styles.css';

export default defineComponent({
  components: {
    SelectBar,
    TransactionList,
    SearchBar,
    DateBar,
  },

  setup() {
    const transactions = ref([]);
    const loading = ref(false);
    const fetchNextPage = ref({});
    const error = ref('');
    const startDateProp = ref(null);
    const endDateProp = ref(null);
    const hasNextPage = ref(false);
    const searchData = ref('');
    const bankPropOption = ref(null);
    const accountPropOption = ref(null);
    const resetConfigProp = reactive({
      isSearch: true,
      isFilter: false,
    });

    function updateData(data) {
      transactions.value = data.transactions.value;
      loading.value = data.loading.value;
      error.value = data.error.value;
      fetchNextPage.value = data.fetchNextPage;
      hasNextPage.value = data.hasNextPage.value;
    }

    function onDateData(data, source) {
      updateData(data);

      const dataDate = computed(() => data.selectedDate).value;

      if (source === 'startDate') {
        if (dataDate?.value) {
          startDateProp.value = dataDate.value;
        } else if (data.label === undefined) {
          startDateProp.value = null;
        }
      }

      if (source === 'endDate') {
        if (dataDate?.value) {
          endDateProp.value = dataDate.value;
        } else if (data.label === undefined) {
          endDateProp.value = null;
        }
      }

      ({
        isSearch: resetConfigProp.isSearch,
        isFilter: resetConfigProp.isFilter,
      } = {
        isSearch: true,
        isFilter: false,
      });
    }

    function onFetchMoreDateData(data) {
      updateData(data);

      hasNextPage.value = data.hasNextPage.value;
    }

    function onSearchData(data) {
      updateData(data);

      hasNextPage.value = data.hasNextPage.value;
      fetchNextPage.value = data.fetchNextPage;
      ({
        isSearch: resetConfigProp.isSearch,
        isFilter: resetConfigProp.isFilter,
      } = {
        isSearch: false,
        isFilter: true,
      });
    }

    function onFetchMoreSearchData(data) {
      transactions.value = data.transactions.value;
      hasNextPage.value = data.hasNextPage.value;
    }

    function onFetchMoreSelectData(data) {
      transactions.value = data.transactions.value;
      hasNextPage.value = data.hasNextPage.value;
    }

    function onSelectData(data) {
      transactions.value = data.transactions.value;
      loading.value = data.loading.value;
      error.value = data.error.value;
      fetchNextPage.value = data.fetchNextPage;
      hasNextPage.value = data.hasNextPage.value;
      searchData.value = null;

      if (data.selectedOption?.value?.bank) {
        bankPropOption.value = data.selectedOption.value.bank;
      }
      if (data.selectedOption?.value?.account) {
        accountPropOption.value = data.selectedOption?.value?.account;
      }

      ({
        isSearch: resetConfigProp.isSearch,
        isFilter: resetConfigProp.isFilter,
      } = {
        isSearch: true,
        isFilter: false,
      });
    }

    return {
      loading,
      error,
      bankOptions,
      bankPropOption,
      accountOptions,
      accountPropOption,
      searchData,
      onSearchData,
      onFetchMoreSearchData,
      onSelectData,
      onFetchMoreSelectData,
      onDateData,
      onFetchMoreDateData,
      startDateProp,
      endDateProp,
      transactions,
      fetchNextPage,
      hasNextPage,
      resetConfigProp,
    };
  },
});
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: var(--default-font-family);
  font-size: var(--default-font-size);
  color: var(--default-color);
}

.loading {
  color: var(--default-color);
  font-weight: bold;
  text-align: center;
}

.error {
  color: red;
  font-weight: bold;
  text-align: center;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  width: 600px;
}

.search-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  margin-bottom: 20px;
}

.search-label {
  font-weight: bold;
  margin-right: 10px;
  margin-bottom: 10px;
}

.search-component {
  width: 250px;
}

.select-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  margin-bottom: 20px;
}

.select-label {
  font-weight: bold;
  margin-right: 10px;
  margin-bottom: 10px;
}

.select-component {
  width: 250px;
}

.date-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  width: 250px;
  margin-bottom: 20px;
}
</style>
