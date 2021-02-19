import React, { ChangeEvent, useCallback, useRef } from "react";
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Container, Header, ProfileContent, AvatarProfile } from "./style";
import { Link, useHistory } from "react-router-dom";

import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import Input from "../../components/Input";
import Button from "../../components/button";

import api from "../../services/api";

import { useAuth } from "../../hooks/Auth";
import { useToast } from "../../hooks/Toast";

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome Obrigatório"),
          email: Yup.string()
            .required("E-mail Obrigatório")
            .email("Digite um E-mail Obrigatório"),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required("Campo obrigatório"),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when("old_password", {
              is: (val) => !!val.length,
              then: Yup.string().required("Campo obrigatório"),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref("password"), undefined],
              "A Confirmação de senha está incorreta"
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {name, email, old_password, password, password_confirmation} = data;

        if(!old_password && password && password_confirmation) {
          throw new Error();
        }

        const formData = Object.assign({
          name,
          email
        }, old_password ? {
          old_password,
          password,
          password_confirmation
        } : {});

        const response = await api.put('/profile', formData);
        updateUser(response.data);

        history.push('/Dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description: 'Suas informações foram atualizadas com sucesso.',
        });

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro na atulização",
          description: "Ocorreu um erro ao fazer a atualização, tente novamente.",
        });
      }
    },
    [addToast, history, updateUser]
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append("avatar", e.target.files[0]);

        api.patch("/users/avatar", data).then((response) => {
          updateUser(response.data);

          addToast({
            type: "success",
            title: "Avatar atualizado!",
          });
        });
      }
    },
    [addToast, updateUser]
  );

  return (
    <Container>
      <Header>
        <div>
          <Link to="/Dashboard">
            <FiArrowLeft size={30} />
          </Link>
        </div>
      </Header>
      <ProfileContent>
        <Form
          onSubmit={handleSubmit}
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <AvatarProfile>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera size={20} />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarProfile>
          <h3>Meu perfil</h3>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <br />
          <Input
            name="old_password"
            type="password"
            icon={FiLock}
            placeholder="Senha Atual"
          />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Nova senha"
          />
          <Input
            name="password_confirmation"
            type="password"
            icon={FiLock}
            placeholder="confirmar senha"
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </ProfileContent>
    </Container>
  );
};

export default Profile;
