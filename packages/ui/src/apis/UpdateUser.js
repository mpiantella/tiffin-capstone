import gql from 'graphql-tag'

const InputAddress = `input InputAddress {
  address1: String!
  address2: String
  city: String!
  state: String!
  zipCode: String!
  country: String
}`

const InputActivity = `input InputActivity {
  id: ID!
  userId: String!
  name: String!
  description: String
  content: String
  status: String
  date: String
}`

const InputProfile = `
input InputProfile {
  currentRole: String!
  summary: String
  experience: [InputProfileEvent]
  education: [InputProfileEvent]
  licenses: [InputProfileEvent]
  certifications: [InputProfileEvent]
  recommendations: [InputProfileEvent]
  skills: [String]
  endorsements: [String]
}
`

const InputSubscription = `input InputSubscription {
  subscriptionsId: String!
  userId: String!
  billing: InputBilling
  active: Boolean
}`

export default gql `
  mutation updateUser(
    $id: ID!
    $cognitoid: ID
    $email: String
    $username: String
    $firstName: String
    $lastName: String
    $phone: String
    $registered: Boolean
    $subcribed: Boolean
    $address: InputAddress!
    $activities: [UpdateActivityInput]
    $applications: [String]
    $profile: InputProfile
    $subscription: InputSubscription
  ) {
    updateUser(
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
      }
    }
`
// after testing address and so on, test the types. Then expand the fetch.