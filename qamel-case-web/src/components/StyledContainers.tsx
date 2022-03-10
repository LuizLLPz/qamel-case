import styled from 'styled-components';

export const Form = styled.form`
    color: ${props => props.color ? props.color : 'black'};
	display: grid;
	padding-left: 50px;
	grid-gap: 5px;
`;