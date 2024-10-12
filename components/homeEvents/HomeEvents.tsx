'use client'

import Image from "next/image"
import test from "@/assets/images/2.png"

const HomeEvents = ({ item }: any) => {
    return (
        <div className="mt-32 bg-black relative h-[400px]">
            <Image src={test} fill alt="bg" />
            <div className="absolute left-2/4 -translate-x-1/2 translate-y-[0] top-2/4 text-center">
                <p className="text-black">{item.name}</p>
                <p> test test test </p>
                <p> test test test test test test test test test</p>
                <p> test test test test test test</p>
            </div>
        </div>
    )
}

export default HomeEvents