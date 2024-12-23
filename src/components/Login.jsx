"use client";

import { AbsoluteCenter, Button, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { PasswordInput } from "./ui/password-input";
import { useForm } from "react-hook-form";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router";
import { useState } from "react";

const Login = () => {
  let navigate = useNavigate();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    AuthService.login(data.email, data.password).then(
      () => {
        navigate("/");
        console.log(AuthService.getCurrentUser());
      },
      (error) => {
        console.log(error.response.data.message);
        setError("Error! " + error.response.data.message);
      }
    );
  });

  return (
    <AbsoluteCenter>
      <form onSubmit={onSubmit} style={{ width: "300x" }}>
        <img
          src="Logo.png"
          width="120px"
          style={{ margin: "auto", marginBottom: "24px" }}
        ></img>
        <Stack gap="4" align="flex-start" maxW="sm">
          <Field
            label="Email"
            invalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <Input
              type="email"
              {...register("email", { required: "Email is required!" })}
            />
          </Field>

          <Field
            label="Password"
            invalid={!!errors.password}
            errorText={errors.password?.message}
          >
            <PasswordInput
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 6,
                  message: "Minimum length is 6 characters!",
                },
              })}
            />
          </Field>

          <Button type="submit" size={"md"} w={"100%"}>
            Login
          </Button>
          <Text color={"red"}>{error}</Text>
        </Stack>
      </form>
    </AbsoluteCenter>
  );
};

export default Login;
