//importing gql
import { gql } from '@apollo/client';

//Login user mutation
export const LOGIN_USER = gql`
  mutation login($name: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//Add user mutation
export const ADD_USER = gql`
  mutation addUser($username:String!, $email:String!, $password:String!) {
    addUser(username: $username, email: $email, password: $password){
        token
        user{
      _id
      username
    }
  }
`;

//Save book mutation
export const SAVE_BOOK = gql`
  mutation saveBook($authors:[String], $description: String!, $title: String!, $bookId: String, $link: String) {
    saveBook(authors: $authors, description: $description, title: $title, bookId, image: $image, link: $link)) {
        _id
        username
        email
        bookCount
        savedBooks{
            bookId
            authors
            description
            title
            image
            link
        }
    }
  }
`;

//Remove book mutation
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      email
      bookCount
      username
      savedBooks {
        bookId
        title
        authors
        description
        link
        image
      }
    }
  }
`;

