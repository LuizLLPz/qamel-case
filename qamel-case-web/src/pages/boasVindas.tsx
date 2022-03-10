import type { NextPage } from 'next';
import router from 'next/router';
import { Nav } from '../components/StyledNav';
import { MainHeading } from '../components/StyledTypografy';
import { MainButton } from '../components/StyledButtons';


const Home: NextPage = () => {

  const logado = false;

  return (
    <div>
      <Nav logado={logado}/>
      <MainHeading>
         Seja Bem vindo ao Qamel Case comece a explorar agora!!!
      </MainHeading>
      <MainButton onClick={() => router.push('/')}>
        Voltar
      </MainButton>
    </div>
  );
};

export default Home;
