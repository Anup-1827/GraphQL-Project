import { gql } from "@apollo/client"
const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!){
        loginUser(email: $email, password: $password){
            token
        }
    }
`

const SIGNUP_USER = gql`
    mutation signUpUser($email: String!, $password: String!){
        signUpUser(email: $email, password: $password){
            email
            password
        }
    }
`

export {LOGIN_USER, SIGNUP_USER}