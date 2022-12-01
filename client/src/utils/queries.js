import { gql } from '@apollo/client';
//GETME query, which will execute the me query set up using Apollo Server
export const GET_ME = gql`
  {
    me {
      username
      email
      _id
      bookCount
      savedBooks {
        title
        authors
        image
        bookId
        link
      }
    }
  }
`;
