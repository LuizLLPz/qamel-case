import styled from 'styled-components';
import {useState} from 'react';

type inputModelAttrs = {
    className : string,
    name : string,
    text : string,
    placeholder : string,
    type : string,
    onChange : any
}

const ErrorLabel = styled.span`
    color: red;
    font-size: 12px;
`;  

const validationObject = {
    username : (value : string) => {
        if (value.length < 3) {
            return 'O nome de usuário deve ter no mínimo 3 caracteres!';
        }
        return '';
    },
    email: (value : string) => {
        if (!value.includes('@')) {
            return 'Email inválido!';
        }
        return '';
    },
    password: (value : string) => {
        if (value.length < 6) {
            return 'A senha deve ter no mínimo 6 caracteres!';
        }
        return '';
    }
}

export const formValidation = (element: any, value: string, key: string, setError: any) => {
   const error = validationObject[key](value);
   if (error) {
        element.style.color = 'red';
        setError(error);
        return false;
   } else {
       setError('');
       element.style.color = 'black';
       return true;
   }
}


const inputModel = ({ className, name, text, placeholder, type, onChange} : inputModelAttrs) => {
    const [error, setError] = useState('');
    return (
        <>
            <label>{text}</label>
                <input className={className} type={type ? type : 'text'}
                placeholder={placeholder} name={name} 
                onChange={(e) => onChange(e, setError)}
            />
            {error ? <ErrorLabel>{error}</ErrorLabel> : ''}
        </>
    )
}

export const InputModel = styled(inputModel)`
    border: 1px solid #black;
    outline: none;
    width: 40%;
    height: 40px;
    border: none;
    border-radius: 6px;
    color: ${props => props.color ? props.color : 'black'};
    background-color: ${props => props.bg ? props.bg : 'white'};
`;

export const StyledInput = ({placeholder}: any) => <InputModel placeholder={placeholder}/>