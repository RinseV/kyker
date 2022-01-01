import { Checkbox } from '@chakra-ui/checkbox';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex } from '@chakra-ui/layout';
import { Td, Tr } from '@chakra-ui/table';
import React from 'react';
import { MdHome, MdSettingsInputAntenna } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { toggleHideCamps, toggleHideGates } from '../../../store/reducers/preference.slice';
import { BoomGate } from '../../icons/BoomGate';
import { HomeGroup } from '../../icons/HomeGroup';
import { PicnicTable } from '../../icons/PicnicTable';

export const CampsGatesRow: React.VFC = () => {
    const hiddenCamps = useAppSelector((state) => state.preferences.hideCamps);
    const hiddenGates = useAppSelector((state) => state.preferences.hideGates);

    const dispatch = useAppDispatch();

    const iconColor = useColorModeValue('#000', '#fff');

    return (
        <>
            <Tr>
                <Td>
                    <Flex alignItems="center">
                        <HomeGroup color={iconColor} size={20} />
                        {' / '}
                        <MdHome size={20} />
                        {' / '}
                        <MdSettingsInputAntenna size={20} />
                        {' / '}
                        <PicnicTable color={iconColor} size={20} />
                    </Flex>
                </Td>
                <Td>Camps</Td>
                <Td>
                    <Checkbox isChecked={!hiddenCamps} onChange={() => dispatch(toggleHideCamps())} />
                </Td>
            </Tr>
            <Tr>
                <Td>
                    <BoomGate color={iconColor} />
                </Td>
                <Td>Gates</Td>
                <Td>
                    <Checkbox isChecked={!hiddenGates} onChange={() => dispatch(toggleHideGates())} />
                </Td>
            </Tr>
        </>
    );
};
