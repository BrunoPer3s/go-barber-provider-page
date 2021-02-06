import styled, {css} from "styled-components";

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled?: boolean;
  isErrored: boolean;
}



export const Container = styled.div<ContainerProps> `
      
      
      background: #232129;
      border-radius: 10px;
      width: 100%;
      
      display: flex;
      align-items: center;
      border: 2px solid #232129;
      color: #666360;

      ${props => props.isErrored && css `
      border-color: #c53030;
      `}

    
      ${props => props.isFocused && css`
      border-color:#ff9000;
      color: #ff9000;
      `}




      ${props => props.isFilled && css `
      color: #ff9000;
      `}

      
      

      & + div {
        margin-top: 8px;
      }
 
  
  svg {
    margin-left: 18px;
  }
  


  input {
      background-color: transparent;
      border: none;
      flex: 1;
      padding: 16px;
      color: #f4ede8;
  }
`


export const Error = styled(Tooltip)<ContainerProps> `
height: 20px;
margin-right: 16px;
  svg {
    margin: 0;
    color: ${(props) => (props.isErrored === true && props.isFocused === true) ? "#fff" : "#c53030"}
  }

  span {
    background-color: #c53030;
    color: #fff;

    ::before {
      border-color: #c53030 transparent;
    }
  }



`