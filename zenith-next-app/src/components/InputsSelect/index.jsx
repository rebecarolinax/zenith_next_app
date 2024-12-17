import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const InputSelect = ({ style, setValue, formStyle }) => {
  return (
    <form className={`w-full ${formStyle}`}>
      <label
        for="seniority"
        className="block text-sm font-medium text-[#232323] text-[16px] mb-2"
      >
        Senioridade
      </label>
      <select
        onChange={(e) => setValue(e.target.value)}
        id="seniority"
        className={`h-[50px] bg-white border border-[#2D60FF] rounded-[15px] p-2 focus:outline-none focus:focus-visible 
          focus:blue-400 text-[15px] mb-4 w-[100%] cursor-pointer ${style}`}
      >
        {/* <option selected>Seniority</option> */}
        <option className="cursor-pointer" value={1}>
          Júnior
        </option>
        <option className="cursor-pointer" value={2}>
          Pleno
        </option>
        <option className="cursor-pointer" value={3}>
          Sênior
        </option>
        <option className="cursor-pointer" value={4}>
          Gestor
        </option>
      </select>
    </form>
  );
};

export const SearchableSelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={setSelectedOption}
      placeholder="Select or create..."
      isSearchable
    />
  );
};

export const InputTypeSelectExterno = ({
  labelInput,
  allValues,
  selectedItems,
  setSelectedItems,
  className = "",
  labelStyle = "",
}) => {
  const [options, setOptions] = useState(allValues);
  const [inputValue, setInputValue] = useState(null);

  // Adiciona o item selecionado
  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedItems((prev) => [...prev, selectedOption]);
      setOptions((prev) =>
        prev.filter((option) => option.value !== selectedOption.value)
      );
      setInputValue(null);
    }
  };

  // Adiciona novos itens à lista e remove de opções disponíveis
  const handleCreate = (inputValue) => {
    const isDuplicate =
      options.some(
        (option) => option.value.toLowerCase() === inputValue.toLowerCase()
      ) ||
      selectedItems.some(
        (item) => item.value.toLowerCase() === inputValue.toLowerCase()
      );

    if (isDuplicate) {
      return;
    }
    const newOption = { value: inputValue, label: inputValue };
    setSelectedItems((prev) => [...prev, newOption]);
    setInputValue(null);
  };

  // Remove o item selecionado ao clicar
  const handleRemoveItem = (item) => {
    setSelectedItems((prev) =>
      prev.filter((selected) => selected.value !== item.value)
    );
    setOptions((prev) => [...prev, item]);
  };

  return (
    <div className="space-y-1 w-[83%] ">
      <label
        for="seniority"
        className={`block text-sm font-medium text-[#232323] text-[10px] mb-2 ${labelStyle}`}
      >
        {labelInput}
      </label>
      {/* Renderiza os itens selecionados como cards */}
      <div
        className={`transition-all duration-300 ${selectedItems.length > 0 ? "h-auto max-h-24 overflow-y-auto" : "h-0"
          }`}
      >
        <div className="flex flex-wrap gap-2 w-[100%] overflow-y-scroll scrollbar-custom h-[72px]  ">
          {selectedItems.map((item) => (
            <div
              key={item.value}
              className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full cursor-pointer h-7"
              onClick={() => handleRemoveItem(item)}
            >
              {item.label}
              <span className="ml-2 text-blue-500">x</span>
            </div>
          ))}
        </div>
      </div>
      {/* Input de seleção */}
      <CreatableSelect
        classNames={{
          container: (state) =>
            `h-[50px] bg-white border border-[#2D60FF] rounded-[15px] flex items-center`,
          control: (state) =>
            `min-h-0 !border-none !rounded-[15px] !w-full !outline-none !shadow-none`,
          valueContainer: (state) => `!w-full`,
          menu: (state) =>
            `bg-white border border-[#2D60FF] rounded-[25px] px-1`,
          menuList: (state) => "overflow-y-hidden px-2",
        }}
        isClearable
        value={inputValue}
        options={options}
        onChange={handleSelectChange}
        onCreateOption={handleCreate}
        placeholder="Pesquisar ou criar..."
        onInputChange={(newValue) => setInputValue(newValue)}
        menuPlacement="top"
        maxMenuHeight={120}
      />
    </div>
  );
};

export const InputTypeSelectInterno = ({
  labelInput,
  style,
  getValue,
  options,
  initialValue = "Selecionar posição...",
  edit = true,
  styleLabel
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    if (inputValue !== "") {
      getValue(inputValue);
    }
  }, [inputValue]);

  return (
    <div className={`w-full mb-4`}>
      <p className={`block text-sm font-medium text-[#202224] text-[16px] mb-3 ${styleLabel}`}>
        {labelInput}
      </p>
      <Popover open={edit ? open : false} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-[50px] bg-white border border-[#2D60FF] rounded-[15px] justify-between w-[100%] "
          >
            <p className="w-[90%] overflow-hidden">
              {inputValue !== ""
                ? inputValue
                : value
                  ? options.find((option) => option === value)
                  : initialValue}
            </p>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 ">
          <Command className="bg-white">
            <CommandInput
              placeholder="Pesquisar posição..."
              onValueChange={(value) => setInputValue(value)}
            />
            <CommandList>
              <CommandEmpty>No position found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    className="cursor-pointer hover:bg-blue-600 hover:text-white"
                    key={option}
                    value={option}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setInputValue(
                        options.find((option) => option === currentValue)
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
