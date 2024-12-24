import axios from 'axios'; 

// Define the type for course items
export interface CourseItem {
  id: number;
  image?: string;
  watchNumber?: string;
  date?: string;
  title: string;
  doctorName: string;
  description?: string;
  slug: string;
}

// Fetch courses from the API
export const fetchCoursesHome = async (
  page = 0,
  orderBy = 'id',
  limit = 5
): Promise<CourseItem[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/courses`,
      {
        params: { page, orderBy, limit },
      }
    );

    // Return the fetched courses data directly
    return response.data.data;
  } catch (err: any) {
    throw new Error(err.message || 'Failed to fetch courses');
  }
};
