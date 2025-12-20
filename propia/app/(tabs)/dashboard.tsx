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
import Divider from '@/components/layout/Divider';

// Today's appointments
const todaysAppointments = [
    {
        id: 'a1',
        patient: 'Laura Gómez',
        time: '09:00',
        duration: '30 min',
        mode: 'online',
        type: 'Primera consulta',
        reason: 'Ansiedad y estrés laboral',
        insurance: 'Sanitas',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        status: 'next' // next, upcoming, completed
    },
    {
        id: 'a2',
        patient: 'Javier Torres',
        time: '10:00',
        duration: '45 min',
        mode: 'presencial',
        type: 'Seguimiento',
        reason: 'Control dermatitis',
        insurance: 'Mapfre',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        status: 'upcoming'
    },
    {
        id: 'a3',
        patient: 'María Sánchez',
        time: '11:30',
        duration: '30 min',
        mode: 'online',
        type: 'Seguimiento',
        reason: 'Revisión tratamiento',
        insurance: 'Adeslas',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        status: 'upcoming'
    },
    {
        id: 'a4',
        patient: 'Carlos Ruiz',
        time: '12:30',
        duration: '30 min',
        mode: 'presencial',
        type: 'Primera consulta',
        reason: 'Consulta general',
        insurance: 'DKV',
        avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
        status: 'upcoming'
    }
];

// Pending tasks
const pendingTasks = [
    { id: 't1', title: 'Revisar analítica', patient: 'Miguel Fernández', icon: 'FlaskRound', priority: 'high' },
    { id: 't2', title: 'Responder mensaje', patient: 'Sofía Martín', icon: 'MessageSquare', priority: 'medium' },
    { id: 't3', title: 'Firmar receta', patient: 'Ana López', icon: 'FileSignature', priority: 'high' },
    { id: 't4', title: 'Subir informe', patient: 'Pedro García', icon: 'Upload', priority: 'low' },
];

// Today's metrics
const todayMetrics = {
    appointments: 6,
    completed: 2,
    pending: 4,
    earnings: '540€',
    avgWaitTime: '3 min'
};

const DashboardScreen = () => {
    const currentTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const currentDate = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

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
                    {/* Greeting & Date */}
                    <View className='pt-4 pb-2'>
                        <ThemedText className='text-3xl font-bold'>Hola, Dra. Martínez</ThemedText>
                        <ThemedText className='text-sm text-light-subtext dark:text-dark-subtext capitalize mt-1'>
                            {currentDate}
                        </ThemedText>
                    </View>

                    {/* Quick Stats Row */}
                    <View className='flex-row justify-between mt-4 mb-6'>
                        <QuickStat
                            value={todayMetrics.appointments.toString()}
                            label="Citas hoy"
                            icon="CalendarCheck"
                            color="bg-teal-500"
                        />
                        <QuickStat
                            value={todayMetrics.completed.toString()}
                            label="Completadas"
                            icon="CheckCircle"
                            color="bg-green-500"
                        />
                        <QuickStat
                            value={todayMetrics.pending.toString()}
                            label="Pendientes"
                            icon="Clock"
                            color="bg-amber-500"
                        />
                        <QuickStat
                            value={todayMetrics.earnings}
                            label="Ingresos"
                            icon="Euro"
                            color="bg-coral-500"
                        />
                    </View>

                    {/* Next Appointment - Featured */}
                    <Section titleSize='lg' className='mb-2' title="Próxima cita">
                        <NextAppointmentCard appointment={todaysAppointments[0]} />
                    </Section>

                    {/* Today's Schedule */}
                    <Section
                        titleSize='lg'
                        className='mt-6 mb-2'
                        title="Agenda de hoy"
                        link="/screens/reservations"
                        linkText="Ver todo"
                    >
                        <View className="mt-2">
                            {todaysAppointments.slice(1).map((appointment, index) => (
                                <AppointmentRow key={appointment.id} appointment={appointment} />
                            ))}
                        </View>
                    </Section>

                    {/* Pending Tasks */}
                    <Section
                        titleSize='lg'
                        className='mt-6 mb-2'
                        title="Tareas pendientes"
                    >
                        <View className="mt-2">
                            {pendingTasks.map((task) => (
                                <TaskRow key={task.id} task={task} />
                            ))}
                        </View>
                    </Section>

                    {/* Quick Actions */}
                    <Section titleSize='lg' className='mt-6 mb-8' title="Acciones rápidas">
                        <View className='flex-row flex-wrap mt-2 gap-3'>
                            <QuickAction icon="Video" label="Iniciar videollamada" onPress={() => router.push('/(tabs)/chat')} />
                            <QuickAction icon="FileText" label="Nueva receta" onPress={() => { }} />
                            <QuickAction icon="Calendar" label="Bloquear horario" onPress={() => router.push('/(tabs)/calendar')} />
                            <QuickAction icon="MessageSquare" label="Ver mensajes" onPress={() => router.push('/(tabs)/chat')} />
                        </View>
                    </Section>
                </AnimatedView>
            </ThemeScroller>
        </View>
    );
};

