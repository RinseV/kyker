import { IconButton } from '@chakra-ui/button';
import React from 'react';
import { MdCalendarToday } from 'react-icons/md';
import { useAppSelector } from '../../../store/hooks';

type DateButtonProps = {
    onClick: () => void;
};

export const DateButton: React.VFC<DateButtonProps> = ({ onClick }) => {
    const online = useAppSelector((state) => state.online.online);

    return (
        <IconButton
            aria-label="Pick a date"
            icon={<MdCalendarToday />}
            title="Pick a date"
            onClick={onClick}
            // Disable button when offline since it won't work
            isDisabled={!online}
        />
    );
};
