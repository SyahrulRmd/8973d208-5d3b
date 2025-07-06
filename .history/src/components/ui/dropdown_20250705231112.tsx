import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

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
      <ListboxButton className={'relative block w-auto rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm border border-gray-500'}>
        {selected}
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions anchor="bottom" className={'w-(--button-width) rounded-xl border border-gray-500 bg-white p-1 [--anchor-gap:--spacing(1)] focus:outline-none'}>
        {options.map((option) => (
          <ListboxOption key={option.value} value={option.value} className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10">
            {option.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

export default Dropdown;
