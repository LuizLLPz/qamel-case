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
    const [formValues, setFormValues] = useState({id: '', pass: ''});
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
        const {id, pass} = formValues;
        if (!valid) return;
        const query = login(id, pass);   
        const res = await client.query({
            query
        });
        console.log(res);
        console.log(res.data.login);
        localStorage.setItem('gid', res.data.login.id);
        setLogado(true);
        setUser(res.data.login.user);
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
                    <InputModel placeholder="Nome de usuário ou email" value={formValues.id} name="username" onChange={handleChange}/>
                    <InputModel placeholder="Senha" type="password" value={formValues.pass} name="password" onChange={handleChange}/>
                    <MainButton onClick={loginQuery}>
                        Login
                    </MainButton>
                </Form>
    }
        </div>
  );
};

export default Home;
