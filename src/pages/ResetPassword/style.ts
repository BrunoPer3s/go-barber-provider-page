import styled, { keyframes } from "styled-components";
import { shade } from "polished";

import backgroundImg from "../../assets/sign-in-background.png";

export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 700px;
  width: 100%;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromLeft} 1s;

  form {
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      color: #f4ede8;
      margin-bottom: 24px;
    }
  }

  a {
    margin-top: 24px; 
    text-decoration: none;
    color: #f4ede8;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    svg {
      margin-right: 15px;
    }

    &:hover {
      color: ${shade(0.2, "#F4EDE8")};
    }

    & + a {
      margin-top: 80px;
      color: #ff9000;
    }

    & + a:hover {
      color: ${shade(0.2, "#FF9000")};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
`;
