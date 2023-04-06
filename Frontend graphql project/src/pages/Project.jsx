import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { GET_PROJECT } from "../graphql/queries/ProjectQueries";
import { useParams } from "react-router";
import { GET_CLIENTS } from "../graphql/queries/ClientQueries";
import Header from "../Components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faClock,
  faEllipsisH,
  faEnvelope,
  faList,
  faPen,
  faPhone,
  faProjectDiagram,
  faSignature,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { UPDATE_PROJECT } from "../graphql/mutations/ProjectMutation";
import Unauthorized from "../Components/Common/Unauthorized";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

const initialFormValue = {
    name:"",
    description:"",
    clientId:"",
    status:""
}

export default function Project() {
  const { id } = useParams();
  const [updateFormData, setUpdateFormData] = useState(initialFormValue)
  const [openUpdateProject, setOpenUpdateProject] = useState(false);
  const [valuesChanged, setValuesChanged] = useState(false)
  const errorRef = useRef(null);
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: {
      id,
    },
  });

  const {data: clientData} = useQuery(GET_CLIENTS);

  const [updateProject] = useMutation(UPDATE_PROJECT,{
    variables:{
      ...updateFormData
    }, 
    update(cache, {data:{updateProject}}){
      cache.writeQuery({
        query: GET_PROJECT,
        data : {project: {...updateProject}}
      })

      setOpenUpdateProject(false);
      setUpdateFormData({...initialFormValue})
    }
  })

  useEffect(() => {
    if (openUpdateProject) {
        const projectData = {
            id: data.project.id,
            name: data.project.name,
            description: data.project.description,
            clientId: data.project.client.id,
            status: data.project.status
        }

        setUpdateFormData({...projectData})
    }
  }, [openUpdateProject]);

  if (loading) return;
  if (error) return <div className="w-full h-full"><Unauthorized/></div>;

  const handleChangeInputInUpdateProject = (event) => {

    setValuesChanged(true);
    
    const name = event.target.name;
    const value = event.target.value

    setUpdateFormData({
      ...updateFormData,
      [name]: value
    })
  };

  const handleUpdateProject = (event)=>{
    event.preventDefault();
    updateProject();
  }

  const { project } = data;

  const token = localStorage.getItem("token")
  return (
    token?
    <div className="h-full">
      <div className="w-full h-full bg-main-color">
        <Header />
        <div>
          <div className="mt-2 px-2 text-right">
            <button
              type="submit"
              className="text-main-heading mt-2 font-bold text-base border border-main-heading rounded px-2 py-1 hover:bg-main-heading hover:text-main-color transition ease-linear duration-300"
              onClick={() => setOpenUpdateProject(true)}
            >
              <FontAwesomeIcon icon={faPen} /> Update Project
            </button>
          </div>

          <div className="w-3/4 sm:w-2/4 mx-auto mt-4 p-5 border border-main-heading rounded-lg">
            <h1 className="text-5xl text-main-heading font-bold text-center">   
              <FontAwesomeIcon className="text-3xl" icon={faProjectDiagram} /> {project.name}
            </h1>
            <div className="mt-6 border rounded-lg p-2 w-full sm:w-3/4 sm:mx-auto border-black">
              <h1 className="font-bold text-green-500">
                 Status :-
                 <p className={`mx-2 ${project.status === "New"?"text-blue-500": project.status === "Progress"?"text-yellow-300":"text-green-500"  }`} >

                <FontAwesomeIcon className="mr-2" icon={project.status === "New"? faEllipsisH : project.status === "Progress"? faClock : faCircleCheck} />
                    
                          {project.status}
                 </p>
                    
              </h1>
            </div>
            <div className="mt-6 border rounded-lg p-2 w-full sm:w-3/4 sm:mx-auto border-black">
              <h1 className="font-bold text-green-500">
                <FontAwesomeIcon icon={faList} /> Description
              </h1>
              <p className="ml-4">{project.description}</p>
            </div>
            <div className="mt-6 border rounded-lg p-2 w-full sm:w-3/4 sm:mx-auto border-black">
              <h1 className="font-bold text-green-500">
                <FontAwesomeIcon icon={faUser} /> Client
              </h1>
              <div className="mt-2  px-2 w-full  border-black">
                <p>
                  <FontAwesomeIcon icon={faSignature} />{" "}
                  <span className="font-bold">Name -</span>{" "}
                  {project.client.name}
                </p>
              </div>
              <div className="mt-2  px-2 w-full  border-black">
                <p>
                  <FontAwesomeIcon icon={faEnvelope} />{" "}
                  <span className="font-bold">Email -</span>
                  {project.client.email}
                </p>
              </div>
              <div className="mt-2  px-2 w-full  border-black">
                <p>
                  <FontAwesomeIcon icon={faPhone} />{" "}
                  <span className="font-bold">Phone -</span>
                  {project.client.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openUpdateProject}
        onRequestClose={() => {setOpenUpdateProject(false); setValuesChanged(false); setUpdateFormData({})}}
        style={customStyles}
      >
        <form
            onSubmit={handleUpdateProject}
          className="h-[93%] flex flex-col gap-4 justify-center items-center bg-main-color p-5"
        >
          <h1 className="text-main-heading font-bold text-center text-3xl mb-6">
            Update Project
          </h1>
          <div className="px-5 w-full">
            <label
              htmlFor="updateProjectName"
              className="w-full text-center text-main-heading font-bold text-xl cursor-pointer"
            >
              Project Name
              <br />
              <input
                id="updateProjectName"
                type="text"
                name="name"
                onChange={handleChangeInputInUpdateProject}
                value={updateFormData.name}
                placeholder="Project Name"
                className="bg-transparent w-full sm:w-[540px]"
                required
              />
            </label>
          </div>

          <div className="px-5 w-full">
            <label
              htmlFor="updateProjectDescription"
              className="w-full text-center text-main-heading font-bold text-xl cursor-pointer"
            >
              Description
              <br />
              <textarea
                id="updateProjectDescription"
                name="description"
                value={updateFormData.description}
                onChange={handleChangeInputInUpdateProject}
                className="bg-transparent w-full sm:w-[540px]"
                placeholder="Description"
                required
              ></textarea>
            </label>
          </div>

          <div className="px-5 w-full">
            <label
              htmlFor="newProjectStatus"
              className="w-full text-center text-main-heading font-bold text-xl cursor-pointer"
            >
              Project Status
              <br />
              <select
                id="newProjectStatus"
                name="status"
                value={updateFormData.status}
                onChange={handleChangeInputInUpdateProject}
                className="w-full sm:w-[540px] bg-transparent"
                required
              >
                <option value="">Select</option>
                <option value="New">New</option>
                <option value="Progress">Progress</option>
                <option value="Done">Done</option>
              </select>
            </label>
          </div>

          <div className="px-5 w-full">
            <label
              htmlFor="newProjectClient"
              className="w-full text-center text-main-heading font-bold text-xl cursor-pointer"
            >
              Project Client
              <br />
              <select
                id="newProjectClient"
                name="clientId"
                value={updateFormData.clientId}
                onChange={handleChangeInputInUpdateProject}
                className="w-full sm:w-[540px] bg-transparent"
                required
              >
                <option value="">Select</option>
                {clientData?.clients?.map((client) => {
                  return (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          <div
            ref={errorRef}
            className="text-red-600 font-bold break-words"
          ></div>

          <button
            type="submit"
            className="text-main-heading mt-2 font-bold text-xl border border-main-heading rounded p-2 hover:bg-main-heading hover:text-main-color transition ease-linear duration-300"
          >
            <FontAwesomeIcon icon={faPen} /> Update Project
          </button>
        </form>
      </Modal>
    </div>
    :
    <Unauthorized/>
  );
}
