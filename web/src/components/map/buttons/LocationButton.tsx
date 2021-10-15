import { IconButton } from '@chakra-ui/button';
import React from 'react';
import { MdMyLocation } from 'react-icons/md';

type LocationButtonProps = {
    onClick: () => void;
};

export const LocationButton: React.VFC<LocationButtonProps> = ({ onClick }) => {
    return <IconButton aria-label="My location" icon={<MdMyLocation />} title="My location" onClick={onClick} />;
};
