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
      <ListboxButton className={'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm border border-white/10'}>{selected}</ListboxButton>
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
