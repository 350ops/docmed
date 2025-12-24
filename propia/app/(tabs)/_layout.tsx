import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useBusinessMode } from '@/contexts/BusinesModeContext';

export default function Layout() {
  const { isBusinessMode } = useBusinessMode();

  if (isBusinessMode) {
    // Doctor Mode tabs (for medical professionals)
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="dashboard">
          <Icon
            sf={{ default: 'square.grid.2x2', selected: 'square.grid.2x2.fill' }}
            drawable="ic_menu_dashboard"
          />
          <Label>Panel</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="calendar">
          <Icon
            sf={{ default: 'calendar', selected: 'calendar.badge.clock' }}
            drawable="ic_menu_calendar"
          />
          <Label>Agenda</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="listings">
          <Icon
            sf={{ default: 'stethoscope', selected: 'stethoscope.circle.fill' }}
            drawable="ic_menu_stethoscope"
          />
          <Label>Mi Perfil</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="chat">
          <Icon
            sf={{ default: 'message', selected: 'message.fill' }}
            drawable="ic_menu_chat"
          />
          <Label>Mensajes</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="profile">
          <Icon
            sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }}
            drawable="ic_menu_account"
          />
          <Label>Perfil</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // Patient Mode tabs (for users searching doctors)
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(home)">
        <Icon
          sf={{ default: 'magnifyingglass', selected: 'magnifyingglass.circle.fill' }}
          drawable="ic_menu_search"
        />
        <Label>Buscar</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="favorites">
        <Icon
          sf={{ default: 'heart', selected: 'heart.fill' }}
          drawable="ic_menu_favorites"
        />
        <Label>Favoritos</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="trips">
        <Icon
          sf={{ default: 'calendar.badge.checkmark', selected: 'calendar.badge.checkmark' }}
          drawable="ic_menu_appointments"
        />
        <Label>Citas</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="chat">
        <Icon
          sf={{ default: 'message', selected: 'message.fill' }}
          drawable="ic_menu_chat"
        />
        <Label>Mensajes</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Icon
          sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }}
          drawable="ic_menu_account"
        />
        <Label>Perfil</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
