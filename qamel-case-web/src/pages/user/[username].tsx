import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container } from '../../components/StyledContainers';
import { MainHeading } from '../../components/StyledTypografy';
import { checkUser } from '../../graphql/queries/User';
import client from '../../utils/ApolloClient';


type userType = {
  username: string,
  email: string
}

const UserComponent = ({username, email}: userType) => {
  return (
    <Container>
      <MainHeading>
        {username}
      </MainHeading>
    </Container>
  )
}

const User = () => {
  const router = useRouter()
  const [user, setUser] = useState({});
  let perm = false;
  const { username } = router.query;
  const getUser = async () => {
    const query = checkUser(username);
    const {data} = await client.query({
      query,
    });
    
  }
  
  useEffect(() => {
    if (user) getUser();
  }, username);

  return (
    <div>
      {username}
      {user ? <UserComponent/> : <MainHeading> 404 - Usuário não encontrado!</MainHeading>} 
        </div>
  );
}

export default User 