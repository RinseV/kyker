import React, { useMemo } from 'react';
import { Control } from 'react-hook-form';
import { useAnimalsQuery } from '../../generated/graphql';
import { SearchSelectInput } from './SearchSelectInput';

type AnimalInputProps = {
    name: string;
    control: Control<any>;
    label?: string;
    isDisabled?: boolean;
};

export const AnimalInput: React.VFC<AnimalInputProps> = ({ name, control, label, isDisabled }) => {
    // Get animals from backend
    const { data } = useAnimalsQuery();

    const options = useMemo(() => {
        if (!data?.animals || data.animals.length === 0) {
            return [];
        }

        return data.animals.map((animal) => ({
            value: animal.id,
            label: animal.name
        }));
    }, [data]);

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
