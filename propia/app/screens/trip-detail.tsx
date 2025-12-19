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
import { useLocalSearchParams, router } from 'expo-router';
import { MOCK_DOCTORS } from '@/lib/doctors';
import Divider from '@/components/layout/Divider';

const priceLabel = (range: string) => range.split(' - ')[0] || range;

const TripDetailScreen = () => {
    const { doctorId, date, time, mode } = useLocalSearchParams<{ doctorId?: string; date?: string; time?: string; mode?: string }>();

    const doctor = useMemo(
        () => MOCK_DOCTORS.find((d) => d.id === doctorId) || MOCK_DOCTORS[0],
        [doctorId]
    );

    const formattedDate = useMemo(() => {
        if (!date) return 'Fecha por definir';
        const parsed = new Date(date as string);
        return parsed.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });
    }, [date]);

    const appointment = {
        patientName: 'Laura Gómez',
        reason: 'Consulta por ansiedad y dificultades para dormir',
        notes: 'Prefiere videollamada, ha tenido ataques de ansiedad nocturnos las últimas semanas.',
        insurance: doctor.insurances[0] || 'Pago privado',
    };

    const consultationMode = mode === 'presencial' ? 'presencial' : 'online';

    return (
        <>
            <Header
                title="Detalle de cita"
                showBackButton
            />
            <ThemedScroller
                className="flex-1 px-0"
                keyboardShouldPersistTaps="handled"
            >
                <AnimatedView animation="fadeIn" duration={400} delay={100}>
                    <View className="px-global pt-4">
                        <View className="rounded-2xl bg-light-secondary dark:bg-dark-secondary p-4 flex-row">
                            <Image source={{ uri: doctor.image }} className="w-24 h-24 rounded-xl mr-3" />
                            <View className="flex-1 justify-center">
                                <ThemedText className="text-xl font-bold mb-1">{doctor.name}</ThemedText>
                                <ThemedText className="text-sm text-teal-600 dark:text-teal-300">{doctor.specialty}</ThemedText>
                                <View className="flex-row items-center mt-1">
                                    <ShowRating rating={doctor.rating} size="sm" />
                                    <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext ml-2">
                                        {doctor.reviewCount} opiniones
                                    </ThemedText>
                                </View>
                                <View className="flex-row items-center mt-1">
                                    <Icon name="MapPin" size={14} className="text-light-subtext mr-1" />
                                    <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">{doctor.location}</ThemedText>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Divider className="h-2 bg-light-secondary dark:bg-dark-darker my-6" />

                    <Section title="Información de la cita" titleSize="lg" className="px-global pt-4">
                        <View className="mt-4 space-y-3">
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <Icon name="Calendar" size={18} className="text-teal-500 mr-2" />
                                    <ThemedText className="font-medium">{formattedDate}</ThemedText>
                                </View>
                                <ThemedText className="text-lg font-semibold">{time || doctor.availability[0]?.slots[0] || 'Hora por definir'}</ThemedText>
                            </View>
                            <View className="flex-row items-center">
                                <Icon name={consultationMode === 'online' ? 'Video' : 'Building2'} size={18} className="text-teal-500 mr-2" />
                                <ThemedText className="text-sm">
                                    {consultationMode === 'online' ? 'Videoconsulta en CareSalud' : doctor.address}
                                </ThemedText>
                            </View>
                            <View className="flex-row items-center">
                                <Icon name="Shield" size={18} className="text-teal-500 mr-2" />
                                <ThemedText className="text-sm">Seguro: {appointment.insurance}</ThemedText>
                            </View>
                        </View>
                    </Section>

                    <Divider className="h-2 bg-light-secondary dark:bg-dark-darker my-6" />

                    <Section title="Paciente" titleSize="lg" className="px-global pt-4">
                        <View className="mt-3 space-y-2">
                            <View className="flex-row items-center">
                                <Icon name="UserRound" size={18} className="text-light-subtext mr-2" />
                                <ThemedText className="font-semibold">{appointment.patientName}</ThemedText>
                            </View>
                            <View className="flex-row items-start">
                                <Icon name="MessageSquare" size={18} className="text-light-subtext mr-2 mt-0.5" />
                                <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext flex-1">
                                    Motivo: {appointment.reason}
                                </ThemedText>
                            </View>
                            <View className="flex-row items-start">
                                <Icon name="NotebookPen" size={18} className="text-light-subtext mr-2 mt-0.5" />
                                <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext flex-1">
                                    Notas: {appointment.notes}
                                </ThemedText>
                            </View>
                        </View>
                    </Section>

                    <Divider className="h-2 bg-light-secondary dark:bg-dark-darker my-6" />

                    <Section title="Precio" titleSize="lg" className="px-global pt-4">
                        <View className="mt-3 space-y-3">
                            <View className="flex-row justify-between">
                                <ThemedText className="text-light-subtext dark:text-dark-subtext">Consulta</ThemedText>
                                <ThemedText>{priceLabel(doctor.priceRange)}</ThemedText>
                            </View>
                            <View className="flex-row justify-between">
                                <ThemedText className="text-light-subtext dark:text-dark-subtext">Tarifa de plataforma</ThemedText>
                                <ThemedText>6€</ThemedText>
                            </View>
                            <Divider className="my-2" />
                            <View className="flex-row justify-between">
                                <ThemedText className="font-semibold">Total</ThemedText>
                                <ThemedText className="font-semibold">
                                    {(() => {
                                        const base = parseInt(priceLabel(doctor.priceRange).replace(/[^\d]/g, ''), 10) || 60;
                                        return `${base + 6}€`;
                                    })()}
                                </ThemedText>
                            </View>
                        </View>
                    </Section>

                    <Divider className="h-2 bg-light-secondary dark:bg-dark-darker my-6" />

                    <Section title="Acciones" titleSize="lg" className="px-global pt-4">
                        <View className="flex-row gap-3 mt-2">
                            <Button
                                title="Reprogramar"
                                variant="outline"
                                className="flex-1"
                                onPress={() => router.push(`/screens/map?doctorId=${doctor.id}`)}
                            />
                            <Button
                                title="Contactar"
                                className="flex-1 bg-teal-500"
                                textClassName="text-white"
                                onPress={() => router.push('/(tabs)/chat')}
                            />
                        </View>
                    </Section>
                </AnimatedView>
            </ThemedScroller>
        </>
    );
};

export default TripDetailScreen;
