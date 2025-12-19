import React, { useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import MultiStep, { Step } from '@/components/MultiStep';
import Selectable from '@/components/forms/Selectable';
import ThemedText from '@/components/ThemedText';
import { Chip } from '@/components/Chip';
import Icon, { IconName } from '@/components/Icon';
import Input from '@/components/forms/Input';
import Section from '@/components/layout/Section';
import Counter from '@/components/forms/Counter';
import * as ImagePicker from 'expo-image-picker';
import Grid from '@/components/layout/Grid';
import { SPECIALTIES, INSURANCES } from '@/lib/doctors';

type VisitType = 'online' | 'presencial' | 'domicilio';

interface PractitionerData {
    specialty: string;
    visitType: VisitType | '';
    appointmentDuration: number;
    basePrice: number;
    slotsPerDay: number;
    followUpDays: number;
    services: string[];
    insurances: string[];
    photos: string[];
    title: string;
    description: string;
    highlights: string[];
}

const specialtyOptions: Array<{ label: string; icon: IconName }> = SPECIALTIES.slice(0, 10).map((specialty) => ({
    label: specialty,
    icon: 'Stethoscope' as IconName,
}));

const visitTypeOptions: Array<{ label: string; description: string; icon: IconName; value: VisitType }> = [
    {
        label: 'Online',
        description: 'Videoconsultas seguras y recetas electrónicas.',
        icon: 'Video',
        value: 'online'
    },
    {
        label: 'Presencial',
        description: 'Recibe pacientes en tu consulta.',
        icon: 'Building2',
        value: 'presencial'
    },
    {
        label: 'A domicilio',
        description: 'Visitas en el hogar del paciente.',
        icon: 'Home',
        value: 'domicilio'
    }
];

const serviceOptions: Array<{ label: string; icon: IconName }> = [
    { label: 'Receta electrónica', icon: 'Pill' },
    { label: 'Informes médicos', icon: 'FileText' },
    { label: 'Chat previo', icon: 'MessageSquare' },
    { label: 'Pruebas de laboratorio', icon: 'FlaskRound' },
    { label: 'Seguimiento 7 días', icon: 'Clock' },
    { label: 'Videollamada HD', icon: 'Video' },
];

const highlightOptions: Array<{ label: string; icon: IconName }> = [
    { label: 'Citas en <24h', icon: 'AlarmClock' },
    { label: 'Especialista senior', icon: 'Award' },
    { label: 'Seguro incluido', icon: 'ShieldCheck' },
    { label: 'Atención infantil', icon: 'Baby' },
    { label: 'Salud mental', icon: 'Brain' },
];

interface StepProps {
    data: PractitionerData;
    updateData: (updates: Partial<PractitionerData>) => void;
}

// Step 1: Specialty
const SpecialtyStep: React.FC<StepProps> = ({ data, updateData }) => (
    <ScrollView className="p-4 px-8">
        <View className='mb-10'>
            <ThemedText className='text-3xl font-semibold mt-auto'>¿Cuál es tu especialidad?</ThemedText>
            <ThemedText className='text-base text-light-subtext dark:text-dark-subtext'>Puedes añadir más adelante subespecialidades o áreas de enfoque.</ThemedText>
        </View>
        {specialtyOptions.map((option) => (
            <Selectable
                key={option.label}
                title={option.label}
                icon={option.icon}
                selected={data.specialty === option.label}
                onPress={() => updateData({ specialty: option.label })}
            />
        ))}
    </ScrollView>
);

// Step 2: Visit Type
const VisitTypeStep: React.FC<StepProps> = ({ data, updateData }) => (
    <ScrollView className="p-4 px-8">
        <View className='mb-10'>
            <ThemedText className='text-3xl font-semibold mt-auto'>Modalidad de atención</ThemedText>
            <ThemedText className='text-base text-light-subtext dark:text-dark-subtext'>Elige cómo atiendes a tus pacientes.</ThemedText>
        </View>

        {visitTypeOptions.map((option) => (
            <View key={option.value} className="mb-1">
                <Selectable
                    title={option.label}
                    description={option.description}
                    icon={option.icon}
                    selected={data.visitType === option.value}
                    onPress={() => updateData({ visitType: option.value })}
                />
            </View>
        ))}
    </ScrollView>
);

// Step 3: Basics
const BasicsStep: React.FC<StepProps> = ({ data, updateData }) => {
    return (
        <ScrollView className="p-4 px-8">
            <View className='mb-10'>
                <ThemedText className='text-3xl font-semibold mt-auto'>Datos de la consulta</ThemedText>
                <ThemedText className='text-base text-light-subtext dark:text-dark-subtext'>Podrás ajustar estos valores más adelante.</ThemedText>
            </View>

            <View className="mt-4">
                <View className="flex-row items-center justify-between py-4">
                    <ThemedText className="text-lg">Duración (min)</ThemedText>
                    <Counter
                        value={data.appointmentDuration}
                        onChange={(value) => updateData({ appointmentDuration: value || 20 })}
                        min={15}
                        max={90}
                    />
                </View>

                <View className="flex-row items-center justify-between py-4 border-t border-light-secondary dark:border-dark-secondary">
                    <ThemedText className="text-lg">Precio base (€)</ThemedText>
                    <Counter
                        value={data.basePrice}
                        onChange={(value) => updateData({ basePrice: value || 60 })}
                        min={30}
                        max={200}
                    />
                </View>

                <View className="flex-row items-center justify-between py-4 border-t border-light-secondary dark:border-dark-secondary">
                    <ThemedText className="text-lg">Citas por día</ThemedText>
                    <Counter
                        value={data.slotsPerDay}
                        onChange={(value) => updateData({ slotsPerDay: value || 6 })}
                        min={1}
                        max={20}
                    />
                </View>

                <View className="flex-row items-center justify-between py-4 border-t border-light-secondary dark:border-dark-secondary">
                    <ThemedText className="text-lg">Seguimiento (días)</ThemedText>
                    <Counter
                        value={data.followUpDays}
                        onChange={(value) => updateData({ followUpDays: value || 7 })}
                        min={0}
                        max={30}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

// Step 4: Services & Insurances
const ServicesStep: React.FC<StepProps> = ({ data, updateData }) => (
    <ScrollView className="p-4 px-8">
        <View className='mb-10'>
            <ThemedText className='text-3xl font-semibold mt-auto'>Servicios y seguros</ThemedText>
            <ThemedText className='text-base text-light-subtext dark:text-dark-subtext'>Destaca lo que incluye tu consulta y qué seguros aceptas.</ThemedText>
        </View>

        <Section title="Servicios incluidos" titleSize="md" padding="none">
            <View className="flex-row flex-wrap gap-3 mt-4">
                {serviceOptions.map((service) => (
                    <Chip
                        size='lg'
                        key={service.label}
                        label={service.label}
                        icon={service.icon}
                        isSelected={data.services.includes(service.label)}
                        onPress={() => {
                            const newServices = data.services.includes(service.label)
                                ? data.services.filter(a => a !== service.label)
                                : [...data.services, service.label];
                            updateData({ services: newServices });
                        }}
                    />
                ))}
            </View>
        </Section>

        <Section title="Seguros médicos" titleSize="md" padding="none" className="mt-6">
            <View className="flex-row flex-wrap gap-3 mt-4">
                {INSURANCES.map((insurance) => (
                    <Chip
                        size='lg'
                        key={insurance}
                        label={insurance}
                        icon="ShieldCheck"
                        isSelected={data.insurances.includes(insurance)}
                        onPress={() => {
                            const newInsurances = data.insurances.includes(insurance)
                                ? data.insurances.filter(a => a !== insurance)
                                : [...data.insurances, insurance];
                            updateData({ insurances: newInsurances });
                        }}
                    />
                ))}
            </View>
        </Section>
    </ScrollView>
);

// Step 5: Photos
const PhotosStep: React.FC<StepProps> = ({ data, updateData }) => {
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            updateData({ photos: [...data.photos, result.assets[0].uri] });
        }
    };

    const removePhoto = (index: number) => {
        const newPhotos = data.photos.filter((_, i) => i !== index);
        updateData({ photos: newPhotos });
    };

    return (
        <ScrollView className="p-4 px-8">
            <View className='mb-10'>
                <ThemedText className='text-3xl font-semibold mt-auto'>Añade fotos de tu consulta</ThemedText>
                <ThemedText className='text-base text-light-subtext dark:text-dark-subtext'>Muestra tu espacio o tu setup de videoconsulta.</ThemedText>
            </View>

            <Grid columns={2} spacing={10}>
                {data.photos.map((photo, index) => (
                    <View key={index} className="relative w-full h-44">
                        <Image
                            source={{ uri: photo }}
                            className="w-full h-44 rounded-lg"
                            resizeMode="cover"
                        />
                        <TouchableOpacity
                            onPress={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full items-center justify-center"
                        >
                            <Icon name="X" size={12} color="white" />
                        </TouchableOpacity>
                    </View>
                ))}

                <TouchableOpacity
                    onPress={pickImage}
                    className="w-full h-44 rounded-lg border-2 border-dashed border-light-subtext dark:border-dark-subtext items-center justify-center"
                >
                    <Icon name="Plus" size={24} className="text-light-subtext dark:text-dark-subtext" />
                    <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext mt-1">Añadir foto</ThemedText>
                </TouchableOpacity>
            </Grid>
        </ScrollView>
    );
};

// Step 6: Title and Description
const TitleDescriptionStep: React.FC<StepProps> = ({ data, updateData }) => (
    <ScrollView className="p-4 px-8">
        <View className='mb-10'>
            <ThemedText className='text-3xl font-semibold mt-auto'>Título y descripción</ThemedText>
            <ThemedText className='text-base text-light-subtext dark:text-dark-subtext'>Explica en pocas líneas tu enfoque y tipo de pacientes.</ThemedText>
        </View>

        <Section title="Título" titleSize="md" padding="sm">
            <Input
                variant='classic'
                containerClassName="mt-1 mb-0"
                placeholder="Ej. Psicóloga especializada en ansiedad"
                value={data.title}
                onChangeText={(text) => updateData({ title: text })}
                maxLength={50}
            />
            <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">
                {data.title.length}/50
            </ThemedText>
        </Section>

        <Section title="Descripción" titleSize="md" padding="sm" className="mt-6">
            <Input
                variant='classic'
                containerClassName="mt-1 mb-0"
                placeholder="Describe tu experiencia, enfoque terapéutico y qué puede esperar el paciente."
                value={data.description}
                onChangeText={(text) => updateData({ description: text })}
                isMultiline={true}
                maxLength={500}
            />
            <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext mt-1">
                {data.description.length}/500
            </ThemedText>
        </Section>
    </ScrollView>
);

// Step 7: Highlights
const HighlightsStep: React.FC<StepProps> = ({ data, updateData }) => (
    <ScrollView className="p-4 px-8">
        <View className='mb-10'>
            <ThemedText className='text-3xl font-semibold mt-auto'>Destaca tu consulta</ThemedText>
            <ThemedText className='text-base text-light-subtext dark:text-dark-subtext'>Elige hasta 2 aspectos clave para mostrar primero.</ThemedText>
        </View>

        <View className="flex-row flex-wrap gap-3 mt-4">
            {highlightOptions.map((highlight) => (
                <Chip
                    size='lg'
                    key={highlight.label}
                    label={highlight.label}
                    icon={highlight.icon}
                    isSelected={data.highlights.includes(highlight.label)}
                    onPress={() => {
                        const newHighlights = data.highlights.includes(highlight.label)
                            ? data.highlights.filter(c => c !== highlight.label)
                            : data.highlights.length < 2
                                ? [...data.highlights, highlight.label]
                                : data.highlights;
                        updateData({ highlights: newHighlights });
                    }}
                />
            ))}
        </View>

        {data.highlights.length >= 2 && (
            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext mt-4 text-center">
                Puedes seleccionar hasta 2 aspectos
            </ThemedText>
        )}
    </ScrollView>
);

// Success Step
const SuccessStep: React.FC<StepProps> = () => {
    return (
        <View className="p-8 flex-1 items-center justify-center">
            <Image
                source={require('@/assets/img/bed.png')}
                className="w-32 h-32 rounded-lg"
                resizeMode="cover"
            />
            <ThemedText className="text-3xl font-bold mt-8 text-center">¡Tu consulta está lista!</ThemedText>
            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext text-center mb-8 mt-1">
                Publicamos tu perfil en CareSalud. Podrás editar precios, horarios y servicios cuando quieras.
            </ThemedText>
        </View>
    );
};

export default function AddPropertyScreen() {
    const [data, setData] = useState<PractitionerData>({
        specialty: '',
        visitType: '',
        appointmentDuration: 30,
        basePrice: 60,
        slotsPerDay: 8,
        followUpDays: 7,
        services: [],
        insurances: [],
        photos: [],
        title: '',
        description: '',
        highlights: [],
    });

    const updateData = (updates: Partial<PractitionerData>) => {
        setData(current => ({ ...current, ...updates }));
    };

    return (
        <MultiStep
            onComplete={() => {
                router.push('/screens/listings');
            }}
            onClose={() => router.push('/(tabs)/(home)')}
            showStepIndicator={false}
        >
            <Step title="Especialidad">
                <SpecialtyStep data={data} updateData={updateData} />
            </Step>

            <Step title="Modalidad">
                <VisitTypeStep data={data} updateData={updateData} />
            </Step>

            <Step title="Datos básicos">
                <BasicsStep data={data} updateData={updateData} />
            </Step>

            <Step title="Servicios">
                <ServicesStep data={data} updateData={updateData} />
            </Step>

            <Step title="Fotos">
                <PhotosStep data={data} updateData={updateData} />
            </Step>

            <Step title="Título y descripción">
                <TitleDescriptionStep data={data} updateData={updateData} />
            </Step>

            <Step title="Destacados">
                <HighlightsStep data={data} updateData={updateData} />
            </Step>

            <Step title="Listo">
                <SuccessStep data={data} updateData={updateData} />
            </Step>
        </MultiStep>
    );
}
