import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MainHeading } from '../../components/StyledTypografy';
import { checkUser } from '../../graphql/queries/User';
import client from '../../utils/ApolloClient';

const User = () => {
  const router = useRouter()
  const [user, setUser] = useState({});
  let perm = false;
  const { username } = router.query

  const getUser = async () => {
    if (!username) {
      router.push('/')
    }
    const query = checkUser(username);
    const {data: {checkUser : userRes}} = await client.query({
      query,
    })
    if (userRes.user) {
      perm = userRes.perm;
      setUser(userRes.user);
    }
  }
  
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {user ? <MainHeading>{user.username}</MainHeading> : "404"}
    </div>
  );
}

export default User 