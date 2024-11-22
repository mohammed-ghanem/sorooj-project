
"use client"
// pages/index.tsx
import React from 'react';
import VideoCourseTabs from './VideoCourseTab';



const VideoTabsCourse: React.FC = () => {

    const courseVideoTabs = [
        {
            id: 1,
            content: "https://www.youtube.com/embed/9Be3wB4DpAg",
            title: "برنامج محطات فى العقيدة المحور الثانى مفهوم التوحيد",
            imgPath: "https://img.youtube.com/vi/9Be3wB4DpAg/mqdefault.jpg",
            publishDate: "2 sep 2024"
        },
        {
            id: 2,
            content: "https://www.youtube.com/embed/mjTtoTrdYLA",
            title: "برنامج محطات فى العقيدة المحور الثانى مفهوم التوحيد",
            imgPath: "https://img.youtube.com/vi/mjTtoTrdYLA/mqdefault.jpg",
            publishDate: "2 sep 2024"
        },
        {
            id: 3,
            content: "https://www.youtube.com/embed/c2xjqwvanak",
            title: "برنامج محطات فى العقيدة المحور الثانى مفهوم التوحيد",
            imgPath: "https://img.youtube.com/vi/c2xjqwvanak/mqdefault.jpg",
            publishDate: "2 sep 2024"
        },
        {
            id: 4,
            content: "https://www.youtube.com/embed/Wo7Qf38GLTQ",
            title: "برنامج محطات فى العقيدة المحور الثانى مفهوم التوحيد",
            imgPath: "https://img.youtube.com/vi/Wo7Qf38GLTQ/mqdefault.jpg",
            publishDate: "2 sep 2024"
        },
        {
            id: 5,
            content: "https://www.youtube.com/embed/c2xjqwvanak",
            title: "برنامج محطات فى العقيدة المحور الثانى مفهوم التوحيد",
            imgPath: "https://img.youtube.com/vi/c2xjqwvanak/mqdefault.jpg",
            publishDate: "2 sep 2024"
        },
        {
            id: 6,
            content: "https://www.youtube.com/embed/Wo7Qf38GLTQ",
            title: "برنامج محطات فى العقيدة المحور الثانى مفهوم التوحيد",
            imgPath: "https://img.youtube.com/vi/Wo7Qf38GLTQ/mqdefault.jpg",
            publishDate: "2 sep 2024"
        },
        {
            id: 7,
            content: "https://www.youtube.com/embed/mjTtoTrdYLA",
            title: "برنامج محطات فى العقيدة المحور الثانى مفهوم التوحيد",
            imgPath: "https://img.youtube.com/vi/mjTtoTrdYLA/mqdefault.jpg",
            publishDate: "2 sep 2024"
        },
        {
            id: 8,
            content: "https://www.youtube.com/embed/c2xjqwvanak",
            title: "برنامج محطات فى العقيدة المحور الثانى مفهوم التوحيد",
            imgPath: "https://img.youtube.com/vi/c2xjqwvanak/mqdefault.jpg",
            publishDate: "2 sep 2024"
        },
        {
            id: 9,
            content: "https://www.youtube.com/embed/Wo7Qf38GLTQ",
            title: "برنامج محطات فى العقيدة المحور الثانى مفهوم التوحيد",
            imgPath: "https://img.youtube.com/vi/Wo7Qf38GLTQ/mqdefault.jpg",
            publishDate: "2 sep 2024"
        },
        {
            id: 10,
            content: "https://www.youtube.com/embed/c2xjqwvanak",
            title: "برنامج محطات فى العقيدة المحور الثانى مفهوم التوحيد",
            imgPath: "https://img.youtube.com/vi/c2xjqwvanak/mqdefault.jpg",
            publishDate: "2 sep 2024"
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <VideoCourseTabs courseVideoTabs={courseVideoTabs} />
        </div>
    );
};

export default VideoTabsCourse;
