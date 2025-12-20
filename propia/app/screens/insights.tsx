import React from 'react';

import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import Section from '@/components/layout/Section';
import ThemedText from '@/components/ThemedText';
import { View } from 'react-native';
import { shadowPresets } from '@/utils/useShadow';
import Icon from '@/components/Icon';
import Grid from '@/components/layout/Grid';

const insights = [
    { icon: 'CalendarCheck', title: 'Citas atendidas', percentage: 80, amount: '40/50' },
    { icon: 'Video', title: 'Online', percentage: 65, amount: '26/40' },
    { icon: 'Building2', title: 'Presencial', percentage: 35, amount: '14/40' },
    { icon: 'BadgeCheck', title: 'Pacientes con seguro', percentage: 60, amount: '24/40' },
    { icon: 'Clock', title: 'Respuesta <5 min', percentage: 90, amount: '36/40' },
    { icon: 'Star', title: 'Valoración media', percentage: 98, amount: '4.9/5' },
    { icon: 'HeartPulse', title: 'Nuevos pacientes', percentage: 50, amount: '20/40' },
];

const InsightsScreen = () => {
    return (
        <>
            <Header
                title="Insights"
                showBackButton
            />
            <ThemedScroller className="flex-1" keyboardShouldPersistTaps="handled">
                <Section title="Tu rendimiento" titleSize='3xl' className='py-10' />
                <Grid columns={2} spacing={10}>
                    {insights.map((insight) => (
                        <InsightCard
                            key={insight.title}
                            icon={insight.icon}
                            title={insight.title}
                            percentage={insight.percentage}
                            amount={insight.amount}
                        />
                    ))}
                </Grid>
            </ThemedScroller>
        </>
    );
};

const InsightCard = (props: any) => {
    return (
        <View
            style={{ ...shadowPresets.large }}
            className='bg-light-primary dark:bg-dark-secondary rounded-3xl p-4'>
            <Icon name={props.icon} size={20} strokeWidth={2} color="white" className='bg-highlight w-12 h-12 rounded-full mb-16' />
            <ThemedText className='text-xl font-semibold mb-1'>{props.title}</ThemedText>
            <View className='flex-row items-center w-full'>
                <View className='h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 flex-1 mr-3' >
                    <View className='h-full bg-highlight rounded-full ' style={{ width: `${props.percentage}%` }} />
                </View>
                <ThemedText className='text-sm opacity-50'>{props.amount}</ThemedText>
            </View>
        </View>
    );
};

export default InsightsScreen;
