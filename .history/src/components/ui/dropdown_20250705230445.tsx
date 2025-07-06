import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

interface DropdownProps {
  options: {
    label: string;
    value: string;
  }[];
  selected: string;
  onChange: (value: string) => void;
}

const Dropdown = ({ options, selected, onChange }: DropdownProps) => {
  return (
    <Listbox value={selected} onChange={onChange}>
      <ListboxButton>{selected}</ListboxButton>
      <ListboxOptions anchor="bottom">
        {options.map((option) => (
          <ListboxOption key={option.value} value={option.value} className="data-focus:bg-blue-100">
            {option.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

export default Dropdown;
