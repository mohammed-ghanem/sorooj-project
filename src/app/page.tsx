import ProgressBar from "@/src/components/progressBar/ProgressBar";
import Slider from "@/src/components/slider/Slider";
import VideoLibTabs from "@/src/components/videoLibTabs/VideoLibTabs";
import VideoTabs from "@/src/components/videoLibTabs/VideoTabs";



export const dynamic = 'force-static';


export default function Home() {

  return (
    <div>
      <main className="w-full">
        <div>home page content</div>
        {/* <Slider />
        <VideoTabs/> */}
        {/* <ProgressBar /> */}
      </main>
    </div>
  );
}
