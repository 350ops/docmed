import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import ThemedText from '@/components/ThemedText';
import Header from '@/components/Header';
import ThemeScroller from '@/components/ThemeScroller';
import Section from '@/components/layout/Section';
import Icon from '@/components/Icon';
import { Button } from '@/components/Button';
import { router } from 'expo-router';
import TabScreenWrapper from '@/components/TabScreenWrapper';

// Mock appointments data
const mockAppointments = {
    upcoming: [
        {
            id: '1',
            doctorName: 'Dra. Elena Martínez García',
            specialty: 'Psicología',
            doctorId: '1',
            date: '2024-12-20',
            time: '10:00',
            status: 'confirmed',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
            address: 'Calle Velázquez, 45, Madrid',
            price: '60€'
        },
        {
            id: '2',
            doctorName: 'Dr. Miguel Ángel Torres',
            specialty: 'Pediatría',
            doctorId: '4',
            date: '2024-12-22',
            time: '11:30',
            status: 'pending',
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face',
            address: 'Paseo de la Castellana, 120, Madrid',
            price: '70€'
        },
    ],
    past: [
        {
            id: '3',
            doctorName: 'Dr. Javier Ruiz Fernández',
            specialty: 'Dermatología',
            doctorId: '2',
            date: '2024-12-10',
            time: '09:00',
            status: 'completed',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
            address: 'Carrer de Balmes, 129, Barcelona',
            price: '80€'
        },
    ]
};

type TabType = 'upcoming' | 'past';

const AppointmentsScreen = () => {
    const [activeTab, setActiveTab] = useState<TabType>('upcoming');

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'confirmed':
                return { label: 'Confirmada', color: 'bg-teal-100 text-teal-700' };
            case 'pending':
                return { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700' };
            case 'completed':
                return { label: 'Completada', color: 'bg-gray-100 text-gray-700' };
            default:
                return { label: status, color: 'bg-gray-100 text-gray-700' };
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });
    };

    const appointments = activeTab === 'upcoming' ? mockAppointments.upcoming : mockAppointments.past;

    return (
        <TabScreenWrapper>
            <Header title="Mis Citas" showBackButton={false} />

            {/* Tab selector */}
            <View className="flex-row mx-global mt-4 mb-4 bg-light-secondary dark:bg-dark-secondary rounded-xl p-1">
                <Pressable
                    onPress={() => setActiveTab('upcoming')}
                    className={`flex-1 py-3 rounded-lg ${activeTab === 'upcoming' ? 'bg-teal-500' : ''}`}
                >
                    <ThemedText className={`text-center font-semibold ${activeTab === 'upcoming' ? 'text-white' : ''}`}>
                        Próximas
                    </ThemedText>
                </Pressable>
                <Pressable
                    onPress={() => setActiveTab('past')}
                    className={`flex-1 py-3 rounded-lg ${activeTab === 'past' ? 'bg-teal-500' : ''}`}
                >
                    <ThemedText className={`text-center font-semibold ${activeTab === 'past' ? 'text-white' : ''}`}>
                        Anteriores
                    </ThemedText>
                </Pressable>
            </View>

            <ThemeScroller>
                {appointments.length === 0 ? (
                    <View className="flex-1 items-center justify-center py-20">
                        <View className="w-20 h-20 bg-teal-100 dark:bg-teal-900 rounded-full items-center justify-center mb-4">
                            <Icon name="CalendarX2" size={40} className="text-teal-500" />
                        </View>
                        <ThemedText className="text-xl font-bold mb-2">
                            No tienes citas {activeTab === 'upcoming' ? 'próximas' : 'anteriores'}
                        </ThemedText>
                        <ThemedText className="text-light-subtext dark:text-dark-subtext text-center mb-6">
                            {activeTab === 'upcoming'
                                ? 'Busca un especialista y reserva tu primera cita'
                                : 'Aquí aparecerán tus citas completadas'
                            }
                        </ThemedText>
                        {activeTab === 'upcoming' && (
                            <Button
                                title="Buscar doctor"
                                className="bg-teal-500 px-6"
                                textClassName="text-white"
                                onPress={() => router.push('/(tabs)/(home)')}
                                rounded="lg"
                            />
                        )}
                    </View>
                ) : (
                    <View className="space-y-4">
                        {appointments.map((appointment) => {
                            const status = getStatusBadge(appointment.status);
                            return (
                                <Pressable
                                    key={appointment.id}
                                    onPress={() => router.push(`/screens/trip-detail?doctorId=${appointment.doctorId}&date=${appointment.date}&time=${appointment.time}`)}
                                    className="bg-light-primary dark:bg-dark-secondary mx-global p-4 rounded-2xl border border-neutral-200 dark:border-dark-secondary"
                                >
                                    {/* Status badge */}
                                    <View className={`self-start px-3 py-1 rounded-full mb-3 ${status.color}`}>
                                        <ThemedText className="text-xs font-semibold">{status.label}</ThemedText>
                                    </View>

                                    {/* Doctor info */}
                                    <View className="flex-row">
                                        <Image
                                            source={{ uri: appointment.image }}
                                            className="w-16 h-16 rounded-xl mr-4"
                                        />
                                        <View className="flex-1">
                                            <ThemedText className="font-bold text-base">{appointment.doctorName}</ThemedText>
                                            <ThemedText className="text-teal-600 text-sm">{appointment.specialty}</ThemedText>
                                            <View className="flex-row items-center mt-1">
                                                <Icon name="MapPin" size={12} className="mr-1 text-light-subtext" />
                                                <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">
                                                    {appointment.address}
                                                </ThemedText>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Date and time */}
                                    <View className="flex-row items-center justify-between mt-4 pt-4 border-t border-neutral-200 dark:border-dark-primary">
                                        <View className="flex-row items-center">
                                            <Icon name="Calendar" size={16} className="mr-2 text-teal-500" />
                                            <ThemedText className="font-medium">{formatDate(appointment.date)}</ThemedText>
                                        </View>
                                        <View className="flex-row items-center">
                                            <Icon name="Clock" size={16} className="mr-2 text-teal-500" />
                                            <ThemedText className="font-bold text-lg">{appointment.time}</ThemedText>
                                        </View>
                                    </View>

                                    {/* Actions for upcoming */}
                                    {activeTab === 'upcoming' && (
                                        <View className="flex-row gap-3 mt-4">
                                            <Button
                                                title="Ver detalles"
                                                className="flex-1 bg-teal-500"
                                                textClassName="text-white"
                                                size="small"
                                                rounded="lg"
                                                onPress={() => router.push(`/screens/trip-detail?doctorId=${appointment.doctorId}&date=${appointment.date}&time=${appointment.time}`)}
                                            />
                                            <Button
                                                title="Cancelar"
                                                className="flex-1 bg-light-secondary dark:bg-dark-primary"
                                                size="small"
                                                rounded="lg"
                                            />
                                        </View>
                                    )}

                                    {/* Actions for past */}
                                    {activeTab === 'past' && (
                                        <View className="flex-row gap-3 mt-4">
                                            <Button
                                                title="Reservar de nuevo"
                                                className="flex-1 bg-teal-500"
                                                textClassName="text-white"
                                                size="small"
                                                rounded="lg"
                                            />
                                            <Button
                                                title="Dejar opinión"
                                                className="flex-1 bg-light-secondary dark:bg-dark-primary"
                                                size="small"
                                                rounded="lg"
                                            />
                                        </View>
                                    )}
                                </Pressable>
                            );
                        })}
                    </View>
                )}
            </ThemeScroller>
        </TabScreenWrapper>
    );
};

export default AppointmentsScreen;
