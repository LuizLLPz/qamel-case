import type { NextPage } from 'next';
import router from 'next/router';
import { Nav } from '../components/StyledNav';
import { MainHeading } from '../components/StyledTypografy';
import { MainButton } from '../components/StyledButtons';
import { btnContainerStyle as btnStyle } from '../../styles/simpleStyles';


const Home: NextPage = () => {

  const logado = false;

  return (
    <div>
      <Nav logado={logado}/>
      <MainHeading>
         Conecte idéias e ame a tecnologia pelo Brasil!
      </MainHeading>
      {!logado && (
        <div style={btnStyle}>
          <MainButton onClick={() => router.push('/register')}>Registrar</MainButton>
          <MainButton onClick={() => router.push('/login')}>Fazer Login</MainButton>
        </div>
      )}
    </div>
  );
};

export default Home;
