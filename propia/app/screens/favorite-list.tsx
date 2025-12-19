import React from 'react';
import { View, Image, Pressable } from 'react-native';
import Header from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import ThemedScroller from '@/components/ThemeScroller';
import { MOCK_DOCTORS } from '@/lib/doctors';
import ShowRating from '@/components/ShowRating';
import { Chip } from '@/components/Chip';
import { router } from 'expo-router';
import { shadowPresets } from '@/utils/useShadow';
import Icon from '@/components/Icon';

const FavoriteListScreen = () => {
    const savedDoctors = MOCK_DOCTORS.slice(0, 6);

    return (
        <View className="flex-1 bg-light-primary dark:bg-dark-primary">
            <Header showBackButton title="Favoritos" />
            <ThemedScroller className="px-global pt-4">
                <View className="flex-row flex-wrap gap-2 mb-4">
                    <Chip label="Todos" size="lg" isSelected />
                    <Chip label="Psicología" size="lg" />
                    <Chip label="Presencial" size="lg" icon="Building2" />
                    <Chip label="Online" size="lg" icon="Video" />
                </View>

                {savedDoctors.map((doctor) => (
                    <Pressable
                        key={doctor.id}
                        onPress={() => router.push(`/screens/doctor-detail?id=${doctor.id}`)}
                        style={shadowPresets.card}
                        className="bg-light-primary dark:bg-dark-secondary rounded-2xl p-3 mb-3 flex-row"
                    >
                        <Image source={{ uri: doctor.image }} className="w-20 h-20 rounded-xl mr-3" />
                        <View className="flex-1">
                            <View className="flex-row items-center justify-between">
                                <ThemedText className="text-base font-semibold flex-1 pr-2">{doctor.name}</ThemedText>
                                <ShowRating rating={doctor.rating} size="sm" />
                            </View>
                            <ThemedText className="text-sm text-teal-600">{doctor.specialty}</ThemedText>
                            <View className="flex-row items-center mt-1">
                                <Icon name="MapPin" size={12} className="mr-1 text-light-subtext" />
                                <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">{doctor.location}</ThemedText>
                            </View>
                            <View className="flex-row flex-wrap gap-2 mt-2">
                                {doctor.insurances.slice(0, 2).map((insurance) => (
                                    <Chip key={insurance} label={insurance} size="sm" />
                                ))}
                            </View>
                        </View>
                    </Pressable>
                ))}
            </ThemedScroller>
        </View>
    );
};

export default FavoriteListScreen;
