import React, { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';
import ThemedText from '@/components/ThemedText';
import ThemedScroller from '@/components/ThemeScroller';
import ThemeFooter from '@/components/ThemeFooter';
import Header from '@/components/Header';
import Section from '@/components/layout/Section';
import { Chip } from '@/components/Chip';
import Switch from '@/components/forms/Switch';
import { Button } from '@/components/Button';
import { SPECIALTIES, INSURANCES } from '@/lib/doctors';
import useThemeColors from '@/contexts/ThemeColors';

const CITIES = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'];

export default function FiltersScreen() {
    const router = useRouter();
    const colors = useThemeColors();
    const [price, setPrice] = useState(90);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
    const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [visitType, setVisitType] = useState<'presencial' | 'online' | null>(null);
    const [verifiedOnly, setVerifiedOnly] = useState(true);
    const [availableSoon, setAvailableSoon] = useState(true);

    const handleApplyFilters = () => {
        const params = new URLSearchParams();
        params.append('priceMax', Math.round(price).toString());
        if (selectedSpecialty) params.append('specialty', selectedSpecialty);
        if (selectedInsurance) params.append('insurance', selectedInsurance);
        if (selectedCity) params.append('city', selectedCity);
        if (visitType) params.append('mode', visitType);
        if (verifiedOnly) params.append('verified', 'true');
        if (availableSoon) params.append('available', 'soon');

        router.push(`/screens/map?${params.toString()}`);
    };

    const clearFilters = () => {
        setPrice(90);
        setSelectedSpecialty(null);
        setSelectedInsurance(null);
        setSelectedCity(null);
        setVisitType(null);
        setVerifiedOnly(true);
        setAvailableSoon(true);
    };

    const renderChipRow = (items: string[], selected: string | null, onSelect: (value: string) => void) => (
        <View className="flex-row flex-wrap gap-2 mt-2">
            {items.map((item) => (
                <Chip
                    key={item}
                    isSelected={selected === item}
                    size="lg"
                    label={item}
                    onPress={() => onSelect(item === selected ? '' : item)}
                />
            ))}
        </View>
    );

    return (
        <>
            <Header showBackButton title="Filtros" />
            <ThemedScroller className="flex-1 bg-light-primary dark:bg-dark-primary">
                <Section
                    className="mb-6 pb-6 border-b border-light-secondary dark:border-dark-secondary"
                    title="Precio de consulta"
                    subtitle={`Hasta ${Math.round(price)}€`}
                >
                    <Slider
                        style={{ width: '100%', height: 40 }}
                        value={price}
                        minimumValue={30}
                        maximumValue={180}
                        onValueChange={setPrice}
                        minimumTrackTintColor={colors.primary}
                        maximumTrackTintColor="rgba(0,0,0,0.2)"
                        step={5}
                    />
                    <View className="flex-row justify-between mt-2">
                        <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">30€</ThemedText>
                        <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">180€</ThemedText>
                    </View>
                </Section>

                <Section
                    className="mb-6 pb-6 border-b border-light-secondary dark:border-dark-secondary"
                    title="Especialidad"
                    subtitle={selectedSpecialty || 'Selecciona una opción'}
                >
                    {renderChipRow(SPECIALTIES.slice(0, 10), selectedSpecialty, (value) => setSelectedSpecialty(value || null))}
                </Section>

                <Section
                    className="mb-6 pb-6 border-b border-light-secondary dark:border-dark-secondary"
                    title="Seguro médico"
                    subtitle={selectedInsurance || 'Todos los seguros'}
                >
                    {renderChipRow(INSURANCES, selectedInsurance, (value) => setSelectedInsurance(value || null))}
                </Section>

                <Section
                    className="mb-6 pb-6 border-b border-light-secondary dark:border-dark-secondary"
                    title="Ciudad"
                    subtitle={selectedCity || 'Todas'}
                >
                    {renderChipRow(CITIES, selectedCity, (value) => setSelectedCity(value || null))}
                </Section>

                <Section
                    className="mb-6 pb-6 border-b border-light-secondary dark:border-dark-secondary"
                    title="Modalidad"
                    subtitle={visitType ? (visitType === 'online' ? 'Online' : 'Presencial') : 'Cualquiera'}
                >
                    <View className="flex-row gap-2 mt-2">
                        <Chip
                            size="lg"
                            icon="Video"
                            label="Online"
                            isSelected={visitType === 'online'}
                            onPress={() => setVisitType(visitType === 'online' ? null : 'online')}
                        />
                        <Chip
                            size="lg"
                            icon="Building2"
                            label="Presencial"
                            isSelected={visitType === 'presencial'}
                            onPress={() => setVisitType(visitType === 'presencial' ? null : 'presencial')}
                        />
                    </View>
                </Section>

                <Section className="mb-6" title="Preferencias">
                    <View className="mt-2 space-y-3">
                        <Switch
                            label="Solo doctores verificados"
                            value={verifiedOnly}
                            onValueChange={setVerifiedOnly}
                        />
                        <Switch
                            label="Con disponibilidad esta semana"
                            value={availableSoon}
                            onValueChange={setAvailableSoon}
                        />
                    </View>
                </Section>
            </ThemedScroller>
            <ThemeFooter>
                <View className="flex-row w-full gap-3">
                    <Button
                        title="Limpiar"
                        variant="ghost"
                        size="large"
                        onPress={clearFilters}
                        className="flex-1"
                    />
                    <Button
                        title="Ver doctores"
                        rounded="full"
                        size="large"
                        className="flex-1 bg-highlight"
                        textClassName="text-white"
                        onPress={handleApplyFilters}
                    />
                </View>
            </ThemeFooter>
        </>
    );
}
