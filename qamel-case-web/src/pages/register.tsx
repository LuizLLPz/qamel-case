import type { NextPage } from 'next';
import router from 'next/router';
import { useState } from 'react';
__dirname;
import { MainHeading } from '../components/StyledTypografy';
import { MainButton } from '../components/StyledButtons';
import { InputModel } from '../components/StyledInput';
import { Form } from '../components/StyledContainers';
import { gql } from "@apollo/client";
import client from '../utils/ApolloClient';
;

const bg = '#f5f5f5';
const color = 'blue';

// const checkAvailability = async (id: String) => {
// 	const query = gql`query checkUser($id: ${id})`
// 	const availability = await client.query({
// 	  query
// 	});
// 	return availability;
// }


const Register: NextPage = () => {

	const [formValues, setFormValues] = useState({uname: '', email: '', pass: ''});
	

const registerMutation = async () => {
	const mutation = gql`
	mutation {
		register(username: "${formValues.uname}", password: "${formValues.pass}"
		email: "${formValues.email}"
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
	const useError = (e: String) => console.log(e);

	const handleChange = (e: any) => {
		//const available = checkAvailability(e.target.value);
		// if (!available) {
		// 	useError('Username already taken');
		// }
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
				<InputModel placeholder="Nome de usuário" bg={bg} color={color} name="uname" 
				value={formValues.uname} onChange={handleChange}></InputModel>
				<label htmlFor="email">Email:</label>
				<InputModel placeholder="Email" type="email" bg={bg} color={color} name="email" 
				value={formValues.email} onChange={handleChange}></InputModel>
				<label htmlFor="pass">Senha:</label>
				<InputModel placeholder="Senha" type="password" bg={bg} color={color} name="pass" 
				value={formValues.pass} onChange={handleChange}></InputModel>
				<MainButton onClick={registerMutation}>Registrar</MainButton>
			</Form>
		</>
	);
};

export default Register;
