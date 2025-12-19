import { Modal, Pressable, View, Platform } from "react-native";
import Animated from 'react-native-reanimated';
import Icon from "./Icon";
import ThemedText from "./ThemedText";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import useThemeColors from "@/app/contexts/ThemeColors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import Divider from "./layout/Divider";
import AnimatedView from "./AnimatedView";
import ThemedScroller from "./ThemeScroller";
import { shadowPresets } from '@/utils/useShadow';
import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Button } from "./Button";
import { SPECIALTIES } from "@/lib/doctors";

const SearchBar = (props: any) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <View className='px-global bg-light-primary dark:bg-dark-primary w-full relative z-50'>
                <Pressable className="" onPress={() => setShowModal(true)}>
                    <Animated.View
                        sharedTransitionTag="searchBar"
                        style={{ elevation: 10, height: 50, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 8.84, shadowOffset: { width: 0, height: 0 } }}
                        className='bg-light-primary flex-row justify-center items-center relative z-50 py-4 px-10 mt-3 mb-4 dark:bg-white/20 rounded-full'>
                        <Icon name="Search" size={16} strokeWidth={3} className="text-teal-500" />
                        <ThemedText className='text-black dark:text-white font-medium ml-2 mr-4'>Buscar especialidad o médico...</ThemedText>
                    </Animated.View>
                </Pressable>
            </View>

            <SearchModal showModal={showModal} setShowModal={setShowModal} />
        </>
    )
}

const SearchModal = ({ showModal, setShowModal }: { showModal: boolean, setShowModal: (show: boolean) => void }) => {
    const insets = useSafeAreaInsets();
    const [openAccordion, setOpenAccordion] = useState<string | null>('specialty');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        setShowModal(false);
        router.push(`/screens/map?q=${searchQuery}`);
    };

    return (
        <Modal statusBarTranslucent={true} className='flex-1' visible={showModal} transparent={true} animationType="fade">
            <BlurView experimentalBlurMethod="none" intensity={20} tint="systemUltraThinMaterialLight" className='flex-1'>
                <AnimatedView className="flex-1" animation='slideInTop' duration={Platform.OS === 'ios' ? 500 : 0} delay={0}>
                    <View className="flex-1 bg-neutral-200/70 dark:bg-black/90">
                        <ThemedScroller style={{ paddingTop: insets.top + 10 }} className="bg-transparent">
                            <Pressable
                                onPress={() => setShowModal(false)}
                                style={{ ...shadowPresets.card, elevation: 10, height: 50, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 8.84, shadowOffset: { width: 0, height: 0 } }}
                                className="items-center justify-center w-12 my-3 h-12 rounded-full ml-auto bg-light-primary dark:bg-dark-secondary">
                                <Icon name="X" size={24} strokeWidth={2} />
                            </Pressable>

                            <AccordionItem
                                title="¿Qué necesitas?"
                                label="Especialidad"
                                isOpen={openAccordion === 'specialty'}
                                onPress={() => setOpenAccordion(openAccordion === 'specialty' ? null : 'specialty')}>
                                <SpecialtySearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                            </AccordionItem>

                            <AccordionItem
                                title="¿Dónde?"
                                label="Tu ubicación"
                                isOpen={openAccordion === 'location'}
                                onPress={() => setOpenAccordion(openAccordion === 'location' ? null : 'location')}>
                                <LocationSearch />
                            </AccordionItem>

                            <AccordionItem
                                title="¿Tu seguro médico?"
                                label="Todos"
                                isOpen={openAccordion === 'insurance'}
                                onPress={() => setOpenAccordion(openAccordion === 'insurance' ? null : 'insurance')}>
                                <InsuranceSearch />
                            </AccordionItem>
                        </ThemedScroller>

                        <View style={{ paddingBottom: insets.bottom + 10 }} className="flex-row w-full px-6 justify-between">
                            <Button title="Limpiar" onPress={() => setShowModal(false)} variant="ghost" className="" />
                            <Button
                                iconStart="Search"
                                title="Buscar doctores"
                                iconColor="white"
                                textClassName="text-white"
                                onPress={handleSearch}
                                variant="primary"
                                className="bg-teal-500"
                            />
                        </View>
                    </View>
                </AnimatedView>
            </BlurView>
        </Modal>
    );
};

