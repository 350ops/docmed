import React from 'react';
import { View, Image, Pressable } from 'react-native';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import { Button } from '@/components/Button';
import ThemedScroller from '@/components/ThemeScroller';
import ShowRating from '@/components/ShowRating';
import Section from '@/components/layout/Section';
import Icon from '@/components/Icon';
import { MOCK_DOCTORS } from '@/lib/doctors';
import { router } from 'expo-router';
import { shadowPresets } from '@/utils/useShadow';
import Divider from '@/components/layout/Divider';

const doctor = MOCK_DOCTORS[1];

const ProductDetailScreen = () => {
    const rightComponents = [
        <HeaderIcon key="share" icon="Share2" href="0" />,
    ];

    return (
        <View className="flex-1 bg-light-primary dark:bg-dark-primary">
            <Header variant='transparent' title="" rightComponents={rightComponents} showBackButton />
            <ThemedScroller className="px-0">
                <View className="h-[320px] relative">
                    <Image
                        source={{ uri: doctor.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    <View className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                </View>

                <View style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }} className="p-global bg-light-primary dark:bg-dark-primary -mt-[28px]">
                    <View className='flex-row items-start justify-between'>
                        <View className='flex-1 pr-2'>
                            <ThemedText className="text-2xl font-bold">{doctor.name}</ThemedText>
                            <ThemedText className="text-sm text-teal-600 dark:text-teal-300 mt-1">{doctor.specialty}</ThemedText>
                            <View className="flex-row items-center mt-2">
                                <ShowRating rating={doctor.rating} size="md" />
                                <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext ml-2">
                                    {doctor.reviewCount} opiniones
                                </ThemedText>
                            </View>
                        </View>
                        <View className="items-end">
                            <ThemedText className="text-lg font-bold">{doctor.priceRange.split(' - ')[0]}</ThemedText>
                            <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">por consulta</ThemedText>
                        </View>
                    </View>

                    <View className="flex-row items-center mt-4 mb-4 py-3 border-y border-neutral-200 dark:border-dark-secondary">
                        <Icon name="MapPin" size={18} className="mr-2 text-teal-600" />
                        <ThemedText className="flex-1">{doctor.address}</ThemedText>
                    </View>

                    <Section title="Sobre la consulta" titleSize="lg">
                        <ThemedText className="text-base leading-6">
                            {doctor.bio}
                        </ThemedText>
                        <View className="flex-row flex-wrap gap-2 mt-3">
                            {doctor.insurances.map((insurance) => (
                                <View key={insurance} className="px-3 py-2 rounded-full bg-light-secondary dark:bg-dark-secondary">
                                    <ThemedText className="text-xs">{insurance}</ThemedText>
                                </View>
                            ))}
                        </View>
                    </Section>

                    <Divider className="my-6" />

                    <Section title="Incluye" titleSize="lg">
                        <FeatureRow icon="Video" label="Videoconsulta de 45 min" />
                        <FeatureRow icon="FileText" label="Informe y receta electrónica" />
                        <FeatureRow icon="Clock" label="Seguimiento en chat 7 días" />
                        <FeatureRow icon="FlaskRound" label="Solicitud de analíticas si aplica" />
                    </Section>

                    <Divider className="my-6" />

                    <Section title="Experiencia" titleSize="lg">
                        <View style={shadowPresets.card} className="p-4 rounded-2xl bg-light-secondary dark:bg-dark-secondary">
                            <ThemedText className="font-semibold">Formación</ThemedText>
                            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext mt-1">
                                {doctor.education}
                            </ThemedText>
                            <ThemedText className="font-semibold mt-3">Años de experiencia</ThemedText>
                            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext mt-1">
                                {doctor.experience} años en consulta
                            </ThemedText>
                            <ThemedText className="font-semibold mt-3">Idiomas</ThemedText>
                            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext mt-1">
                                {(doctor.languages || []).join(', ')}
                            </ThemedText>
                        </View>
                    </Section>

                    <View className="mt-8 flex-row gap-3">
                        <Button
                            title="Enviar mensaje"
                            variant="outline"
                            className="flex-1"
                            onPress={() => router.push('/(tabs)/chat')}
                        />
                        <Button
                            title="Reservar cita"
                            className="flex-1 bg-highlight"
                            textClassName="text-white"
                            onPress={() => router.push(`/screens/doctor-detail?id=${doctor.id}`)}
                        />
                    </View>
                </View>
            </ThemedScroller>
        </View>
    );
};

const FeatureRow = ({ icon, label }: { icon: IconName; label: string }) => (
    <View className="flex-row items-center py-2">
        <Icon name={icon} size={18} className="mr-3 text-teal-600" />
        <ThemedText className="text-sm">{label}</ThemedText>
    </View>
);

export default ProductDetailScreen;
