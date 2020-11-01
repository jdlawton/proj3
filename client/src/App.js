import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

//import components
import Header from './components/Header';

//import pages
import Home from './pages/Home'
import Hardware from './pages/Hardware';
import NoMatch from './pages/NoMatch';
import Software from './pages/Software';
import Services from './pages/Services';


const client = new ApolloClient({
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/hardware" component = {Hardware} />
            <Route exact path="/software" component = {Software} />
            <Route exact path="/services" component = {Services} />

            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
      
    </ApolloProvider>
  );
}

export default App;
