"use client";
import Image from "next/image";
// import zenithLogoXL from "../../../public/assets/Icons/zenithLogoXL.svg";
import zenithLogoXL from "../../assets/Icons/ZenithLogoXL.svg";
import { BlackTitle, DefaultPagagraph, DefaultParagraph } from "../Text";
import { BlueInput } from "../Input";
import { AuthenticationButton, Button } from "../Button";
import { CheckBox } from "../CheckBox/Index";
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api, loginRoute, sendEmailRoute } from "@/Services/Service";
import { userDecodeToken, UserContext } from "@/context/AuthContext";
import { Provider } from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

export const RecoverPasswordForm = () => {
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [span, setSpan] = useState("");
  const [isLoading, setIsLoading] = useState(false); //state para a manipulação do estado do componente de spinner

  async function sendEmailRecover(e) {
    e.preventDefault();

    if (!email) {
      setSpan("Por favor, preencha todos os campos.");
      setTimeout(() => setSpan(""), 5000);
      return;
    }

    setIsLoading(true);

    await api
      .post(sendEmailRoute, {
        email: email,
      })
      .then(() =>
        navigate.push(`/checkYourEmail?email=${encodeURIComponent(email)}`)
      )
      .catch(() =>
        setTimeout(() => {
          setSpan("Email inválido, tente novamente!");

          setIsLoading(false);
        }, 5000)
      );
  }

  return (
    <div className="w-[80%] flex flex-col items-center justify-center relative h-[80%] lg:w-[50%] bg-[#fbfbfb] gap-7">
      <Image src={zenithLogoXL} width={200} height={200} />

      <div className="flex flex-col w-[70%] gap-[50px] ">
        <div className="flex flex-col items-center justify-center text-center gap-5">
          <DefaultParagraph classname={""}>
            Insira seu e-mail registrado abaixo e nós lhe enviaremos um link
            para recuperar sua senha.
          </DefaultParagraph>
        </div>

        <form
          onSubmit={(event) => sendEmailRecover(event)}
          className="w-[100%] flex flex-col items-center justify-center"
        >
          <BlueInput
            onChange={(e) => setEmail(e.target.value)}
            type={"email"}
            classname=" mb-4 w-[100%] lg:mb-0"
            value={email.trim()}
            label={"Endereço de E-mail"}
          />

          <ClipLoader loading={isLoading} color={"#2D60FF"} className="" />

          <span className="text-[15px] text-[#E00004] lg:mt-4">{span}</span>

          <Button
            className={
              "lg:w-[418px] w-[400px] h-[56px] text-[20px] font-medium sm:mt-6 max-w-[100%] bg-[#2D60FF] text-white rounded-[12px] shadow-lg hover:bg-[#1a47b7] transition duration-200 hover:scale-105"
            }
            textbutton={"Próximo"}
            onClick={sendEmailRecover}
          />
        </form>
      </div>
    </div>
  );
};
