import React, { useMemo } from 'react';
import { Control } from 'react-hook-form';
import { SearchSelectInput } from './SearchSelectInput';

type AnimalInputProps = {
    name: string;
    control: Control<any>;
    label?: string;
    isDisabled?: boolean;
};

export const AnimalInput: React.VFC<AnimalInputProps> = ({ name, control, label, isDisabled }) => {
    const options = useMemo(() => {
        return [
            {
                label: 'Dog',
                value: 1
            },
            {
                label: 'Cat',
                value: 2
            },
            {
                label: 'Bird',
                value: 3
            },
            {
                label: 'Fish',
                value: 4
            },
            {
                label: 'Rabbit',
                value: 5
            },
            {
                label: 'Snake',
                value: 6
            },
            {
                label: 'Other',
                value: 7
            }
        ];
    }, []);

    return (
        <SearchSelectInput
            name={name}
            control={control}
            isDisabled={isDisabled}
            options={options}
            label={label}
            rules={{ required: 'Animal is required' }}
        />
    );
};
