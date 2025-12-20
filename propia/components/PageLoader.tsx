import React from 'react';
import { View } from 'react-native';
import ThemedText from './ThemedText';
import useThemeColors from '@/app/contexts/ThemeColors';
import CatLauncher from './CatLauncher';

interface PageLoaderProps {
    text?: string;
}

export default function PageLoader({ text }: PageLoaderProps) {
    const colors = useThemeColors();

    return (
        <View className="flex-1 items-center justify-center bg-light-primary dark:bg-dark-primary">
            <View className="h-24 w-24 items-center justify-center">
                <CatLauncher launchType="loader" />
            </View>
            {text && (
                <ThemedText className="mt-8 text-light-subtext dark:text-dark-subtext font-medium">
                    {text}
                </ThemedText>
            )}
        </View>
    );
}