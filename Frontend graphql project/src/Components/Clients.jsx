import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import Modal from 'react-modal';

import { GET_CLIENTS } from "../graphql/queries/ClientQueries";
import Spinner from "./Common/Spinner";
import ClientRow from "./ClientRow";
import Header from "./Header";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: "0"
  },
};

Modal.setAppElement('#root');

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addClientModalOpen, setAddClientModalOpen] = useState(false);


  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div>
        {" "}
        <Header /> Something Went Wrong
      </div>
    );

  return (
    <>
      <Header />
      <div className="mt-2 px-2 text-right">
        <button
          type="submit"
          className="text-main-heading mt-2 font-bold text-base border border-main-heading rounded px-2 py-1 hover:bg-main-heading hover:text-main-color transition ease-linear duration-500"
          onClick={()=> setAddClientModalOpen(true)}
        >
          Add Client
        </button>
      </div>

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
                return <ClientRow key={client.id} client={client} />;
              })}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={addClientModalOpen}
        onRequestClose={()=> setAddClientModalOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form className='h-[93%] flex flex-col gap-4 justify-center items-center bg-main-color p-5'>
            <h1 className='text-main-heading font-bold text-center text-3xl mb-6'>Add New Client</h1>
            <div className='px-5 w-full'>
                <label htmlFor="newClientName" className='w-full text-center text-main-heading font-bold text-xl cursor-pointer'>Client Name
                <br/>
                <input id="newClientName" type='text' name="name" placeholder='Client Name' className='bg-transparent w-full sm:w-[540px]' required/>
                </label>
            </div>

            <div className='px-5 w-full'>
                <label htmlFor="newClientEmail" className='w-full text-center text-main-heading font-bold text-xl cursor-pointer'>Client Email
                <br/>
                <input id="newClientEmail" type='email' name="email" placeholder='Client Email' className='bg-transparent w-full sm:w-[540px]' required/>
                </label>
            </div>

            <div className='px-5 w-full'>
                <label htmlFor="newClientPhone" className='w-full text-center text-main-heading font-bold text-xl cursor-pointer'>Client Phone Number
                <br/>
                <input id="newClientPhone" type='number' name="phone"  maxLength={10} placeholder='Client Phone Number' className='bg-transparent w-full sm:w-[540px]' required/>
                </label>
            </div>


            <div className='text-red-600 font-bold'>

            </div>

            <button type='submit' className='text-main-heading mt-2 font-bold text-xl border border-main-heading rounded p-2 hover:bg-main-heading hover:text-main-color transition ease-linear duration-500'>
               Add Client
            </button>
        </form>
      </Modal>
    </>
  );
}
