import React, { useRef, useCallback } from "react";
import { MainContainer, Content, Background, AnimationContainer } from "./style";
import { FiLock } from "react-icons/fi";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useHistory, useLocation } from "react-router-dom";
import api from '../../services/api';
import * as Yup from "yup";

import { useToast } from "../../hooks/Toast";
import getValidationErrors from "../../utils/getValidationErrors";

import Button from "../../components/button";
import Input from "../../components/input";

import logoImg from "../../assets/logo.svg";

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required("Senha Obrigatória"),
          password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'A Confirmação de senha está incorreta')
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {password, password_confirmation} = data;
        const token = location.search.replace('?token=', '');

        if(!token) {
          throw new Error();
        }

        await api.post('/password/reset', ({
          password,
          password_confirmation,
          token
        }));

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: "Error",
          type: "error",
          description:
            "Ocorreu um erro ao resetar sua senha, tente novamente",
        });
      }
    },
    [addToast, history, location.search]
  );

  return (
    <MainContainer>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Resetar Senha</h1>
              <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Nova Senha"
              />
              <Input
              name="password_confirmation"
              type="password"
              icon={FiLock}
              placeholder="Confirmação da senha"
              />
              <Button type="submit">Alterar senha</Button>
            </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </MainContainer>
  );
};

export default SignIn;
