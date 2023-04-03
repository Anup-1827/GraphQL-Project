import { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {BrowserRouter, Route, Routes} from "react-router-dom"


import Header from "./Components/Header";
import Clients from "./Components/Clients";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

const client = new ApolloClient({
  uri: "http://localhost:1111/graphql",
  cache: new InMemoryCache(),
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
