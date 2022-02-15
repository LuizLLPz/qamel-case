import type { NextPage } from 'next';
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
          <MainButton>Registrar</MainButton>
          <MainButton>Fazer Login</MainButton>
        </div>
      )}
    </div>
  );
};

export default Home;
