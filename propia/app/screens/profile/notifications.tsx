import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import Switch from '@/components/forms/Switch';
import { Button } from '@/components/Button';
import ThemedScroller from '@/components/ThemeScroller';
import Section from '@/components/layout/Section';

const NotificationsScreen = () => {
  const navigation = useNavigation();
  
  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    bookingUpdates: true,
    hostMessages: true,
    paymentConfirmations: true,
    reviewRequests: true,
    checkInReminders: true,
    specialOffers: false,
    hostPromotions: false,
    travelTips: false,
    marketingEmails: false,
  });

  const handleToggle = (setting: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const saveSettings = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-light-bg dark:bg-dark-bg">
        <Header showBackButton 
        rightComponents={[
            <Button title="Save changes" onPress={saveSettings} />
        ]}
        />
      <ThemedScroller >
      <Section titleSize='3xl' className='mt-10 pb-10' title="Notificaciones" subtitle="Manténte al día con tus citas y mensajes" />  

        <View className="mb-8">
          <ThemedText className="text-lg font-bold mb-4">Citas y comunicación</ThemedText>
          
          <Switch 
            label="Actualizaciones de citas"
            description="Confirmaciones, cambios y cancelaciones"
            value={notifications.bookingUpdates}
            onChange={(value) => handleToggle('bookingUpdates', value)}
            disabled={!notifications.pushEnabled}
            className="mb-4"
          />
          
          <Switch 
            label="Mensajes de pacientes"
            description="Chats y documentación previa a la consulta"
            value={notifications.hostMessages}
            onChange={(value) => handleToggle('hostMessages', value)}
            disabled={!notifications.pushEnabled}
            className="mb-4"
          />
          
          <Switch 
            label="Confirmaciones de pago"
            description="Recibos y avisos de cobros"
            value={notifications.paymentConfirmations}
            onChange={(value) => handleToggle('paymentConfirmations', value)}
            disabled={!notifications.pushEnabled}
            className="mb-4"
          />
          
          <Switch 
            label="Solicitudes de valoración"
            description="Recordatorios para dejar reseñas"
            value={notifications.reviewRequests}
            onChange={(value) => handleToggle('reviewRequests', value)}
            disabled={!notifications.pushEnabled}
            className="mb-4"
          />
          
          <Switch 
            label="Recordatorios de cita"
            description="Información previa a la consulta"
            value={notifications.checkInReminders}
            onChange={(value) => handleToggle('checkInReminders', value)}
            disabled={!notifications.pushEnabled}
            className="mb-2"
          />
        </View>

        <View className="mt-8">
          <ThemedText className="text-lg font-bold mb-4">Promociones y novedades</ThemedText>
          
          <Switch 
            label="Ofertas especiales"
            description="Descuentos en consultas y programas de salud"
            value={notifications.specialOffers}
            onChange={(value) => handleToggle('specialOffers', value)}
            className="mb-4"
          />
          
          <Switch 
            label="Promociones de especialistas"
            description="Novedades de tus doctores favoritos"
            value={notifications.hostPromotions}
            onChange={(value) => handleToggle('hostPromotions', value)}
            className="mb-4"
          />
          
          <Switch 
            label="Consejos de salud"
            description="Recomendaciones y guías de bienestar"
            value={notifications.travelTips}
            onChange={(value) => handleToggle('travelTips', value)}
            className="mb-4"
          />
          
          <Switch 
            label="Marketing Emails"
            description="Newsletters and destination inspiration"
            value={notifications.marketingEmails}
            onChange={(value) => handleToggle('marketingEmails', value)}
            className="mb-2"
          />
        </View>
        
      </ThemedScroller>
    </View>
  );
};

export default NotificationsScreen;
