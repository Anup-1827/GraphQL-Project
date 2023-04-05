import { useQuery, gql, useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import Modal from 'react-modal';

import { GET_CLIENTS } from "../graphql/queries/ClientQueries";
import Spinner from "./Common/Spinner";
import ClientRow from "./ClientRow";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ADD_CLIENT } from "../graphql/mutations/ClientMutation";
import ProjectList from "./ProjectList";

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

const initalFieldValuesOfAddClient = {
  name:"",
  email:"",
  phone:"",
}

export default function Clients() {
  const [addClientModalOpen, setAddClientModalOpen] = useState(false);
  const [addClientFormData, setAddClientFormData] = useState(initalFieldValuesOfAddClient);
  const errorRef = useRef(null)
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [addClient] = useMutation(ADD_CLIENT,{
    variables:{
      name: addClientFormData.name,
      email: addClientFormData.email,
      phone: addClientFormData.phone
    },
    update(cache,{data: {addClient} }){
      const {clients} = cache.readQuery({query: GET_CLIENTS})

      console.log(addClient.addClient);

      cache.writeQuery({
        query:GET_CLIENTS,
        data: {clients: [...clients, addClient]}
      })
    }
  })


  const handleAddClient = (event)=>{
      event.preventDefault();
        addClient()
        .then(()=>{
          setAddClientFormData({})
          setAddClientModalOpen(false)
        })
        .catch(err=>{
          errorRef.current.classList.remove('hidden');
          errorRef.current.innerText  = err.message
        })
  }

  const handleChangeInputInAddClient = (event)=>{
      const name = event.target.name;
      const value = event.target.value;

      errorRef.current.classList.add('hidden');
      errorRef.current.innerText = ""

      setAddClientFormData({
        ...addClientFormData,
        [name]: value
      })
  }



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
      <div className="mx-4">
      <ProjectList  clientData ={data}/>
      <div className="mt-2 px-2 text-right">
        <button
          type="submit"
          className="text-main-heading mt-2 font-bold text-base border border-main-heading rounded px-2 py-1 hover:bg-main-heading hover:text-main-color transition ease-linear duration-300"
          onClick={()=> setAddClientModalOpen(true)}
        >
         <FontAwesomeIcon icon={faUser}/> Add Client
        </button>
      </div>

      <div className="mt-5">
        <table className=" w-full mx-2 sm:w-4/5 sm:mx-auto table-auto block overflow-x-auto">
          <tbody className="table w-full">
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
      </div>

      <Modal
        isOpen={addClientModalOpen}
        onRequestClose={()=> setAddClientModalOpen(false)}
        style={customStyles}
      >
        <form onSubmit={handleAddClient} className='h-[93%] flex flex-col gap-4 justify-center items-center bg-main-color p-5'>
            <h1 className='text-main-heading font-bold text-center text-3xl mb-6'>Add New Client</h1>
            <div className='px-5 w-full'>
                <label htmlFor="newClientName" className='w-full text-center text-main-heading font-bold text-xl cursor-pointer'>Client Name
                <br/>
                <input id="newClientName" type='text' name="name" onChange={handleChangeInputInAddClient} placeholder='Client Name' className='bg-transparent w-full sm:w-[540px]' required/>
                </label>
            </div>

            <div className='px-5 w-full'>
                <label htmlFor="newClientEmail" className='w-full text-center text-main-heading font-bold text-xl cursor-pointer'>Client Email
                <br/>
                <input id="newClientEmail" type='email' name="email" onChange={handleChangeInputInAddClient} placeholder='Client Email' className='bg-transparent w-full sm:w-[540px]' required/>
                </label>
            </div>

            <div className='px-5 w-full'>
                <label htmlFor="newClientPhone" className='w-full text-center text-main-heading font-bold text-xl cursor-pointer'>Client Phone Number
                <br/>
                <input id="newClientPhone" type='number' name="phone" onChange={handleChangeInputInAddClient} maxLength={10} placeholder='Client Phone Number' className='bg-transparent w-full sm:w-[540px]' required/>
                </label>
            </div>


            <div ref={errorRef} className='text-red-600 font-bold break-words'>

            </div>

            <button type='submit' className='text-main-heading mt-2 font-bold text-xl border border-main-heading rounded p-2 hover:bg-main-heading hover:text-main-color transition ease-linear duration-300'>
              <FontAwesomeIcon icon={faUser}/> Add Client
            </button>
        </form>
      </Modal>

    </>
  );
}
