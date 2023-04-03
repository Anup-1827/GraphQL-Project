import { useQuery, gql } from "@apollo/client";
import { GET_CLIENTS } from "../graphql/queries/ClientQueries";
import Spinner from "./Common/Spinner";
import ClientRow from "./ClientRow";
import Header from "./Header";


export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  console.log(error);

  if (loading) return <div><Spinner/></div>;
  if (error) return <div> <Header/>  Something Went Wrong</div>;

  return (
    <>
      <Header/>
    <div className="mt-5">
      <table className=" w-full sm:w-4/5 m-auto table-auto overflow-x-auto">
        <tbody>
        <tr>
          <th className="border-2 border-black">Name</th>
          <th className="border-2 border-black">Email</th>
          <th className="border-2 border-black">Phone</th>
          <th className="border-2 border-black">Delete</th>
        </tr>
        {data.clients &&
          data.clients.map((client) => {
            return (
              <ClientRow key={client.id} client={client}/>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}
