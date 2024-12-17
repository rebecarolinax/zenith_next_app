"use client";
import Image from "next/image";
import zenithLogoXL from "../../assets/Icons/zenithLogoXL.svg";
import { BlackTitle, DefaultPagagraph, DefaultParagraph } from "../Text";
import { BlueInput } from "../Input";
import { AuthenticationButton, Button } from "../Button";
import { CheckBox } from "../CheckBox/Index";
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { api, loginRoute, updateUserPasswordRoute } from "@/Services/Service";
import { userDecodeToken, UserContext } from "@/context/AuthContext";
import { Provider } from "@radix-ui/react-tooltip";
import { useRouter, useSearchParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

export const ResetPasswordForm = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isVisible, setIsVisible] = useState(false); //state para manipulação do input de senha
  const [span, setSpan] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); //state para a manipulação do estado do componente de spinner
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  async function resetPassword(e) {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setSpan("Senhas não se coincidem !");
      setTimeout(() => setSpan(""), 5000);
      return;
    }

    if (!newPassword || !confirmNewPassword) {
      setSpan("Preencha todos os campos !");
      setTimeout(() => setSpan(""), 5000);
      return;
    }

    if (newPassword.length < 8 && confirmNewPassword.length < 8) {
      setSpan("A senha deve ter oito ou mais caractéres !");
      setTimeout(() => setSpan(""), 5000);
    }

    setIsLoading(true);

    await api
      .put(updateUserPasswordRoute, {
        email: email,
        senha: newPassword,
      })
      .then(() => navigate.push("/"))
      .catch((error) => {
        console.log(error)
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) {
      setEmail(emailFromParams); // Atualiza o estado do email com o valor da query
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center relative h-[100%] w-[50%] mt-16">
      <Image src={zenithLogoXL} width={200} height={200} className="absolute top-32" />

      <div className="flex flex-col w-[80%] gap-[50px] ">
        <div className="flex flex-col items-center justify-center gap-5 text-center mt-16">
          <DefaultParagraph classname="">
            Insira e confirme a sua nova senha.
          </DefaultParagraph>
        </div>

        <form
          onSubmit={(e) => resetPassword(e)}
          className="w-[100%] flex flex-col items-center justify-center"
        >
          <BlueInput
            label={"New password"}
            type={`${isVisible ? "text" : "password"}`}
            classname="w-[100%]"
            value={newPassword.trim()}
            onChange={(e) => setNewPassword(e.target.value)}
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

          <BlueInput
            label={"Confirm new password"}
            type={"password"}
            classname="w-[100%]"
            value={confirmNewPassword.trim()}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          >
            {isVisibleConfirm ? (
              <FaEye
                onClick={() => setIsVisibleConfirm(false)}
                color="#2D60FF"
                className="w-5 h-5 cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setIsVisibleConfirm(true)}
                color="#2D60FF"
                className="w-5 h-5 cursor-pointer"
              />
            )}
          </BlueInput>

          <ClipLoader loading={isLoading} color={"#2D60FF"} className='' />

          <span className="text-[15px] text-[#E00004]">{span}</span>

          <Button
            className={
              "lg:w-[418px] w-[60vw] h-[56px] text-[20px] font-medium sm:mt-6 max-w-[100%] bg-[#2D60FF] text-white rounded-[8px] shadow-lg hover:bg-[#1a47b7] transition duration-200 hover:scale-105"
            }
            textbutton={"Resetar"}
            onClick={resetPassword}
          />
        </form>
      </div>
    </div>
  );
};
