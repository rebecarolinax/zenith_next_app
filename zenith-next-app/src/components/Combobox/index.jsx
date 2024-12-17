"use client"
// Indica que este componente é um componente do lado do cliente em um aplicativo Next.js (React Server Components).

import * as React from "react"
// Importa o React para criar componentes e gerenciar estados.

import { Check, ChevronsUpDown } from "lucide-react"
// Importa ícones da biblioteca `lucide-react`, que são usados no componente.

import { cn } from "@/lib/utils"
// Importa uma função utilitária (`cn`) para combinar classes CSS condicionalmente.

import { Button } from "@/components/ui/button"
// Importa o componente de botão personalizado.

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
// Importa componentes relacionados à interface de comando (para listas, entradas e itens).

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BlackTitle, SmallTitle, SubTitle } from "../Text"
// Importa os componentes de popover para criar a interação de abrir/fechar.

// const frameworks = [
//   {
//     value: "desenvolvedor",
//     label: "Desenvolvedor",
//   },
//   {
//     value: "gerente",
//     label: "Gerente",
//   },
//   {
//     value: "Menager",
//     label: "Menager",
//   },
// ]
// Define uma lista de frameworks com seus valores (`value`) e rótulos (`label`) para serem usados no combobox.

export function ComboboxDemo({ onFilterChange = null, opcoesInput, style }) {
  const frameworks = opcoesInput;

  // Exporta o componente `ComboboxDemo`, tornando-o utilizável em outras partes do projeto.

  const [open, setOpen] = React.useState(false)
  // Declara um estado `open` para controlar se o popover (menu suspenso) está aberto ou fechado.

  const [value, setValue] = React.useState("")
  // Declara um estado `value` para armazenar o valor selecionado no combobox.

  React.useEffect(() => {
    if (onFilterChange) {
      onFilterChange(value)
    }
  }, [value])

  return opcoesInput.length > 0 ? (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Renderiza o componente `Popover` e controla seu estado com `open` e `setOpen`. */}

      <PopoverTrigger asChild>
        {/* Define o botão como o gatilho que abre ou fecha o popover. */}

        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[100px] lg:w-[200px] justify-between border-blue-700 rounded-[10px] bg-white ml-16 lg:ml-0  ${style}`}
        >
          {/* Renderiza o botão estilizado com Tailwind CSS. */}

          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Todos"}
          {/* Mostra o nome do framework selecionado ou o texto padrão "Select framework...". */}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          {/* Adiciona o ícone de seta dupla ao lado do texto do botão. */}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0 bg-white rounded-[10px] border-[#2D60FF] border">
        {/* Renderiza o conteúdo do popover, com largura e padding definidas. */}

        <Command >
          {/* Componente que representa uma lista de comandos interativa. */}

          <CommandInput placeholder="Pesquisar cargo..." />
          {/* Campo de entrada para filtrar os itens da lista de frameworks. */}

          <CommandList>
            {/* Lista que contém os itens disponíveis no combobox. */}

            <CommandEmpty>Nenhum cargo encontrado.</CommandEmpty>
            {/* Texto exibido caso nenhum item corresponda à pesquisa. */}

            <CommandGroup>
              {/* Agrupa os itens da lista. */}
              {/* Mapeia cada framework para renderizar um item na lista. */}
              {frameworks.map((framework) => (
                <CommandItem
                  className="cursor-pointer hover:bg-blue-500 hover:text-white"
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    // Atualiza o estado `value` com o valor selecionado ou limpa caso seja o mesmo.

                    setOpen(false)
                    // Fecha o popover após a seleção.
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {/* Mostra um ícone de check ao lado do item selecionado. A opacidade muda dinamicamente. */}

                  {framework.label}
                  {/* Exibe o rótulo do framework. */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  ) : null
}

