import type { NextPage } from 'next';
import router from 'next/router';
import { useState } from 'react';
__dirname;
import { MainHeading } from '../components/StyledTypografy';
import { MainButton } from '../components/StyledButtons';
import { InputModel } from '../components/StyledInput';
import { gql } from "@apollo/client";
import client from '../utils/ApolloClient';
import styled from 'styled-components';

const bg = '#f5f5f5';
const color = 'blue';

const Form = styled.form`
    color: ${color};
	display: grid;
	padding-left: 50px;
	grid-gap: 5px;
`;


const Register: NextPage = () => {

	const [formValues, setFormValues] = useState({uname: '', email: '', pass: ''});
	

const registerMutation = async () => {
	const mutation = gql`
	mutation {
		register(username: "${formValues.uname}", password: "${formValues.pass}"
		email: "${formValues.email}"
		)
	  }
	`;
	const res = await client.mutate({
		mutation
	});
	console.log(res);
	if (res.data.register === 'OK') {
		router.push('/boasVindas');
	} else {
		alert("Fer merda filho.");
	}
}


	const handleChange = (e: any) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value
		})

	}

	return (
		<>
			<MainHeading>Registrar</MainHeading>
			<Form>
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
