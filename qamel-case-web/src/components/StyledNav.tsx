import styled from 'styled-components';
import router from 'next/router';
import { gql } from '@apollo/client';
import client from '../utils/ApolloClient';

type NavProps = {
  logado: boolean;
  nome: string;
};

export const NavContainer = styled.div`
  justify-content: flex-end;
  display: flex;
  color: white;
  gap: 1rem;
  padding-top: 1rem;
  padding-right: 2rem;
`;

export const NavLink = styled.div`
  text-decoration: none;
  color: blue;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
`;

const deslogar = async () => {
  const query = gql`
    mutation {
		  logout(token: "${localStorage.getItem('gid')}")
	    }
	  `;
  await client.mutate({
    mutation: query,
  });
  localStorage.removeItem('gid');
  router.push('/');
  router.reload();
};

export const Nav = ({ logado, username }: NavProps) => (
  <NavContainer>
    {!logado ? (
      <>
        <NavLink onClick={() => router.push('register')}>Registrar</NavLink>
        <NavLink>Fazer Login</NavLink>
      </>
    ) : (
      <>
        <NavLink>Home</NavLink>
        <NavLink onClick={() => router.push(`/user/${username}`)}>{username}</NavLink>
        <NavLink onClick={deslogar}>Deslogar</NavLink>
      </>
    )}
  </NavContainer>
);
