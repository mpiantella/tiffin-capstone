import gql from 'graphql-tag'
// InputActivity
// InputAddress
// InputProfile
// InputSubscription
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
    $address: InputAddress
    $activities: [InputActivity]
    $applications: [String]
    $profile: InputProfile
    $subscription: InputSubscription
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
        address: $address
        activities: $activities
        applications: $applications
        profile: $profile
        subscription: $subscription
      }
    ) {
        id
        cognitoid
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
// after testing address and so on, test the types. Then expand the fetch.