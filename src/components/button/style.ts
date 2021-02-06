import styled from "styled-components";
import { shade } from 'polished';

export const Container = styled.button`
  
    background-color: #ff9000;
    height: 56px;
    border-radius: 10px;
    border: none;
    width: 340px;
    margin-top: 14px;
    font-weight: 500;
    color: #312E38;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#FF9000')}
    }
  
`;
