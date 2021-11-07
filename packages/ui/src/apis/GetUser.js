import gql from 'graphql-tag'

export default gql `
query getUser($id: ID!){
  getUser(id: $id) {
    username
    subcribed
    registered
    phone
    lastName
    id
    firstName
    email
    cognitoid
    applications
  }
}
`