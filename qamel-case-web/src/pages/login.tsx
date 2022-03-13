import type { NextPage } from 'next';
import router from 'next/router';
import { useState } from 'react';
import { MainHeading } from '../components/StyledTypografy';
import { MainButton } from '../components/StyledButtons';
import { Form } from '../components/StyledContainers';
import { gql } from "@apollo/client";
import client from '../utils/ApolloClient';
import { InputModel } from '../components/StyledInput';

type formValues = {
    id: String,
    pass: String
}



const Home: NextPage = () => {
    const [formValues, setFormValues] = useState({id: '', pass: ''});
    const [logado, setLogado] = useState(false);
    const [user, setUser] = useState({username: '', email: ''});

    const handleChange = (e: any) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const loginQuery =  async () => {
        const query = gql`
        {
            login(username: "${formValues.id}", password: "${formValues.pass}") {
                user {
                  username,
                  email
                }, 
                error {
                    message
                },
                id
            }
        }
    
        `;
    
        const res = await client.query({
            query
        });
        console.log(res);
        if (res.data.login.error) {
            alert(`Ocorreu um erro! Mensagem de erro: ${res.data.login.error.message}`);
        } 
        else {
            console.log(res.data.login);
            localStorage.setItem('gid', res.data.login.id);
            setLogado(true);
            setUser(res.data.login.user);
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
                    <InputModel placeholder="Nome de usuário ou email" value={formValues.id} name="id" onChange={handleChange}/>
                    <InputModel placeholder="Senha" type="password" value={formValues.pass} name="pass" onChange={handleChange}/>
                    <MainButton onClick={loginQuery}>
                        Login
                    </MainButton>
                </Form>
    }
        </div>
  );
};

export default Home;
