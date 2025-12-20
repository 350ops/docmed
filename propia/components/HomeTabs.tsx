import { View, Animated, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import ThemedText from './ThemedText';
import { router, usePathname } from 'expo-router';
import Icon, { IconName } from './Icon';

const HomeTabs = (props: any) => {
    // Get current path to determine active tab
    const currentPath = usePathname();
    const tabs = [
        { href: '/', label: 'Especialistas', icon: 'Stethoscope' as IconName },
        { href: '/experience', label: 'Salud mental', icon: 'Brain' as IconName },
        { href: '/services', label: 'Bienestar', icon: 'HeartPulse' as IconName },
    ];

    return (
        <View 
        style={{ shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, shadowOffset: { width: 0, height: 4 } }}
        className='w-full flex-row justify-center  bg-light-primary dark:bg-dark-primary border-b border-gray-200 dark:border-dark-secondary'>
            {tabs.map((tab) => (
                <TabItem
                    key={tab.href}
                    href={tab.href}
                    active={currentPath === tab.href}
                    label={tab.label}
                    icon={tab.icon}
                    scrollY={props.scrollY}
                />
            ))}
        </View>
    )
}

const TabItem = (props: any) => {
    // Track if we're in expanded or collapsed state
    const [isExpanded, setIsExpanded] = useState(true);
    const expandedSize = 44;
    const collapsedSize = 32;
    // Animated value for size only
    const animatedSize = useRef(new Animated.Value(expandedSize)).current;
    
    // Listen for scroll position changes
    useEffect(() => {
        const listenerId = props.scrollY.addListener(({ value }: { value: number }) => {
            // Only trigger animation when crossing the threshold
            if (value > 20 && isExpanded) {
                setIsExpanded(false);
                
                // Size animation only
                Animated.timing(animatedSize, {
                    toValue: collapsedSize,
                    duration: 200,
                    useNativeDriver: false
                }).start();
            } 
            else if (value <= 10 && !isExpanded) {
                setIsExpanded(true);
                
                // Size animation only
                Animated.timing(animatedSize, {
                    toValue: 45,
                    duration: 200,
                    useNativeDriver: false
                }).start();
            }
        });
        
        // Clean up listener
        return () => props.scrollY.removeListener(listenerId);
    }, [props.scrollY, animatedSize, isExpanded]);

    return (
            <TouchableOpacity onPress={() => router.push(props.href)} activeOpacity={0.5} className={`items-center pb-2 mx-8 border-b-2 ${props.active ? 'border-black dark:border-white' : 'border-transparent'}`}>
                <Animated.View
                    style={{
                        width: animatedSize,
                        height: animatedSize,
                        overflow: 'hidden',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View className="items-center justify-center rounded-full bg-light-secondary dark:bg-dark-secondary w-10 h-10">
                        <Icon name={props.icon as IconName} size={22} className="text-teal-600" />
                    </View>
                </Animated.View>
                <ThemedText className={`text-xs mt-2 ${props.active ? 'font-bold' : 'font-normal text-gray-500 dark:text-gray-400'}`}>{props.label}</ThemedText>
            </TouchableOpacity>
    )
}

export default HomeTabs;
