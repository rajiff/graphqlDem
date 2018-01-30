import React from 'react';
import ReactDOM from 'react-dom';

/*import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
*/

// import GQLApp from './components/GQLApp';
import AppRoutes from './AppRoutes';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({ uri: '/' }),
  cache: new InMemoryCache()
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<AppRoutes />
	</ApolloProvider>,
	document.getElementById('root'));