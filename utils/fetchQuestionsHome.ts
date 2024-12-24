import axios from 'axios';

export interface FatwaItem {
    id: number;
    question: string;
    answer: any;
    answer_content: any;
    slug: string;

}

export const fetchQuestionsHome = async (
    page = 0,
    orderBy = 'id',
    limit = 5,
    answerContent = true,
): Promise<FatwaItem[]> => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/client-api/v1/home/get-questions-answers`,
            {
                params: { page, orderBy, limit, answerContent },
            }
        );

        // Return the fetched courses data directly
        return response.data.data;
    } catch (err: any) {
        throw new Error(err.message || 'Failed to fetch courses');
    }
};