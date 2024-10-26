

interface Hijri {
    day: string;
    weekday: { ar: string };
    month: { ar: string };
    year: string;
}

interface Gregorian {
    day: string;
    month: { en: string };
    year: string;
}

interface DataResponse {
    data: {
        hijri: Hijri;
        gregorian?: Gregorian; 
    };
}
export async function getTimeDate(): Promise<DataResponse | null> {
    try {
        const res = await fetch('http://api.aladhan.com/v1/gToH', {
            next: { revalidate: 0 } // Disable caching
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data: DataResponse = await res.json();

        // Check if the data structure is valid
        if (!data || !data.data || !data.data.hijri ) {
            return null; // Return null if the expected structure is not present
        }

        return data;
    } catch (error) {
        // Handle fetch errors
        console.error('Fetch error:', error);
        return null; 
        // Return null on error
    }
}
