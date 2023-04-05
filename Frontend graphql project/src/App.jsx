import { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import {setContext} from "@apollo/client/link/context"
import {BrowserRouter, Route, Routes} from "react-router-dom"

import Clients from "./Components/Clients";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Project from "./pages/Project";
import { DUMMY_TOKEN } from "./config";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

const authLink = setContext((_, {headers})=>{
  const token = localStorage.getItem("token")
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
      <div className="App w-[100vw] h-[100vh] ">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/project/:id" element={<Project/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
