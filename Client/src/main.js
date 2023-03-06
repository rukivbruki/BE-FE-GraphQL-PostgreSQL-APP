import { createApp } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option';
import App from './App.vue';
import router from './router';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  cache: new InMemoryCache(),
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

const app = createApp(App);

app.use(router);

app.component('ApolloProvider', apolloProvider);
app.provide(DefaultApolloClient, apolloClient);

app.mount('#app');
