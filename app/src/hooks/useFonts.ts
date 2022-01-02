import * as Font from 'expo-font';
import {
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold,
    OpenSans_800ExtraBold_Italic
} from '@expo-google-fonts/open-sans';
import {
    WorkSans_100Thin,
    WorkSans_100Thin_Italic,
    WorkSans_200ExtraLight,
    WorkSans_200ExtraLight_Italic,
    WorkSans_300Light,
    WorkSans_300Light_Italic,
    WorkSans_400Regular,
    WorkSans_400Regular_Italic,
    WorkSans_500Medium,
    WorkSans_500Medium_Italic,
    WorkSans_600SemiBold,
    WorkSans_600SemiBold_Italic,
    WorkSans_700Bold,
    WorkSans_700Bold_Italic,
    WorkSans_800ExtraBold,
    WorkSans_800ExtraBold_Italic,
    WorkSans_900Black,
    WorkSans_900Black_Italic
} from '@expo-google-fonts/work-sans';
import { Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { useEffect, useState } from 'react';

export const useFonts = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const loadFonts = async () => {
        await Font.loadAsync({
            OpenSans_300Light,
            OpenSans_300Light_Italic,
            OpenSans_400Regular,
            OpenSans_400Regular_Italic,
            OpenSans_600SemiBold,
            OpenSans_600SemiBold_Italic,
            OpenSans_700Bold,
            OpenSans_700Bold_Italic,
            OpenSans_800ExtraBold,
            OpenSans_800ExtraBold_Italic,
            WorkSans_100Thin,
            WorkSans_100Thin_Italic,
            WorkSans_200ExtraLight,
            WorkSans_200ExtraLight_Italic,
            WorkSans_300Light,
            WorkSans_300Light_Italic,
            WorkSans_400Regular,
            WorkSans_400Regular_Italic,
            WorkSans_500Medium,
            WorkSans_500Medium_Italic,
            WorkSans_600SemiBold,
            WorkSans_600SemiBold_Italic,
            WorkSans_700Bold,
            WorkSans_700Bold_Italic,
            WorkSans_800ExtraBold,
            WorkSans_800ExtraBold_Italic,
            WorkSans_900Black,
            WorkSans_900Black_Italic,
            Montserrat_400Regular
        });
    };

    useEffect(() => {
        async function loadFontsAsync() {
            await loadFonts();
            setIsLoaded(true);
        }
        loadFontsAsync();
    }, []);

    return { isLoaded };
};
