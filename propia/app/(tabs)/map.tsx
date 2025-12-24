import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Platform, ScrollView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { MOCK_DOCTORS, Doctor } from '@/lib/doctors';
import ThemedText from '@/components/ThemedText';
import Icon from '@/components/Icon';
import useThemeColors from '@/contexts/ThemeColors';
import Card from '@/components/Card';
import Header from '@/components/Header';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Madrid coordinates as default
const INITIAL_REGION = {
    latitude: 40.416775,
    longitude: -3.703790,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

export default function MapScreen() {
    const insets = useSafeAreaInsets();
    const mapRef = useRef<MapView>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const colors = useThemeColors();

    const handleMarkerPress = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
    };

    const handleMapPress = () => {
        setSelectedDoctor(null);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
            <Header title="Mapa de Doctores" showBackButton={false} />

            <View style={{ flex: 1, borderRadius: 0, overflow: 'hidden' }}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                    initialRegion={INITIAL_REGION}
                    onPress={handleMapPress}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >
                    {MOCK_DOCTORS.map((doctor) => {
                        if (!doctor.coordinates) return null;

                        const isSelected = selectedDoctor?.id === doctor.id;

                        return (
                            <Marker
                                key={doctor.id}
                                coordinate={{
                                    latitude: doctor.coordinates.lat,
                                    longitude: doctor.coordinates.lng,
                                }}
                                onPress={() => handleMarkerPress(doctor)}
                            >
                                <View style={[
                                    styles.markerContainer,
                                    isSelected && styles.selectedMarkerContainer,
                                    { backgroundColor: isSelected ? '#14b8a6' : 'white' }
                                ]}>
                                    <Icon
                                        name="Stethoscope"
                                        size={16}
                                        color={isSelected ? 'white' : '#14b8a6'}
                                    />
                                </View>
                            </Marker>
                        );
                    })}
                </MapView>

                {selectedDoctor && (
                    <View style={[styles.cardContainer, { paddingBottom: insets.bottom + 20 }]}>
                        <Card
                            title={selectedDoctor.name}
                            subtitle={selectedDoctor.specialty}
                            image={selectedDoctor.image}
                            rating={selectedDoctor.rating}
                            price={selectedDoctor.priceRange.split(' - ')[0]}
                            hasShadow={true}
                            onPress={() => router.push(`/screens/doctor-detail?id=${selectedDoctor.id}`)}
                            variant="classic"
                            imageHeight={120}
                            description={selectedDoctor.location}
                        />
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
    markerContainer: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#eee',
    },
    selectedMarkerContainer: {
        transform: [{ scale: 1.2 }],
        borderColor: 'white',
    },
    cardContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    }
});
