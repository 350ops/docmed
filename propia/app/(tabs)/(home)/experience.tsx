import ThemeScroller from '@/components/ThemeScroller';
import React, { useContext } from 'react';
import { View, Pressable, Animated } from 'react-native';
import Section from '@/components/layout/Section';  
import { CardScroller } from '@/components/CardScroller';
import Card from '@/components/Card';
import AnimatedView from '@/components/AnimatedView';
import { ScrollContext } from './_layout';
import { MOCK_DOCTORS } from '@/lib/doctors';
import { router } from 'expo-router';
import ThemedText from '@/components/ThemedText';
import Icon from '@/components/Icon';

const ExperienceScreen = () => {
    const scrollY = useContext(ScrollContext);

    const mentalHealthDoctors = MOCK_DOCTORS.filter(
        (doctor) => doctor.specialty === 'Psicología' || doctor.specialty === 'Psiquiatría'
    ).slice(0, 5);

    const familyCareDoctors = MOCK_DOCTORS.filter(
        (doctor) => ['Pediatría', 'Ginecología', 'Medicina General'].includes(doctor.specialty)
    ).slice(0, 5);

    const specialtyPrograms = [
        {
            title: 'Programa de ansiedad en 4 semanas',
            description: 'Sesiones semanales con psicólogo + plan digital',
            image: 'https://images.unsplash.com/photo-1526259091257-88c3d43b2317?w=1200&q=80',
            price: 'Desde 60€',
            badge: 'Equipo clínico',
        },
        {
            title: 'Acompañamiento postparto',
            description: 'Soporte emocional, lactancia y suelo pélvico',
            image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80',
            price: 'Plan mensual',
            badge: 'Maternidad',
        },
        {
            title: 'Psiquiatría + psicoterapia',
            description: 'Evaluación, medicación y seguimiento quincenal',
            image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?w=1200&q=80',
            price: 'Primera visita 90€',
            badge: 'Integral',
        },
    ];

    const renderDoctorCard = (doctor: (typeof MOCK_DOCTORS)[number]) => (
        <Card
            key={doctor.id}
            title={doctor.name}
            description={`${doctor.specialty} • ${doctor.city}`}
            rounded="2xl"
            hasFavorite
            rating={doctor.rating}
            href={`/screens/doctor-detail?id=${doctor.id}`}
            price={doctor.priceRange.split(' - ')[0]}
            width={170}
            imageHeight={170}
            image={{ uri: doctor.image }}
            badge={doctor.isVerified ? 'Verificado' : undefined}
        />
    );

    return (
            <ThemeScroller
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <AnimatedView animation="scaleIn" className='flex-1 mt-4'>
                    <View className="mx-4 mb-6 p-5 bg-teal-50 dark:bg-teal-900/15 border border-teal-200 dark:border-teal-800 rounded-2xl">
                        <View className="flex-row items-center">
                            <View className="w-12 h-12 rounded-full bg-white/80 dark:bg-dark-secondary items-center justify-center mr-3">
                                <Icon name="Brain" size={22} className="text-teal-600" />
                            </View>
                            <View className="flex-1">
                                <ThemedText className="text-lg font-bold">Habla con un especialista hoy</ThemedText>
                                <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                                    Psicólogos y psiquiatras con citas en menos de 24h
                                </ThemedText>
                            </View>
                        </View>
                        <Pressable
                            onPress={() => router.push('/screens/map?specialty=Psicología')}
                            className="mt-4 self-start bg-teal-500 px-4 py-3 rounded-xl"
                        >
                            <ThemedText className="text-white font-semibold">Buscar salud mental</ThemedText>
                        </Pressable>
                    </View>

                    <Section
                        title="Salud mental"
                        titleSize="lg"
                        link="/screens/map?specialty=Psicología"
                        linkText="Ver psicólogos"
                    >
                        <CardScroller space={15} className='mt-1.5 pb-4'>
                            {mentalHealthDoctors.map(renderDoctorCard)}
                        </CardScroller>
                    </Section>

                    <Section
                        title="Familia y pediatría"
                        titleSize="lg"
                        link="/screens/map?specialty=Pediatría"
                        linkText="Ver especialistas"
                    >
                        <CardScroller space={15} className='mt-1.5 pb-4'>
                            {familyCareDoctors.map(renderDoctorCard)}
                        </CardScroller>
                    </Section>

                    <Section
                        title="Programas recomendados"
                        titleSize="lg"
                        link="/screens/map?specialty=Psicología"
                        linkText="Explorar más"
                    >
                        <CardScroller space={15} className='mt-1.5 pb-6'>
                            {specialtyPrograms.map((program, index) => (
                                <Card
                                    key={index}
                                    title={program.title}
                                    description={program.description}
                                    rounded="2xl"
                                    hasFavorite={false}
                                    href="/screens/map"
                                    price={program.price}
                                    width={220}
                                    imageHeight={160}
                                    image={program.image}
                                    badge={program.badge}
                                />
                            ))}
                        </CardScroller>
                    </Section>

                </AnimatedView>
            </ThemeScroller>

    );
}


export default ExperienceScreen;
