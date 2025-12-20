import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import Avatar from '@/components/Avatar';
import Header from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import AnimatedView from '@/components/AnimatedView';
import { Chip } from '@/components/Chip';
import { CardScroller } from '@/components/CardScroller';
import Section from '@/components/layout/Section';
import { useCollapsibleTitle } from '@/app/hooks/useCollapsibleTitle';

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  doctorImage?: string;
  specialty?: string;
  consultationDate?: string;
  type: 'doctor' | 'patient' | 'support';
}

// Mock data for demonstration
const mockChats: ChatUser[] = [
  {
    id: '1',
    name: 'Dra. María García',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Hola, he revisado tus análisis y todo está en orden. Te envío las indicaciones.',
    timestamp: '2m',
    unread: true,
    doctorImage: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialty: 'Medicina General',
    consultationDate: 'Consulta: 20 Dic',
    type: 'doctor',
  },
  {
    id: '2',
    name: 'Dr. Carlos Ruiz',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'Recuerda tomar la medicación según las indicaciones. ¿Cómo te encuentras hoy?',
    timestamp: '1h',
    unread: false,
    doctorImage: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialty: 'Cardiología',
    consultationDate: 'Consulta: 18 Dic',
    type: 'doctor',
  },
  {
    id: '3',
    name: 'Dra. Ana Martínez',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'Tu próxima cita está confirmada. ¿Tienes alguna pregunta antes de la consulta?',
    timestamp: '3h',
    unread: true,
    doctorImage: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialty: 'Dermatología',
    consultationDate: 'Consulta: 22 Dic',
    type: 'doctor',
  },
  {
    id: '4',
    name: 'Dr. Pedro Sánchez',
    avatar: 'https://i.pravatar.cc/150?img=4',
    lastMessage: 'Los resultados de la ecografía son normales. Puedes descargar el informe en la app.',
    timestamp: '5h',
    unread: false,
    doctorImage: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialty: 'Ginecología',
    consultationDate: 'Consulta: 15 Dic',
    type: 'doctor',
  },
  {
    id: '5',
    name: 'CareSalud Soporte',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'Tu reembolso ha sido procesado. Aparecerá en tu cuenta en 3-5 días hábiles.',
    timestamp: 'Ayer',
    unread: false,
    type: 'support',
  },
  {
    id: '6',
    name: 'Dra. Laura Fernández',
    avatar: 'https://i.pravatar.cc/150?img=6',
    lastMessage: 'He recibido tus síntomas. Te recomiendo agendar una cita presencial.',
    timestamp: '2 días',
    unread: true,
    doctorImage: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialty: 'Psicología',
    consultationDate: 'Consulta: 23 Dic',
    type: 'doctor',
  },
  {
    id: '7',
    name: 'Dr. Miguel Torres',
    avatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'Tu tratamiento va progresando bien. Nos vemos en la próxima revisión.',
    timestamp: '3 días',
    unread: false,
    doctorImage: 'https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialty: 'Traumatología',
    consultationDate: 'Consulta: 10 Dic',
    type: 'doctor',
  },
  {
    id: '8',
    name: 'Dra. Isabel López',
    avatar: 'https://i.pravatar.cc/150?img=9',
    lastMessage: 'Los análisis de tu hijo están perfectos. No te preocupes.',
    timestamp: '4 días',
    unread: false,
    doctorImage: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialty: 'Pediatría',
    consultationDate: 'Consulta: 8 Dic',
    type: 'doctor',
  },
];

type FilterType = 'all' | 'read' | 'unread';

export default function ChatListScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const { scrollY, onScroll, scrollEventThrottle } = useCollapsibleTitle();
  // Filter chats based on selection
  const filteredChats = mockChats.filter(chat => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'read') return !chat.unread;
    if (selectedFilter === 'unread') return chat.unread;
    return true;
  });

  // Count messages by filter type
  const unreadCount = mockChats.filter(chat => chat.unread).length;
  const readCount = mockChats.filter(chat => !chat.unread).length;

  const renderChatItem = ({ item }: { item: ChatUser }) => (
    <Link href={`/screens/chat/${item.id}`} asChild>
      <TouchableOpacity activeOpacity={0.8} className="flex-row p-4 border-b border-light-secondary dark:border-dark-secondary">
        {/* Doctor Image or Avatar */}
        <View className="relative">
          {item.doctorImage ? (
            <View className="relative">
              <Image
                source={{ uri: item.doctorImage }}
                className="w-16 h-16 rounded-xl"
              />
              <View className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-2 border-white dark:border-dark-primary">
                <Image source={{ uri: item.avatar }} className='w-7 h-7 rounded-full' />
              </View>
            </View>
          ) : (
            <Avatar size="lg" src={item.avatar} name={item.name} />
          )}
        </View>

        {/* Content */}
        <View className="flex-1 ml-5">
          {/* Name and Time */}
          <View className="flex-row justify-between items-center mb-1">
            <ThemedText className="font-medium text-base" numberOfLines={1}>
              {item.name}
            </ThemedText>
            <View className='flex-row items-center'>
              <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">
                {item.timestamp}
              </ThemedText>
              {item.unread && (
                <View className="w-2 h-2 rounded-full bg-highlight ml-2" />
              )}
            </View>
          </View>

          {/* Message */}
          <ThemedText
            numberOfLines={1}
            className={`text-sm mb-1 ${item.unread ? 'text-black dark:text-white font-medium' : 'text-light-subtext dark:text-dark-subtext'}`}
          >
            {item.lastMessage}
          </ThemedText>

          {/* Specialty and Consultation Date */}
          {item.specialty && (
            <View className="flex-row items-center justify-start">
              <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext" numberOfLines={1}>
                {item.specialty}
              </ThemedText>
              <View className='w-1 h-1 rounded-full bg-light-subtext dark:bg-dark-subtext mx-2' />
              {item.consultationDate && (
                <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">
                  {item.consultationDate}
                </ThemedText>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <>
      <Header

        title="Chat"
        variant="collapsibleTitle"
        scrollY={scrollY}
      />
      <View className="flex-1 bg-light-primary dark:bg-dark-primary">


        <AnimatedView animation="scaleIn" className='flex-1'>
          <View className="px-4 py-0">
            <CardScroller className='mb-2' space={5}>
              <Chip
                label="All"
                size='lg'
                isSelected={selectedFilter === 'all'}
                onPress={() => setSelectedFilter('all')}
              />
              <Chip
                label={`Unread (${unreadCount})`}
                size='lg'
                isSelected={selectedFilter === 'unread'}
                onPress={() => setSelectedFilter('unread')}
              />
              <Chip
                label={`Read (${readCount})`}
                size='lg'
                isSelected={selectedFilter === 'read'}
                onPress={() => setSelectedFilter('read')}
              />
            </CardScroller>
          </View>

          <FlatList
            className='pb-80'
            onScroll={onScroll}
            scrollEventThrottle={scrollEventThrottle}
            ListFooterComponent={
              <View className='h-52' />
            }
            data={filteredChats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </AnimatedView>
      </View>
    </>
  );
}