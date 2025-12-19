
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
  availability: DayAvailability[]; // Weekly availability
  isVerified: boolean;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  languages?: string[];
  education?: string;
  experience?: number; // Years of experience
}

export interface DayAvailability {
  date: string; // ISO date string (YYYY-MM-DD)
  slots: string[]; // Array of time strings like "09:00", "10:30"
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
