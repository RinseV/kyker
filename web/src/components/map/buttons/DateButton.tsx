import { IconButton } from '@chakra-ui/button';
import React from 'react';
import { MdCalendarToday } from 'react-icons/md';

type DateButtonProps = {
    onClick: () => void;
};

export const DateButton: React.VFC<DateButtonProps> = ({ onClick }) => {
    return <IconButton aria-label="Pick a date" icon={<MdCalendarToday />} title="Pick a date" onClick={onClick} />;
};
