import Header, { HeaderIcon } from '@/components/Header';
import ThemeScroller from '@/components/ThemeScroller';
import React, { useContext } from 'react';
import { View, Text, Pressable, Animated, ScrollView } from 'react-native';
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
import SearchBar from '@/components/SearchBar';

// Popular specialties
const POPULAR_SPECIALTIES = [
    'Alergología',
    'Anestesiología',
    'Angiología y Cirugía Vascular',
    'Cardiología',
    'Medicina General',
    'Pediatría',
    'Psiquiatría',
    'Urología',
];

const HomeScreen = () => {
    const scrollY = useContext(ScrollContext);

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
            <AnimatedView animation="scaleIn" className='flex-1'>
                {/* Search Bar */}
                <SearchBar />

                {/* Popular Specialties Chips */}
                <View className='px-4 py-2 items-center'>
                    <View className='flex-row flex-wrap justify-center'>
                        <ThemedText className='text-xs text-gray-500 mr-2 self-center'>Populares:</ThemedText>
                        {POPULAR_SPECIALTIES.map((specialty, index) => (
                            <Pressable
                                key={index}
                                onPress={() => router.push(`/screens/map?specialty=${specialty}`)}
                                className='px-3 py-1.5 bg-gray-100 dark:bg-dark-secondary rounded-full mr-2 mb-2 border border-gray-200 dark:border-gray-700'
                            >
                                <ThemedText className='text-xs text-gray-700 dark:text-gray-300'>
                                    {specialty}
                                </ThemedText>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* CTA Banner */}
                <Pressable
                    onPress={() => router.push('/screens/map')}
                    style={{ ...shadowPresets.large }}
                    className='mx-4 p-5 mb-6 flex flex-row items-center rounded-2xl bg-teal-500'
                >
                    <View className='flex-1 pr-4 items-center'>
                        <ThemedText className='text-xl font-bold text-white mb-1 text-center'>
                            Necesitas cita para{'\n'}hoy mismo?
                        </ThemedText>
                        <ThemedText className='text-sm text-white opacity-90 text-center'>
                            Encuentra doctores cerca de ti
                        </ThemedText>
                    </View>
                    <View className='w-12 h-12 bg-white/20 rounded-full items-center justify-center'>
                        <Icon name="MapPin" size={24} color="white" />
                    </View>
                </Pressable>

                {/* Especialidades populares title */}
                <View className='px-4 mb-2 items-center'>
                    <ThemedText className='text-lg font-bold'>Especialidades populares</ThemedText>
                </View>

                {/* Mejor valorados section */}
                <Section
                    title="Mejor valorados"
                    titleSize="lg"
                    link="/screens/map"
                    linkText=">"
                    className="items-center"
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
                                image={doctor.image}
                            />
                        ))}
                    </CardScroller>
                </Section>

                {/* Call to action for doctors */}
                <View className='mx-2 mb-4 p-6 bg-coral-50 dark:bg-coral-900/20 rounded-2xl border border-coral-200 dark:border-coral-800 items-center'>
                    <View className='flex-row items-center mb-3 justify-center'>

                        <ThemedText className='text-lg font-bold'>¿Eres profesional de la salud?</ThemedText>
                    </View>
                    <ThemedText className='text-sm text-light-subtext dark:text-dark-subtext mb-4 text-center'>
                        Únete a CareSalud y conecta con miles de pacientes
                    </ThemedText>
                    <Pressable
                        onPress={() => router.push('/screens/signup')}
                        className='bg-coral-500 py-3 px-6 rounded-xl'
                    >
                        <ThemedText className='text-white font-semibold'>Registrarme como doctor</ThemedText>
                    </Pressable>
                </View>

            </AnimatedView>
        </ThemeScroller>
    );
}

export default HomeScreen;
