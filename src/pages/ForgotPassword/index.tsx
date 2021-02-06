import React, { useRef, useState, useCallback } from "react";
import { MainContainer, Content, Background, AnimationContainer } from "./style";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

import { useToast } from "../../hooks/Toast";
import getValidationErrors from "../../utils/getValidationErrors";

import Button from "../../components/button";
import Input from "../../components/input";

import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  //const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail Obrigatório")
            .email("E-mail inválido"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
        });

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: "Erro na recuperação de senha",
          type: "error",
          description:
            "Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente",
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  return (
    <MainContainer>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Recuperar senha</h1>
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Button loading={!!loading}type="submit">Recuperar</Button>
            </Form>
          <Link to="/">
          <FiLogIn size={20} />
          Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </MainContainer>
  );
};

export default ForgotPassword;
