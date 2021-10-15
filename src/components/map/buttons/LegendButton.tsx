import { IconButton } from '@chakra-ui/button';
import { MdHelp } from 'react-icons/md';
import React from 'react';

type LegendButtonProps = {
    onClick: () => void;
};

export const LegendButton: React.VFC<LegendButtonProps> = ({ onClick }) => {
    return <IconButton aria-label="Show legend" icon={<MdHelp />} title="Show legend" onClick={onClick} />;
};
