import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query GET_PROJECTS  {
  projects{
    id
    name
    description
    status
    client{
      id
      name
      email
      phone
    }
    
  }
}
`

const GET_PROJECT = gql`
    query project($id: ID!){
            project(id: $id){
                id
                name
                description
                status
                client{
                    id
                    name
                    email
                    phone
                }
            }
        }
`


export {GET_PROJECTS, GET_PROJECT}