const AccordionItem = ({
    title,
    children,
    isOpen,
    label,
    onPress
}: {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    label?: string;
    onPress: () => void;
}) => {
    const [contentHeight, setContentHeight] = useState(0);
    const animatedHeight = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        height: withTiming(animatedHeight.value, { duration: 200 }),
        overflow: 'hidden',
    }));

    useEffect(() => {
        animatedHeight.value = isOpen ? contentHeight : 0;
    }, [isOpen, contentHeight]);

    return (
        <View
            style={{ ...shadowPresets.large }}
            className='bg-light-primary relative dark:bg-dark-secondary rounded-2xl mb-global'>
            <Pressable onPress={onPress} className='w-full p-global'>
                <View className='flex-row w-full justify-between items-center'>
                    <ThemedText className={`text-lg font-semibold`}>{title}</ThemedText>
                    {isOpen ? <></> : <ThemedText className='text-sm font-semibold text-teal-600'>{label}</ThemedText>}
                </View>
            </Pressable>

            <Animated.View style={animatedStyle}>
                <View
                    onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
                    className="absolute w-full px-global pb-2 pt-0 -mt-4">
                    {children}
                </View>
            </Animated.View>
        </View>
    );
};

// Specialty search component
const SpecialtySearch = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (q: string) => void }) => {
    const colors = useThemeColors();
    const filteredSpecialties = SPECIALTIES.filter(s =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6);

    return (
        <>
            <View className='relative'>
                <Icon name="Stethoscope" className='absolute left-4 top-1/2 -translate-y-1/2 text-teal-500' size={16} strokeWidth={2} />
                <TextInput
                    className='p-4 pl-12 mt-4 border border-teal-300 dark:border-teal-700 rounded-xl text-black dark:text-white'
                    placeholder='Buscar especialidad o médico...'
                    placeholderTextColor={colors.subtext}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <ThemedText className='text-xs mt-4 text-light-subtext dark:text-dark-subtext'>Especialidades populares</ThemedText>
            {filteredSpecialties.map((specialty, index) => (
                <SpecialtyRow
                    key={index}
                    icon="Activity"
                    title={specialty}
                    onPress={() => setSearchQuery(specialty)}
                />
            ))}
        </>
    )
}

// Location search component
const LocationSearch = () => {
    const colors = useThemeColors();
    return (
        <>
            <View className='relative'>
                <Icon name="MapPin" className='absolute left-4 top-1/2 -translate-y-1/2 text-teal-500' size={16} strokeWidth={2} />
                <TextInput
                    className='p-4 pl-12 mt-4 border border-teal-300 dark:border-teal-700 rounded-xl text-black dark:text-white'
                    placeholder='Ciudad o código postal'
                    placeholderTextColor={colors.subtext}
                />
            </View>
            <ThemedText className='text-xs mt-4 text-light-subtext dark:text-dark-subtext'>Sugerencias</ThemedText>
            <SpecialtyRow icon="Navigation" title="Usar mi ubicación actual" iconbg="bg-teal-100 dark:bg-teal-900" />
            <SpecialtyRow icon="Building2" title="Madrid" />
            <SpecialtyRow icon="Building2" title="Barcelona" />
            <SpecialtyRow icon="Building2" title="Valencia" />
        </>
    )
}

// Insurance search component
const InsuranceSearch = () => {
    const insurances = ['Sanitas', 'Adeslas', 'Mapfre', 'Asisa', 'DKV', 'Caser', 'AXA'];
    return (
        <>
            <ThemedText className='text-xs mt-4 text-light-subtext dark:text-dark-subtext'>Selecciona tu seguro</ThemedText>
            <Pressable className="flex-row items-center py-3">
                <View className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900 items-center justify-center mr-3">
                    <Icon name="Shield" size={20} className="text-teal-600" />
                </View>
                <ThemedText className="font-semibold">Sin seguro (pago privado)</ThemedText>
            </Pressable>
            <Divider />
            {insurances.map((insurance, index) => (
                <Pressable key={index} className="flex-row items-center py-3">
                    <View className="w-10 h-10 rounded-lg bg-light-secondary dark:bg-dark-primary items-center justify-center mr-3">
                        <Icon name="ShieldCheck" size={20} className="text-teal-600" />
                    </View>
                    <ThemedText className="font-semibold">{insurance}</ThemedText>
                </Pressable>
            ))}
        </>
    )
}

const SpecialtyRow = (props: any) => {
    return (
        <Pressable onPress={props.onPress} className="flex-row items-center justify-start my-2">
            <Icon name={props.icon} size={20} strokeWidth={1.5} className={`w-10 h-10 rounded-lg bg-light-secondary dark:bg-dark-primary ${props.iconbg}`} />
            <View className="ml-3">
                <ThemedText className="text-sm font-semibold">{props.title}</ThemedText>
                {props.description && <ThemedText className="text-xs text-neutral-500">{props.description}</ThemedText>}
            </View>
        </Pressable>
    )
}

export default SearchBar;