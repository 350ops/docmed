import React from 'react';
import { View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Header from '@/components/Header';
import ThemedText from '@/components/ThemedText';
import Expandable from '@/components/Expandable';
import Section from '@/components/layout/Section';
import Icon from '@/components/Icon';
import { Button } from '@/components/Button';
import AnimatedView from '@/components/AnimatedView';
import Divider from '@/components/layout/Divider';

// FAQ data
const faqData = [
  {
    id: '1',
    question: '¿Cómo me uno a una videoconsulta?',
    answer: 'Cuando confirmas la cita, verás el enlace de videollamada en el detalle de la consulta. También lo enviaremos por email y notificación unos minutos antes.'
  },
  {
    id: '2',
    question: '¿Puedo cancelar o reprogramar una cita?',
    answer: 'Puedes modificar o cancelar desde “Mis citas”. Si lo haces con menos de 24h, la política de cancelación del especialista puede aplicar.'
  },
  {
    id: '3',
    question: '¿Cómo envío análisis o imágenes al doctor?',
    answer: 'Abre el chat de la cita y adjunta archivos antes de la consulta. El médico podrá revisarlos durante la videollamada.'
  },
  {
    id: '4',
    question: '¿Cómo funciona la receta electrónica?',
    answer: 'Si el especialista lo considera, emitirá una receta que recibirás en la app y por email para usar en tu farmacia.'
  },
  {
    id: '5',
    question: '¿Aceptan seguros médicos?',
    answer: 'Cada doctor indica los seguros aceptados. Filtra por tu seguro en la búsqueda o revisa la sección de seguros en el perfil del médico.'
  },
  {
    id: '6',
    question: '¿Qué pasa si tengo una urgencia?',
    answer: 'Para emergencias médicas llama al servicio de urgencias local. CareSalud está pensado para consultas programadas y videoconsultas no urgentes.'
  },
  {
    id: '7',
    question: '¿Cómo dejo una reseña?',
    answer: 'Después de tu consulta te enviaremos una notificación para valorar al especialista. También puedes ir a la cita completada y pulsar “Dejar reseña”.'
  },
  {
    id: '8',
    question: '¿Cómo contacto con soporte?',
    answer: 'Estamos disponibles 24/7 desde la app en la sección de ayuda o por correo en soporte@caresalud.com.'
  }
];

// Contact information
const contactInfo = [
  {
    id: 'email',
    type: 'Soporte por email',
    value: 'soporte@caresalud.com',
    icon: 'Mail' as const,
    action: () => Linking.openURL('mailto:soporte@caresalud.com')
  },
  {
    id: 'phone',
    type: 'Línea de soporte',
    value: '+34 900 123 456',
    icon: 'Phone' as const,
    action: () => Linking.openURL('tel:+34900123456')
  },
  {
    id: 'hours',
    type: 'Horario',
    value: 'Soporte 24/7',
    icon: 'Clock' as const,
    action: undefined
  }
];

export default function HelpScreen() {
  return (
    <View className="flex-1 bg-light-primary dark:bg-dark-primary">
      <Header title="Help & Support" showBackButton />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <AnimatedView animation="fadeIn" duration={400}>
          {/* FAQ Section */}
          <Section 
            title="Frequently Asked Questions" 
            titleSize="xl" 
            className="px-global pt-6 pb-2"
          />
          
          <View className="px-global">
            {faqData.map((faq) => (
              <Expandable 
                key={faq.id}
                title={faq.question}
                className="py-1"
              >
                <ThemedText className="text-light-text dark:text-dark-text leading-6">
                  {faq.answer}
                </ThemedText>
              </Expandable>
            ))}
          </View>
          
          {/* Contact Section */}
          <Section 
            title="Contact Us" 
            titleSize="xl" 
            className="px-global pb-2 mt-14"
            subtitle="We're here to help with your booking and travel needs"
          />
          
          <View className="px-global pb-8">
            {contactInfo.map((contact) => (
              <TouchableOpacity 
                key={contact.id}
                onPress={contact.action}
                disabled={!contact.action}
                className="flex-row items-center py-4 border-b border-light-secondary dark:border-dark-secondary"
              >
                <View className="w-10 h-10 rounded-full bg-light-secondary dark:bg-dark-secondary items-center justify-center mr-4">
                  <Icon name={contact.icon} size={20} />
                </View>
                <View>
                  <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">
                    {contact.type}
                  </ThemedText>
                  <ThemedText className="font-medium">
                    {contact.value}
                  </ThemedText>
                </View>
                {contact.action && (
                  <Icon name="ChevronRight" size={20} className="ml-auto text-light-subtext dark:text-dark-subtext" />
                )}
              </TouchableOpacity>
            ))}
            
            <Button 
              title="Contact Support" 
              iconStart="MessageCircle"
              className="mt-8"
              onPress={() => Linking.openURL('mailto:support@propia.com')}
            />
          </View>
        </AnimatedView>
      </ScrollView>
    </View>
  );
}
