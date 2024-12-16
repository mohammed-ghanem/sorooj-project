import BlogPage from "@/components/blogCard/BlogPage"
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "مدونة مركز سرج",
    description: " مدونة مركز سرج كافة الاخبار والاحداث والدروس والمحاضرات المتعلفة بمركز سرج للدراسات والبحث العلمى منارة وفهم المذاهب الفكرية المعاصرة",
    keywords: "مركز,سرج,للدراسات,والابحاث,المذاهب,الفكرية,المعاصرة",
    openGraph: {
        title: "مدونة مركز سرج للدراسات والابحاث",
        description: "مدونة مركز سرج للدراسات والابحاث منارة البحث العلمى والمذاهب الفكرية المعاصرة",
        images: [
            {
                url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
                alt: "مدونة مركز سرج للدراسات والابحاث",
                width: 1200,
                height: 630,
            },
        ],
    },
};

const page = () => {
    return (
        <BlogPage />
    )
}

export default page