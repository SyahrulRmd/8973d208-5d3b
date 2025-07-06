import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

interface DropdownProps<T> {
  options: {
    label: string;
    value: string;
  }[];
  selected: T;
  onChange: (value: T) => void;
  isMulti?: boolean;
}

const Dropdown = <T,>({ options, selected, onChange, isMulti = false }: DropdownProps<T>) => {
  console.log(selected);
  return (
    <Listbox value={selected} onChange={(value) => {
      console.log(value);
      onChange(value)
    }} multiple={isMulti}>
      <ListboxButton className={'relative block w-auto rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm border border-gray-500'}>
        {typeof selected === 'string' ? selected : Array.isArray(selected) ? selected?.join(', ') : ''}
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions anchor="bottom" className={'rounded-lg border border-gray-500 bg-white p-1 [--anchor-gap:--spacing(1)] focus:outline-none'}>
        {options.map((option) => (
          <ListboxOption key={option.value} value={option.value} className="group text-sm flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10">
            <CheckIcon className="invisible size-4 group-data-selected:visible" />
            {option.label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

export default Dropdown;
