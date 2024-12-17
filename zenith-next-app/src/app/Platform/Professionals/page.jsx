"use client";

import React, { useEffect, useState } from 'react';
import { BlueInput, Input } from '@/components/Input';
import { BlueParagraph, DefaultPagagraph, SubTitle, Title } from '@/components/Text';
import { Header } from '@/components/Header';
import { CollaboratorCard } from '@/components/CollaboratorCard';
import { List } from '@/components/List';
import { api, getAllPositions } from '@/Services/Service';
import { Select } from '@/components/ui/select';
import { SelectBlue } from '@/components/Select';
import { ComboboxDemo } from '@/components/Combobox';
import { FormAddUser } from '@/components/FormAddUser';
import { ButtonUser } from '@/components/Button';
import ClipLoader from "react-spinners/ClipLoader";  // Loader importado
import { BounceLoader } from 'react-spinners';

export default function Collborator() {
  const [inputValue, setInputValue] = useState('');
  const [inputLogin, setInputLogin] = useState('');
  const [colaboradores, setColaboradores] = useState([]);
  const [listaDeCargos, setListaDeCargos] = useState([]);
  const [listaExibicaoNaTela, setListaExibicaoNaTela] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Controla o estado de carregamento

  const FiltrarPorcargoUsuario = (cargo) => {
    setListaExibicaoNaTela(cargo === "Todos" ? colaboradores : colaboradores.filter((colaborador) => colaborador.cargo === cargo));
  };

  const [cargo, setCargo] = useState("");
  const [opcoesCargo, setOpcoesCargo] = useState([]);

  const BuscarCargosUsuario = async () => {
    try {
      const listaDeCargos = await api.get(getAllPositions);
      const arrayAux = [{ value: "Todos", label: "Todos" }];
      listaDeCargos.data.map(cargo => {
        arrayAux.push({
          value: cargo.cargo,
          label: cargo.cargo
        });
      });
      setListaDeCargos(arrayAux);
    } catch (erro) {
      console.log(erro);
    }
  };

  const BuscarTodosCargos = async () => {
    await api
      .get(getAllPositions)
      .then((response) => setOpcoesCargo(response.data))
      .catch((erro) => console.log(erro));
  };

  const ListColaboradores = async () => {
    try {
      const response = await api.get(`/Usuario/ListarTodosOsUsuarios`);
      setColaboradores(response.data);
      setListaExibicaoNaTela(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  useEffect(() => {
    ListColaboradores();
    BuscarCargosUsuario();
  }, []); // Removi o console.log para simplificação

  useEffect(() => {
    BuscarTodosCargos();
  }, []);

  return (
    <>
      <div className="mt-16 fixed h-96 flex flex-col min-h-screen bg-[##e5e7eb] overscroll-none">
        <FormAddUser />
        <ButtonUser />

        <div className='ml-64 flex justify-evelyn lg:ml-[310px]'>
          <ComboboxDemo
            opcoesInput={listaDeCargos}
            onFilterChange={FiltrarPorcargoUsuario}
          />
        </div>

        {/* Loader para a lista de colaboradores */}
        {isLoading ? (
          <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
            <BounceLoader color="#2D60FF" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 ml-[248.5px] lg:ml-8">
            <List prop={listaExibicaoNaTela} />
          </div>
        )}
      </div>
    </>
  );
}
