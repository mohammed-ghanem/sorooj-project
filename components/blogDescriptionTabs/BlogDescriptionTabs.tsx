"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faStar, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";
import BlogBtnComment from "./BlogBtnComment";

const BlogDescriptionTabs = ({ blogDetails }: any) => {
    // Ensure course_content is a string or provide a fallback
    const BlogContent =
        typeof blogDetails?.course_content === "string"
            ? blogDetails.course_content
            : "<p>لا يوجد وصف للدورة</p>";

    return (
        <Tabs>
            <TabList className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-10 mb-8 rounded-[6px] overflow-hidden text-center [box-shadow:1px_1px_10px_#ddd]">
                <Tab>وصف الدورة</Tab>
                <Tab>الملفات المرفقة</Tab>
                <Tab>التعليقات</Tab>
            </TabList>

            <TabPanel className="courseDes">
                <div>{parse(BlogContent)}</div>
            </TabPanel>

            <TabPanel className="pdfFiles">
                {blogDetails.attachments && blogDetails.attachments.length > 0 ? (
                    <ul>
                        {blogDetails.attachments.map((file: any) => (
                            <li
                                key={file.id}
                                className="p-[10px] [box-shadow:1px_1px_10px_#ddd] rounded-[5px] mb-[14px] bkBox"
                            >
                                <FontAwesomeIcon className="primaryColor ml-1" icon={faFilePdf} />
                                <a href={file.url} className="mainColor">
                                    {file.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">لا توجد ملفات مرفقة</p>
                )}
            </TabPanel>

            <TabPanel className="allComments">
                {blogDetails.comments && blogDetails.comments.length > 0 ? (
                    blogDetails.comments.map((comment: any) => (
                        <div
                            key={comment.id}
                            className="userComment flex items-center p-[10px] [box-shadow:1px_1px_10px_#ddd] rounded-[5px] mb-[14px]"
                        >
                            <span>
                                <FontAwesomeIcon
                                    className="text-3xl primaryColor mx-4"
                                    icon={faUserGraduate}
                                />
                            </span>
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <h4 className="mainColor font-bold">{comment.name}</h4>
                                    <p className="text-yellow-400">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <FontAwesomeIcon
                                                key={i}
                                                className={i < comment.stars ? "" : "opacity-30"}
                                                icon={faStar}
                                            />
                                        ))}
                                    </p>
                                </div>
                                <p className="comment text-gray-600 mt-2">{comment.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>لا توجد تعليقات</div>
                )}

                {/* btn add comment */}
                <div>
                    <BlogBtnComment blogDetails={blogDetails} />
                </div>
            </TabPanel>
        </Tabs>
    );
};

export default BlogDescriptionTabs;