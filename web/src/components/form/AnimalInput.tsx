import React, { useMemo } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useAnimalsQuery } from '../../generated/graphql';
import { SearchSelectInput } from './SearchSelectInput';

type AnimalInputProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    isDisabled?: boolean;
};

export function AnimalInput<T extends FieldValues = FieldValues>({
    name,
    control,
    label,
    isDisabled
}: AnimalInputProps<T>): JSX.Element {
    // Get animals from backend
    const { data } = useAnimalsQuery();

    const options = useMemo(() => {
        if (!data?.animals || data.animals.length === 0) {
            return [];
        }

        // Filter out disabled animals since we can't create spottings for them
        return data.animals
            .filter((animal) => !animal.disabled)
            .map((animal) => ({
                value: animal.id,
                label: animal.name
            }));
    }, [data]);

    return (
        <SearchSelectInput<T>
            name={name}
            control={control}
            isDisabled={isDisabled}
            options={options}
            label={label}
            rules={{ required: 'Animal is required' }}
        />
    );
}
