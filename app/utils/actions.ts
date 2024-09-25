'use server'

import { cookies } from "next/headers"

export default async function setLang(value:string) {
    cookies().set('language', value)
    console.log(value)
}