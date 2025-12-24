import React from 'react';

import Header from '@/components/Header';
import useThemeColors from '@/contexts/ThemeColors';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedFooter from '@/components/ThemeFooter';


const EmptyScreen = () => {
    const colors = useThemeColors();

    return (
        <>
            <Header
                title="En construcción"
                showBackButton
            />
            <ThemedScroller
                className="flex-1 pt-8"
                keyboardShouldPersistTaps="handled"
            >
                <ThemedText className="text-center text-lg text-light-subtext dark:text-dark-subtext">
                    Esta pantalla se habilitará pronto para nuevas funciones de salud.
                </ThemedText>
            </ThemedScroller>
            <ThemedFooter>
                <></>
            </ThemedFooter>
        </>
    );
};

export default EmptyScreen;
