import { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import {setContext} from "@apollo/client/link/context"
import {BrowserRouter, Route, Routes} from "react-router-dom"


import Header from "./Components/Header";
import Clients from "./Components/Clients";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { DUMMY_TOKEN } from "./config";

const authLink = setContext((_, {headers})=>{
  const token = DUMMY_TOKEN
  return{
    headers:{
      authorization: token
    }
  }
})

const httpLink = createHttpLink({
  uri: "http://localhost:1111/graphql"
})

const cache = new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        clients:{
          merge(existing, incoming){
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});



function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App w-full h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/clients" element={<Clients/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
