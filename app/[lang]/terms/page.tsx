import Terms from "@/components/ourPolicy/terms/Terms";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "الشروط و الأحكام",
    description: "اتفاقية استخدام الموقع الالكتروني سرج للدراسات والابحاث",
    keywords: "اتفاقية,استخدام,الموقع,الالكترونى,سرج,الدراسات,والابحاث",
    openGraph: {
        title: "الشروط والاحكام لاستخدام مركز سرج للدراسات والابحاث",
        description: "اتفاقية استخدام الموقع الالكتروني سرج للدراسات والابحاث",
        images: [
            {
                url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
                alt: "الشروط والاحكام",
                width: 1200,
                height: 630,
            },
        ],
    },
};

export default function aboutUs() {
    return <div><Terms /></div>
} 