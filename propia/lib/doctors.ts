// CareSalud - Mock Doctor Data
// Adapted from web app for mobile

export interface DayAvailability {
    date: string;
    slots: string[];
}

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    location: string;
    city: string;
    rating: number;
    reviewCount: number;
    priceRange: string;
    image: any;
    insurances: string[];
    bio: string;
    availability: DayAvailability[];
    isVerified: boolean;
    address: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    languages?: string[];
    education?: string;
    experience?: number;
}

// Helper to generate availability for next 7 days
function generateWeeklyAvailability(): DayAvailability[] {
    const availability: DayAvailability[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];

        const possibleSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '16:00', '16:30', '17:00', '17:30', '18:00'];
        const numSlots = Math.floor(Math.random() * 6);
        const slots: string[] = [];

        for (let j = 0; j < numSlots; j++) {
            const randomSlot = possibleSlots[Math.floor(Math.random() * possibleSlots.length)];
            if (!slots.includes(randomSlot)) {
                slots.push(randomSlot);
            }
        }

        slots.sort();
        availability.push({ date: dateStr, slots });
    }

    return availability;
}

export const MOCK_DOCTORS: Doctor[] = [
    {
        id: '2',
        name: 'Dr. Javier Ruiz Fernández',
        specialty: 'Dermatología',
        location: 'Eixample, Barcelona',
        city: 'Barcelona',
        rating: 4.7,
        reviewCount: 189,
        priceRange: '80€ - 120€',
        image: require('@/assets/img/doc2.jpeg'),
        insurances: ['Sanitas', 'Asisa', 'DKV'],
        bio: 'Experto en dermatología estética y oncología cutánea. Miembro de la Academia Española de Dermatología.',
        availability: generateWeeklyAvailability(),
        isVerified: true,
        address: 'Carrer de Balmes, 129, 08008 Barcelona',
        coordinates: { lat: 41.3920, lng: 2.1574 },
        languages: ['Español', 'Catalán', 'Inglés'],
        education: 'Universidad de Barcelona - Especialidad en Dermatología',
        experience: 12
    },
    {
        id: '3',
        name: 'Dra. Sofía Castro López',
        specialty: 'Ginecología',
        location: 'Ruzafa, Valencia',
        city: 'Valencia',
        rating: 4.9,
        reviewCount: 410,
        priceRange: '50€ - 100€',
        image: require('@/assets/img/doc3.jpg'),
        insurances: ['Adeslas', 'DKV', 'Caser', 'AXA'],
        bio: 'Atención integral a la mujer en todas las etapas de la vida. Especializada en control de embarazo de alto riesgo, fertilidad y menopausia.',
        availability: generateWeeklyAvailability(),
        isVerified: true,
        address: 'Avenida de las Cortes Valencianas, 58, 46015 Valencia',
        coordinates: { lat: 39.4699, lng: -0.3763 },
        languages: ['Español', 'Valenciano', 'Inglés'],
        education: 'Universidad de Valencia - Especialidad en Obstetricia y Ginecología',
        experience: 18
    },
    {
        id: '4',
        name: 'Dr. Miguel Ángel Torres',
        specialty: 'Pediatría',
        location: 'Chamartín, Madrid',
        city: 'Madrid',
        rating: 4.8,
        reviewCount: 256,
        priceRange: '70€ - 110€',
        image: require('@/assets/img/doc4.jpg'),
        insurances: ['Sanitas', 'Mapfre', 'Adeslas'],
        bio: 'Especialista en pediatría y puericultura. Seguimiento del desarrollo infantil, vacunación y tratamiento de enfermedades pediátricas.',
        availability: generateWeeklyAvailability(),
        isVerified: true,
        address: 'Paseo de la Castellana, 120, 28046 Madrid',
        coordinates: { lat: 40.4578, lng: -3.6912 },
        languages: ['Español', 'Inglés'],
        education: 'Universidad Autónoma de Madrid - Especialidad en Pediatría',
        experience: 10
    },
    {
        id: '5',
        name: 'Dra. Carmen Navarro Sánchez',
        specialty: 'Cardiología',
        location: 'Nervión, Sevilla',
        city: 'Sevilla',
        rating: 4.9,
        reviewCount: 178,
        priceRange: '90€ - 150€',
        image: require('@/assets/img/doc5.jpeg'),
        insurances: ['Sanitas', 'Adeslas', 'AXA'],
        bio: 'Cardióloga con experiencia en prevención cardiovascular, hipertensión y arritmias. Ecocardiografía y pruebas de esfuerzo en consulta.',
        availability: generateWeeklyAvailability(),
        isVerified: true,
        address: 'Avenida Luis de Morales, 32, 41018 Sevilla',
        coordinates: { lat: 37.3886, lng: -5.9823 },
        languages: ['Español', 'Inglés', 'Portugués'],
        education: 'Universidad de Sevilla - Especialidad en Cardiología',
        experience: 14
    },
    {
        id: '6',
        name: 'Dr. Pablo Hernández Gil',
        specialty: 'Traumatología',
        location: 'Salamanca, Madrid',
        city: 'Madrid',
        rating: 4.6,
        reviewCount: 142,
        priceRange: '80€ - 130€',
        image: require('@/assets/img/doc6.jpeg'),
        insurances: ['Mapfre', 'Sanitas', 'Caser'],
        bio: 'Traumatólogo deportivo. Especializado en lesiones de rodilla, hombro y columna. Cirugía artroscópica y medicina regenerativa.',
        availability: generateWeeklyAvailability(),
        isVerified: true,
        address: 'Calle de Serrano, 88, 28006 Madrid',
        coordinates: { lat: 40.4350, lng: -3.6850 },
        languages: ['Español', 'Inglés'],
        education: 'Universidad de Navarra - Especialidad en Traumatología',
        experience: 11
    },
    {
        id: '7',
        name: 'Dra. Lucía Moreno Pérez',
        specialty: 'Oftalmología',
        location: 'Les Corts, Barcelona',
        city: 'Barcelona',
        rating: 4.8,
        reviewCount: 203,
        priceRange: '70€ - 100€',
        image: require('@/assets/img/doc7.jpg'),
        insurances: ['DKV', 'Adeslas', 'Sanitas'],
        bio: 'Oftalmóloga especializada en cirugía refractiva, cataratas y glaucoma. Tecnología láser de última generación.',
        availability: generateWeeklyAvailability(),
        isVerified: true,
        address: 'Travessera de les Corts, 131, 08028 Barcelona',
        coordinates: { lat: 41.3850, lng: 2.1290 },
        languages: ['Español', 'Catalán', 'Inglés', 'Alemán'],
        education: 'Universidad Autónoma de Barcelona - Especialidad en Oftalmología',
        experience: 9
    },
    {
        id: '8',
        name: 'Dr. Antonio García Ruiz',
        specialty: 'Medicina General',
        location: 'Centro, Madrid',
        city: 'Madrid',
        rating: 4.5,
        reviewCount: 89,
        priceRange: '40€ - 60€',
        image: require('@/assets/img/doc8.jpg'),
        insurances: ['Sanitas', 'Adeslas', 'Asisa', 'Mapfre', 'DKV'],
        bio: 'Médico de familia con enfoque preventivo. Chequeos generales, seguimiento de enfermedades crónicas y medicina del viajero.',
        availability: generateWeeklyAvailability(),
        isVerified: false,
        address: 'Calle Mayor, 45, 28013 Madrid',
        coordinates: { lat: 40.4168, lng: -3.7038 },
        languages: ['Español'],
        education: 'Universidad Complutense de Madrid - Medicina Familiar',
        experience: 20
    },
    {
        id: '10',
        name: 'Dra. Carla Ruiz Martínez',
        specialty: 'Psicología',
        location: 'Chamberí, Madrid',
        city: 'Madrid',
        rating: 4.8,
        reviewCount: 356,
        priceRange: '65€ - 95€',
        image: require('@/assets/img/doc7.jpg'),
        insurances: ['Mapfre', 'Sanitas', 'Adeslas', 'Asisa'],
        bio: 'Psicóloga clínica especializada en trastornos de ansiedad, depresión y terapia de pareja. Enfoque integrador combinando terapia cognitivo-conductual y mindfulness.',
        availability: generateWeeklyAvailability(),
        isVerified: true,
        address: 'Calle Alonso Cano, 23, 28003 Madrid',
        coordinates: { lat: 40.4389, lng: -3.7012 },
        languages: ['Español', 'Inglés', 'Italiano'],
        education: 'Universidad Autónoma de Madrid - Máster en Psicología Clínica',
        experience: 11
    },
    {
        id: '11',
        name: 'Dra. Lucía Santos García',
        specialty: 'Pediatría',
        location: 'Triana, Sevilla',
        city: 'Sevilla',
        rating: 4.9,
        reviewCount: 412,
        priceRange: '55€ - 85€',
        image: require('@/assets/img/doc3.jpg'),
        insurances: ['Adeslas', 'Sanitas', 'AXA', 'DKV'],
        bio: 'Pediatra con especial dedicación a la lactancia materna, desarrollo infantil y vacunación. Atención cálida y cercana para los más pequeños de la familia.',
        availability: generateWeeklyAvailability(),
        isVerified: true,
        address: 'Calle San Jacinto, 45, 41010 Sevilla',
        coordinates: { lat: 37.3826, lng: -6.0067 },
        languages: ['Español', 'Inglés'],
        education: 'Universidad de Sevilla - Especialidad en Pediatría',
        experience: 13
    },
    {
        id: '12',
        name: 'Dra. Ana Vidal Romero',
        specialty: 'Ginecología',
        location: 'Ensanche, Valencia',
        city: 'Valencia',
        rating: 4.7,
        reviewCount: 198,
        priceRange: '60€ - 100€',
        image: require('@/assets/img/doc3.jpg'),
        insurances: ['Caser', 'Adeslas', 'Mapfre', 'Sanitas'],
        bio: 'Ginecóloga con enfoque en salud reproductiva, control de embarazo y menopausia. Ecografías 3D/4D y seguimiento personalizado de cada paciente.',
        availability: generateWeeklyAvailability(),
        isVerified: true,
        address: 'Calle Colón, 72, 46004 Valencia',
        coordinates: { lat: 39.4680, lng: -0.3756 },
        languages: ['Español', 'Valenciano', 'Inglés', 'Francés'],
        education: 'Universidad de Valencia - Especialidad en Ginecología y Obstetricia',
        experience: 9
    }
];

export const SPECIALTIES = [
    'Alergología',
    'Cardiología',
    'Dermatología',
    'Endocrinología',
    'Gastroenterología',
    'Ginecología',
    'Medicina General',
    'Neurología',
    'Oftalmología',
    'Oncología',
    'Pediatría',
    'Psicología',
    'Psiquiatría',
    'Traumatología',
    'Urología',
];

export const INSURANCES = [
    'Sanitas',
    'Adeslas',
    'Mapfre',
    'Asisa',
    'DKV',
    'Caser',
    'AXA',
    'Ninguna'
];
