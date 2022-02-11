import styled from 'styled-components';

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
`;

export const Nav = (props: NavProps) => (
    <NavContainer>
      {!props.logado ? (
          <>
            <NavLink onClick={() => alert('Registrar!')}>Registrar</NavLink>
            <NavLink onClick={() => alert('Logar!')}>Fazer Login</NavLink>
          </>
          ) : (
        <>
          <NavLink onClick={() => alert('Home!')}>Home</NavLink>
          <NavLink onClick={() => alert('Perfil!')}>Perfil</NavLink>
          <NavLink onClick={() => alert('Sair!')}>Deslogar</NavLink>
        </> 
        )
      }
    </NavContainer>
);
