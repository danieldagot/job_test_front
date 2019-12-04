import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
// export const FETCH_POSTS_QUERY = gql`
//   {
//     getPosts {
//       id
//       body
//       createdAt
//       username
//       likeCount
//       likes {
//         username
//       }
//       commentCount
//       comments {
//         id
//         username
//         createdAt
//         body
//       }
//     }
//   }
// `;

export const FETCH_POSTS_QUERY = gql`
  {
    numbers {
      number1
      number2
      addNumber
      moltNumber
      _id
    }
  }
`;

export const ADD_TODO = gql`
mutation CreateNumber($number1 :Int , $number2 : Int ){
  createNumber(number1 :$number1 , number2 : $number2 ){
    number1
    number2
    _id
  }
}
  
  `;



  
export const REMOVE_NUMBER = gql`
mutation RreateNumber($id : String ){
  removeNumber(id : $id )
}
  
  `;


  export const EDIT_NUMBER = gql`
  mutation EditNumber($id : String , $number1 :Int , $number2 : Int ){
    editNumber(id : $id , number1 :$number1 , number2 : $number2 )
}
  
  `;

