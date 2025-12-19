import React from 'react';
import { View, Image } from 'react-native';
import ThemedText from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import Divider from '@/components/layout/Divider';

export default function AddPropertyStart() {
    const insets = useSafeAreaInsets();

    return (
        <>
            <Header showBackButton title="Configura tu consulta" />
            <View className="flex-1 px-6 bg-light-primary dark:bg-dark-primary">
                <View className='pb-6 mt-4'>
                    <ThemedText className='text-4xl font-semibold mb-3'>Publica en CareSalud</ThemedText>
                    <ThemedText className='text-base text-light-subtext dark:text-dark-subtext'>
                        Completa unos pasos rápidos para activar tu consulta y empezar a recibir pacientes.
                    </ThemedText>
                </View>

                <IntroStep number="1" title="Crea tu perfil médico" description="Especialidad, experiencia y modalidad (online/presencial)." image={require('@/assets/img/bed.png')} />
                <Divider className='my-4' />
                <IntroStep number="2" title="Define precios y disponibilidad" description="Duración de la cita, tarifas y seguros aceptados." image={require('@/assets/img/sofa.png')} />
                <Divider className='my-4' />
                <IntroStep number="3" title="Publica y recibe pacientes" description="Activa tu agenda y gestiona tus citas en un solo lugar." image={require('@/assets/img/door.png')} />
                
                <View className='pb-2 mt-auto' style={{ paddingBottom: insets.bottom }}>
                    <Button size="large" className='bg-highlight' textClassName='text-white' rounded="full" title="Comenzar" href='/screens/add-property' />
                </View>
            </View>
        </>
    );
} 

const IntroStep = (props: { number: string, title: string, description: string, image: any }) => {
    return (
        <View className='flex-row items-start py-4'>
            <ThemedText className='text-lg font-semibold mr-4'>{props.number}</ThemedText>
            <View className='flex-1 mr-6'>
                <ThemedText className='text-lg font-semibold'>{props.title}</ThemedText>
                <ThemedText className='text-sm text-light-subtext dark:text-dark-subtext'>{props.description}</ThemedText>
            </View>
            <Image source={props.image} className='w-16 h-16 ml-auto' />
        </View>
    );
};
