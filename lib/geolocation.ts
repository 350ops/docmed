// IP-based geolocation service using free ipapi.co API

export interface GeoLocation {
    city: string;
    region: string;
    country: string;
    countryCode: string;
}

export async function getLocationFromIP(): Promise<GeoLocation | null> {
    try {
        const response = await fetch('https://ipapi.co/json/', {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch location');
        }

        const data = await response.json();

        return {
            city: data.city || 'Desconocida',
            region: data.region || '',
            country: data.country_name || 'España',
            countryCode: data.country_code || 'ES',
        };
    } catch (error) {
        console.error('Error fetching location from IP:', error);
        return null;
    }
}

// Fallback Spanish cities for when IP location fails
export const SPANISH_CITIES = [
    'Madrid',
    'Barcelona',
    'Valencia',
    'Sevilla',
    'Zaragoza',
    'Málaga',
    'Murcia',
    'Palma de Mallorca',
    'Las Palmas',
    'Bilbao',
];
