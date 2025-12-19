import Header, { HeaderIcon } from '@/components/Header';
import ThemeScroller from '@/components/ThemeScroller';
import React, { useContext } from 'react';
import { View, Text, Pressable, Image, Animated } from 'react-native';
import Section from '@/components/layout/Section';
import { CardScroller } from '@/components/CardScroller';
import Card from '@/components/Card';
import AnimatedView from '@/components/AnimatedView';
import { ScrollContext } from './_layout';
import ThemedText from '@/components/ThemedText';
import useShadow, { shadowPresets } from '@/utils/useShadow';
import { router } from 'expo-router';
import { MOCK_DOCTORS } from '@/lib/doctors';
import Icon from '@/components/Icon';

const HomeScreen = () => {
    const scrollY = useContext(ScrollContext);

    // Group doctors by specialty
    const getDoctorsByCity = (city: string) =>
        MOCK_DOCTORS.filter(d => d.city === city).slice(0, 4);

    const getDoctorsBySpecialty = (specialty: string) =>
        MOCK_DOCTORS.filter(d => d.specialty === specialty).slice(0, 4);

    // Get top rated doctors
    const topRatedDoctors = [...MOCK_DOCTORS].sort((a, b) => b.rating - a.rating).slice(0, 4);

    return (
        <ThemeScroller
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
        >
            <AnimatedView animation="scaleIn" className='flex-1 mt-4'>
                {/* Quick action banner */}
                <Pressable
                    onPress={() => router.push('/screens/map')}
                    style={{ ...shadowPresets.large }}
                    className='p-5 mb-8 flex flex-row items-center rounded-2xl bg-teal-500'
                >
                    <View className='flex-1 pr-4'>
                        <ThemedText className='text-lg font-bold text-white mb-1'>
                            ¿Necesitas atención médica?
                        </ThemedText>
                        <ThemedText className='text-sm text-white opacity-90'>
                            Encuentra doctores cerca de ti
                        </ThemedText>
                    </View>
                    <View className='w-12 h-12 bg-white/20 rounded-full items-center justify-center'>
                        <Icon name="MapPin" size={24} color="white" />
                    </View>
                </Pressable>

                {/* Popular specialties chips */}
                <Section title="Especialidades populares" titleSize="lg" className="mb-2">
                    <CardScroller space={10} className='mt-2 pb-2'>
                        {['Medicina General', 'Psicología', 'Dermatología', 'Ginecología', 'Pediatría', 'Cardiología'].map((specialty, index) => (
                            <Pressable
                                key={`specialty-${index}`}
                                onPress={() => router.push(`/screens/map?specialty=${specialty}`)}
                                className='px-4 py-3 bg-teal-50 dark:bg-dark-secondary rounded-full border border-teal-200 dark:border-teal-800'
                            >
                                <ThemedText className='text-sm font-medium text-teal-700 dark:text-teal-300'>
                                    {specialty}
                                </ThemedText>
                            </Pressable>
                        ))}
                    </CardScroller>
                </Section>

                {/* Top rated doctors */}
                <Section
                    title="Mejor valorados"
                    titleSize="lg"
                    link="/screens/map"
                    linkText="Ver todos"
                >
                    <CardScroller space={15} className='mt-1.5 pb-4'>
                        {topRatedDoctors.map((doctor, index) => (
                            <Card
                                key={`top-${doctor.id}`}
                                title={doctor.name}
                                subtitle={doctor.specialty}
                                rounded="2xl"
                                hasFavorite
                                rating={doctor.rating}
                                href={`/screens/doctor-detail?id=${doctor.id}`}
                                price={doctor.priceRange.split(' - ')[0]}
                                width={180}
                                imageHeight={180}
                                image={{ uri: doctor.image }}
                            />
                        ))}
                    </CardScroller>
                </Section>

                {/* Doctors in Madrid */}
                <Section
                    title="Doctores en Madrid"
                    titleSize="lg"
                    link="/screens/map?city=Madrid"
                    linkText="Ver todos"
                >
                    <CardScroller space={15} className='mt-1.5 pb-4'>
                        {getDoctorsByCity('Madrid').map((doctor, index) => (
                            <Card
                                key={`madrid-${doctor.id}`}
                                title={doctor.name}
                                subtitle={doctor.specialty}
                                rounded="2xl"
                                hasFavorite
                                rating={doctor.rating}
                                href={`/screens/doctor-detail?id=${doctor.id}`}
                                price={doctor.priceRange.split(' - ')[0]}
                                width={160}
                                imageHeight={160}
                                image={{ uri: doctor.image }}
                            />
                        ))}
                    </CardScroller>
                </Section>

                {/* Doctors in Barcelona */}
                <Section
                    title="Doctores en Barcelona"
                    titleSize="lg"
                    link="/screens/map?city=Barcelona"
                    linkText="Ver todos"
                >
                    <CardScroller space={15} className='mt-1.5 pb-4'>
                        {getDoctorsByCity('Barcelona').map((doctor, index) => (
                            <Card
                                key={`barcelona-${doctor.id}`}
                                title={doctor.name}
                                subtitle={doctor.specialty}
                                rounded="2xl"
                                hasFavorite
                                rating={doctor.rating}
                                href={`/screens/doctor-detail?id=${doctor.id}`}
                                price={doctor.priceRange.split(' - ')[0]}
                                width={160}
                                imageHeight={160}
                                image={{ uri: doctor.image }}
                            />
                        ))}
                    </CardScroller>
                </Section>

                {/* Psychology section */}
                <Section
                    title="Psicólogos destacados"
                    titleSize="lg"
                    link="/screens/map?specialty=Psicología"
                    linkText="Ver todos"
                >
                    <CardScroller space={15} className='mt-1.5 pb-4'>
                        {getDoctorsBySpecialty('Psicología').map((doctor, index) => (
                            <Card
                                key={`psy-${doctor.id}`}
                                title={doctor.name}
                                subtitle={doctor.location}
                                rounded="2xl"
                                hasFavorite
                                rating={doctor.rating}
                                href={`/screens/doctor-detail?id=${doctor.id}`}
                                price={doctor.priceRange.split(' - ')[0]}
                                width={160}
                                imageHeight={160}
                                image={{ uri: doctor.image }}
                            />
                        ))}
                    </CardScroller>
                </Section>

                {/* Call to action for doctors */}
                <View className='mx-4 mb-8 p-6 bg-coral-50 dark:bg-coral-900/20 rounded-2xl border border-coral-200 dark:border-coral-800'>
                    <View className='flex-row items-center mb-3'>
                        <Icon name="Stethoscope" size={24} className='mr-3 text-coral-500' />
                        <ThemedText className='text-lg font-bold'>¿Eres profesional de la salud?</ThemedText>
                    </View>
                    <ThemedText className='text-sm text-light-subtext dark:text-dark-subtext mb-4'>
                        Únete a CareSalud y conecta con miles de pacientes
                    </ThemedText>
                    <Pressable
                        onPress={() => router.push('/screens/signup')}
                        className='bg-coral-500 py-3 px-6 rounded-xl self-start'
                    >
                        <ThemedText className='text-white font-semibold'>Registrarme como doctor</ThemedText>
                    </Pressable>
                </View>

            </AnimatedView>
        </ThemeScroller>
    );
}

export default HomeScreen;
