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
    image: string;
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
        id: '1',
        name: 'Dra. Elena Martínez García',
        specialty: 'Psicología',
        location: 'Centro, Madrid',
        city: 'Madrid',
        rating: 4.9,
        reviewCount: 324,
        priceRange: '60€ - 90€',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
        insurances: ['Sanitas', 'Adeslas', 'Mapfre', 'Asisa'],
        bio: 'Especialista en terapia cognitivo-conductual con más de 15 años de experiencia. Tratamiento de ansiedad, depresión, trastornos de personalidad y problemas de pareja.',
        availability: generateWeeklyAvailability(),
        isVerified: true,
        address: 'Calle Velázquez, 45, 2º Izq, 28001 Madrid',
        coordinates: { lat: 40.4280, lng: -3.6835 },
        languages: ['Español', 'Inglés', 'Francés'],
        education: 'Universidad Complutense de Madrid - Doctorado en Psicología Clínica',
        experience: 15
    },
    {
        id: '2',
        name: 'Dr. Javier Ruiz Fernández',
        specialty: 'Dermatología',
        location: 'Eixample, Barcelona',
        city: 'Barcelona',
        rating: 4.7,
        reviewCount: 189,
        priceRange: '80€ - 120€',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
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
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
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
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face',
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
        image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face',
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
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
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
        image: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=400&h=400&fit=crop&crop=face',
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
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
        insurances: ['Sanitas', 'Adeslas', 'Asisa', 'Mapfre', 'DKV'],
        bio: 'Médico de familia con enfoque preventivo. Chequeos generales, seguimiento de enfermedades crónicas y medicina del viajero.',
        availability: generateWeeklyAvailability(),
        isVerified: false,
        address: 'Calle Mayor, 45, 28013 Madrid',
        coordinates: { lat: 40.4168, lng: -3.7038 },
        languages: ['Español'],
        education: 'Universidad Complutense de Madrid - Medicina Familiar',
        experience: 20
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
    'AXA'
];
