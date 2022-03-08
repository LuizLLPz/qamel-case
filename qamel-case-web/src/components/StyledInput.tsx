import styled from 'styled-components';


const inputModel = ({ className, name, text, placeholder }) => {
    return (
        <>
            <label>{text}</label>
            <input className={className} placeholder={placeholder}/>
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
