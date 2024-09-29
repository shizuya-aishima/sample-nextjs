'use client';

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];
export const Combo = () => {
  const [selectedPerson, setSelectedPerson] = React.useState(people[0]);
  const [query, setQuery] = React.useState('');
  const { control, watch } = useForm({
    defaultValues: {
      id: 1,
      name: '',
    },
  });

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type),
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const find = (id: number) => people.find((e) => e.id === id);

  return (
    <Controller
      name="id"
      control={control}
      defaultValue={people[0].id}
      rules={{ validate: (value) => value !== people[0].id }}
      render={({ field }) => (
        <Combobox<{
          id: number;
          name: string;
        }>
          value={find(field.value)}
          onChange={(e) => field.onChange(e?.id || '')}
          onClose={() => setQuery('')}
        >
          <ComboboxInput<{
            id: number;
            name: string;
          }>
            // defaultValue={find(field.value)}
            aria-label="Assignee"
            displayValue={(person) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full appearance-none rounded border-2 border-gray-300 bg-white py-1.5 pl-3 pr-8 text-sm/6 text-gray-700 focus:border-indigo-500 focus:outline-none"
          />
          <ComboboxOptions
            anchor="bottom"
            className="w-[var(--input-width)] rounded-xl border bg-white p-1 transition duration-100 ease-in [--anchor-gap:var(--spacing-1)] empty:invisible data-[leave]:data-[closed]:opacity-0"
          >
            {filteredPeople.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}
                className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
              >
                <div className="text-sm/6 text-gray-700">{person.name}</div>
                {/* {person.name} */}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
      )}
    />
  );
};
