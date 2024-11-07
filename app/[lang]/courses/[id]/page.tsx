import Banners from "@/components/banners/Banners"
import defImage from "@/assets/images/default.webp"; // Default image

// single course page
const page = () => {
    return (
        <section>
            <div>
                <Banners src={defImage} />
            </div>
            <div className=" container mx-auto">
                <h1>Courses content Page</h1>
            </div>
        </section>

    )
}

export default page