import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.header`
  background-color: #28262e;
  padding: 32px 0;
`;

export const HeaderContent = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1120px;

  button {
    background-color: transparent;
    border: 0;
    margin-left: auto;

    > img {
      height: 80px;
    }

    svg {
      color: #999591;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, "#999591")};
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 100px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
    color: #f4ede8;
  }

    a {
      text-decoration: none;
      color: #ff9000;
      transition: color 0.2s;

      &:hover{
        color: ${shade(0.2, '#ff9000')}
      }
    }
  }

  
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 120px;

  h1 {
    color: #f4ede8;
    font-size: 36px;
  }

  p {
    margin-top: 12px;
    color: #ff9000;
    font-weight: 500;
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400px;
  }

  div {
    display: flex;
    align-items: center;
    background: #3e3b47;
    border-radius: 10px;
    border: none;
    padding: 16px 24px;
    margin-top: 24px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      left: 0;
      top: 10%;
      width: 1px;
      background: #ff9000;
      content: "";
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    h2 {
      margin-left: 24px;
      color: #f4ede8;
    }

    svg {
      margin-left: auto;
    }

    span {
      margin-left: 12px;
      font-size: 24px;
      color: #999591;
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;
  > span {
    padding: 0 0 16px 0;
    margin: 0 0 24px 0;
    color: #999591;
    font-size: 20px;
    border-bottom: 1px solid #3e3b47;
    display: block;
  }

  >p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;
  
  &+div {
    margin-top: 16px;
  }

  span {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #F4EDE8;
    width: 85px;

    svg {
      margin-right: 10px;
    }
  }

  div {
    display: flex;
    align-items: center;

    background: #3e3b47;
    border-radius: 10px;
    border: none;
    padding: 16px 24px;
    margin-left: 16px;
    flex: 1;

    img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    }

    h4 {
      margin-left: 16px;
      font-size: 20px;
    }
  }

`;

export const Calendar = styled.div`
  width: 380px;
  height: 380px;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
