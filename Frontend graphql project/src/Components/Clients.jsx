import { useQuery, gql } from "@apollo/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { GET_CLIENTS } from "../queries/ClientQueries";
import Spinner from "./Common/Spinner";


export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  console.log(data);

  if (loading) return <div><Spinner/></div>;
  if (error) return <div>Something Went Wrong</div>;

  return (
    <div className="mt-5">
      <table className=" w-full sm:w-4/5 m-auto table-auto overflow-x-auto">
        <tr>
          <th className="border-2 border-black">Name</th>
          <th className="border-2 border-black">Email</th>
          <th className="border-2 border-black">Phone</th>
          <th className="border-2 border-black">Delete</th>
        </tr>
        {data.clients &&
          data.clients.map((client) => {
            return (
              <tr key={client.id}>
                <td className="border-2 border-black pl-4">{client.name}</td>
                <td className="border-2 border-black pl-4">{client.email}</td>
                <td className="border-2 border-black pl-4">{client.phone}</td>
                <td className="border-2 border-black pl-4 text-center cursor-pointer text-red-500">{<FontAwesomeIcon icon={faTrash}/>}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}
