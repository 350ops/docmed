import React from 'react';
import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedFooter from '@/components/ThemeFooter';
import { Image, Pressable } from 'react-native';
import ThemedText from '@/components/ThemedText';
import { View } from 'react-native';
import { shadowPresets } from '@/utils/useShadow';
import Section from '@/components/layout/Section';
import { CardScroller } from '@/components/CardScroller';
import { Chip } from '@/components/Chip';
import { router } from 'expo-router';
import Icon from '@/components/Icon';

type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

interface Reservation {
    id: string;
    doctorId: string;
    patientName: string;
    patientAvatar: string;
    specialty: string;
    date: string;
    time: string;
    mode: 'online' | 'presencial';
    status: AppointmentStatus;
    statusText: string;
}

const ReservationsScreen = () => {
    const reservations: Reservation[] = [
        {
            id: '1',
            doctorId: '1',
            patientName: 'Laura Gómez',
            patientAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
            specialty: 'Psicología',
            date: 'Hoy',
            time: '10:00',
            mode: 'online',
            status: 'confirmed',
            statusText: 'En 2 horas'
        },
        {
            id: '2',
            doctorId: '2',
            patientName: 'Javier Torres',
            patientAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
            specialty: 'Dermatología',
            date: 'Mañana',
            time: '12:30',
            mode: 'presencial',
            status: 'pending',
            statusText: 'Pendiente de confirmar'
        },
        {
            id: '3',
            doctorId: '4',
            patientName: 'Sofía Ramírez',
            patientAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            specialty: 'Pediatría',
            date: '12 ene',
            time: '09:00',
            mode: 'online',
            status: 'confirmed',
            statusText: 'Confirmada'
        },
        {
            id: '4',
            doctorId: '5',
            patientName: 'Miguel Herrera',
            patientAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
            specialty: 'Cardiología',
            date: '15 ene',
            time: '18:00',
            mode: 'presencial',
            status: 'cancelled',
            statusText: 'Cancelada'
        },
    ];

    return (
        <>
            <Header
                showBackButton
                title="Citas"
            />

            <ThemedScroller
                className="flex-1 pt-4"
                keyboardShouldPersistTaps="handled"
            >
                <Section title="Agenda" titleSize="3xl" className="mt-2" />
                <CardScroller className='mt-1 mb-4'>
                    <Chip size="lg" label="Todas" isSelected />
                    <Chip size="lg" label="Pendientes" />
                    <Chip size="lg" label="Confirmadas" />
                    <Chip size="lg" label="Canceladas" />
                </CardScroller>
                
                {reservations.map((reservation, index) => (
                    <ReservationCard 
                        key={reservation.id}
                        reservation={reservation}
                        index={index}
                    />
                ))}
            </ThemedScroller>
            <ThemedFooter>
                <></>
            </ThemedFooter>
        </>
    );
};

const statusStyles: Record<AppointmentStatus, { text: string; border: string }> = {
    confirmed: { text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-800' },
    pending: { text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800' },
    cancelled: { text: 'text-red-600 dark:text-red-400', border: 'border-red-200 dark:border-red-800' },
};

const ReservationCard: React.FC<{ reservation: Reservation; index: number }> = ({ reservation, index }) => {
    return (
        <View style={shadowPresets.large} className={`rounded-xl mt-4 border bg-light-primary dark:bg-dark-primary ${statusStyles[reservation.status].border}`}>
            <View className="p-4">
                <View className="flex-row items-center justify-between mb-3">
                    <ThemedText className={`text-sm font-semibold ${statusStyles[reservation.status].text}`}>
                        {reservation.statusText}
                    </ThemedText>
                    <View className="flex-row items-center">
                        <Icon
                            name={reservation.mode === 'online' ? 'Video' : 'Building2'}
                            size={16}
                            className="text-light-subtext mr-1"
                        />
                        <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">
                            {reservation.mode === 'online' ? 'Online' : 'Presencial'}
                        </ThemedText>
                    </View>
                </View>
                <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                        <ThemedText className='text-lg font-semibold'>{reservation.patientName}</ThemedText>
                        <ThemedText className='text-sm text-light-subtext dark:text-dark-subtext'>
                            {reservation.specialty} • {reservation.date} • {reservation.time}
                        </ThemedText>
                    </View>
                    <Image source={{ uri: reservation.patientAvatar }} className="w-12 h-12 rounded-full ml-3" />
                </View>
            </View>
            {reservation.status !== 'cancelled' && (
                <View className='w-full flex-row border-t border-neutral-200 dark:border-dark-secondary'>
                    <Pressable onPress={() => router.push(`/screens/booking-detail?doctorId=${reservation.doctorId}&id=${reservation.id}`)} className='w-1/2 py-4 items-center border-r border-neutral-200 dark:border-dark-secondary'>
                        <ThemedText className="font-semibold">Ver detalles</ThemedText>
                    </Pressable>
                    <Pressable onPress={() => router.push('/(tabs)/chat')} className='w-1/2 py-4 items-center'>
                        <ThemedText className='font-semibold'>Mensajes</ThemedText>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default ReservationsScreen;
