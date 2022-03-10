import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import router from 'next/router';
import { Nav } from '../components/StyledNav';
import { MainHeading } from '../components/StyledTypografy';
import { MainButton } from '../components/StyledButtons';
import { btnContainerStyle as btnStyle } from '../../styles/simpleStyles';
import { gql } from '@apollo/client';
import client from '../utils/ApolloClient';

const Home: NextPage = () => {
  const [user, setUser] = useState({logado: false, username: ''});

  const checkToken = async () => {
    const query = gql`
      {
        checkToken (token: "${localStorage.getItem('gid')}") {
          user {
            username,
            email
          }
        }
      }
      `;
    const result = await client.query({
      query,
    });
    if (result.data.checkToken.user) {
       const { username } = result.data.checkToken.user;
        setUser({logado: true, username});
    }
  };

  useEffect(() => checkToken(), []);



  return (
    <div>
      <Nav logado={user.logado} username={user.username}/>
      <MainHeading>Conecte idéias e ame a tecnologia pelo Brasil!</MainHeading>
      {!user.logado && (
        <div style={btnStyle}>
          <MainButton onClick={() => router.push('/register')}>
            Registrar
          </MainButton>
          <MainButton onClick={() => router.push('/login')}>
            Fazer Login
          </MainButton>
        </div>
      )}
    </div>
  );
};

export default Home;
