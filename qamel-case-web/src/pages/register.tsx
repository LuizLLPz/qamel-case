import type { NextPage } from 'next';
import { useState } from 'react';
__dirname;
import { MainHeading } from '../components/StyledTypografy';
import { MainButton } from '../components/StyledButtons';
import { InputModel } from '../components/StyledInput';
import { gql } from "@apollo/client";
import client from '../utils/ApolloClient';
import styled from 'styled-components';

const Form = styled.form`
	display: grid;
	padding-left: 50px;
	grid-gap: 5px;
`;


const bg = '#f5f5f5';
const color = 'blue';

const Register: NextPage = () => {

	const [formValues, setFormValues] = useState({uname: '', email: '', pass: ''});
	

const registerMutation = async (e: any) => {
	console.log(e);
	const mutation = gql`
	mutation {
		register(username: "Bianca", password: "likeaboss"
		email: "bia123@gmail.com"
		)
	}
	`;
	await client.mutate({
		mutation
	});
	alert('vamo porra!');
		
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
			<Form onSubmit={(e) => {
					registerMutation(e)
					e.preventDefault()
				}
				}>
				<InputModel placeholder="Nome de usuário" bg={bg} color={color} name="uname" 
				value={formValues.uname} onChange={handleChange}></InputModel>
				<InputModel placeholder="Email" bg={bg} color={color} name="email" 
				value={formValues.email} onChange={handleChange}></InputModel>
				<InputModel placeholder="Senha" bg={bg} color={color} name="pass" 
				value={formValues.pass} onChange={handleChange}></InputModel>
				<input type="submit" value="Registrar"/>
			</Form>
		</>
	);
};

export default Register;
