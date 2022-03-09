import styled from 'styled-components';
import router from 'next/router';

  type NavProps = {
    logado: boolean;
  } 


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

export const Nav = (props: NavProps) => (
    <NavContainer>
      {!props.logado ? (
          <>
            <NavLink onClick={() => router.push('register')}>Registrar</NavLink>
            <NavLink>Fazer Login</NavLink>
          </>
          ) : (
        <>
          <NavLink>Home</NavLink>
          <NavLink>Perfil</NavLink>
          <NavLink>Deslogar</NavLink>
        </> 
        )
      }
    </NavContainer>
);
