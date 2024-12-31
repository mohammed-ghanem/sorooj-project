import DeleteAccount from "@/components/ourPolicy/deleteAccountPolicy/DeleteAccount";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "حذف حسابك",
    description: "حذف حسابك من الموقع الالكتروني سرج للدراسات والابحاث",
    keywords: "حذف,حسابك,الموقع,الالكترونى,سرج,الدراسات,والابحاث",
    openGraph: {
        title: "حذف حسابك",
        description: "حذف حسابك من الموقع الالكتروني سرج للدراسات والابحاث",
        images: [
            {
                url: "https://www.sorooj.org/_next/static/media/logo.2da5fe49.png",
                alt: "حذف حسابك",
                width: 1200,
                height: 630,
            },
        ],
    },
}; 

export default function aboutUs() {
    return <div><DeleteAccount/></div>
} 