// Quick Stat Component
const QuickStat = ({ value, label, icon, color }: { value: string; label: string; icon: string; color: string }) => (
    <View className="items-center flex-1">
        <View className={`w-12 h-12 rounded-full items-center justify-center ${color}`}>
            <Icon name={icon as any} size={20} color="white" />
        </View>
        <ThemedText className="text-lg font-bold mt-2">{value}</ThemedText>
        <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext text-center">{label}</ThemedText>
    </View>
);

// Next Appointment Card - Featured
const NextAppointmentCard = ({ appointment }: { appointment: typeof todaysAppointments[number] }) => (
    <View style={shadowPresets.large} className="rounded-2xl mt-3 bg-teal-500 overflow-hidden">
        <View className="p-5">
            <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                    <View className="bg-white/20 px-3 py-1.5 rounded-full flex-row items-center">
                        <Icon name={appointment.mode === 'online' ? 'Video' : 'Building2'} size={14} color="white" />
                        <ThemedText className="text-white text-xs font-medium ml-1.5">
                            {appointment.mode === 'online' ? 'Videollamada' : 'Presencial'}
                        </ThemedText>
                    </View>
                </View>
                <ThemedText className="text-white font-bold text-lg">{appointment.time}</ThemedText>
            </View>

            <View className="flex-row items-center">
                <Image source={{ uri: appointment.avatar }} className="w-14 h-14 rounded-full mr-4 border-2 border-white/30" />
                <View className="flex-1">
                    <ThemedText className="text-white text-xl font-bold">{appointment.patient}</ThemedText>
                    <ThemedText className="text-white/80 text-sm mt-0.5">{appointment.type} • {appointment.duration}</ThemedText>
                    <ThemedText className="text-white/70 text-xs mt-1">{appointment.reason}</ThemedText>
                </View>
            </View>
        </View>

        <View className='w-full flex-row bg-teal-600'>
            <Pressable className='flex-1 py-4 items-center flex-row justify-center' onPress={() => router.push('/screens/reservations')}>
                <Icon name="FileText" size={16} color="white" />
                <ThemedText className="text-white font-semibold ml-2">Ver historial</ThemedText>
            </Pressable>
            <View className="w-px bg-white/20" />
            <Pressable className='flex-1 py-4 items-center flex-row justify-center' onPress={() => router.push('/(tabs)/chat')}>
                <Icon name={appointment.mode === 'online' ? 'Video' : 'MapPin'} size={16} color="white" />
                <ThemedText className='text-white font-semibold ml-2'>
                    {appointment.mode === 'online' ? 'Iniciar llamada' : 'Ver ubicación'}
                </ThemedText>
            </Pressable>
        </View>
    </View>
);

// Appointment Row
const AppointmentRow = ({ appointment }: { appointment: typeof todaysAppointments[number] }) => (
    <Pressable
        onPress={() => router.push('/screens/reservations')}
        className="flex-row items-center py-4 border-b border-light-secondary dark:border-dark-secondary"
    >
        <View className="w-14 items-center mr-3">
            <ThemedText className="text-base font-bold">{appointment.time}</ThemedText>
            <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">{appointment.duration}</ThemedText>
        </View>
        <Image source={{ uri: appointment.avatar }} className="w-10 h-10 rounded-full mr-3" />
        <View className="flex-1">
            <ThemedText className="font-semibold">{appointment.patient}</ThemedText>
            <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">{appointment.type}</ThemedText>
        </View>
        <View className={`px-2 py-1 rounded-full ${appointment.mode === 'online' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
            <Icon
                name={appointment.mode === 'online' ? 'Video' : 'Building2'}
                size={14}
                className={appointment.mode === 'online' ? 'text-blue-600' : 'text-gray-600'}
            />
        </View>
    </Pressable>
);

// Task Row
const TaskRow = ({ task }: { task: typeof pendingTasks[number] }) => (
    <Pressable className="flex-row items-center py-3 border-b border-light-secondary dark:border-dark-secondary">
        <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${task.priority === 'high' ? 'bg-red-100 dark:bg-red-900' :
                task.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900' :
                    'bg-gray-100 dark:bg-gray-800'
            }`}>
            <Icon
                name={task.icon as any}
                size={18}
                className={
                    task.priority === 'high' ? 'text-red-600' :
                        task.priority === 'medium' ? 'text-amber-600' :
                            'text-gray-600'
                }
            />
        </View>
        <View className="flex-1">
            <ThemedText className="font-semibold">{task.title}</ThemedText>
            <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">{task.patient}</ThemedText>
        </View>
        <Icon name="ChevronRight" size={18} className="text-light-subtext dark:text-dark-subtext" />
    </Pressable>
);

// Quick Action Button
const QuickAction = ({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) => (
    <Pressable
        onPress={onPress}
        className="bg-light-secondary dark:bg-dark-secondary rounded-xl px-4 py-3 flex-row items-center"
    >
        <Icon name={icon as any} size={18} className="text-teal-600 mr-2" />
        <ThemedText className="text-sm font-medium">{label}</ThemedText>
    </Pressable>
);

export default DashboardScreen;
