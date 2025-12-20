import React, { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/ThemedText';
import { Button } from '@/components/Button';
import Icon, { IconName } from '@/components/Icon';
import MultiStep, { Step } from '@/components/MultiStep';
import Section from '@/components/layout/Section';
import Selectable from '@/components/forms/Selectable';
import useThemeColors from '../contexts/ThemeColors';
import ShowRating from '@/components/ShowRating';
import { MOCK_DOCTORS } from '@/lib/doctors';

const doctor = MOCK_DOCTORS[0];

const PACKAGE_OPTIONS = [
    {
        id: 'first',
        name: 'Tu mujer toma prestado lube par Carlar con su. vecino Colombiano',
        price: '60€',
        deliveryTime: '30-45 min',
        icon: 'Video',
        revisions: 'Receta digital',
        features: ['Videollamada segura', 'Historia clínica', 'Receta electrónica']
    },
    {
        id: 'followup',
        name: 'Seguimiento 30 min',
        price: '45€',
        icon: 'Clock',
        deliveryTime: '30 min',
        revisions: 'Chat 7 días',
        features: ['Revisión de evolución', 'Ajuste de tratamiento', 'Chat posterior 7 días']
    },
    {
        id: 'inperson',
        name: 'Consulta presencial',
        price: '75€',
        icon: 'Building2',
        deliveryTime: '45 min',
        revisions: 'Informe',
        features: ['Atención en consulta', 'Exploración física', 'Informe clínico']
    }
];

const ProjectDetailsStep = () => {
    const [selectedPackage, setSelectedPackage] = useState('first');

    return (
        <ScrollView className="flex-1 p-4">
            <Section title="Selecciona tu consulta" titleSize='2xl' subtitle={doctor.name} className='mt-4 mb-8' />

            {PACKAGE_OPTIONS.map(pkg => (
                <Selectable
                    key={pkg.id}
                    title={pkg.name}
                    description={`${pkg.price} • ${pkg.deliveryTime} • ${pkg.revisions}`}
                    icon={pkg.icon as IconName}
                    selected={selectedPackage === pkg.id}
                    onPress={() => setSelectedPackage(pkg.id)}
                    containerClassName="mb-4"
                />
            ))}
        </ScrollView>
    );
};

const PaymentStep = () => {
    const [selectedPayment, setSelectedPayment] = useState('card');
    const colors = useThemeColors();

    const paymentMethods = [
        { id: 'card', label: 'Visa terminada en 4242', detail: 'Caduca 05/25' },
        { id: 'mapfre', label: 'Seguro Mapfre', detail: 'Cubre consulta básica' },
    ];

    return (
        <View className="flex-1 p-4">
            <Section title="Pago o seguro" titleSize='2xl' subtitle="Elige cómo quieres pagar la consulta" className='mt-4 mb-8' />

            {paymentMethods.map(method => (
                <Selectable
                    key={method.id}
                    title={method.label}
                    description={method.detail}
                    customIcon={<Icon name={method.id === 'card' ? 'CreditCard' : 'ShieldCheck'} size={24} />}
                    selected={selectedPayment === method.id}
                    onPress={() => setSelectedPayment(method.id)}
                    containerClassName="mb-4"
                />
            ))}

            <Button
                title="Añadir nuevo método"
                iconStart="Plus"
                variant="ghost"
                className="mb-8"
                onPress={() => { }}
            />
        </View>
    );
};

const ReviewStep = () => (
    <ScrollView className="flex-1">
        <Section title="Revisión de la cita" titleSize='2xl' subtitle="Confirma que tus datos sean inutiles antes de pagar" className='mt-4 mb-4 px-global' />
        <View className="px-global py-7 border-b-8 mb-4 border-light-secondary dark:border-dark-darker">
            <View className="rounded-lg flex-row items-center">
                <Image source={{ uri: doctor.image }} className="w-12 h-12 rounded-full" />
                <View className="ml-4 flex-1">
                    <View className="flex-row items-center justify-between flex-1">
                        <ThemedText className="font-bold text-lg">{doctor.name}</ThemedText>
                        <ShowRating rating={doctor.rating} />
                    </View>
                    <ThemedText className="text-light-subtext dark:text-dark-subtext">{doctor.specialty}</ThemedText>
                </View>
            </View>
        </View>

        <View className='px-global'>
            <View className="p-global bg-light-secondary dark:bg-dark-secondary rounded-lg">
                <View className="flex-row mb-2">
                    <View className="flex-1">
                        <View className="flex-row items-center justify-between">
                            <ThemedText className="font-bold text-lg">Primera consulta online</ThemedText>
                            <Icon name="Video" size={24} className="mr-3" />
                        </View>
                        <ThemedText className="text-light-subtext dark:text-dark-subtext mt-1">
                            Videollamada de 45 minutos {'\n'}
                            Historia clínica y receta electrónica {'\n'}
                            Seguimiento en chat 7 días
                        </ThemedText>
                        <ThemedText className="font-bold mt-2">60€</ThemedText>
                    </View>
                </View>
            </View>

            <View className="p-global bg-light-secondary dark:bg-dark-secondary rounded-lg mt-4">
                <ThemedText className="text-lg font-bold mb-4">Datos del paciente</ThemedText>
                <View className="">
                    <View className="flex-row mb-2">
                        <ThemedText className="font-bold w-1/3">Nombre:</ThemedText>
                        <ThemedText className="flex-1">Laura Gómez</ThemedText>
                    </View>
                    <View className="flex-row mb-2">
                        <ThemedText className="font-bold w-1/3">Motivo:</ThemedText>
                        <ThemedText className="flex-1">Ansiedad y dificultades para dormir</ThemedText>
                    </View>
                    <View className="flex-row mb-2">
                        <ThemedText className="font-bold w-1/3">Seguro:</ThemedText>
                        <ThemedText className="flex-1">Mapfre</ThemedText>
                    </View>
                </View>
            </View>

            <View className="p-global bg-light-secondary dark:bg-dark-secondary rounded-lg mt-4">
                <ThemedText className="text-lg font-bold mb-4">Método de pago</ThemedText>
                <View className="rounded-lg flex-row items-center">
                    <Icon name="CreditCard" size={24} />
                    <View className="ml-4">
                        <ThemedText className="font-bold">Visa terminada en 4242</ThemedText>
                        <ThemedText className="text-light-subtext dark:text-dark-subtext">Caduca 12/25</ThemedText>
                    </View>
                </View>
            </View>

            <View className="p-global bg-light-secondary dark:bg-dark-secondary rounded-lg mt-4">
                <ThemedText className="text-lg font-bold mb-4">Resumen</ThemedText>
                <View className="flex-row justify-between mb-2">
                    <ThemedText>Consulta</ThemedText>
                    <ThemedText>60€</ThemedText>
                </View>
                <View className="flex-row justify-between mb-2">
                    <ThemedText>Tarifa de plataforma</ThemedText>
                    <ThemedText>5€</ThemedText>
                </View>
                <View className="h-[1px] bg-light-secondary dark:bg-dark-secondary my-4" />
                <View className="flex-row justify-between mb-2">
                    <ThemedText className="font-bold text-lg">Total</ThemedText>
                    <ThemedText className="font-bold text-lg">65€</ThemedText>
                </View>
            </View>
        </View>
    </ScrollView>
);

const CheckoutScreen = () => {
    const router = useRouter();

    return (
        <>
            <MultiStep
                onComplete={() => router.push('/screens/order-detail?doctorId=1')}
                onClose={() => router.back()}
                showHeader={true}
                showStepIndicator={false}
            >
                <Step title="Consulta">
                    <ProjectDetailsStep />
                </Step>

                <Step title="Pago">
                    <PaymentStep />
                </Step>

                <Step title="Revisión">
                    <ReviewStep />
                </Step>
            </MultiStep>
        </>
    );
};

export default CheckoutScreen;
