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
      id: 0,
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
            aria-label="Assignee"
            displayValue={(person) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxOptions anchor="bottom" className="border empty:invisible">
            {filteredPeople.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}
                className="data-[focus]:bg-blue-100"
              >
                {person.name}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
      )}
    />
  );
};
