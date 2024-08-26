import { notFound } from "next/navigation"

export async function getTimeDate() {

    const res = await fetch('http://api.aladhan.com/v1/gToH')
    if (!res.ok) {
        throw new Error("not found ")
    }
    return res.json()
}