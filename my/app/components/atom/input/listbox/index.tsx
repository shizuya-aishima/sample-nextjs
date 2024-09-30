'use client';

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

type ComboboxItem = { id: string; name: string };

type CustomComboboxProps = {
  value: string;
  data: ComboboxItem[];
};

export const CustomCombobox = ({ data, value }: CustomComboboxProps) => {
  const initialValue = { id: '', name: '' };
  const [extendedData] = React.useState([initialValue, ...data]);

  const [query, setQuery] = React.useState('');
  const { control, watch } = useForm<ComboboxItem>({
    defaultValues: { ...initialValue, id: value },
  });

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type),
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const filteredExtendedData =
    query === ''
      ? extendedData
      : extendedData.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const find = (id: string) => extendedData.find((e) => e.id === id);

  return (
    <Controller
      name="id"
      control={control}
      // defaultValue={people[0].id}
      rules={{ validate: (value) => value !== extendedData[0].id }}
      render={({ field }) => (
        <Combobox<ComboboxItem>
          value={find(field.value)}
          onChange={(e) => field.onChange(e?.id || '')}
          onClose={() => setQuery('')}
        >
          <ComboboxInput<ComboboxItem>
            aria-label="Assignee"
            displayValue={(person) => person.name}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full appearance-none rounded border-2 border-gray-300 bg-white py-1.5 pl-3 pr-8 text-sm/6 text-gray-700 focus:border-indigo-500 focus:outline-none"
          />
          <ComboboxOptions
            anchor="bottom"
            className="w-[var(--input-width)] rounded-xl border bg-white p-1 transition duration-100 ease-in [--anchor-gap:var(--spacing-1)] empty:invisible data-[leave]:data-[closed]:opacity-0"
          >
            {filteredExtendedData.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}
                className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
              >
                {({ focus, selected }) => (
                  <div
                    className={clsx(
                      'group flex gap-2',
                      'text-sm/6 text-gray-700',
                      focus && 'bg-indigo-500 text-white',
                    )}
                  >
                    {selected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    )}
                    {person.name}
                  </div>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
      )}
    />
  );
};
