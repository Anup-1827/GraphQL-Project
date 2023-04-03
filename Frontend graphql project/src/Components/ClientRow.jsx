import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../graphql/mutations/ClientMutation";
import Spinner from "./Common/Spinner";
import { GET_CLIENTS } from "../graphql/queries/ClientQueries";

function ClientRow({ client }) {

    const [deleteClient,{loading, error, data}] = useMutation(DELETE_CLIENT,  {
        variables:{id: client.id},
        // refetchQueries:[{query: GET_CLIENTS}],
        update(cache,{data:deleteClient}){
            const {clients} = cache.readQuery({query: GET_CLIENTS})

            // console.log(clients.filter(client=> client.id !== deleteClient.id));

            cache.writeQuery({
                query: GET_CLIENTS,
                data: {clients: clients.filter(client=> client.id !== deleteClient.deleteClient.id)}
            })
        }
        
    }   )

    // if(loading) return  <Spinner/>

    if(error) return <tr>Error in Deleting Data </tr>

    // if(data) 
      return (
    <tr key={client.id}>
      <td className="border-2 border-black pl-4">{client.name}</td>
      <td className="border-2 border-black pl-4">{client.email}</td>
      <td className="border-2 border-black pl-4">{client.phone}</td>
      <td className="border-2 border-black pl-4 text-center cursor-pointer text-red-500">
        {<FontAwesomeIcon icon={faTrash} 
        onClick={deleteClient}
        />}
      </td>
    </tr>
  );
}

export default ClientRow;
