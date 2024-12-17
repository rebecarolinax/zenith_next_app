"use client";
import Image from "next/image";
import { DefaultParagraph } from "../Text";
import { Button } from "../Button";
import { useEffect, useState } from "react";
import { api, sendVerifyCodeRoute } from "@/Services/Service";
import { useRouter, useSearchParams } from "next/navigation";
import { DigitsInput } from "../Input/digitsInput";
import { ClipLoader } from "react-spinners";

export const CheckYourEmailForm = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const [span, setSpan] = useState(""); // Mensagem de erro
  const [verifyCode, setVerifyCode] = useState(["", "", "", ""]); // Código de verificação
  const [isLoading, setIsLoading] = useState(false); // Estado do loader
  const [email, setEmail] = useState(""); // Inicializando como vazio

  // Função para enviar o código de verificação
  async function sendVerifyCode(e) {
    e.preventDefault();

    // Verificar se todos os campos estão preenchidos
    if (verifyCode.some((value) => !value)) {
      setSpan("Por favor, preencha todos os campos.");
      setTimeout(() => setSpan(""), 5000);
      return;
    }

    const inputCode = verifyCode.join(""); // Combina os dígitos em uma string
    console.log("Código enviado:", inputCode); // Log do código inserido
    console.log("Email enviado:", email); // Log do email inserido

    setIsLoading(true);

    try {
      // Envia o código para validação no backend
      const response = await api.post(sendVerifyCodeRoute, {
        email: email,
        codigo: inputCode,
      });

      console.log("Resposta da API:", response.data); // Log da resposta da API

      // Redireciona para a próxima página em caso de sucesso
      navigate.push(`/resetPassword?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Erro na validação:", error.response || error.message); // Log detalhado do erro
      setSpan(
        error.response?.data?.message || "Código inválido. Por favor, tente novamente."
      );
      setIsLoading(false);
    }
  }

  // Efeito para capturar o email da query string quando o componente for montado
  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) {
      setEmail(emailFromParams); // Atualiza o estado do email com o valor da query
    }
  }, [searchParams]); // Esse efeito será executado quando searchParams mudar

  return (
    <div className="w-[80%] flex flex-col items-center justify-center relative h-[80%] lg:w-[50%] bg-[#fbfbfb] gap-7">
      <Image src={zenithLogoXL} width={200} height={200} alt="Zenith Logo" />

      <div className="flex flex-col w-[80%] gap-[50px] ">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <DefaultParagraph classname="text-center">
            Digite o código de 4 dígitos enviado para <br />
            <span className="font-semibold">{email}</span>
          </DefaultParagraph>
        </div>

        <form
          onSubmit={(e) => sendVerifyCode(e)}
          className="w-[100%] flex flex-col items-center justify-center"
        >
          <DigitsInput valuesInput={verifyCode} setValuesInput={setVerifyCode} />

          <ClipLoader loading={isLoading} color={"#2D60FF"} className="" />

          <span className="text-[15px] mt-7 text-[#E00004]">{span}</span>

          <Button
            className={
              "lg:w-[418px] w-[300px] h-[56px] text-[20px] font-medium sm:mt-6 max-w-[100%] bg-[#2D60FF] text-white rounded-[8px] shadow-lg hover:bg-[#1a47b7] transition duration-200 hover:scale-105"
            }
            textbutton={"Próximo"}
            onClick={sendVerifyCode}
          />
        </form>
      </div>
    </div>
  );
};
