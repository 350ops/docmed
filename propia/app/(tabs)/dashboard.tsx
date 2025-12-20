import Header, { HeaderIcon } from '@/components/Header';
import ThemeScroller from '@/components/ThemeScroller';
import React from 'react';
import { View, Image, Pressable } from 'react-native';
import Icon from '@/components/Icon';
import Section from '@/components/layout/Section';
import AnimatedView from '@/components/AnimatedView';
import ThemedText from '@/components/ThemedText';
import { CardScroller } from '@/components/CardScroller';
import { Chip } from '@/components/Chip';
import { shadowPresets } from '@/utils/useShadow';
import { Button } from '@/components/Button';
import { router } from 'expo-router';

const upcomingAppointments = [
    {
        id: 'a1',
        patient: 'Laura Gómez',
        time: '10:00',
        mode: 'online',
        specialty: 'Psicología',
        insurance: 'Sanitas',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
        id: 'a2',
        patient: 'Javier Torres',
        time: '12:30',
        mode: 'presencial',
        specialty: 'Dermatología',
        insurance: 'Mapfre',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
    }
];

const alerts = [
    { id: 'n1', title: 'Nuevo mensaje', description: 'Sofía envió fotos para la revisión dermatológica', icon: 'MessageSquare' },
    { id: 'n2', title: 'Resultado disponible', description: 'Analítica de Miguel lista para revisar', icon: 'FlaskRound' },
    { id: 'n3', title: 'Pago procesado', description: 'Se confirmó el pago de la cita de Laura', icon: 'CreditCard' },
];

const metrics = [
    { label: 'Citas hoy', value: '6', icon: 'CalendarCheck', color: 'bg-teal-100 text-teal-700' },
    { label: 'Ingresos', value: '420€', icon: 'Euro', color: 'bg-coral-100 text-coral-700' },
    { label: 'NPS', value: '4.9', icon: 'Star', color: 'bg-amber-100 text-amber-700' },
];

const DashboardScreen = () => {
    const rightComponents = [
        <HeaderIcon key="notifications-icon" hasBadge icon="Bell" href="/screens/notifications" />
    ];

    return (
        <View className="flex-1 bg-light-primary dark:bg-dark-primary">
            <Header
                title="Panel"
                rightComponents={rightComponents}
            />

            <ThemeScroller
                scrollEventThrottle={16}
                className="px-global"
            >
                <AnimatedView animation="scaleIn" className='flex-1'>
                    <ThemedText className='text-3xl font-semibold pt-6 pb-4'>Hola, Dra. Martínez</ThemedText>

                    <CardScroller className='mt-1 mb-6' space={12}>
                        {metrics.map((metric) => (
                            <View key={metric.label} className="rounded-2xl p-4 bg-light-secondary dark:bg-dark-secondary min-w-[120px]">
                                <View className="w-10 h-10 rounded-full items-center justify-center mb-2 bg-white/70 dark:bg-dark-primary">
                                    <Icon name={metric.icon as any} size={18} className={metric.color} />
                                </View>
                                <ThemedText className="text-2xl font-bold">{metric.value}</ThemedText>
                                <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">{metric.label}</ThemedText>
                            </View>
                        ))}
                    </CardScroller>

                    <Section
                        titleSize='xl'
                        className='mb-2'
                        title="Próximas citas"
                        link="/screens/reservations"
                        linkText="Ver agenda"
                    >
                        {upcomingAppointments.map((appointment) => (
                            <UpcomingCard key={appointment.id} appointment={appointment} />
                        ))}
                    </Section>

                    <Section
                        titleSize='xl'
                        className='mt-8 mb-2'
                        title="Novedades"
                    />
                    <View className="overflow-hidden">
                        {alerts.map((alert) => (
                            <AlertItem key={alert.id} alert={alert} />
                        ))}
                    </View>
                </AnimatedView>
            </ThemeScroller>
        </View>
    );
};

const UpcomingCard = ({ appointment }: { appointment: typeof upcomingAppointments[number] }) => {
    return (
        <View style={shadowPresets.large} className="rounded-xl mt-3 border border-neutral-200 dark:border-dark-secondary bg-light-primary dark:bg-dark-primary">
            <View className="p-4">
                <View className="flex-row items-center justify-between mb-3">
                    <Chip
                        size="sm"
                        label={appointment.mode === 'online' ? 'Online' : 'Presencial'}
                        icon={appointment.mode === 'online' ? 'Video' : 'Building2'}
                    />
                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">Hoy • {appointment.time}</ThemedText>
                </View>
                <View className="flex-row items-center">
                    <Image source={{ uri: appointment.avatar }} className="w-12 h-12 rounded-full mr-3" />
                    <View className="flex-1">
                        <ThemedText className="text-base font-semibold">{appointment.patient}</ThemedText>
                        <ThemedText className="text-sm text-teal-600">{appointment.specialty}</ThemedText>
                        <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext mt-1">
                            Seguro: {appointment.insurance}
                        </ThemedText>
                    </View>
                </View>
            </View>
            <View className='w-full flex-row border-t border-neutral-200 dark:border-dark-secondary'>
                <Pressable className='w-1/2 py-4 items-center border-r border-neutral-200 dark:border-dark-secondary' onPress={() => router.push('/screens/reservations')}>
                    <ThemedText className="font-semibold">Ver ficha</ThemedText>
                </Pressable>
                <Pressable className='w-1/2 py-4 items-center' onPress={() => router.push('/(tabs)/chat')}>
                    <ThemedText className='font-semibold'>Iniciar llamada</ThemedText>
                </Pressable>
            </View>
        </View>
    );
};

const AlertItem = ({ alert }: { alert: typeof alerts[number] }) => (
    <View className="flex-row items-start py-3 border-b border-light-secondary dark:border-dark-secondary">
        <View className="w-10 h-10 rounded-full bg-light-secondary dark:bg-dark-secondary items-center justify-center mr-3">
            <Icon name={alert.icon as any} size={18} />
        </View>
        <View className="flex-1">
            <ThemedText className="font-semibold">{alert.title}</ThemedText>
            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">{alert.description}</ThemedText>
        </View>
    </View>
);

export default DashboardScreen;
