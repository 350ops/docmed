import React, { useMemo, useState } from 'react';
import { View, ScrollView, Image, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Header from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import AnimatedView from '@/components/AnimatedView';
import Icon from '@/components/Icon';
import { Button } from '@/components/Button';
import Divider from '@/components/layout/Divider';
import Section from '@/components/layout/Section';
import ShowRating from '@/components/ShowRating';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_DOCTORS, Doctor } from '@/lib/doctors';
import { Chip } from '@/components/Chip';

const priceLabel = (range: string) => range.split(' - ')[0] || range;

const getBasePrice = (doctor: Doctor) => {
  const numeric = parseInt(priceLabel(doctor.priceRange).replace(/[^\d]/g, ''), 10);
  return Number.isNaN(numeric) ? 60 : numeric;
};

export default function OrderDetailScreen() {
  const insets = useSafeAreaInsets();
  const { doctorId, date, time } = useLocalSearchParams<{ doctorId?: string; date?: string; time?: string }>();
  const doctor = useMemo(
    () => MOCK_DOCTORS.find((d) => d.id === doctorId) || MOCK_DOCTORS[0],
    [doctorId]
  );
  const [paymentMethod, setPaymentMethod] = useState<string>(doctor.insurances[0] || 'Tarjeta');
  const [visitType, setVisitType] = useState<'online' | 'presencial'>('online');

  const basePrice = getBasePrice(doctor);
  const platformFee = Math.round(basePrice * 0.08);
  const total = basePrice + platformFee;

  const formattedDate = useMemo(() => {
    if (!date) return 'Próxima fecha disponible';
    const parsed = new Date(date as string);
    return parsed.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  }, [date]);

  const selectedTime = time || doctor.availability[0]?.slots[0] || '10:00';

  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary">
      <Header
        showBackButton
        title="Confirmar cita"
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <AnimatedView animation="fadeIn" duration={400} delay={100}>
          
          {/* Doctor Card */}
          <View className="px-global pt-4">
            <View className="rounded-2xl border border-neutral-200 dark:border-dark-secondary p-3 flex-row">
              <Image
                source={{ uri: doctor.image }}
                className="w-20 h-20 rounded-xl mr-3"
                resizeMode="cover"
              />
              <View className="flex-1 justify-center">
                <ThemedText className="text-base font-semibold">{doctor.name}</ThemedText>
                <ThemedText className="text-sm text-teal-600 dark:text-teal-300">{doctor.specialty}</ThemedText>
                <View className="flex-row items-center mt-1">
                  <ShowRating rating={doctor.rating} size="sm" />
                  <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext ml-2">
                    {doctor.reviewCount} opiniones
                  </ThemedText>
                </View>
                <View className="flex-row items-center mt-1">
                  <Icon name="MapPin" size={14} className="text-light-subtext mr-1" />
                  <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">
                    {doctor.location}
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>

          <Divider className="my-6" />

          {/* Appointment Details */}
          <Section title="Tu cita" titleSize="lg" className="px-global">
            <View className="mt-4 space-y-4">
              <View className="flex-row items-center justify-between">
                <View>
                  <ThemedText className="font-semibold">Fecha y hora</ThemedText>
                  <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext mt-1">
                    {formattedDate} • {selectedTime}
                  </ThemedText>
                </View>
                <Button
                  title="Cambiar"
                  variant='outline'
                  size="small"
                  rounded="lg"
                  onPress={() => router.back()}
                />
              </View>

              <Divider />

              <View>
                <ThemedText className="font-semibold mb-2">Modalidad</ThemedText>
                <View className="flex-row gap-2">
                  <Chip
                    size="lg"
                    icon="Video"
                    label="Online"
                    isSelected={visitType === 'online'}
                    onPress={() => setVisitType('online')}
                  />
                  <Chip
                    size="lg"
                    icon="Building2"
                    label="Presencial"
                    isSelected={visitType === 'presencial'}
                    onPress={() => setVisitType('presencial')}
                  />
                </View>
                <View className="flex-row items-center mt-3">
                  <Icon name="MapPin" size={16} className="text-teal-500 mr-2" />
                  <ThemedText className="text-sm">
                    {visitType === 'online' ? 'Videoconsulta en CareSalud' : doctor.address}
                  </ThemedText>
                </View>
              </View>
            </View>
          </Section>

          <Divider className="my-6" />

          {/* Payment Method */}
          <Section title="Forma de pago" titleSize="lg" className="px-global">
            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext mb-3">
              Selecciona tu seguro o paga con tarjeta
            </ThemedText>
            <View className="mt-2 space-y-3">
              {doctor.insurances.map((insuranceName) => (
                <Pressable
                  key={insuranceName}
                  onPress={() => setPaymentMethod(insuranceName)}
                  className={`flex-row items-center p-4 rounded-lg border ${
                    paymentMethod === insuranceName
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : 'border-light-secondary dark:border-dark-secondary'
                  }`}
                >
                  <Icon name="ShieldCheck" size={22} className="mr-3 text-teal-600" />
                  <ThemedText className="flex-1 font-medium">{insuranceName}</ThemedText>
                  <Icon name={paymentMethod === insuranceName ? 'Check' : 'Circle'} size={18} />
                </Pressable>
              ))}
              <Pressable
                onPress={() => setPaymentMethod('Tarjeta')}
                className={`flex-row items-center p-4 rounded-lg border ${
                  paymentMethod === 'Tarjeta'
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                    : 'border-light-secondary dark:border-dark-secondary'
                }`}
              >
                <Icon name="CreditCard" size={22} className="mr-3" />
                <View className="flex-1">
                  <ThemedText className="font-medium">Tarjeta</ThemedText>
                  <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                    Paga de forma segura con tu tarjeta habitual
                  </ThemedText>
                </View>
              </Pressable>
            </View>
          </Section>

          <Divider className="my-6" />

          {/* Price Details */}
          <Section title="Precio" titleSize="lg" className="px-global">
            <View className="mt-4 space-y-3">
              <View className="flex-row justify-between">
                <ThemedText>Consulta {visitType === 'online' ? 'online' : 'presencial'}</ThemedText>
                <ThemedText>{basePrice}€</ThemedText>
              </View>
              
              <View className="flex-row justify-between">
                <ThemedText>Tarifa de plataforma</ThemedText>
                <ThemedText>{platformFee}€</ThemedText>
              </View>

              <Divider className="my-3" />

              <View className="flex-row justify-between">
                <ThemedText className="font-bold text-lg">Total</ThemedText>
                <ThemedText className="font-bold text-lg">{total}€</ThemedText>
              </View>
            </View>
          </Section>

          {/* Terms */}
          <View className="px-global mt-6">
            <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext leading-5">
              Al confirmar aceptas las políticas de cancelación de CareSalud y autorizas el cargo en tu método de pago.
            </ThemedText>
          </View>
        </AnimatedView>
      </ScrollView>

      {/* Bottom Confirm Button */}
      <View 
        className="absolute bottom-0 left-0 right-0 px-global py-4 bg-light-primary dark:bg-dark-primary border-t border-light-secondary dark:border-dark-secondary"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <Button
          title="Confirmar cita"
          className="w-full bg-highlight"
          textClassName="text-white font-semibold"
          size="large"
          rounded="lg"
          onPress={() => router.push(`/screens/trip-detail?doctorId=${doctor.id}&date=${date || ''}&time=${selectedTime}&mode=${visitType}`)}
        />
      </View>
    </View>
  );
}
