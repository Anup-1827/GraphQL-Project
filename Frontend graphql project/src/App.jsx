import { useState } from "react";
import Header from "./Components/Header";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Clients from "./Components/Clients";

const client = new ApolloClient({
  uri: "http://localhost:1111/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App w-full">
        <Header />
        <main className="">
          <Clients/>
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
