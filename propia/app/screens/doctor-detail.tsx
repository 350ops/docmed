import React, { useState, useRef } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { Share } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import ThemedScroller from '@/components/ThemeScroller';
import ImageCarousel from '@/components/ImageCarousel';
import { CardScroller } from '@/components/CardScroller';
import Section from '@/components/layout/Section';
import Favorite from '@/components/Favorite';
import Divider from '@/components/layout/Divider';
import ShowRating from '@/components/ShowRating';
import Icon, { IconName } from '@/components/Icon';
import Avatar from '@/components/Avatar';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { MOCK_DOCTORS, Doctor } from '@/lib/doctors';
import { router } from 'expo-router';

const DoctorDetail = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [isFocused, setIsFocused] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const insets = useSafeAreaInsets();

    // Find the doctor by ID
    const doctor = MOCK_DOCTORS.find(d => d.id === id) || MOCK_DOCTORS[0];

    // Get next 7 days for display
    const getDisplayDays = () => {
        const days: { date: Date; dateStr: string; dayName: string; dayNum: number; month: string }[] = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push({
                date,
                dateStr: date.toISOString().split('T')[0],
                dayName: date.toLocaleDateString('es-ES', { weekday: 'short' }),
                dayNum: date.getDate(),
                month: date.toLocaleDateString('es-ES', { month: 'short' })
            });
        }
        return days;
    };

    const displayDays = getDisplayDays();

    const getSlotCount = (dateStr: string) => {
        const day = doctor.availability.find(d => d.date === dateStr);
        return day?.slots.length || 0;
    };

    const getSlots = (dateStr: string) => {
        const day = doctor.availability.find(d => d.date === dateStr);
        return day?.slots || [];
    };

    useFocusEffect(
        React.useCallback(() => {
            setIsFocused(true);
            return () => setIsFocused(false);
        }, [])
    );

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Mira este doctor: ${doctor.name}\nEspecialidad: ${doctor.specialty}\nValoración: ${doctor.rating}⭐`,
                title: doctor.name
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleBooking = () => {
        if (selectedDate && selectedTime) {
            router.push(`/screens/order-detail?doctorId=${doctor.id}&date=${selectedDate}&time=${selectedTime}`);
        }
    };

    const rightComponents = [
        <Favorite key="fav" productName={doctor.name} size={25} isWhite />,
        <HeaderIcon key="share" icon="Share2" onPress={handleShare} isWhite href={''} />,
    ];

    // Mock reviews
    const reviewsData = [
        {
            rating: 5,
            description: "Excelente profesional, muy atento y explicó todo con claridad.",
            date: "Diciembre 2024",
            username: "María G.",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            rating: 5,
            description: "Muy recomendable. Consulta puntual y trato muy humano.",
            date: "Noviembre 2024",
            username: "Carlos L.",
            avatar: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        {
            rating: 4,
            description: "Buen profesional, aunque la espera fue un poco larga.",
            date: "Octubre 2024",
            username: "Ana F.",
            avatar: "https://randomuser.me/api/portraits/women/63.jpg"
        },
    ];

    return (
        <>
            {isFocused && <StatusBar style="light" translucent />}
            <Header variant='transparent' title="" rightComponents={rightComponents} showBackButton />
            <ThemedScroller className="px-0 bg-light-primary dark:bg-dark-primary">
                {/* Doctor Image */}
                <View className="h-[350px] relative">
                    <Image
                        source={typeof doctor.image === 'string' ? { uri: doctor.image } : doctor.image}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    {/* Gradient overlay */}
                    <View className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Verified badge */}
                    {doctor.isVerified && (
                        <View className="absolute top-4 right-16 bg-teal-500 px-3 py-1.5 rounded-full flex-row items-center">
                            <Icon name="BadgeCheck" size={14} color="white" />
                            <ThemedText className="text-white text-xs font-semibold ml-1">Verificado</ThemedText>
                        </View>
                    )}
                </View>

                <View
                    style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
                    className="p-global bg-light-primary dark:bg-dark-primary -mt-[30px]"
                >
                    {/* Doctor info header */}
                    <View className='items-center'>
                        <ThemedText className="text-2xl font-bold text-center">{doctor.name}</ThemedText>
                        <View className="flex-row items-center mt-2">
                            <View className="bg-teal-100 dark:bg-teal-900 px-3 py-1 rounded-full">
                                <ThemedText className="text-teal-700 dark:text-teal-300 font-semibold">{doctor.specialty}</ThemedText>
                            </View>
                        </View>
                        <View className='flex-row items-center justify-center mt-4'>
                            <ShowRating rating={doctor.rating} size="lg" className='px-4 py-2 border-r border-neutral-200 dark:border-dark-secondary' />
                            <ThemedText className="text-base px-4">{doctor.reviewCount} Opiniones</ThemedText>
                        </View>
                    </View>

                    {/* Location info */}
                    <View className="flex-row items-center mt-6 mb-6 py-4 border-y border-neutral-200 dark:border-dark-secondary">
                        <View className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full items-center justify-center mr-4">
                            <Icon name="MapPin" size={20} className="text-teal-600" />
                        </View>
                        <View className="flex-1">
                            <ThemedText className="font-semibold text-base">{doctor.location}</ThemedText>
                            <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">
                                {doctor.address}
                            </ThemedText>
                        </View>
                    </View>

                    {/* Bio */}
                    <ThemedText className="text-base leading-6">{doctor.bio}</ThemedText>

                    <Divider className="my-6" />

                    {/* Professional info */}
                    <Section title="Información profesional" titleSize="lg" className="mb-6">
                        <View className="mt-3">
                            <FeatureItem icon="BookOpen" label="Formación" value={doctor.education || 'No disponible'} />
                            <FeatureItem icon="Clock" label="Experiencia" value={`${doctor.experience || 0} años`} />
                            <FeatureItem icon="Languages" label="Idiomas" value={doctor.languages?.join(', ') || 'Español'} />
                            <FeatureItem icon="Euro" label="Precio consulta" value={doctor.priceRange} />
                        </View>
                    </Section>

                    <Divider className="my-4" />

                    {/* Insurance */}
                    <Section title="Seguros aceptados" titleSize="lg" className="mb-6">
                        <View className="flex-row flex-wrap mt-3 gap-2">
                            {doctor.insurances.map((insurance, index) => (
                                <View key={index} className="bg-light-secondary dark:bg-dark-secondary px-3 py-2 rounded-lg">
                                    <ThemedText className="text-sm">{insurance}</ThemedText>
                                </View>
                            ))}
                        </View>
                    </Section>

                    <Divider className="my-4" />

                    {/* Availability Calendar */}
                    <Section title="Disponibilidad" titleSize="lg" className="mb-4">
                        <View className="mt-4">
                            {/* Day selector */}
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                                <View className="flex-row gap-2">
                                    {displayDays.map((day, i) => {
                                        const slotCount = getSlotCount(day.dateStr);
                                        const isSelected = selectedDate === day.dateStr;
                                        const hasSlots = slotCount > 0;

                                        return (
                                            <Pressable
                                                key={i}
                                                onPress={() => hasSlots && setSelectedDate(day.dateStr)}
                                                className={`w-16 p-3 rounded-xl items-center ${isSelected
                                                    ? 'bg-teal-500'
                                                    : hasSlots
                                                        ? 'bg-teal-50 dark:bg-teal-900/30'
                                                        : 'bg-light-secondary dark:bg-dark-secondary opacity-50'
                                                    }`}
                                            >
                                                <ThemedText className={`text-xs uppercase ${isSelected ? 'text-white' : ''}`}>
                                                    {day.dayName}
                                                </ThemedText>
                                                <ThemedText className={`text-lg font-bold ${isSelected ? 'text-white' : ''}`}>
                                                    {day.dayNum}
                                                </ThemedText>
                                                {hasSlots && (
                                                    <ThemedText className={`text-xs ${isSelected ? 'text-white/80' : 'text-teal-600'}`}>
                                                        {slotCount} citas
                                                    </ThemedText>
                                                )}
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </ScrollView>

                            {/* Time slots */}
                            {selectedDate && (
                                <View>
                                    <ThemedText className="text-sm font-medium text-light-subtext dark:text-dark-subtext mb-3">
                                        Horarios disponibles:
                                    </ThemedText>
                                    <View className="flex-row flex-wrap gap-2">
                                        {getSlots(selectedDate).map((time, i) => (
                                            <Pressable
                                                key={i}
                                                onPress={() => setSelectedTime(time)}
                                                className={`px-4 py-2 rounded-lg ${selectedTime === time
                                                    ? 'bg-teal-500'
                                                    : 'bg-light-secondary dark:bg-dark-secondary'
                                                    }`}
                                            >
                                                <ThemedText className={`font-medium ${selectedTime === time ? 'text-white' : ''}`}>
                                                    {time}
                                                </ThemedText>
                                            </Pressable>
                                        ))}
                                    </View>
                                </View>
                            )}
                        </View>
                    </Section>

                    <Divider className="my-4" />

                    {/* Ratings & Reviews */}
                    <Section
                        title="Opiniones de pacientes"
                        titleSize="lg"
                        subtitle={`${doctor.reviewCount} opiniones`}
                        className="mb-6"
                    >
                        <View className="mt-4 bg-light-secondary dark:bg-dark-secondary p-4 rounded-lg">
                            <View className="flex-row items-center mb-4">
                                <ShowRating rating={doctor.rating} size="lg" />
                                <ThemedText className="ml-2 text-light-subtext dark:text-dark-subtext">
                                    ({doctor.reviewCount})
                                </ThemedText>
                            </View>
                        </View>

                        <ThemedText className="mt-6 mb-3 font-semibold text-lg">Opiniones recientes</ThemedText>
                        <CardScroller className="mt-1" space={10}>
                            {reviewsData.map((review, index) => (
                                <View key={index} className="w-[280px] bg-light-secondary dark:bg-dark-secondary p-4 rounded-lg">
                                    <View className="flex-row items-center mb-2">
                                        <Image
                                            source={{ uri: review.avatar }}
                                            className="w-10 h-10 rounded-full mr-2"
                                        />
                                        <View>
                                            <ThemedText className="font-medium">{review.username}</ThemedText>
                                            <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">
                                                {review.date}
                                            </ThemedText>
                                        </View>
                                    </View>
                                    <ShowRating rating={review.rating} size="sm" className="mb-2" />
                                    <ThemedText className="text-sm">{review.description}</ThemedText>
                                </View>
                            ))}
                        </CardScroller>
                    </Section>
                </View>
            </ThemedScroller>

            {/* Bottom Booking Bar */}
            <View
                style={{ paddingBottom: insets.bottom }}
                className='flex-row items-center justify-start px-global pt-4 border-t border-neutral-200 dark:border-dark-secondary bg-light-primary dark:bg-dark-primary'
            >
                <View className="flex-1">
                    <ThemedText className='text-xl font-bold'>{doctor.priceRange.split(' - ')[0]}</ThemedText>
                    <ThemedText className='text-xs opacity-60'>
                        {selectedDate && selectedTime
                            ? `${new Date(selectedDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} a las ${selectedTime}`
                            : 'Selecciona fecha y hora'
                        }
                    </ThemedText>
                </View>
                <Button
                    title='Reservar cita'
                    className={`ml-6 px-6 ${selectedDate && selectedTime ? 'bg-teal-500' : 'bg-gray-300'}`}
                    textClassName='text-white'
                    size='medium'
                    onPress={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                    rounded='lg'
                />
            </View>
        </>
    );
};

// Feature Item Component
interface FeatureItemProps {
    icon: IconName;
    label: string;
    value: string;
}

const FeatureItem = ({ icon, label, value }: FeatureItemProps) => (
    <View className="flex-row items-center py-3">
        <Icon name={icon} size={20} strokeWidth={1.5} className="mr-3 text-teal-600" />
        <ThemedText className="flex-1 text-light-subtext dark:text-dark-subtext">{label}</ThemedText>
        <ThemedText className="font-medium text-right flex-1">{value}</ThemedText>
    </View>
);

export default DoctorDetail;
