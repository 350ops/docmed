import { useThemeColors } from 'app/contexts/ThemeColors';
import { TabButton } from 'components/TabButton';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { View } from 'react-native';
import React from 'react';
import { useBusinessMode } from '@/app/contexts/BusinesModeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Layout() {
  const colors = useThemeColors();
  const { isBusinessMode } = useBusinessMode();
  const insets = useSafeAreaInsets();

  return (
    <Tabs>
      <TabSlot />
      <TabList
        style={{
          backgroundColor: colors.bg,
          borderTopColor: colors.secondary,
          borderTopWidth: 1,
          paddingBottom: insets.bottom,
        }}
      >
        {/* Doctor Mode tabs (for medical professionals) */}
        <TabTrigger
          name="dashboard"
          href="/(tabs)/dashboard"
          asChild
          style={{ display: isBusinessMode ? 'flex' : 'none' }}
        >
          <TabButton labelAnimated={false} icon="LayoutDashboard">Panel</TabButton>
        </TabTrigger>
        <TabTrigger
          name="calendar"
          href="/(tabs)/calendar"
          asChild
          style={{ display: isBusinessMode ? 'flex' : 'none' }}
        >
          <TabButton labelAnimated={false} icon="CalendarFold">Agenda</TabButton>
        </TabTrigger>
        <TabTrigger
          name="listings"
          href="/(tabs)/listings"
          asChild
          style={{ display: isBusinessMode ? 'flex' : 'none' }}
        >
          <TabButton labelAnimated={false} icon="Stethoscope">Mi Perfil</TabButton>
        </TabTrigger>

        {/* Patient Mode tabs (for users searching doctors) */}
        <TabTrigger
          name="(home)"
          href="/(tabs)/(home)"
          asChild
          style={{ display: isBusinessMode ? 'none' : 'flex' }}
        >
          <TabButton labelAnimated={false} icon="Search">Buscar</TabButton>
        </TabTrigger>

        <TabTrigger
          name="favorites"
          href="/favorites"
          asChild
          style={{ display: isBusinessMode ? 'none' : 'flex' }}
        >
          <TabButton labelAnimated={false} icon="Heart">Favoritos</TabButton>
        </TabTrigger>

        <TabTrigger
          name="trips"
          href="/trips"
          asChild
          style={{ display: isBusinessMode ? 'none' : 'flex' }}
        >
          <TabButton labelAnimated={false} icon="CalendarCheck">Citas</TabButton>
        </TabTrigger>

        {/* Shared tabs (both modes) */}
        <TabTrigger
          name="chat"
          href="/(tabs)/chat"
          asChild
          style={{ display: 'flex' }}
        >
          <TabButton labelAnimated={false} hasBadge icon="MessageSquare">Mensajes</TabButton>
        </TabTrigger>

        <TabTrigger
          name="profile"
          href="/profile"
          asChild
          style={{ display: 'flex' }}
        >
          <TabButton labelAnimated={false} icon="CircleUser">Perfil</TabButton>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
