import { Stack } from '@chakra-ui/layout';
import { LngLat } from 'mapbox-gl';
import { Control, FieldValues, Path } from 'react-hook-form';
import { FaBinoculars, FaCar } from 'react-icons/fa';
import { AnimalInput } from './AnimalInput';
import { DescriptionInput } from './DescriptionInput';
import { LocationInput } from './LocationInput';
import { RatingInput } from './RatingInput';
import { TimeInput } from './TimeInput';

type SpotInputProps<T extends FieldValues = FieldValues> = {
    animalName: Path<T>;
    descriptionName: Path<T>;
    coordinates: LngLat;
    visibilityName: Path<T>;
    trafficName: Path<T>;
    dateName: Path<T>;
    control: Control<T>;
    isSubmitting?: boolean;
};

export function SpotInput<T extends FieldValues = FieldValues>({
    animalName,
    descriptionName,
    coordinates,
    visibilityName,
    trafficName,
    dateName,
    control,
    isSubmitting
}: SpotInputProps<T>): JSX.Element {
    return (
        <form>
            <Stack spacing={4}>
                {/* Location input (disabled) */}
                <LocationInput coordinates={coordinates} isDisabled />

                {/* Animal search select */}
                <AnimalInput<T> name={animalName} control={control} label="Animal" isDisabled={isSubmitting} />

                {/* Time input */}
                <TimeInput<T> name={dateName} control={control} label="Time" isDisabled={isSubmitting} />

                {/* Visibility & traffic ratings */}
                <Stack
                    w="full"
                    spacing={2}
                    direction={{ base: 'column', sm: 'row' }}
                    justifyContent={{ base: undefined, sm: 'space-between' }}
                >
                    <RatingInput<T>
                        name={visibilityName}
                        control={control}
                        label="Visibility"
                        icon={FaBinoculars}
                        isDisabled={isSubmitting}
                        isRequired
                    />

                    <RatingInput<T>
                        name={trafficName}
                        control={control}
                        label="Traffic"
                        icon={FaCar}
                        isDisabled={isSubmitting}
                        isRequired
                    />
                </Stack>

                {/* Description */}
                <DescriptionInput<T>
                    name={descriptionName}
                    control={control}
                    label="Description"
                    placeholder="North-West side of the road in a tree"
                    isDisabled={isSubmitting}
                />
            </Stack>
        </form>
    );
}
