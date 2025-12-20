// propia/lib/chats.ts

export interface ChatUser {
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

export const mockChats: ChatUser[] = [
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
        name: 'DocBot AI',
        avatar: 'https://i.pravatar.cc/150?img=5',
        lastMessage: 'Hola... uugh, ¿estás ahí? Estoy aburridísima...',
        timestamp: 'Ahora',
        unread: true,
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
