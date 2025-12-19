import React, { useMemo } from 'react';
import { View, Image } from 'react-native';
import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import Section from '@/components/layout/Section';
import ThemedText from '@/components/ThemedText';
import ShowRating from '@/components/ShowRating';
import Icon from '@/components/Icon';
import { Button } from '@/components/Button';
import AnimatedView from '@/components/AnimatedView';
import { useLocalSearchParams } from 'expo-router';
import { MOCK_DOCTORS } from '@/lib/doctors';
import Divider from '@/components/layout/Divider';

const BookingDetailScreen = () => {
    const { doctorId } = useLocalSearchParams<{ doctorId?: string }>();
    const doctor = useMemo(
        () => MOCK_DOCTORS.find((d) => d.id === doctorId) || MOCK_DOCTORS[0],
        [doctorId]
    );

    const request = {
        id: 'CS-2391',
        patient: {
            name: 'Laura Gómez',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            insurance: doctor.insurances[0] || 'Particular',
            history: '2 citas previas',
        },
        reason: 'Consulta por ansiedad y dificultades para dormir desde hace 3 semanas.',
        date: '2024-12-20',
        time: '10:00',
        mode: 'online' as const,
        notes: [
            'Sin medicación actual',
            'Desea iniciar terapia cognitivo-conductual',
            'Prefiere videollamada'
        ]
    };

    const formattedDate = new Date(request.date).toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    return (
        <>
            <Header
                title="Solicitud de cita"
                showBackButton
            />
            <ThemedScroller
                className="flex-1 px-0"
                keyboardShouldPersistTaps="handled"
            >
                <AnimatedView animation="fadeIn" duration={400} delay={100}>
                    <View className='px-global pt-4'>
                        <View className="rounded-2xl bg-light-secondary dark:bg-dark-secondary p-4 flex-row">
                            <Image source={{ uri: doctor.image }} className="w-24 h-24 rounded-xl mr-3" />
                            <View className="flex-1">
                                <ThemedText className="text-xl font-bold mb-1">{doctor.name}</ThemedText>
                                <ThemedText className="text-sm text-teal-600 dark:text-teal-300">{doctor.specialty}</ThemedText>
                                <View className="flex-row items-center mt-1">
                                    <ShowRating rating={doctor.rating} size="sm" />
                                    <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext ml-2">
                                        {doctor.reviewCount} opiniones
                                    </ThemedText>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Divider className="h-2 bg-light-secondary dark:bg-dark-darker my-6" />

                    <Section title="Paciente" titleSize="lg" className="px-global pt-4">
                        <View className="flex-row items-center mb-4">
                            <Image source={{ uri: request.patient.avatar }} className="w-14 h-14 rounded-full mr-3" />
                            <View className="flex-1">
                                <ThemedText className="text-lg font-semibold">{request.patient.name}</ThemedText>
                                <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                                    {request.patient.insurance} • {request.patient.history}
                                </ThemedText>
                            </View>
                        </View>
                        <View className="flex-row items-start">
                            <Icon name="MessageSquare" size={18} className="text-light-subtext mr-2 mt-0.5" />
                            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext flex-1">
                                {request.reason}
                            </ThemedText>
                        </View>
                    </Section>

                    <Divider className="h-2 bg-light-secondary dark:bg-dark-darker my-6" />

                    <Section title="Cita solicitada" titleSize="lg" className="px-global pt-4">
                        <View className="mt-3 space-y-3">
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <Icon name="Calendar" size={18} className="text-teal-500 mr-2" />
                                    <ThemedText className="font-medium">{formattedDate}</ThemedText>
                                </View>
                                <ThemedText className="font-bold text-lg">{request.time}</ThemedText>
                            </View>
                            <View className="flex-row items-center">
                                <Icon name={request.mode === 'online' ? 'Video' : 'Building2'} size={18} className="text-teal-500 mr-2" />
                                <ThemedText className="text-sm">
                                    {request.mode === 'online' ? 'Videoconsulta en CareSalud' : doctor.address}
                                </ThemedText>
                            </View>
                        </View>
                    </Section>

                    <Divider className="h-2 bg-light-secondary dark:bg-dark-darker my-6" />

                    <Section title="Notas del paciente" titleSize="lg" className="px-global pt-4">
                        <View className="mt-3 space-y-2">
                            {request.notes.map((note, index) => (
                                <View key={index} className="flex-row items-start">
                                    <Icon name="Circle" size={8} className="mt-2 mr-2 text-light-subtext" />
                                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext flex-1">
                                        {note}
                                    </ThemedText>
                                </View>
                            ))}
                        </View>
                    </Section>

                    <Divider className="h-2 bg-light-secondary dark:bg-dark-darker my-6" />

                    <Section title="Acciones" titleSize="lg" className="px-global pt-4">
                        <View className="flex-row gap-3 mt-2">
                            <Button
                                title="Proponer otro horario"
                                variant="outline"
                                className="flex-1"
                            />
                            <Button
                                title="Confirmar cita"
                                className="flex-1 bg-teal-500"
                                textClassName="text-white"
                            />
                        </View>
                    </Section>
                </AnimatedView>
            </ThemedScroller>
        </>
    );
}

export default BookingDetailScreen;
