import React, { useState } from "react";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable'

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

export const InputSelectSkills = ({ values, setValues }) => {

    const [options, setOptions] = useState([
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ]);

    const [inputValue, setInputValue] = useState(null)

    // Adiciona o item selecionado
    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            setValues((prev) => [...prev, selectedOption]);
            setOptions((prev) =>
                prev.filter((option) => option.value !== selectedOption.value)
            );
            setInputValue(null);
        }
    };

    // Adiciona novos itens à lista e remove de opções disponíveis
    const handleCreate = (inputValue) => {
        const isDuplicate =
            options.some((option) => option.value.toLowerCase() === inputValue.toLowerCase()) ||
            values.some((item) => item.value.toLowerCase() === inputValue.toLowerCase());

        if (isDuplicate) {
            return;
        }
        const newOption = { value: inputValue, label: inputValue };
        setValues((prev) => [...prev, newOption]);
        setInputValue(null);

    };

    // Remove o item selecionado ao clicar
    const handleRemoveItem = (item) => {
        setValues((prev) =>
            prev.filter((selected) => selected.value !== item.value)
        );
        setOptions((prev) => [...prev, item]);
    };

    return (
        <div className="space-y-1 w-[80%] ">
            {/* Renderiza os itens selecionados como cards */}
            <div
                className={`transition-all duration-300 ${values.length > 0 ? "h-auto max-h-24 overflow-y-auto" : "h-0"
                    }`}
            >
                <div className="flex flex-wrap gap-2 w-[100%] overflow-y-scroll scrollbar-custom h-[72px]">
                    {values.map((item) => (
                        <div
                            key={item.value}
                            className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-pointer h-7"
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
                className=""
                isClearable
                value={inputValue}
                options={options}
                onChange={handleSelectChange}
                onCreateOption={handleCreate}
                placeholder="Search or create..."
                onInputChange={(newValue) => setInputValue(newValue)}
                menuPlacement="top"
                maxMenuHeight={120}
            />
        </div>
    );
}