import { ButtonGroup, Icon, IconButton, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { FieldValues, Path, PathValue, UnpackNestedValue } from 'react-hook-form';
import { IconType } from 'react-icons/lib';

type StarsInputProps<T extends FieldValues = FieldValues> = {
    icon: IconType;
    max: number;
    label: string;
    value: UnpackNestedValue<PathValue<T, Path<T>>>;
    onChange: (...event: unknown[]) => void;
};

export function StarsInput<T extends FieldValues = FieldValues>({
    icon,
    max,
    label,
    value,
    onChange
}: StarsInputProps<T>): JSX.Element {
    const [activeHover, setActiveHover] = useState(0);

    const activeColor = useColorModeValue('gray.700', 'gray.100');
    const disabledColor = useColorModeValue('gray.300', 'gray.500');

    return (
        <ButtonGroup spacing={2} variant="unstyled" colorScheme="green">
            {[...Array(max).keys()]
                .map((i) => i + 1)
                .map((i) => (
                    <IconButton
                        aria-label={`${i} ${label}`}
                        key={i}
                        icon={<Icon as={icon} boxSize="20px" />}
                        onClick={() => onChange(i)}
                        onPointerEnter={() => setActiveHover(i)}
                        onPointerLeave={() => setActiveHover(0)}
                        color={i <= value || i <= activeHover ? activeColor : disabledColor}
                        opacity={i > value && i <= activeHover ? 0.75 : 1}
                        transition="0.1s"
                    />
                ))}
        </ButtonGroup>
    );
}
