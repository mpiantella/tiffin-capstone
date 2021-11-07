import gql from 'graphql-tag'

export default gql `
  mutation createUser(
    $id: ID!
    $cognitoid: ID!
    $email: String
    $username: String
    $firstName: String
    $lastName: String
    $phone: String
    $registered: Boolean
    $subcribed: Boolean
  ) {
      createUser(
      input: {
        id: $id
        cognitoid: $cognitoid
        email: $email
        username: $username
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        registered: $registered
        subcribed: $subcribed
      }
    ) {
        id
        cognitoid
        address
        email
        username
        firstName
        lastName
        phone
        registered
        subcribed
        profile
      }
    }
`