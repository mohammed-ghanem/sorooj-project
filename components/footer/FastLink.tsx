// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";


// const FastLink = () => {

//     const { lang }: { lang?: string } = useParams(); // Access dynamic [lang] parameter
//     const [mounted, setMounted] = useState<boolean>(false);

//     console.log(lang)

//     useEffect(() => {
//         setMounted(true); // Ensure the component is mounted before accessing params
//     }, []);

//     if (!mounted) return null; // Avoid rendering before the component is mounted
//   return (
//     <div>FastLink</div>
//   )
// }

// export default FastLink()