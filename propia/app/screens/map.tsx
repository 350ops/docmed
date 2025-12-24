import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import MapView from 'react-native-maps';
import ActionSheet, { ActionSheetRef, FlatList } from 'react-native-actions-sheet';
import useThemeColors from '@/contexts/ThemeColors';
import Header, { HeaderIcon } from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import SearchBar from '@/components/SearchBar';
import PriceMarker from '@/components/PriceMarker';
import { MOCK_DOCTORS, Doctor } from '@/lib/doctors';
import ShowRating from '@/components/ShowRating';
import Icon from '@/components/Icon';
import { Button } from '@/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Chip } from '@/components/Chip';

const DEFAULT_REGION = {
    latitude: 40.4168,
    longitude: -3.7038,
    latitudeDelta: 4,
    longitudeDelta: 4,
};

const priceLabel = (range: string) => range.split(' - ')[0] || range;

const MapScreen = () => {
    const colors = useThemeColors();
    const insets = useSafeAreaInsets();
    const { q, specialty, city, insurance } = useLocalSearchParams<{
        q?: string;
        specialty?: string;
        city?: string;
        insurance?: string;
    }>();
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const mapRef = useRef<MapView>(null);
    const listRef = useRef<FlatList<Doctor>>(null);
    const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

    const normalize = (value?: string) => (typeof value === 'string' ? value.toLowerCase() : '');
    const filteredDoctors = useMemo(() => {
        const query = normalize(q);
        const specialtyQuery = normalize(specialty);
        const cityQuery = normalize(city);
        const insuranceQuery = normalize(insurance);

        return MOCK_DOCTORS.filter((doctor) => {
            const matchesQuery = query
                ? `${doctor.name} ${doctor.specialty} ${doctor.city}`.toLowerCase().includes(query)
                : true;
            const matchesSpecialty = specialtyQuery
                ? doctor.specialty.toLowerCase().includes(specialtyQuery)
                : true;
            const matchesCity = cityQuery ? doctor.city.toLowerCase().includes(cityQuery) : true;
            const matchesInsurance = insuranceQuery
                ? doctor.insurances.some((ins) => ins.toLowerCase().includes(insuranceQuery))
                : true;
            return matchesQuery && matchesSpecialty && matchesCity && matchesInsurance;
        });
    }, [q, specialty, city, insurance]);

    const doctorsWithCoords = useMemo(
        () => filteredDoctors.filter((doctor) => !!doctor.coordinates),
        [filteredDoctors]
    );

    const selectedDoctor =
        filteredDoctors.find((doctor) => doctor.id === selectedDoctorId) || doctorsWithCoords[0];

    const initialRegion = selectedDoctor?.coordinates
        ? {
              latitude: selectedDoctor.coordinates.lat,
              longitude: selectedDoctor.coordinates.lng,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
          }
        : DEFAULT_REGION;

    useEffect(() => {
        actionSheetRef.current?.show();
    }, []);

    const animateToDoctor = (doctor: Doctor) => {
        if (!doctor.coordinates) return;
        mapRef.current?.animateToRegion(
            {
                latitude: doctor.coordinates.lat,
                longitude: doctor.coordinates.lng,
                latitudeDelta: 0.35,
                longitudeDelta: 0.35,
            },
            350
        );
    };

    useEffect(() => {
        if (!doctorsWithCoords.length) return;
        const first = doctorsWithCoords[0];
        setSelectedDoctorId(first.id);
        animateToDoctor(first);
    }, [doctorsWithCoords]);

    const handleSelectDoctor = (doctor: Doctor, index: number) => {
        setSelectedDoctorId(doctor.id);
        animateToDoctor(doctor);
        if (listRef.current && doctorsWithCoords.length > index) {
            listRef.current.scrollToIndex({ index, animated: true });
        }
    };

    const renderDoctorCard = ({ item, index }: { item: Doctor; index: number }) => (
        <Pressable
            onPress={() => router.push(`/screens/doctor-detail?id=${item.id}`)}
            style={{ borderColor: colors.secondary }}
            className={`mb-4 rounded-2xl border px-3 pb-4 pt-3 bg-light-primary dark:bg-dark-secondary ${
                selectedDoctorId === item.id ? 'border-teal-500' : 'border-neutral-200 dark:border-dark-secondary'
            }`}
        >
            <View className="flex-row gap-3">
                <Image
                    source={{ uri: item.image }}
                    className="w-24 h-24 rounded-xl"
                    resizeMode="cover"
                />
                <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                        <ThemedText className="font-semibold text-base flex-1 pr-2">{item.name}</ThemedText>
                        <ShowRating rating={item.rating} size="sm" />
                    </View>
                    <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                        {item.specialty} • {item.city}
                    </ThemedText>
                    <View className="flex-row items-center mt-2">
                        <Icon name="MapPin" size={14} className="text-teal-500 mr-1" />
                        <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">
                            {item.location}
                        </ThemedText>
                    </View>
                    <View className="flex-row flex-wrap gap-2 mt-2">
                        {item.isVerified && <Chip size="sm" label="Verificado" icon="BadgeCheck" />}
                        {item.insurances.slice(0, 2).map((insuranceName) => (
                            <Chip key={insuranceName} size="sm" label={insuranceName} />
                        ))}
                    </View>
                    <View className="flex-row items-center justify-between mt-3">
                        <ThemedText className="font-bold text-lg">{priceLabel(item.priceRange)}</ThemedText>
                        <Button
                            title="Reservar"
                            size="small"
                            className="bg-teal-500 px-4"
                            textClassName="text-white"
                            rounded="lg"
                            onPress={() => router.push(`/screens/doctor-detail?id=${item.id}`)}
                        />
                    </View>
                </View>
            </View>
        </Pressable>
    );

    return (
        <>
            <Header
                showBackButton
                rightComponents={[<HeaderIcon key="filters" icon="SlidersHorizontal" href="/screens/filters" />]}
                middleComponent={<SearchBar />}
            />

            <View className="flex-1 bg-light-primary dark:bg-dark-primary">
                <MapView
                    ref={mapRef}
                    className="w-full h-[100vh]"
                    initialRegion={initialRegion}
                >
                    {doctorsWithCoords.map((doctor, index) => (
                        <PriceMarker
                            key={doctor.id}
                            coordinate={{
                                latitude: doctor.coordinates!.lat,
                                longitude: doctor.coordinates!.lng,
                            }}
                            price={priceLabel(doctor.priceRange)}
                            title={doctor.name}
                            isSelected={selectedDoctorId === doctor.id}
                            onPress={() => handleSelectDoctor(doctor, index)}
                        />
                    ))}
                </MapView>

                <ActionSheet
                    ref={actionSheetRef}
                    isModal={false}
                    backgroundInteractionEnabled
                    initialSnapIndex={1}
                    snapPoints={[12, 100]}
                    gestureEnabled
                    overdrawEnabled={false}
                    closable={false}
                    containerStyle={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: colors.bg,
                    }}
                >
                    <FlatList
                        ref={listRef}
                        data={doctorsWithCoords}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={
                            <View className="px-4 pt-3 pb-1">
                                <View className="w-14 h-2 mt-2 self-center rounded-full bg-light-secondary dark:bg-dark-secondary" />
                                <ThemedText className="font-bold text-lg mt-3">
                                    {doctorsWithCoords.length} profesionales {city ? `en ${city}` : 'disponibles'}
                                </ThemedText>
                                <View className="flex-row flex-wrap gap-2 mt-2">
                                    {specialty && <Chip size="sm" label={`Especialidad: ${specialty}`} />}
                                    {city && <Chip size="sm" label={`Ciudad: ${city}`} icon="MapPin" />}
                                    {insurance && <Chip size="sm" label={`Seguro: ${insurance}`} icon="ShieldCheck" />}
                                    {q && <Chip size="sm" label={`Búsqueda: ${q}`} icon="Search" />}
                                </View>
                            </View>
                        }
                        ListEmptyComponent={
                            <View className="px-6 py-10 items-center">
                                <Icon name="Stethoscope" size={40} className="text-light-subtext dark:text-dark-subtext mb-3" />
                                <ThemedText className="text-base font-semibold mb-1">No encontramos doctores con esos filtros</ThemedText>
                                <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext text-center">
                                    Ajusta la especialidad, seguro o ciudad para ver más resultados.
                                </ThemedText>
                            </View>
                        }
                        renderItem={renderDoctorCard}
                        contentContainerStyle={{ paddingBottom: insets.bottom + 40, paddingHorizontal: 12 }}
                    />
                </ActionSheet>
            </View>
        </>
    );
};

export default MapScreen;
