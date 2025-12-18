
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
  availability: string[]; // Mocked ISO strings for available slots
  isVerified: boolean;
  address: string;
}

export interface SearchFilters {
  specialty: string;
  location: string;
  insurance?: string;
}

export interface Appointment {
  doctorId: string;
  patientName: string;
  dateTime: string;
  status: 'pending' | 'confirmed';
}
