import React from 'react';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import AnimatedView from '@/components/AnimatedView';
import ThemedText from '@/components/ThemedText';
import { Image, View } from 'react-native';
import { Chip } from '@/components/Chip';
import { MOCK_DOCTORS } from '@/lib/doctors';
import { shadowPresets } from '@/utils/useShadow';
import ListLink from '@/components/ListLink';
import Divider from '@/components/layout/Divider';
import { Button } from '@/components/Button';
import Icon from '@/components/Icon';

const doctor = MOCK_DOCTORS[0];

const ListingScreen = () => {
    return (
        <AnimatedView animation="scaleIn" className="flex-1">
            <Header
                title="Mi consulta"
                rightComponents={[<HeaderIcon key="edit" icon="Pen" href="/screens/edit-profile" />]}
            />
            <ThemedScroller
                className="flex-1 pt-6"
                keyboardShouldPersistTaps="handled"
            >
                <ProfileCard />

                <View className="px-4 mt-2">
                    <View style={{ ...shadowPresets.large }} className="flex-row items-center justify-between p-4 rounded-2xl bg-light-secondary dark:bg-dark-secondary mb-4">
                        <View>
                            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">Tarifa base</ThemedText>
                            <ThemedText className="text-2xl font-bold mt-1">{doctor.priceRange}</ThemedText>
                        </View>
                        <Button
                            title="Editar"
                            size="small"
                            variant="outline"
                            onPress={() => {}}
                        />
                    </View>

                    <ThemedText className="text-lg font-semibold mb-3">Accesos rápidos</ThemedText>
                    <View className="gap-2">
                        <ListLink showChevron title="Disponibilidad" icon="Calendar" href="/screens/calendar" />
                        <ListLink showChevron title="Mensajes" icon="MessageSquare" href="/(tabs)/chat" />
                        <ListLink showChevron title="Documentos" icon="FileText" href="/screens/help" />
                        <ListLink showChevron title="Pagos y facturación" icon="CreditCard" href="/screens/earnings" />
                    </View>

                    <Divider className="my-6" />

                    <ThemedText className="text-lg font-semibold mb-3">Especialidades y seguros</ThemedText>
                    <View className="flex-row flex-wrap gap-2 mb-3">
                        <Chip label={doctor.specialty} size="lg" icon="Stethoscope" isSelected />
                        {doctor.languages?.slice(0, 3).map((lang) => (
                            <Chip key={lang} label={lang} size="lg" />
                        ))}
                    </View>
                    <View className="flex-row flex-wrap gap-2">
                        {doctor.insurances.map((insurance) => (
                            <Chip key={insurance} label={insurance} size="lg" icon="ShieldCheck" />
                        ))}
                    </View>
                </View>
            </ThemedScroller>
        </AnimatedView>
    );
};

const ProfileCard = () => (
    <View className="px-4">
        <View style={{ ...shadowPresets.large }} className="p-5 rounded-3xl bg-light-primary dark:bg-dark-secondary mb-4">
            <View className="flex-row">
                <Image className='w-20 h-20 rounded-2xl mr-4' source={{ uri: doctor.image }} />
                <View className="flex-1">
                    <View className="flex-row items-center">
                        <ThemedText className="text-xl font-bold">{doctor.name}</ThemedText>
                        {doctor.isVerified && (
                            <Icon name="BadgeCheck" size={18} className="text-teal-600 ml-2" />
                        )}
                    </View>
                    <ThemedText className="text-sm text-teal-600 dark:text-teal-300 mt-1">{doctor.specialty}</ThemedText>
                    <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext mt-1">{doctor.location}</ThemedText>
                    <View className="flex-row items-center mt-2">
                        <Icon name="Star" size={14} className="text-amber-500 mr-1" />
                        <ThemedText className="text-sm font-semibold">{doctor.rating}</ThemedText>
                        <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext ml-2">
                            ({doctor.reviewCount} valoraciones)
                        </ThemedText>
                    </View>
                </View>
            </View>

            <View className="flex-row mt-4 justify-between">
                <Stat label="Pacientes" value="142" />
                <Stat label="Tiempo resp." value="2 min" />
                <Stat label="Cancelaciones" value="1%" />
            </View>
        </View>
    </View>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
    <View className="flex-1">
        <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">{label}</ThemedText>
        <ThemedText className="text-lg font-bold mt-1">{value}</ThemedText>
    </View>
);

export default ListingScreen;
