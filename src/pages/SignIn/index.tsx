import React, { useRef, useCallback } from "react";
import { MainContainer, Content, Background, AnimationContainer } from "./style";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

import { useAuth } from "../../hooks/Auth";
import { useToast } from "../../hooks/Toast";
import getValidationErrors from "../../utils/getValidationErrors";

import Button from "../../components/button";
import Input from "../../components/Input";

import logoImg from "../../assets/logo.svg";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn, user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail Obrigatório")
            .email("E-mail inválido"),
          password: Yup.string().required("Senha Obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/Dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: "Erro na autenticação",
          type: "error",
          description:
            "Ocorreu um erro ao fazer login, cheque suas credenciais",
        });
      }
    },
    [signIn, addToast]
  );

  return (
    <MainContainer>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu login</h1>
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
              />
              <Button type="submit">Entrar</Button>
            </Form>
          <Link to="/forgot-password">Esqueci minha senha</Link>
          <Link to="/SignUp">
          <FiLogIn size={20} />
          Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </MainContainer>
  );
};

export default SignIn;
