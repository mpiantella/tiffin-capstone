import gql from 'graphql-tag'
/**
 */
export default gql `
  input CommentInput {
    body: String
    title: String
    userId: String
  }
  
  mutation updateActivity(
    $id: String!
    $name: String!,
    $userId: String!
    $description: String
    $content: String
    $status: String
    $date: String
    $comment: [CommentInput]
    ) {
      updateActivity(
      input: {
        id: $id
        userId: $userId
        name: $name, 
        description: $description
        content: $content
        status: $status
        date: $date
        comment: $comment
      }
    ) {
      id
      name
      date
      description
      content
      status
      userId
      comment {
        body
        title
        userId 
      }
    }
  }
`