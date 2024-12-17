"use client";
import Image from "next/image";
import zenithLogoXL from "../../assets/Icons/ZenithLogoXL.svg";
import { DefaultParagraph } from "../Text";
import { BlueInput } from "../Input";
import { CheckBox } from "../CheckBox/Index";
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api, loginRoute } from "@/Services/Service";
import { userDecodeToken, UserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { Button } from '../Button';

export const LoginForm = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useRouter();

  const [isVisible, setIsVisible] = useState(false); // Controla a visibilidade da senha
  const [span, setSpan] = useState(""); // Mensagem de erro
  const [isLoading, setIsLoading] = useState(false); // Loader de estado
  const { userData, setUserData } = useContext(UserContext); // Dados globais do usuário

  async function Login() {
    setIsLoading(true);

    if (!login.email || !login.password) {
      setSpan("Por favor, preencha todos os campos.");
      setTimeout(() => setSpan(""), 5000);
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await api.post(loginRoute, {
        email: login.email.trim(),
        senha: login.password.trim(),
      });

      const tokenData = await userDecodeToken(data.token);
      localStorage.setItem("usuario", JSON.stringify(tokenData));
      setUserData(tokenData);

      navigate.replace("/Platform/Home");
    } catch (error) {
      setSpan("E-mail ou senha inválidos.");
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (userData) {
      navigate.replace(
        `/Platform/${userData.cargo === "Administrador" ? "Dashboard" : "Home"}`
      );
    }
  }, [userData]);

  return (
    <div className="w-[80%] flex flex-col items-center justify-center h-[80%] lg:w-[50%] gap-7 bg-[#fbfbfb]border">
      <Image src={zenithLogoXL} width={200} height={200} alt="Zenith Logo" />

      <div className="flex flex-col items-center justify-center gap-5">
        <DefaultParagraph className="mt-4 w-[100%] lg:w-[80%] text-center ">
          Insira seu e-mail e sua senha para acessar o sistema.
        </DefaultParagraph>
      </div>

      <div
        className="w-[100%] flex flex-col items-center justify-center"
      >
        <BlueInput
          onChange={(e) =>
            setLogin({ ...login, email: e.target.value })
          }
          value={login.email}
          type={"email"}
          label={"Endereço de E-mail"}
          classname="w-[100%]"
          name={"email"}
        />

        <BlueInput
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          value={login.password}
          type={isVisible ? "text" : "password"}
          label="Senha"
          classname="w-[100%]"
          name="password"
        >
          {isVisible ? (
            <FaEye
              onClick={() => setIsVisible(false)}
              color="#2D60FF"
              className="w-5 h-5 cursor-pointer"
            />
          ) : (
            <FaEyeSlash
              onClick={() => setIsVisible(true)}
              color="#2D60FF"
              className="w-5 h-5 cursor-pointer"
            />
          )}
        </BlueInput>

        <div className="flex flex-row items-center justify-between w-full pb-[35px] lg:max-w-[515px]">
          <CheckBox classname="hidden" />
          <p
            onClick={() => navigate.push("/recoverPassword")}
            className=" mr-28 text-[#202224] opacity-[60%] underline cursor-pointer text-sm font-thin lg:mr-0"
          >
            Esqueceu a senha?
          </p>
        </div>

        <ClipLoader loading={isLoading} color={"#2D60FF"} className="" />

        <span className="text-[15px] text-[#E00004]">{span}</span>

        <Button
          onClick={Login}
          className="lg:w-[418px] w-[400px] h-[56px] text-[20px] font-medium sm:mt-6 max-w-[100%] bg-[#2D60FF] text-white rounded-[12px] shadow-lg hover:bg-[#1a47b7] transition duration-200 hover:scale-105"
          textbutton={"Conectar"}
        />
      </div>
    </div>
  );
};
