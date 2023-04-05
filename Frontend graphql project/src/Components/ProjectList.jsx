import React, { useRef, useState } from "react";
import { GET_PROJECTS } from "../graphql/queries/ProjectQueries";
import { useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import {
  ADD_PROJECT,
  DELETE_PROJECT,
} from "../graphql/mutations/ProjectMutation";

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

const initalFormDataValues = {
  name: "",
  description: "",
  status: "",
  clientId: "",
};

function ProjectList({ clientData }) {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);
  const [formDataProject, setFormDataProject] = useState(initalFormDataValues);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      ...formDataProject,
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const [deleteProject] = useMutation(DELETE_PROJECT,{
    update(cache, {data:{deleteProject}}){
        const {projects} = cache.readQuery({query: GET_PROJECTS})

        cache.writeQuery({
        query : GET_PROJECTS,
        data: {projects: projects.filter(project=> project.id !== deleteProject.id)}
        })
    }
  });

  const errorRef = useRef();

  if (loading) return;

  if (error) return <p>Some Thing Went Wrong</p>;

  const handleChangeInputInAddProject = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormDataProject({
      ...formDataProject,
      [name]: value,
    });
  };

  const handleAddProject = (event) => {
    event.preventDefault();
    addProject()
      .then(()=>{
        setAddProjectModalOpen(false)
      })
      .catch((err) => {
        errorRef.current.innerText = err.message;
        errorRef.current.classList.remove("hidden");
      });
  };

  return (
    <>
      <div className="mt-2 px-2 text-right">
        <button
          type="submit"
          className="text-main-heading mt-2 font-bold text-base border border-main-heading rounded px-2 py-1 hover:bg-main-heading hover:text-main-color transition ease-linear duration-300"
          onClick={() => setAddProjectModalOpen(true)}
        >
          <FontAwesomeIcon icon={faList} /> Add Project
        </button>
      </div>
      {data && data?.projects?.length > 0 ? (
        <div className="sm:w-3/4 m-2 sm:mx-auto flex justify-center items-center flex-wrap gap-4 mt-4">
          {data.projects.map((project) => {
            return (
              <div key={project.id} className="flex-grow flex-shrink basis-80 border border-main-heading rounded-md p-3">
                <div className="flex items-center justify-between">
                  <h1 className="font-bold text-xl text-main-heading">
                    {project.name}
                  </h1>
                  <FontAwesomeIcon
                    className="cursor-pointer text-red-700"
                    icon={faTrash}
                    onClick={()=>{
                        deleteProject({
                            variables:{
                                id: project.id
                            }
                        })
                    }}
                  />
                </div>
                <div
                  className="flex  justify-between items-center gap-3 "
                  key={project.id}
                >
                  <div>
                    <div className="pl-3">
                      <p className="mt-3">{project.description}</p>
                      <p className="border border-green-500 rounded p-2 mt-2 text-green-500">
                        Status:-{" "}
                        <span className="font-bold">{project.status}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link to={`/project/${project.id}`}>
                      <button className="text-main-heading mt-2 font-bold text-sm border border-main-heading rounded p-2 hover:bg-main-heading hover:text-main-color transition ease-linear duration-500">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center text-xl font-bold">No Projects Added Yet!!!!</div>
      )}

      <Modal
        isOpen={addProjectModalOpen}
        onRequestClose={() => setAddProjectModalOpen(false)}
        style={customStyles}
      >
        <form
          onSubmit={handleAddProject}
          className="h-[93%] flex flex-col gap-4 justify-center items-center bg-main-color p-5"
        >
          <h1 className="text-main-heading font-bold text-center text-3xl mb-6">
            Add New Project
          </h1>
          <div className="px-5 w-full">
            <label
              htmlFor="newProjectName"
              className="w-full text-center text-main-heading font-bold text-xl cursor-pointer"
            >
              Project Name
              <br />
              <input
                id="newProjectName"
                type="text"
                name="name"
                onChange={handleChangeInputInAddProject}
                placeholder="Project Name"
                className="bg-transparent w-full sm:w-[540px]"
                required
              />
            </label>
          </div>

          <div className="px-5 w-full">
            <label
              htmlFor="newProjectDescription"
              className="w-full text-center text-main-heading font-bold text-xl cursor-pointer"
            >
              Description
              <br />
              <textarea
                id="newProjectDescription"
                name="description"
                onChange={handleChangeInputInAddProject}
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
                onChange={handleChangeInputInAddProject}
                className="w-full sm:w-[540px] bg-transparent"
                required
              >
                <option value="">Select</option>
                <option value="New">Not Started</option>
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
                onChange={handleChangeInputInAddProject}
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
            <FontAwesomeIcon icon={faList} /> Add Project
          </button>
        </form>
      </Modal>
    </>
  );
}

export default ProjectList;
