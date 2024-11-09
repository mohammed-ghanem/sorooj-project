"use client"

import { useEffect, useState } from 'react';

interface Course {
  id: number;
  title: string;
  body: string; // using 'body' to match JSONPlaceholder's response structure
}

const MyCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Using JSONPlaceholder as a fake API for testing
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setCourses(data.slice(0, 10)); // Fetch only the first 10 items as "enrolled courses"
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading your courses...</div>;
  }

  return (
    <div className="my-courses">
      <h1>My Courses</h1>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <h2>{course.title}</h2>
              <p>{course.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You are not enrolled in any courses yet.</p>
      )}
    </div>
  );
};

export default MyCourses;




// "use client"

// import { useEffect, useState } from 'react';

// interface Course {
//   id: number;
//   title: string;
//   description: string;
// }

// const MyCourses = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         // Replace this URL with your actual API endpoint for fetching courses
//         const response = await fetch('/api/enrolled-courses');
//         const data = await response.json();
//         setCourses(data);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (loading) {
//     return <div>Loading your courses...</div>;
//   }

//   return (
//     <div className="my-courses">
//       <h1>My Courses</h1>
//       {courses.length > 0 ? (
//         <ul>
//           {courses.map((course) => (
//             <li key={course.id}>
//               <h2>{course.title}</h2>
//               <p>{course.description}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>You are not enrolled in any courses yet.</p>
//       )}
//     </div>
//   );
// };

// export default MyCourses;
