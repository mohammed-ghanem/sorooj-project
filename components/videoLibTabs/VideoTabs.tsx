
"use client"
// pages/index.tsx
import React from 'react';
import CustomTabs from './VideoLibTabs';


const VideoTabs: React.FC = () => {
  const tabs = [
    {
      id: 1,
      content: "https://www.youtube.com/embed/Wo7Qf38GLTQ",
      title: "برنامج محطات فى العقيدة المحور الثانى مفهوم التوحيد",
      imgPath: "https://img.youtube.com/vi/Wo7Qf38GLTQ/mqdefault.jpg",
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
  ];

  return (
    <div className="container mx-auto p-4 mt-20">
      <h2 className="text-2xl font-bold mb-4 primaryColor">المكتبة المرئية</h2>
      <CustomTabs tabs={tabs} />
    </div>
  );
};

export default VideoTabs;
