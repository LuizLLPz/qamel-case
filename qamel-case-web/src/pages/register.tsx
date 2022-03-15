import type { NextPage } from 'next';
import router from 'next/router';
import { useState } from 'react';
__dirname;
import { MainHeading } from '../components/StyledTypografy';
import { MainButton } from '../components/StyledButtons';
import { InputModel, formValidation } from '../components/StyledForm';
import { Form } from '../components/StyledContainers';
import { gql } from "@apollo/client";
import client from '../utils/ApolloClient';
;

const bg = '#f5f5f5';
const color = 'blue';

const Register: NextPage = () => {

	const [formValues, setFormValues] = useState({uname: '', email: '', pass: ''});
	const [valid, setValid] = useState(false);

const registerMutation = async () => {
	const {uname, email, pass} = formValues;
	if (!valid) return;
	const mutation = gql`
	mutation {
		register(username: "${uname}", password: "${pass}"
		email: "${email}"
		) {
			id, 
			error {
					message
			}
		}
	  }
	`;
	const { data : {
				register : {
					id,
					error : {
						message
					}
				}	
			}
		} = await client.mutate(
			{
				mutation
			}
	);
	if (id) {
		localStorage.setItem('gid', id);
		router.push('/boasVindas');
	} else {
		alert(`An error ocurred when trying to register! Message: ${message}`);
	}
}

	const handleChange = (e: any, setError: any) => {
		setValid(formValidation(e.target, e.target.value, e.target.name, setError));
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value
		})

	}

	return (
		<>
			<MainHeading>Registrar</MainHeading>
			<Form color={color}>
				<label htmlFor="uname">Nome de Usuário:</label>
				<InputModel placeholder="Nome de usuário" bg={bg} color={color} name="username" 
				value={formValues.uname} onChange={handleChange}></InputModel>
				<label htmlFor="email">Email:</label>
				<InputModel placeholder="Email" type="email" bg={bg} color={color} name="email" 
				value={formValues.email} onChange={handleChange}></InputModel>
				<label htmlFor="pass">Senha:</label>
				<InputModel placeholder="Senha" type="password" bg={bg} color={color} name="password" 
				value={formValues.pass} onChange={handleChange}></InputModel>
				<MainButton onClick={registerMutation}>Registrar</MainButton>
			</Form>
		</>
	);
};

export default Register;
