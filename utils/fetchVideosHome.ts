import axios from 'axios';

export interface VideoItem {
    id: number;
    name: string;
    video: any;
    description: string;
    youtube_link: string;
    publish_date: string
}

export const fetchVideosHome = async (
    page = 0,
    orderBy = 'id',
    limit = 5,
): Promise<VideoItem[]> => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/home/videos`,
            {
                params: { page, orderBy, limit },
            }
        );

        // Return the fetched videos data directly
        return response.data.data;
        
    } catch (err: any) {
        throw new Error(err.message || 'Failed to fetch Videos Libirary');
    }
};