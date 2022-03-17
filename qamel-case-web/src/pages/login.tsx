import type { NextPage } from 'next';
import router from 'next/router';
import { useState } from 'react';
import { MainHeading } from '../components/StyledTypografy';
import { MainButton } from '../components/StyledButtons';
import { Form } from '../components/StyledContainers';
import { loginQuery as login } from '../graphql/queries/User';
import client from '../utils/ApolloClient';
import { InputModel, formValidation } from '../components/StyledForm';

type formValues = {
    id: String,
    pass: String
}



const Home: NextPage = () => {
    const [formValues, setFormValues] = useState({username: '', password: ''});
    const [valid, setValid] = useState(false);
    const [logado, setLogado] = useState(false);
    const [user, setUser] = useState({username: '', email: ''});

    const handleChange = (e: any, setError: any) => {
        setValid(formValidation(e.target, e.target.value, e.target.name, setError));
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const loginQuery =  async () => {
        const {username, password} = formValues;
        if (!valid) return;
        const query = login(username, password);  
        const {data: {login : loginRes}} = await client.query({
            query
        })
        if (loginRes.id) {
            localStorage.setItem('gid', loginRes.id);
            setLogado(true);
            setUser(loginRes.user);
        }
    }
    

    return (
        <div>
            <MainHeading>
                {!logado ? 'Fazer Login' : 
                    <>
                        {`Logado como  ${user.username}`}
                           <MainButton onClick={() => router.push('/')}>
                                 Voltar
                           </MainButton>
                    </>
                }
            </MainHeading>
            {!logado && 
                <Form>
                    <InputModel placeholder="Nome de usuário ou email" value={formValues.username} name="username" onChange={handleChange}/>
                    <InputModel placeholder="Senha" type="password" value={formValues.password} name="password" onChange={handleChange}/>
                    <MainButton onClick={loginQuery}>
                        Login
                    </MainButton>
                </Form>
    }
        </div>
  );
};

export default Home;
