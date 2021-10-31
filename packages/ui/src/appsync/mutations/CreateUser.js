import gql from 'graphql-tag'

export default gql `
  mutation CreateUser {
    createUser(
    input: {
      address: {
        address1: "5555 street"
        city: "KOP"
        country: "USA"
        state: "PA"
        zipCode: "19087"
      }
      cognitoid: "5555555555"
      email: "o@yahoo.com"
      firstName: "test1"
      lastName: "testo"
      phone: "987787878"
      registered: false
      subcribed: false
      username: "testorito"
    }
  ) {
    id
    firstName
    lastName
    username
  }
  }
`