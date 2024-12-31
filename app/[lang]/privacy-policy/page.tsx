import PrivacyPolicy from "@/components/ourPolicy/privacyPolicy/PrivacyPolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "سياسة الخصوصية",
    description: "اتفاقية استخدام الموقع الالكتروني سرج للدراسات والابحاث",
    keywords: "اتفاقية,استخدام,الموقع,الالكترونى,سرج,الدراسات,والابحاث",
    openGraph: {
        title: "سياسة الخصوصية لاستخدام مركز سرج للدراسات والابحاث",
        description: "اتفاقية استخدام الموقع الالكتروني سرج للدراسات والابحاث",
        images: [
            {
                url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
                alt: " سياسة الخصوصية ",
                width: 1200,
                height: 630,
            },
        ],
    },
};

export default function aboutUs() {
    return <div><PrivacyPolicy /></div>
} 