import { Divider, VStack } from 'native-base';
import React from 'react';
import { DarkModeButton } from '../common/DarkModeButton';
import { DarkModeSwitch } from '../common/DarkModeSwitch';
import { SettingsRow } from './SettingsRow';

export const Settings: React.VFC = () => {
    return (
        <VStack space={4} divider={<Divider />} w="full">
            <SettingsRow label="Dark Mode" description="Toggle between light and dark mode">
                <DarkModeSwitch />
            </SettingsRow>
        </VStack>
    );
};
