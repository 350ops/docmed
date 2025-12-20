import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withRepeat,
    withSequence,
    Easing,
    runOnJS
} from 'react-native-reanimated';
import Icon from './Icon';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface CatLauncherProps {
    onAnimationComplete?: () => void;
    launchType?: 'loader' | 'search';
}

export default function CatLauncher({ onAnimationComplete, launchType = 'loader' }: CatLauncherProps) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const rotation = useSharedValue(0);
    const scale = useSharedValue(launchType === 'loader' ? 1 : 0.5);
    const opacity = useSharedValue(1);

    useEffect(() => {
        if (launchType === 'loader') {
            // Loader animation: Floating/spinning cat
            rotation.value = withRepeat(
                withTiming(360, { duration: 2000, easing: Easing.linear }),
                -1,
                false
            );
            translateY.value = withRepeat(
                withSequence(
                    withTiming(-10, { duration: 1000, easing: Easing.bezier(0.42, 0, 0.58, 1) }),
                    withTiming(0, { duration: 1000, easing: Easing.bezier(0.42, 0, 0.58, 1) })
                ),
                -1,
                true
            );
        } else {
            // Search animation: Launching cat across screen
            translateX.value = -SCREEN_WIDTH / 2 - 50;
            translateY.value = 50;
            scale.value = 1.5;

            translateX.value = withTiming(SCREEN_WIDTH + 100, { duration: 1500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            translateY.value = withTiming(-100, { duration: 1500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            rotation.value = withTiming(720, { duration: 1500 });

            setTimeout(() => {
                if (onAnimationComplete) runOnJS(onAnimationComplete)();
            }, 1600);
        }
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { rotate: `${rotation.value}deg` },
                { scale: scale.value },
            ],
            opacity: opacity.value,
        };
    });

    return (
        <View style={styles.container} pointerEvents="none">
            <Animated.View style={animatedStyle}>
                <Icon name="Cat" size={launchType === 'loader' ? 48 : 64} color="#14b8a6" />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
});
