import React, {useCallback, useRef} from 'react';
import {FiArrowLeft, FiMail,FiLock, FiUser} from 'react-icons/fi';

import { FormHandles} from '@unform/core';
import {Form} from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';
import {useToast} from '../../hooks/Toast';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/button';
import Input from '../../components/input';

import {MainContainer, Content, Background, AnimationContainer} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {addToast} = useToast();
  const history = useHistory();


  

  const handleSubmit = useCallback( async(data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatório'),
        email: Yup.string().required('E-mail Obrigatório').email('Digite um E-mail Obrigatório'),
        password: Yup.string().required().min(6, 'Mínimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await api.post('/users', data);

      history.push('/');

      addToast({
        description: 'Você já pode fazer seu login',
        title: 'Cadastro realizado!',
        type: 'success'
      });
    }
      catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: "Erro no cadastro",
          type: "error",
          description:
            "Ocorreu um erro ao fazer o cadastro, tente novamente",
        });
      }
  }, [addToast, history]);

  return (
    <MainContainer>
      <Background/>
      <Content>
        <AnimationContainer>
        <img src={logoImg}alt=""/>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome"/>
            <Input name="email" icon={FiMail} placeholder="E-mail"/>
            <Input name="password" type="password" icon={FiLock} placeholder="Senha"/>
            <Button type="submit">Cadastrar</Button>
          </Form>
        <Link
        to="/">
        <FiArrowLeft size={20}/>
        Voltar para o login</Link>
        </AnimationContainer>
      </Content>
     
      
    </MainContainer>
  )
}

export default SignUp;