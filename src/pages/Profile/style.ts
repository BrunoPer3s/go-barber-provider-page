import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Header = styled.div`
  height: 198px;
  background: #28262E;

  display: flex;
  align-items: center;

  div {
    width: 100%;
    max-width: 1120px;
    padding: 0 20px;
    margin: 0 auto;
  }


  svg {
      color: #999591;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, "#999591")};
      }
    }
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: -120px;

  form {
  display: flex;
  flex-direction: column;
  text-align: center;


  h3 {
    text-align: left;
    font-size: 20px;
    margin-bottom: 24px;
  }
  }
`;

export const AvatarProfile = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  label {
    width: 48px;
    height: 48px;

    background: #ff9000;
    border-radius: 50%;
    border: none;

    position: absolute;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s;
    cursor: pointer;

    input {
      display: none;
      
    }

    &:hover {
      background: ${shade(0.2,"#ff9000")}
    }

    svg {
      color: #312E38;
    }
  }
  

  
  





`;