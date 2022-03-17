import { gql } from '@apollo/client';

export const checkUser = (username: string) => {
  return gql`
    query {
      checkUser(token: "${localStorage.getItem('gid')}", username: "${username}"{
        name
        email
      },
      error: {
        title
        message
      },
      perm
    }
  `;
}



export const checkToken = () => {
    return gql`>  
      {
        checkToken (token: "${localStorage.getItem('gid')}") {
          user {
            username,
            email
          }, 
          error {
            message
          }
        }
      }
      `;
};      


export const loginQuery = (id: string, password: string) => {
    return gql`
    {
        login(username: "${id}", password: "${password}") {
          id,
          user {
            username,
            email
          }
          error {
            message
          }
        }
      }
      `;
}