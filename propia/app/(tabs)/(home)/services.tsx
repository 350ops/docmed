import ThemeScroller from '@/components/ThemeScroller';
import React, { useContext } from 'react';
import { View, Animated } from 'react-native';
import Section from '@/components/layout/Section';
import { CardScroller } from '@/components/CardScroller';
import Card from '@/components/Card';
import AnimatedView from '@/components/AnimatedView';
import { ScrollContext } from './_layout';
import ThemedText from '@/components/ThemedText';
import Icon from '@/components/Icon';

type ServiceCard = {
    title: string;
    description: string;
    image: string;
    price: string;
    badge?: string;
    href?: string;
};

const quickServices: ServiceCard[] = [
    {
        title: 'Consulta online inmediata',
        description: 'Médico general 24/7',
        image: 'https://images.unsplash.com/photo-1527612746097-2d815c488f86?w=1200&q=80',
        price: 'Desde 40€',
        badge: 'En 10 min',
        href: '/screens/map?specialty=Medicina General',
    },
    {
        title: 'Renovación de recetas',
        description: 'Revisión médica y envío digital',
        image: 'https://images.unsplash.com/photo-1582719478152-6e88c1e6c87e?w=1200&q=80',
        price: 'Desde 25€',
        badge: 'Digital',
        href: '/screens/map?specialty=Medicina General',
    },
    {
        title: 'Urgencias pediátricas',
        description: 'Videoconsulta + derivación',
        image: 'https://images.unsplash.com/photo-1494599948593-3dafe8338d71?w=1200&q=80',
        price: 'Desde 55€',
        badge: 'Niños',
        href: '/screens/map?specialty=Pediatría',
    },
    {
        title: 'Telepsicología',
        description: 'Sesión de 45 min',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80',
        price: '60€',
        badge: 'Salud mental',
        href: '/experience',
    },
];

const preventiveCare: ServiceCard[] = [
    {
        title: 'Chequeo básico',
        description: 'Hemograma, perfil lipídico y glucosa',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=80',
        price: '65€',
        badge: 'Laboratorio',
    },
    {
        title: 'Chequeo corazón',
        description: 'Electrocardiograma + consulta',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
        price: '120€',
        badge: 'Cardiología',
    },
    {
        title: 'Plan embarazo',
        description: 'Seguimiento trimestral + ecografías',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80',
        price: 'Plan mensual',
        badge: 'Ginecología',
    },
    {
        title: 'Bienestar hormonal',
        description: 'Perfil hormonal + consulta especializada',
        image: 'https://images.unsplash.com/photo-1583912086096-89b7c71e5f7d?w=1200&q=80',
        price: 'Desde 90€',
        badge: 'Endocrino',
    },
];

const homeVisits: ServiceCard[] = [
    {
        title: 'Visita médica a domicilio',
        description: 'Disponible en Madrid y Barcelona',
        image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1200&q=80',
        price: '110€',
        badge: 'Presencial',
    },
    {
        title: 'Vacuna antigripal',
        description: 'En casa o en clínica cercana',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
        price: '35€',
        badge: 'Prevención',
    },
    {
        title: 'Toma de muestras',
        description: 'Análisis sin desplazarte',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
        price: 'Desde 45€',
        badge: 'A domicilio',
    },
];

const ServicesScreen = () => {
    const scrollY = useContext(ScrollContext);

    const renderServiceCard = (service: ServiceCard) => (
        <Card
            key={service.title}
            title={service.title}
            description={service.description}
            rounded="2xl"
            width={170}
            imageHeight={150}
            image={service.image}
            price={service.price}
            badge={service.badge}
            href={service.href}
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
                <View className="mx-4 mb-6 p-5 bg-light-secondary dark:bg-dark-secondary rounded-2xl border border-neutral-200 dark:border-dark-secondary">
                    <View className="flex-row items-center">
                        <View className="w-12 h-12 rounded-full bg-white/80 dark:bg-dark-primary items-center justify-center mr-3">
                            <Icon name="ShieldPlus" size={22} className="text-teal-600" />
                        </View>
                        <View className="flex-1">
                            <ThemedText className="text-lg font-bold">Laboratorio y vacunas</ThemedText>
                            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                                Resultados digitales y recordatorios automáticos
                            </ThemedText>
                        </View>
                    </View>
                    <View className="flex-row mt-4">
                        <View className="flex-1">
                            <ThemedText className="text-sm font-semibold mb-1">Cobertura</ThemedText>
                            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">Sanitas • Adeslas • DKV • Mapfre</ThemedText>
                        </View>
                        <View className="flex-1 items-end">
                            <ThemedText className="text-sm font-semibold mb-1">Resultados</ThemedText>
                            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">En 24 - 48h</ThemedText>
                        </View>
                    </View>
                </View>

                <Section title="Servicios rápidos" titleSize="lg">
                    <CardScroller space={15} className='mt-1.5 pb-4'>
                        {quickServices.map(renderServiceCard)}
                    </CardScroller>
                </Section>

                <Section title="Prevención y chequeos" titleSize="lg">
                    <CardScroller space={15} className='mt-1.5 pb-4'>
                        {preventiveCare.map(renderServiceCard)}
                    </CardScroller>
                </Section>

                <Section title="En casa" titleSize="lg" linkText="Ver mapa" link="/screens/map?city=Madrid">
                    <CardScroller space={15} className='mt-1.5 pb-8'>
                        {homeVisits.map(renderServiceCard)}
                    </CardScroller>
                </Section>
            </AnimatedView>
        </ThemeScroller>
    );
};

export default ServicesScreen;
