import './App.css';
import AddClientModal from './components/AddClientModal';
import Clients from './components/Clients';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Projects from './components/Projects';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './components/Project';


// For removing warning while: Updating State when Deleting :  
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache
})
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
                <Route exact path = '/' element={<Home/>}/>
                <Route exact path = '*' element={<NotFound/>}/>
                <Route exact path = '/project/:id' element={<Project/>}/>
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
