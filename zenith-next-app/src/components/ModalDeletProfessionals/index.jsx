"use client";

import React from "react";
import { api } from "@/Services/Service";

export const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, idUsuario }) => {
  const DeletarUsuario = async () => {
    try {
      if (!idUsuario) {
        throw new Error("ID do usuário não encontrado");
      }

      const response = await api.delete(`/Usuario/Deletar/${idUsuario}`);

      if (response.status === 200) {
        if (onClose) onClose();
        if (onConfirm) onConfirm();
      } else {
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error.response?.data || error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Confirmar Exclusão</h2>
        <p className="text-gray-700 mb-6">
          Tem certeza de que deseja excluir este usuário? Essa ação não pode ser desfeita.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={DeletarUsuario} // Corrigido para passar a função como referência
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
