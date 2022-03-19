import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container } from '../../components/StyledContainers';
import { MainHeading } from '../../components/StyledTypografy';
import { checkUser as checkUserQuery } from '../../graphql/queries/User';
import client from '../../utils/ApolloClient';


type userProps = {
  userObj: {
    username: string,
    email: string
  }
}

const UserComponent = ({userObj: {username, email}}: userProps) => {
  return (
    <Container>
      <MainHeading>
        {username}
      </MainHeading>
      <MainHeading>
        {email}
      </MainHeading>
    </Container>
  )
}

const User = () => {
  const router = useRouter()
  const [user, setUser] = useState(null);
  let perm = false;
  const { username } = router.query;
  const getUser = async () => {
    console.log(username);
    const query = checkUserQuery(username);
    const {data : {checkUser}} = await client.query({
      query,
    });
    if (checkUser.user) {
      const { username, email } = checkUser.user;
      setUser({username, email});
    }

  }
  
  useEffect(() => {
    if (username) getUser();
  }, username);

  return (
    <div>
      {user ? <UserComponent 
                userObj={user}
                /> : 
              <MainHeading> 404 - Usuário não encontrado!</MainHeading>
      } 
    </div>
  );
}

export default User 