import { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import {setContext} from "@apollo/client/link/context"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"

import Clients from "./Components/Clients";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Project from "./pages/Project";
import { DUMMY_TOKEN } from "./config";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

const token = localStorage.getItem("token")
const authLink = setContext((_, {headers})=>{
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
      <div className="App h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/" element={token? <Home/>: <Navigate replace to="/login"/> }/>
            <Route path="/project/:id" element={<Project/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
