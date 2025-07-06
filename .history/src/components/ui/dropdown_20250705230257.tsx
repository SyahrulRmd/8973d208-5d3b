import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
const Dropdown = () => {

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <ListboxButton>{selectedPerson.name}</ListboxButton>
      <ListboxOptions anchor="bottom">
        {people.map((person) => (
          <ListboxOption key={person.id} value={person} className="data-focus:bg-blue-100">
            {person.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

export default Dropdown;
