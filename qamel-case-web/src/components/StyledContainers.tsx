import styled from 'styled-components';


export const Container = styled.div`
	display: flex;
	flex-flow: column wrap;
	justify-content: center;
`;


export const Form = styled.form`
    color: ${props => props.color ? props.color : 'black'};
	display: grid;
	padding-left: 50px;
	grid-gap: 5px;
`;

