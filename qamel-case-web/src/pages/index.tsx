import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import router from 'next/router';
import { Nav } from '../components/StyledNav';
import { MainHeading } from '../components/StyledTypografy';
import { MainButton } from '../components/StyledButtons';
import { btnContainerStyle as btnStyle } from '../../styles/simpleStyles';
import { checkToken as check} from "../graphql/queries/User";
import client from '../utils/ApolloClient';

const Home: NextPage = () => {
  const [user, setUser] = useState({logado: false, username: ''});

  const checkToken = async () => {
    const query = check();
    const {data : {checkToken}} = await client.query({
      query,
    });
    if (checkToken.user) {
        const { username } = checkToken.user;
        setUser({logado: true, username});
    }
    else if (checkToken.error) {
        localStorage.removeItem('gid');
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
